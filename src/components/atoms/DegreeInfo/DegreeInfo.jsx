import React from "react";
import PropTypes from 'prop-types';
import './DegreeInfo.css';

/**
 * Component for displaying degree information
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.degree - Degree title (e.g., Bachelor of Science)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} DegreeInfo component
 */
const DegreeInfo = ({ degree, className = "" }) => {
  return (
    <div className={`degree-info ${className}`}>
      <span className="degree-label">Degree</span>
      <h4 className="degree-value">{degree}</h4>
    </div>
  );
};

DegreeInfo.propTypes = {
  degree: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default DegreeInfo;
