import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useAnimation } from '@context/AnimationContext';
import '@assets/css/tailwind.css';
import './LazyImage.css';

/**
 * Lazy-loaded image component that only loads images when they enter the viewport.
 * Includes loading skeleton, blur-up effect, and proper accessibility attributes.
 * Updated with security-themed variants and framer-motion animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for the image (required for accessibility)
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.lowResSrc] - Low resolution version of image to show while loading
 * @param {Object} [props.imgProps] - Additional props to pass to img element
 * @param {string} [props.aspectRatio] - Aspect ratio to maintain (e.g., '16:9', '4:3', '1:1')
 * @param {Function} [props.onLoad] - Callback when image loads
 * @param {Function} [props.onError] - Callback when image fails to load
 * @returns {React.ReactElement} LazyImage component
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  variant = '',
  lowResSrc,
  imgProps = {},
  aspectRatio,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isInView] = useIntersectionObserver({
    rootMargin: '200px', // Load images 200px before they enter viewport
    threshold: 0.01
  });
  const imageRef = useRef(null);
  
  // Get animation context values
  const { animationEnabled, fadeInVariants, shouldReduceMotion } = useAnimation();
  
  // Determine if animations should run
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Calculate aspect ratio styles if provided
  const aspectRatioStyle = {};
  if (aspectRatio) {
    const [width, height] = aspectRatio.split(':').map(Number);
    const paddingBottom = `${(height / width) * 100}%`;
    aspectRatioStyle.paddingBottom = paddingBottom;
  }
  
  // Handle successful image load
  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };
  
  // Handle image loading error
  const handleImageError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };
  
  // Construct container classes
  const containerClasses = [
    'lazy-image-container',
    variant ? `lazy-image-${variant}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Define animation variants
  const containerVariants = {
    initial: { opacity: 0.7 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: shouldAnimate ? 0.3 : 0
      }
    }
  };
  
  const skeletonVariants = {
    initial: { backgroundPosition: '100% 50%' },
    animate: { 
      backgroundPosition: '0% 50%',
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: shouldAnimate ? 1.4 : 0,
        ease: 'easeInOut'
      }
    }
  };
  
  const lowResVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: shouldAnimate ? 0.3 : 0
      }
    }
  };
  
  const imageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: shouldAnimate ? 0.3 : 0
      }
    }
  };
  
  const errorVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: shouldAnimate ? 0.3 : 0
      }
    }
  };
    
  return (
    <motion.div 
      ref={ref}
      className={containerClasses}
      style={aspectRatio ? aspectRatioStyle : {}}
      role="img"
      aria-label={hasError ? `Failed to load image: ${alt}` : ""}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Loading skeleton shown until image loads */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            className="lazy-image-skeleton"
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      
      {/* Low resolution placeholder if provided */}
      <AnimatePresence>
        {!isLoaded && !hasError && lowResSrc && (
          <motion.img
            src={lowResSrc}
            alt=""
            className="lazy-image-low-res"
            aria-hidden="true"
            variants={lowResVariants}
            initial="initial"
            exit="exit"
          />
        )}
      </AnimatePresence>
      
      {/* Error state placeholder */}
      <AnimatePresence>
        {hasError && (
          <motion.div 
            className="lazy-image-error"
            variants={errorVariants}
            initial="initial"
            animate="animate"
          >
            <span role="alert">Failed to load image</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The actual image (only loaded when in viewport) */}
      {isInView && !hasError && (
        <motion.img
          ref={imageRef}
          src={src}
          alt={alt}
          className="lazy-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          width={imgProps.width}
          height={imgProps.height}
          loading="lazy"
          decoding="async"
          variants={imageVariants}
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
          {...imgProps}
        />
      )}
    </motion.div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  lowResSrc: PropTypes.string,
  imgProps: PropTypes.object,
  aspectRatio: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default memo(LazyImage);
