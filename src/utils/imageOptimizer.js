/**
 * Image optimization utilities for the portfolio website
 * Handles responsive image loading, lazy loading, and format conversion
 */

/**
 * Configuration for images across the site
 */
export const imageConfig = {
  lazyLoad: true,
  compressionQuality: 80,
  defaultPlaceholder: '/assets/img/placeholder.svg',
  preloadHeroImages: true,
  supportedFormats: ['webp', 'jpg', 'png'],
  imageBreakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

/**
 * Get the optimal image format based on browser support
 * @returns {string} The best supported image format
 */
export const getOptimalFormat = () => {
  // Check for WebP support
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  })();

  // Check for AVIF support
  const supportsAVIF = (() => {
    const img = new Image();
    return img.canPlayType && img.canPlayType('image/avif').replace(/no/, '');
  })();

  if (supportsAVIF) return 'avif';
  if (supportsWebP) return 'webp';
  return 'jpg';
};

/**
 * Create a responsive image source set
 * @param {string} imagePath - Base path to the image
 * @param {Array} sizes - Array of sizes to generate
 * @returns {string} The srcset attribute value
 */
export const createSrcSet = (imagePath, sizes = [320, 640, 960, 1280]) => {
  const format = getOptimalFormat();
  const imageBase = imagePath.split('.').slice(0, -1).join('.');
  
  return sizes
    .map(size => `${imageBase}-${size}.${format} ${size}w`)
    .join(', ');
};

/**
 * Apply lazy loading to images
 * @param {HTMLElement} rootElement - Root element to search for images
 */
export const applyLazyLoading = (rootElement = document) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver support
    const images = rootElement.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  const images = rootElement.querySelectorAll('img[data-src]');
  images.forEach(img => {
    // Add a placeholder if no src is provided
    if (!img.src && imageConfig.defaultPlaceholder) {
      img.src = imageConfig.defaultPlaceholder;
    }
    // Add fade-in effect
    img.style.transition = 'opacity 0.3s ease-in-out';
    img.style.opacity = '0';
    
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    imageObserver.observe(img);
  });
};

/**
 * Preload critical images for faster rendering
 * @param {Array} imagePaths - Paths to critical images that should be preloaded
 */
export const preloadCriticalImages = (imagePaths = []) => {
  if (!imagePaths.length) return;
  
  const format = getOptimalFormat();
  
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    
    // Convert path to optimal format if it's a local image
    if (path.startsWith('/') || path.startsWith('./')) {
      const pathParts = path.split('.');
      if (pathParts.length > 1) {
        pathParts.pop();
        path = `${pathParts.join('.')}.${format}`;
      }
    }
    
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Generate a blurred placeholder for an image
 * @param {string} src - Source of the image
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @returns {Promise<string>} Data URL of the blurred placeholder
 */
export const generateBlurPlaceholder = (src, width = 20, height = 20) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Draw small image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Apply blur effect
      ctx.filter = 'blur(4px)';
      ctx.drawImage(canvas, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    
    img.onerror = () => {
      // Return transparent pixel if loading fails
      resolve('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    };
    
    img.src = src;
  });
};

/**
 * Initialize image optimization
 * Called once when the app loads
 */
export const initImageOptimization = () => {
  // Apply lazy loading to all images when page is loaded
  if (document.readyState === 'complete') {
    applyLazyLoading();
  } else {
    window.addEventListener('load', () => {
      applyLazyLoading();
    });
  }
  
  // Preload critical images for faster initial render
  if (imageConfig.preloadHeroImages) {
    // Only preload images that actually exist
    const criticalImages = [
      // No critical background images to preload at this time
      // Add paths here when new hero images are added
    ];
    
    // Only call preload if we have images to preload
    if (criticalImages.length > 0) {
      preloadCriticalImages(criticalImages);
    }
  }
};

export default {
  imageConfig,
  getOptimalFormat,
  createSrcSet,
  applyLazyLoading,
  preloadCriticalImages,
  generateBlurPlaceholder,
  initImageOptimization
};
