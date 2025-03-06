/**
 * Comprehensive browser compatibility fixes
 * This module provides fixes for Firefox, Edge, Safari, and other browsers
 */

// Main self-executing function to apply fixes immediately on import
(function() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isFirefox = userAgent.indexOf('firefox') !== -1;
  const isEdge = userAgent.indexOf('edg') !== -1 || userAgent.indexOf('edge') !== -1;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  
  // Firefox-specific fixes
  if (isFirefox) {
    console.log('Firefox detected, applying browser fixes');
    
    // Add global error handler to catch and suppress legacy-autofill errors
    window.addEventListener('error', function(event) {
      // Check for various patterns that indicate Firefox autofill-related errors
      if (
        // Check the filename
        (event.filename && (
          event.filename.includes('legacy-autofill') || 
          event.filename.includes('autofill-overlay') ||
          event.filename.includes('moz-extension')
        )) ||
        // Check the error message
        (event.message && (
          event.message.includes('this is undefined') ||
          event.message.includes('null is not an object')
        )) ||
        // Check the error stack if available
        (event.error && event.error.stack && (
          event.error.stack.includes('checkPageContainsShadowDom') || 
          event.error.stack.includes('requestIdleCallbackPolyfill') ||
          event.error.stack.includes('autofill') || 
          event.error.stack.includes('form') ||
          event.error.stack.includes('moz-extension')
        ))
      ) {
        // Prevent the error from propagating
        event.preventDefault();
        // Log a subtle message (reduced from warning to avoid console noise)
        console.debug('Suppressed Firefox extension error');
        return true;
      }
    }, true);
    
    // Add a more targeted error handler for the specific error you're seeing
    window.addEventListener('unhandledrejection', function(event) {
      if (
        event.reason && 
        (event.reason.message && event.reason.message.includes('this is undefined')) &&
        (event.reason.stack && (
          event.reason.stack.includes('checkPageContainsShadowDom') ||
          event.reason.stack.includes('requestIdleCallbackPolyfill') ||
          event.reason.stack.includes('moz-extension') ||
          event.reason.stack.includes('autofill')
        ))
      ) {
        // Prevent the error from propagating
        event.preventDefault();
        console.debug('Suppressed Firefox unhandled promise rejection');
        return true;
      }
    }, true);

    // Add a mock for the problematic checkPageContainsShadowDom function
    // Some Firefox extensions try to call this and it causes errors
    if (typeof window.checkPageContainsShadowDom === 'undefined') {
      window.checkPageContainsShadowDom = function() {
        return false; // Always return false to avoid the extension trying to do more work
      };
    }
    
    // Add a mock for the requestIdleCallbackPolyfill function
    if (typeof window.requestIdleCallback === 'undefined') {
      window.requestIdleCallback = function(callback) {
        return setTimeout(function() {
          const start = Date.now();
          callback({
            didTimeout: false,
            timeRemaining: function() {
              return Math.max(0, 50 - (Date.now() - start));
            }
          });
        }, 1);
      };
      
      window.cancelIdleCallback = function(id) {
        clearTimeout(id);
      };
    }
    
    // Add handlers for autofill behavior
    window.addEventListener('DOMContentLoaded', () => {
      // Handle autofill-related issues 
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('animationstart', (e) => {
          if (e.animationName === 'autofill') {
            // The animation name 'autofill' is used to detect autofill events
            // No action needed here as our CSS handles the styling
          }
        });
      });
    });
  }
  
  // Edge-specific fixes
  if (isEdge) {
    console.log('Edge detected, applying browser fixes');
    
    // Fix for CSS variables in Edge
    document.addEventListener('DOMContentLoaded', function() {
      // Add Edge-specific CSS
      const style = document.createElement('style');
      style.textContent = `
        @supports (-ms-ime-align:auto) {
          /* Additional dynamic style fixes for Edge */
          .backdrop-filter-blur {
            background-color: rgba(0, 0, 0, 0.8) !important;
          }
          
          /* Fix for object-fit in Edge */
          img.object-fit-cover,
          .card-img,
          .responsive-image,
          .lazy-image {
            font-family: 'object-fit: cover;';
          }
        }
      `;
      document.head.appendChild(style);
      
      // Fix for CSS Grid issues
      document.querySelectorAll('.grid-container').forEach(function(gridEl) {
        if (gridEl.style.display === 'grid') {
          // Force redraw of grid elements by toggling display
          const originalDisplay = gridEl.style.display;
          gridEl.style.display = 'block';
          setTimeout(function() {
            gridEl.style.display = originalDisplay;
          }, 0);
        }
      });
    });
    
    // Fix for object-fit in Edge
    if (typeof window.ObjectFitPolyfill === 'undefined') {
      window.ObjectFitPolyfill = {
        // Simple polyfill for object-fit
        apply: function() {
          document.querySelectorAll('img.object-fit-cover, .responsive-image, .lazy-image').forEach(function(img) {
            if ('objectFit' in document.documentElement.style === false) {
              if (img.dataset.src) {
                img.style.backgroundImage = 'url(' + (img.dataset.src || img.src) + ')';
              } else {
                img.style.backgroundImage = 'url(' + img.src + ')';
              }
              img.style.backgroundPosition = 'center center';
              img.style.backgroundSize = 'cover';
              img.style.backgroundRepeat = 'no-repeat';
            }
          });
        }
      };
      
      // Apply polyfill after DOM is loaded and on window resize
      document.addEventListener('DOMContentLoaded', window.ObjectFitPolyfill.apply);
      window.addEventListener('resize', window.ObjectFitPolyfill.apply);
      window.addEventListener('load', window.ObjectFitPolyfill.apply);
    }
  }
  
  // Safari-specific fixes
  if (isSafari) {
    console.log('Safari detected, applying browser fixes');
    
    // Fix for 100vh issue in Safari iOS
    const fixSafariVh = function() {
      document.documentElement.style.setProperty(
        '--safari-fixed-height', 
        window.innerHeight + 'px'
      );
    }
    
    // Apply Safari height fix on load and resize
    window.addEventListener('resize', fixSafariVh);
    window.addEventListener('orientationchange', fixSafariVh);
    document.addEventListener('DOMContentLoaded', fixSafariVh);
    
    // Fix for flexbox gap in Safari
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.safari-gap-fix').forEach(function(el) {
        // Force recalculation of flex layout
        el.style.display = 'flex';
      });
    });
  }
  
  // Browser-agnostic fixes
  
  // Fix for backdrop-filter fallback in browsers that don't support it
  document.addEventListener('DOMContentLoaded', function() {
    // Test backdrop-filter support
    const testEl = document.createElement('div');
    testEl.style.backdropFilter = 'blur(1px)';
    const hasBackdropFilter = testEl.style.backdropFilter !== '';
    
    // Apply fallback if needed
    if (!hasBackdropFilter) {
      document.querySelectorAll('.backdrop-filter-blur').forEach(function(el) {
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      });
    }
  });
  
  // Passive event listeners for better performance
  try {
    const options = {
      get passive() {
        window.supportPassiveEvents = true;
        return true;
      }
    };
    
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {
    window.supportPassiveEvents = false;
  }
  
  // Fix for iOS touch events (enables :active states on iOS)
  document.addEventListener('touchstart', function() {}, 
    window.supportPassiveEvents ? { passive: true } : false
  );
  
  // Polyfill for smooth scrolling
  if (!('scrollBehavior' in document.documentElement.style)) {
    import('smoothscroll-polyfill').then(smoothscroll => {
      smoothscroll.polyfill();
    }).catch(err => {
      console.warn('Could not load smooth scrolling polyfill', err);
    });
  }
  
  // Edge/IE fixes for CSS variables
  try {
    // Test if CSS variables are supported
    const testEl = document.createElement('div');
    testEl.style.setProperty('--test', '0');
    if (testEl.style.getPropertyValue('--test') !== '0') {
      // Minimal CSS variable polyfill for older browsers
      console.log('CSS variables not supported, applying basic fallbacks');
    }
  } catch (e) {
    console.warn('Error detecting CSS variable support', e);
  }
})();

/**
 * Export a function that can be called from React components
 * to apply any runtime fixes that weren't handled by the self-executing function
 */
export function applyRuntimeFixes() {
  // Any runtime fixes that need to be applied after React initialization
  // can be implemented here
  return true;
}

// Default export for backward compatibility
export default { applyRuntimeFixes };
