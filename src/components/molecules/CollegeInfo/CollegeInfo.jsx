import React from "react";
import PropTypes from 'prop-types';
import DateChip from '@atoms/DateChip';
import './CollegeInfo.css';

/**
 * College information component that displays university name, academic details,
 * and graduation date.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.schoolName - Name of the school or institution
 * @param {string} props.degree - Degree title (e.g., Bachelor of Science)
 * @param {string} props.major - Major field of study
 * @param {string} [props.minor] - Minor field of study
 * @param {string} props.graduationDate - Graduation date
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} CollegeInfo component
 */
const CollegeInfo = ({ 
  schoolName, 
  degree, 
  major, 
  minor, 
  graduationDate,
  className = "" 
}) => {
  return (
    <div className={`college-info ${className}`}>
      {/* University name */}
      <h5 className="college-name">
        {schoolName}
      </h5>
      
      {/* Academic information section */}
      <div className="academic-info">
        {/* Degree */}
        <div className="degree-container">
          <span className="academic-label">Degree</span>
          <h6 className="degree-value">{degree}</h6>
        </div>
        
        {/* Major */}
        <div className="major-container">
          <span className="academic-label">Major</span>
          <div className="major-value">{major}</div>
        </div>
        
        {/* Minor (if provided) */}
        {minor && (
          <div className="minor-container">
            <span className="academic-label">Minor</span>
            <div className="minor-value">{minor.replace("Minor in ", "")}</div>
          </div>
        )}
      </div>
      
      {/* Date chip for graduation date */}
      <DateChip date={graduationDate} className="graduation-date-chip" />
    </div>
  );
};

CollegeInfo.propTypes = {
  schoolName: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  graduationDate: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CollegeInfo;
