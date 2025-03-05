/**
 * Browser detection and compatibility utilities
 */

/**
 * Detects if the current browser is Firefox
 * @returns {boolean} True if Firefox
 */
export const isFirefox = () => {
  return typeof window !== 'undefined' && 
    navigator.userAgent.indexOf('Firefox') !== -1;
};

/**
 * Applies Firefox-specific fixes for form elements and autofill
 */
export const applyFirefoxFixes = () => {
  if (!isFirefox()) return;
  
  // Apply the fix as soon as possible
  applyFixImmediately();
  
  // Also when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', applyFixImmediately);
  
  // And after a delay to catch any lazy-loaded scripts
  setTimeout(applyFixImmediately, 500);
  setTimeout(applyFixImmediately, 2000);
};

/**
 * Immediately apply fixes for the Firefox autofill and form styling issues
 */
function applyFixImmediately() {
  // 1. Add CSS fixes for Firefox form elements
  addFirefoxStyles();
  
  // 2. Override any problematic methods
  overrideProblematicMethods();
}

// This function is no longer needed since we've migrated away from Bootstrap
// It's been removed to clean up the codebase

/**
 * Adds Firefox-specific CSS fixes
 */
function addFirefoxStyles() {
  // Check if we've already added the styles
  if (document.getElementById('firefox-form-fixes')) return;
  
  const style = document.createElement('style');
  style.id = 'firefox-form-fixes';
  style.textContent = `
    /* Firefox-specific fix for form autofill */
    @-moz-document url-prefix() {
      input:-moz-autofill,
      textarea:-moz-autofill,
      select:-moz-autofill {
        box-shadow: 0 0 0 30px transparent inset !important;
        transition: background-color 0s ease-in-out 5000s !important;
        background-color: transparent !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Overrides problematic methods in the global scope
 */
function overrideProblematicMethods() {
  // Create a safety wrapper for autofill and form related errors
  window.addEventListener('error', function(event) {
    // Catch any "this is undefined" errors from autofill-related scripts
    if (
      event.message && 
      event.message.includes('this is undefined') &&
      event.error && 
      event.error.stack && 
      (event.error.stack.includes('autofill') || event.error.stack.includes('form'))
    ) {
      event.preventDefault();
      console.warn('Prevented form-related error:', event.message);
      return true;
    }
  }, true);
}
