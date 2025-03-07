import React from "react";
import PropTypes from 'prop-types';
import './DateChip.css';

/**
 * A stylized date/duration display component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - The date or duration text to display
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} DateChip component
 */
const DateChip = ({ date, className = "" }) => {
  return (
    <div className={`date-chip ${className}`}>
      <div className="date-chip-inner">
        <span className="date-chip-text">{date}</span>
        <div className="date-chip-glow"></div>
      </div>
    </div>
  );
};

DateChip.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default DateChip;
