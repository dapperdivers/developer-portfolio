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
 * Applies Firefox-specific fixes for Bootstrap
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
 * Immediately apply fixes for the Firefox autofill overlay and shadow DOM issues
 */
function applyFixImmediately() {
  // 1. Patch the specific shadow DOM method that's causing the error
  patchShadowDomDetection();
  
  // 2. Add CSS to disable problematic Bootstrap overlay in Firefox
  addFirefoxStyles();
  
  // 3. Override problematic methods in the global scope
  overrideProblematicMethods();
}

/**
 * Patches the shadow DOM detection method that's causing the "this is undefined" error
 */
function patchShadowDomDetection() {
  // Target window object and all frames
  [window, ...Array.from(document.querySelectorAll('iframe')).map(f => f.contentWindow)]
    .filter(Boolean)
    .forEach(win => {
      try {
        // Find and patch any bootstrap-legacy-autofill-overlay objects
        if (win.bootstrap && win.bootstrap.autofill) {
          // Safely patch the checkPageContainsShadowDom method
          const originalPrototype = Object.getPrototypeOf(win.bootstrap.autofill);
          if (originalPrototype && originalPrototype.checkPageContainsShadowDom) {
            originalPrototype.checkPageContainsShadowDom = function() {
              // Safe implementation that won't throw when 'this' is undefined
              if (!this || !this.domQueryService) return;
              
              try {
                this.domQueryService.checkPageContainsShadowDom();
                if (this.domQueryService.pageContainsShadowDomElements()) {
                  if (typeof this.flagPageDetailsUpdateIsRequired === 'function') {
                    this.flagPageDetailsUpdateIsRequired();
                  }
                }
              } catch (e) {
                console.log('Safe error handling for shadow DOM detection:', e);
              }
            };
          }
        }
      } catch (e) {
        // Ignore errors from cross-origin frames
      }
    });
}

/**
 * Adds Firefox-specific CSS fixes
 */
function addFirefoxStyles() {
  // Check if we've already added the styles
  if (document.getElementById('firefox-bootstrap-fixes')) return;
  
  const style = document.createElement('style');
  style.id = 'firefox-bootstrap-fixes';
  style.textContent = `
    /* Firefox-specific fix for Bootstrap autofill overlay */
    @-moz-document url-prefix() {
      .form-control:-moz-autofill,
      .form-control:-moz-autofill:focus {
        transition: background-color 0s ease-in-out 5000s !important;
        background-color: transparent !important;
      }
      
      input:-moz-autofill,
      textarea:-moz-autofill,
      select:-moz-autofill {
        box-shadow: 0 0 0 30px transparent inset !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Overrides problematic methods in the global scope
 */
function overrideProblematicMethods() {
  // Create a safety wrapper for any bootstrap methods
  window.addEventListener('error', function(event) {
    // Catch any "this is undefined" errors from bootstrap files
    if (
      event.filename && 
      event.filename.includes('bootstrap') && 
      event.message && 
      event.message.includes('this is undefined')
    ) {
      event.preventDefault();
      console.warn('Prevented bootstrap error:', event.message);
      return true;
    }
  }, true);
}
