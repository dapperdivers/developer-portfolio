import React from "react";
import PropTypes from 'prop-types';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './FeedbackQuote.css';

/**
 * Component for displaying a testimonial quote with quotation marks.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The quote text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} FeedbackQuote component
 */
const FeedbackQuote = ({ text, className = "" }) => {
  return (
    <div className={`relative flex-grow mb-5 feedback-quote ${className}`}>
      <FaQuoteLeft 
        className="text-text-muted text-lg absolute top-0 left-0 quote-icon" 
        aria-hidden="true" 
      />
      <p 
        className="pl-7 pr-7 text-text italic text-sm leading-relaxed relative border-l border-primary quote-content" 
        tabIndex={0}
      >
        {text}
      </p>
      <FaQuoteRight 
        className="text-text-muted text-lg absolute bottom-0 right-0 quote-icon" 
        aria-hidden="true" 
      />
    </div>
  );
};

FeedbackQuote.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FeedbackQuote;
