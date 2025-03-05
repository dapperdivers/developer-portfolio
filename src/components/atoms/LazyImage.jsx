import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import '../../assets/css/tailwind.css';

/**
 * Lazy-loaded image component that only loads images when they enter the viewport.
 * Includes loading skeleton, blur-up effect, and proper accessibility attributes.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for the image (required for accessibility)
 * @param {string} [props.className] - Additional CSS classes to apply
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
  
  return (
    <div 
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={aspectRatio ? aspectRatioStyle : {}}
      role="img"
      aria-label={hasError ? `Failed to load image: ${alt}` : ""}
    >
      {/* Loading skeleton shown until image loads */}
      {!isLoaded && !hasError && (
        <div className="lazy-image-skeleton"></div>
      )}
      
      {/* Low resolution placeholder if provided */}
      {!isLoaded && !hasError && lowResSrc && (
        <img
          src={lowResSrc}
          alt=""
          className="lazy-image-low-res"
          aria-hidden="true"
        />
      )}
      
      {/* Error state placeholder */}
      {hasError && (
        <div className="lazy-image-error">
          <span role="alert">Failed to load image</span>
        </div>
      )}
      
      {/* The actual image (only loaded when in viewport) */}
      {isInView && !hasError && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'lazy-image-loaded' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          width={imgProps.width}
          height={imgProps.height}
          loading="lazy"
          decoding="async"
          {...imgProps}
        />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  lowResSrc: PropTypes.string,
  imgProps: PropTypes.object,
  aspectRatio: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default memo(LazyImage);
