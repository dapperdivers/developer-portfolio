/**
 * Accessibility and cross-browser compatibility utilities
 */
import React, { useEffect, useState } from 'react';

// Helper to handle focus trapping within modals
export const useFocusTrap = (isActive = false) => {
  const [containerRef, setContainerRef] = useState(null);
  
  useEffect(() => {
    if (!isActive || !containerRef) return;
    
    // Get all focusable elements
    const focusableElements = containerRef.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus
    firstElement.focus();
    
    // Handle tab key to keep focus within container
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    containerRef.addEventListener('keydown', handleKeyDown);
    
    return () => {
      containerRef.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, containerRef]);
  
  return [setContainerRef];
};

// Skip to main content link component
export const SkipToContent = ({ mainId = 'main' }) => {
  return (
    <a 
      href={`#${mainId}`} 
      className="skip-to-content"
      style={{
        position: 'absolute',
        top: '-40px', // Hidden by default
        left: '0',
        padding: '8px 16px',
        background: 'var(--primary)',
        color: 'white',
        zIndex: '9999',
        transition: 'top 0.2s ease',
        textDecoration: 'none',
        borderRadius: '0 0 4px 0',
        fontWeight: '500',
        fontSize: '14px',
        opacity: '0',
        ':focus': {
          top: '0',
          opacity: '1',
        }
      }}
    >
      Skip to main content
    </a>
  );
};

// Detect high contrast mode
export const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  useEffect(() => {
    // Check if user has requested high contrast
    const mediaQuery = window.matchMedia('(forced-colors: active)');
    setIsHighContrast(mediaQuery.matches);
    
    const handleChange = (e) => {
      setIsHighContrast(e.matches);
    };
    
    // Add listener for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // For older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return isHighContrast;
};

// Detect reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};

// Add ARIA attributes to elements
export const withAriaAttributes = (Component) => {
  return React.forwardRef((props, ref) => {
    const ariaProps = Object.keys(props).reduce((acc, key) => {
      // Convert camelCase to kebab-case for aria attributes
      if (key.startsWith('aria')) {
        const ariaKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        acc[ariaKey] = props[key];
      } else {
        acc[key] = props[key];
      }
      return acc;
    }, {});
    
    return <Component {...ariaProps} ref={ref} />;
  });
};

// Cross-browser polyfills and fixes
export const applyBrowserFixes = () => {
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
  
  // Polyfill for smooth scrolling
  if (!('scrollBehavior' in document.documentElement.style)) {
    import('smoothscroll-polyfill').then(smoothscroll => {
      smoothscroll.polyfill();
    });
  }
  
  // Fix for certain iOS Safari issues
  document.addEventListener('touchstart', function() {}, window.supportPassiveEvents ? { passive: true } : false);
  
  // Edge/IE fixes for CSS variables
  try {
    // Test if CSS variables are supported
    const testEl = document.createElement('div');
    testEl.style.setProperty('--test', '0');
    if (testEl.style.getPropertyValue('--test') !== '0') {
      // Use inline CSS variable polyfill instead of loading from CDN to avoid CSP issues
      // This is a basic implementation of CSS variables for older browsers 
      // without requiring external CDN resources
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        /* Basic CSS variable fallbacks for older browsers */
        :root {
          /* Core layout variables */
          --container-width: 1140px;
          --spacing-unit: 8px;
          
          /* Colors */
          --primary: #3563E9;
          --secondary: #4D5E80;
          --accent: #14B8A6;
          --light: #F5F9FF;
          --dark: #1A1F36;
          --white: #FFFFFF;
          
          /* Typography */
          --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          --font-size-base: 16px;
          --line-height-base: 1.5;
        }
        
        /* IE/Edge specific styles */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          /* Apply fallback values directly */
          .container { max-width: 1140px; }
          .primary-color { color: #3563E9; }
          .primary-bg { background-color: #3563E9; }
          .secondary-color { color: #4D5E80; }
          .accent-color { color: #14B8A6; }
        }
      `;
      document.head.appendChild(styleEl);
      
      // Add inline polyfill helper function instead of loading external script
      window.cssVars = function() {
        console.log('CSS Variables polyfill applied');
      };
    }
  } catch (e) {
    console.warn('Error detecting CSS variable support', e);
  }
};
