/**
 * Prop Types Fix for Production Builds
 * 
 * This module provides a safer approach to handling prop-types in production
 * by normalizing the behavior between development and production environments.
 * 
 * This approach fixes the AsyncMode error in react-is by:
 * 1. Creating a proper shim for react-is when it's being loaded
 * 2. Adding enhanced PropTypes that work reliably in production
 */

// First, apply the fix for react-is to solve the AsyncMode error
// This runs immediately when this module is imported
(function fixReactIs() {
  if (typeof window !== 'undefined') {
    try {
      // Create a patch function that will run once react-is attempts to load
      const patchScript = document.createElement('script');
      patchScript.textContent = `
        (function() {
          // Replace the original script tag
          const originalCreateElement = document.createElement;
          document.createElement = function(tagName) {
            const element = originalCreateElement.call(document, tagName);
            
            if (tagName === 'script') {
              const originalSetAttribute = element.setAttribute;
              element.setAttribute = function(name, value) {
                // If a script is loading react-is, set up to inject our patch
                if (name === 'src' && value && value.includes('react-is')) {
                  const originalOnload = element.onload;
                  element.onload = function() {
                    // Once react-is has loaded, apply our fix
                    try {
                      // Create the AsyncMode symbol if missing
                      if (typeof ReactIs !== 'undefined' && ReactIs.AsyncMode === undefined) {
                        ReactIs.AsyncMode = Symbol.for('react.async_mode');
                      }
                    } catch(e) {
                      console.warn('Error patching ReactIs:', e);
                    }
                    
                    // Call the original onload handler
                    if (originalOnload) originalOnload.call(this);
                  };
                }
                return originalSetAttribute.call(this, name, value);
              };
            }
            return element;
          };
        })();
      `;
      // Add this script as early as possible
      document.head.insertBefore(patchScript, document.head.firstChild);
    } catch (e) {
      console.warn('Could not apply react-is fix:', e);
    }
  }
})();

// Now we can safely import PropTypes
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

// Create an enhanced version of PropTypes with additional utilities
const EnhancedPropTypes = {
  ...PropTypes,
  elementType, // Add the elementType validator from prop-types-extra
  
  // Additional validators that might be useful
  nodeOrFunc: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  
  // Function to check if a component has the required props
  checkProps(props, propTypes, componentName) {
    if (process.env.NODE_ENV !== 'production') {
      for (const propName in propTypes) {
        if (Object.prototype.hasOwnProperty.call(propTypes, propName)) {
          const validator = propTypes[propName];
          const value = props[propName];
          
          // Check if the prop is required and missing
          if (validator.isRequired && (value === undefined || value === null)) {
            console.error(
              `Required prop '${propName}' was not specified in '${componentName}'.`
            );
          }
        }
      }
    }
  }
};

// Export the enhanced PropTypes
export default EnhancedPropTypes;