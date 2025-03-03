import React from 'react';
import { skipLinkStyles } from '../utils/accessibilityUtils';
import './SkipToContent.css';

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
    <a href="#main-content" className="skip-to-content" style={skipLinkStyles()}>
      Skip to main content
    </a>
  );
};

export default SkipToContent;
