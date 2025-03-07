import React from "react";
import PropTypes from 'prop-types';
import './SchoolHeader.css';

/**
 * A simple component for displaying the school/university name
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.schoolName - Name of the school or institution
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} SchoolHeader component
 */
const SchoolHeader = ({ schoolName, className = "" }) => {
  return (
    <div className={`school-header ${className}`}>
      <h3 className="school-name">{schoolName}</h3>
      <div className="school-header-decoration"></div>
    </div>
  );
};

SchoolHeader.propTypes = {
  schoolName: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default SchoolHeader;
