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
})();

export default {}; // Empty export for ES modules compatibility
