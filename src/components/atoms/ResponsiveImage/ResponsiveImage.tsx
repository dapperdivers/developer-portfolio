import React, { useState, useEffect } from 'react';
import { motion, HTMLMotionProps, MotionProps, MotionStyle, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import '@assets/css/tailwind.css';
import './ResponsiveImage.css';

export interface ResponsiveImageProps
  extends Omit<HTMLMotionProps<'img'>, 'src' | 'alt' | 'onLoad' | 'onError'> {
  /** Source URL of the image */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Low-quality placeholder image to show while loading */
  placeholderSrc?: string;
  /** Whether to lazy load the image */
  lazy?: boolean;
  /** CSS object-fit property */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Framer Motion animation properties (legacy override) */
  animation?: MotionProps;
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Callback when image is loaded */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** SrcSet attribute for responsive images */
  srcSet?: string;
  /** Whether to animate the image as it loads */
  animated?: boolean;
}

/**
 * ResponsiveImage component for optimized image loading with lazy loading,
 * placeholder support, and animation capabilities.
 * Updated with security-themed variants.
 *
 * @component
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
  animated = true,
  ...rest
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [isError, setIsError] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');
  const motionOn = useMotionEnabled(animated);
  
  // Image classes
  const imageClasses = [
    'responsive-image',
    isLoaded ? 'loaded' : 'loading',
    isError ? 'error' : '',
    variant ? `responsive-image-${variant}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Define animation variants
  const imageVariants: Variants = {
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
  const loadingVariants: Variants = {
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
  const imageStyle: MotionStyle = {
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
  const getAnimationProps = (): MotionProps => {
    // If animations are disabled or reduced motion is preferred, use minimal animation
    if (!motionOn) {
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
      // The hook's ref is not typed for a specific element
      ref={lazy ? (ref as React.Ref<HTMLImageElement>) : undefined}
      {...imageProps}
      {...getAnimationProps()}
    />
  );
};

export default ResponsiveImage;
