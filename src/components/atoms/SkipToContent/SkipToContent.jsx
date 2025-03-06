import React from 'react';
import PropTypes from 'prop-types';
import './SkipToContent.css';

/**
 * Skip to content link component for keyboard users.
 * This component allows keyboard users to bypass navigation
 * and jump directly to the main content.
 * Updated with security-themed variants.
 * 
 * Place this at the very top of your App component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.mainId='main-content'] - The ID of the main content element
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @returns {React.ReactElement} SkipToContent component
 * 
 * @example
 * <SkipToContent mainId="main-content" variant="security" />
 */
const SkipToContent = ({ mainId = 'main-content', variant = '' }) => {
  // Combine class names
  const className = [
    'skip-to-content',
    variant ? `skip-to-content-${variant}` : ''
  ].filter(Boolean).join(' ');

  return (
    <a href={`#${mainId}`} className={className}>
      Skip to main content
    </a>
  );
};

SkipToContent.propTypes = {
  mainId: PropTypes.string,
  variant: PropTypes.oneOf(['', 'security', 'terminal'])
};

// Note: defaultProps is deprecated, we're using default parameters instead

export default SkipToContent;
