/**
 * Browser-specific fixes for compatibility issues
 * This script addresses issues with Firefox, Edge, and Safari
 */

// Execute this fix immediately when imported
(function() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isFirefox = userAgent.indexOf('firefox') !== -1;
  const isEdge = userAgent.indexOf('edg') !== -1 || userAgent.indexOf('edge') !== -1;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  
  // Firefox-specific fixes
  if (isFirefox) {
    console.log('Firefox detected, applying browser fixes');
    
    // Add global error handler to catch and suppress bootstrap-legacy-autofill errors
    window.addEventListener('error', function(event) {
      if (
        (event.filename && event.filename.includes('bootstrap-legacy-autofill')) ||
        (event.message && event.message.includes('this is undefined') && 
         event.error && event.error.stack && event.error.stack.includes('checkPageContainsShadowDom'))
      ) {
        // Prevent the error from propagating
        event.preventDefault();
        return true;
      }
    }, true);

    // Override any global bootstrap methods that might be causing issues
    if (window.bootstrap) {
      if (window.bootstrap.autofill) {
        // Either completely disable it
        window.bootstrap.autofill = null;
        
        // Or replace with safe stub functions if needed
        window.bootstrap.autofill = {
          checkPageContainsShadowDom: function() { return false; },
          flagPageDetailsUpdateIsRequired: function() { return; }
        };
      }
    }
    
    // Add CSS fix to handle Firefox autofill styling directly
    document.addEventListener('DOMContentLoaded', function() {
      const style = document.createElement('style');
      style.textContent = `
        @-moz-document url-prefix() {
          /* Additional dynamic style fixes for Firefox */
          input:-moz-autofill {
            background-color: transparent !important;
          }
        }
      `;
      document.head.appendChild(style);
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
  
  // Fix for all browsers - backdrop-filter fallback
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
})();

export default {}; // Empty export for ES modules compatibility
