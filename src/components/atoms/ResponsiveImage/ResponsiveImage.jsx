import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import '@assets/css/tailwind.css';
import './ResponsiveImage.css';

/**
 * ResponsiveImage component for optimized image loading with lazy loading,
 * placeholder support, and animation capabilities.
 * Updated with security-themed variants and AnimationContext integration.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the image
 * @param {string} [props.alt=''] - Alt text for the image
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.placeholderSrc] - Low-quality placeholder image to show while loading
 * @param {boolean} [props.lazy=true] - Whether to lazy load the image
 * @param {string} [props.objectFit='cover'] - CSS object-fit property
 * @param {Object} [props.animation] - Framer Motion animation properties (deprecated, use AnimationContext)
 * @param {number} [props.threshold=0.1] - Intersection observer threshold (0-1)
 * @param {Function} [props.onLoad] - Callback when image is loaded
 * @param {Function} [props.onError] - Callback when image fails to load
 * @param {string} [props.sizes] - Sizes attribute for responsive images
 * @param {string} [props.srcSet] - SrcSet attribute for responsive images
 * @returns {React.ReactElement} ResponsiveImage component
 * 
 * @example
 * <ResponsiveImage
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   lazy={true}
 *   placeholderSrc="/path/to/placeholder.jpg"
 * />
 */
const ResponsiveImage = ({
  src,
  alt = '',
  className = '',
  variant = '',
  placeholderSrc,
  lazy = true,
  objectFit = 'cover',
  animation, // Kept for backward compatibility
  threshold = 0.1,
  onLoad,
  onError,
  sizes,
  srcSet,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [isError, setIsError] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');
  const { animationEnabled, shouldReduceMotion, fadeInVariants } = useAnimation();
  
  // Image classes
  const imageClasses = [
    'responsive-image',
    isLoaded ? 'loaded' : 'loading',
    isError ? 'error' : '',
    variant ? `responsive-image-${variant}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Define animation variants
  const imageVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Loading animation variants
  const loadingVariants = {
    security: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    terminal: {
      backgroundPosition: ["-100% 0", "200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  // Handle image loading when visible
  useEffect(() => {
    // If not lazy loading or if the image is visible in viewport
    if (!lazy || isVisible) {
      // Create a new image to preload
      const img = new Image();
      img.src = src;
      
      if (srcSet) {
        img.srcset = srcSet;
      }
      
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        if (onLoad) onLoad();
      };
      
      img.onerror = () => {
        setIsError(true);
        if (onError) onError();
      };
    }
  }, [lazy, isVisible, src, srcSet, onLoad, onError]);
  
  // Style for object-fit
  const imageStyle = {
    objectFit,
    ...(rest.style || {})
  };
  
  // Common image props
  const imageProps = {
    src: currentSrc || placeholderSrc || src,
    alt,
    className: imageClasses,
    style: imageStyle,
    sizes,
    ...rest
  };
  
  // Determine which animation to use
  const getAnimationProps = () => {
    // If animations are disabled or reduced motion is preferred, use minimal animation
    if (!animationEnabled || shouldReduceMotion) {
      return {
        initial: { opacity: isLoaded ? 1 : 0.7 },
        animate: { opacity: isLoaded ? 1 : 0.7 },
        transition: { duration: 0.1 }
      };
    }
    
    // If custom animation is provided (legacy support)
    if (animation) {
      return animation;
    }
    
    // Use our defined variants
    return {
      variants: imageVariants,
      initial: "hidden",
      animate: isLoaded ? "visible" : "hidden",
      // Add loading animation for security/terminal variants if not loaded
      ...(variant && !isLoaded ? {
        animate: variant === 'security' ? "security" : variant === 'terminal' ? "terminal" : "hidden",
        variants: {
          ...imageVariants,
          ...(variant === 'security' ? { security: loadingVariants.security } : {}),
          ...(variant === 'terminal' ? { terminal: loadingVariants.terminal } : {})
        }
      } : {})
    };
  };
  
  // Always use motion.img now for consistent behavior
  return (
    <motion.img
      ref={lazy ? ref : undefined}
      {...imageProps}
      {...getAnimationProps()}
    />
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  placeholderSrc: PropTypes.string,
  lazy: PropTypes.bool,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
  animation: PropTypes.object,
  threshold: PropTypes.number,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  sizes: PropTypes.string,
  srcSet: PropTypes.string
};

export default ResponsiveImage;
