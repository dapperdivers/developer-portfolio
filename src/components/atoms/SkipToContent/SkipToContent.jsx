import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skip to content link component for keyboard users.
 * This component allows keyboard users to bypass navigation
 * and jump directly to the main content.
 * 
 * Place this at the very top of your App component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.mainId - The ID of the main content element
 * @returns {React.ReactElement} SkipToContent component
 * 
 * @example
 * <SkipToContent mainId="main-content" />
 */
const SkipToContent = ({ mainId = 'main-content' }) => {
  return (
    <a href={`#${mainId}`} className="skip-to-content">
      Skip to main content
    </a>
  );
};

SkipToContent.propTypes = {
  mainId: PropTypes.string
};

SkipToContent.defaultProps = {
  mainId: 'main-content'
};

export default SkipToContent;
