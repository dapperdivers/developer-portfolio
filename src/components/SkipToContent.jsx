import React from 'react';


/**
 * Skip to content link component for keyboard users.
 * This component allows keyboard users to bypass navigation
 * and jump directly to the main content.
 * 
 * Place this at the very top of your App component.
 * 
 * @component
 * @returns {React.ReactElement} SkipToContent component
 * 
 * @example
 * <SkipToContent />
 */
const SkipToContent = () => {
  return (
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>
  );
};

export default SkipToContent;
