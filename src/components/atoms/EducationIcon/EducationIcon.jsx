import React from "react";
import PropTypes from 'prop-types';
import { FaGraduationCap } from 'react-icons/fa';
import './EducationIcon.css';

/**
 * A component displaying an education icon with styling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} EducationIcon component
 */
const EducationIcon = ({ className = "" }) => {
  return (
    <div className={`education-icon-container ${className}`}>
      <FaGraduationCap className="education-icon" aria-hidden="true" />
    </div>
  );
};

EducationIcon.propTypes = {
  className: PropTypes.string
};

export default EducationIcon;
