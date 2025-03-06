import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import '@assets/css/tailwind.css';
import './ResponsiveImage.css';

/**
 * ResponsiveImage component for optimized image loading with lazy loading,
 * placeholder support, and animation capabilities.
 * Updated with security-themed variants.
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
 * @param {Object} [props.animation] - Framer Motion animation properties
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
 *   animation={{
 *     initial: { opacity: 0 },
 *     animate: { opacity: 1 },
 *     transition: { duration: 0.3 }
 *   }}
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
  animation,
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
  
  // Image classes
  const imageClasses = [
    'responsive-image',
    isLoaded ? 'loaded' : 'loading',
    isError ? 'error' : '',
    variant ? `responsive-image-${variant}` : '',
    className
  ].filter(Boolean).join(' ');
  
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
  
  // If we're using animation, wrap with motion
  if (animation) {
    return (
      <motion.img
        ref={lazy ? ref : undefined}
        {...imageProps}
        {...animation}
      />
    );
  }
  
  // Regular image
  return (
    <img
      ref={lazy ? ref : undefined}
      {...imageProps}
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
