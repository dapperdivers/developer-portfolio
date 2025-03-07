import React from "react";
import PropTypes from 'prop-types';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateChip from '@atoms/DateChip';
import './AcademicDetails.css';

/**
 * Composite component for displaying academic details, combining school,
 * degree, fields of study, and graduation date.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.schoolName - Name of the school or institution
 * @param {string} props.degree - Degree title (e.g., Bachelor of Science)
 * @param {string} props.major - Major field of study
 * @param {string} [props.minor] - Minor field of study (optional)
 * @param {string} props.graduationDate - Graduation date
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} AcademicDetails component
 */
const AcademicDetails = ({ 
  schoolName, 
  degree, 
  major, 
  minor, 
  graduationDate,
  className = "" 
}) => {
  return (
    <div className={`academic-details ${className}`}>
      {/* School/University Header */}
      <SchoolHeader schoolName={schoolName} />
      
      {/* Academic Information Panel */}
      <div className="academic-panel">
        {/* Degree Information */}
        <DegreeInfo degree={degree} />
        
        {/* Fields of Study (Major/Minor) */}
        <FieldsOfStudy major={major} minor={minor} />
        
        {/* Graduation Date */}
        <div className="graduation-date-container">
          <DateChip date={graduationDate} className="graduation-date-chip" />
        </div>
      </div>
    </div>
  );
};

AcademicDetails.propTypes = {
  schoolName: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  graduationDate: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default AcademicDetails;
