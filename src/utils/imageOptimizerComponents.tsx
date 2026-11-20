/**
 * Image optimization utilities
 * Provides functions for lazy loading, responsive images, and blur-up techniques
 */
import { useState, useEffect } from 'react';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';

// Function to create a low-quality image placeholder
export const createPlaceholder = (src: string, width = 20): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Create a small canvas to generate a low-quality image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Set dimensions to a very small size
      canvas.width = width;
      canvas.height = Math.floor(width * (img.height / img.width));
      
      // Draw the image at a small size
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Generate a blurry data URL
      resolve(canvas.toDataURL('image/jpeg', 0.3));
    };
    
    img.onerror = () => {
      // Return an empty placeholder on error
      resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
    };
    
    img.src = src;
  });
};

// Hook for lazy loading images with blur-up effect
export const useLazyImage = (src: string | undefined, placeholderSize = 20) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!src) return;
    
    // Reset state when src changes
    setIsLoaded(false);
    
    // Create a small placeholder while the main image loads
    createPlaceholder(src, placeholderSize)
      .then(placeholderDataUrl => {
        setPlaceholder(placeholderDataUrl);
      });
    
    // Load the full image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    return () => {
      img.onload = null;
    };
  }, [src, placeholderSize]);
  
  return { imageSrc, placeholder, isLoaded };
};

// Generate srcSet for responsive images
export const generateSrcSet = (src: string | undefined, sizes: number[] = [320, 640, 960, 1280, 1920]): string => {
  if (!src) return '';
  
  // Parse URL to handle different file extensions
  const lastDot = src.lastIndexOf('.');
  if (lastDot === -1) return src;
  
  const basePath = src.substring(0, lastDot);
  const extension = src.substring(lastDot);
  
  // Generate srcSet string for different sizes
  return sizes
    .map(size => `${basePath}-${size}w${extension} ${size}w`)
    .join(', ');
};

export interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Load lazily with a blurred placeholder */
  lazy?: boolean;
  /** Width in pixels of the generated placeholder */
  placeholderSize?: number;
}

// Create a responsive image component
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  sizes = '(max-width: 768px) 100vw, 50vw',
  lazy = true,
  placeholderSize = 20,
  ...props 
}: ResponsiveImageProps) => {
  // If lazy loading is enabled, use the blur-up effect
  const { imageSrc, placeholder, isLoaded } = lazy ? useLazyImage(src, placeholderSize) : { imageSrc: src, placeholder: null, isLoaded: false };
  
  // Generate a srcSet if the browser supports it
  const srcSet = generateSrcSet(src);
  
  return (
    <div className={`responsive-image-container ${className || ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {lazy && placeholder && (
        <img 
          src={placeholder} 
          alt={alt} 
          className="placeholder-image"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.4s ease-in-out'
          }}
          aria-hidden="true"
        />
      )}
      
      <img 
        src={lazy ? (imageSrc || src) : src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        style={{ 
          opacity: lazy ? (isLoaded ? 1 : 0) : 1,
          transition: 'opacity 0.4s ease-in-out'
        }}
        {...props}
      />
    </div>
  );
};

export interface OptimizedBgImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Background image URL */
  src: string;
  /** Text alternative, read from a hidden img */
  alt?: string;
}

// Export a simple component for background images
export const OptimizedBgImage = ({ src, alt, children, className, ...props }: OptimizedBgImageProps) => {
  const { imageSrc, placeholder, isLoaded } = useLazyImage(src);
  
  return (
    <div 
      className={`optimized-bg-image ${className || ''}`}
      style={{
        position: 'relative',
        backgroundImage: `url(${isLoaded ? imageSrc : placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: isLoaded ? 'none' : 'blur(10px)',
        transition: 'filter 0.4s ease-in-out',
        ...props.style
      }}
      {...props}
    >
      {/* Hidden image for screen readers */}
      <img 
        src={(isLoaded ? imageSrc : placeholder) ?? undefined} 
        alt={alt} 
        style={{ display: 'none' }} 
      />
      {children}
    </div>
  );
};

// Function to optimize image URLs with parameters for CDNs
export const optimizeImageUrl = (url: string, width: number, height?: number, quality = 80): string => {
  // Example implementation for a hypothetical CDN
  // Modify this based on the actual CDN you're using
  if (!url) return '';
  
  // If URL already contains optimization parameters, return as is
  if (url.includes('?w=') || url.includes('&w=')) return url;
  
  // Add optimization parameters
  const separator = url.includes('?') ? '&' : '?';
  let optimizedUrl = `${url}${separator}w=${width}`;
  
  if (height) {
    optimizedUrl += `&h=${height}`;
  }
  
  optimizedUrl += `&q=${quality}`;
  
  return optimizedUrl;
};
