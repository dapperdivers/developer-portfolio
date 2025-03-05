/**
 * Firefox-specific fix for bootstrap-legacy-autofill-overlay.js errors
 */

// Execute this fix immediately when imported
(function() {
  // Only apply in Firefox browsers
  if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1) {
    console.log('Firefox detected, applying autofill fix');
    
    // Add global error handler to catch and suppress bootstrap-legacy-autofill errors
    window.addEventListener('error', function(event) {
      if (
        (event.filename && event.filename.includes('legacy-autofill')) ||
        (event.message && event.message.includes('this is undefined') && 
         event.error && event.error.stack && event.error.stack.includes('checkPageContainsShadowDom'))
      ) {
        // Prevent the error from propagating
        event.preventDefault();
        return true;
      }
    }, true);

    // This code previously dealt with bootstrap methods
    // Since we've migrated away from Bootstrap, we just add handlers
    // for any potential autofill functionality that might be present
    window.addEventListener('DOMContentLoaded', () => {
      // Handle any autofill-related issues that might appear
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('animationstart', (e) => {
          if (e.animationName === 'autofill') {
            // Handle autofill event if needed
          }
        });
      });
    });
    
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
})();

export default {}; // Empty export for ES modules compatibility
