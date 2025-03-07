import React from "react";
import PropTypes from 'prop-types';
import DateChip from '@atoms/DateChip';
import CertificationBadge from '@molecules/CertificationBadge';
import './EducationDetails.css';

/**
 * Enhanced component for displaying education details including 
 * degree, duration, description, and certifications.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.schoolName - Name of the school or institution
 * @param {string} props.subHeader - Degree or certification title
 * @param {string} props.duration - Time period of education
 * @param {string} [props.desc] - Description or details
 * @param {Array} [props.descBullets] - Array of bullet points for additional details
 * @param {Array} [props.certifications] - Array of certification objects
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} EducationDetails component
 */
const EducationDetails = ({ 
  schoolName, 
  subHeader, 
  duration, 
  desc, 
  descBullets = [], 
  certifications = [],
  className = "" 
}) => {
  // Extract degree and major from subHeader if it follows the pattern "X in Y"
  const degreeMatch = subHeader.match(/^(.*?)\s+in\s+(.*)$/);
  const degree = degreeMatch ? degreeMatch[1] : subHeader;
  const major = degreeMatch ? degreeMatch[2] : '';
  
  return (
    <div className={`education-details ${className}`}>
      {/* University name */}
      <h5 className="education-school-name">
        {schoolName}
      </h5>
      
      {/* Academic information section */}
      <div className="education-academic-info">
        {/* Degree */}
        <div className="education-degree-container">
          <span className="education-label">Degree</span>
          <h6 className="education-degree">{degree}</h6>
        </div>
        
        {/* Major */}
        {major && (
          <div className="education-major-container">
            <span className="education-label">Major</span>
            <div className="education-major-value">{major}</div>
          </div>
        )}
        
        {/* Minor */}
        {desc && (
          <div className="education-minor-container">
            <span className="education-label">Minor</span>
            <div className="education-minor-value">{desc.replace("Minor in ", "")}</div>
          </div>
        )}
      </div>
      
      {/* Date chip moved to bottom */}
      <DateChip date={duration} className="education-date-chip" />
      
      {descBullets.length > 0 && (
        <ul className="education-bullets">
          {descBullets.map((bullet, i) => (
            <li key={i} className="education-bullet-item">
              {bullet}
            </li>
          ))}
        </ul>
      )}
      
      {certifications.length > 0 && (
        <div className="education-certifications-container">
          <h6 className="certifications-title">Certifications</h6>
          <div className="education-certifications">
            {certifications.map((cert, i) => (
              <CertificationBadge 
                key={`cert-${i}`}
                name={cert.name} 
                issuer={cert.issuer}
                date={cert.date}
                credentialId={cert.credentialId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

EducationDetails.propTypes = {
  schoolName: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  desc: PropTypes.string,
  descBullets: PropTypes.arrayOf(PropTypes.string),
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      issuer: PropTypes.string,
      date: PropTypes.string,
      iconName: PropTypes.string
    })
  ),
  className: PropTypes.string
};

export default EducationDetails;
