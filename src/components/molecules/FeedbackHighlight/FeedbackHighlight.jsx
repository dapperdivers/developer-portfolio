import React from "react";
import PropTypes from 'prop-types';
import './FeedbackHighlight.css';

/**
 * Component for displaying a highlighted portion of a testimonial.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The highlighted text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} FeedbackHighlight component
 */
const FeedbackHighlight = ({ text, className = "" }) => {
  if (!text) return null;
  
  return (
    <div className={`feedback-highlight ${className}`}>
      <div className="highlight-container">
        <p className="highlight-text">
          &ldquo;{text}&rdquo;
        </p>
        <div className="highlight-decoration"></div>
      </div>
    </div>
  );
};

FeedbackHighlight.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default FeedbackHighlight;
