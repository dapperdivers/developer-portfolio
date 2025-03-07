import React from "react";
import PropTypes from 'prop-types';
import './FieldsOfStudy.css';

/**
 * Component for displaying major and minor fields of study
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.major - Major field of study
 * @param {string} [props.minor] - Minor field of study (optional)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} FieldsOfStudy component
 */
const FieldsOfStudy = ({ major, minor, className = "" }) => {
  return (
    <div className={`fields-of-study ${className}`}>
      <div className="major-container">
        <span className="field-label">Major</span>
        <div className="major-value">{major}</div>
      </div>
      
      {minor && (
        <div className="minor-container">
          <span className="field-label">Minor</span>
          <div className="minor-value">{minor.replace("Minor in ", "")}</div>
        </div>
      )}
    </div>
  );
};

FieldsOfStudy.propTypes = {
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  className: PropTypes.string
};

export default FieldsOfStudy;
