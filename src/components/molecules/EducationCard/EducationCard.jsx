import React, { memo } from "react";
import PropTypes from 'prop-types';
import Card from '@atoms/Card';
import EducationIcon from '@atoms/EducationIcon';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateChip from '@atoms/DateChip';
import CertificationBadge from '@molecules/CertificationBadge';
import './EducationCard.css';

/**
 * Enhanced education card component for displaying educational background.
 * Redesigned to integrate both educational details and certifications
 * in a single, cohesive card layout.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.education - Education data object
 * @param {string} props.education.schoolName - Name of the school or institution
 * @param {string} props.education.degree - Degree title
 * @param {string} props.education.major - Major field of study
 * @param {string} props.education.minor - Minor field of study (optional)
 * @param {string} props.education.duration - Time period of education
 * @param {Array} [props.education.certifications] - Array of certification objects
 * @param {number} [props.index=0] - Index number for staggered animations
 * @returns {React.ReactElement} EducationCard component
 */
const EducationCard = ({ education, index = 0 }) => {
  const hasCertifications = education.certifications && education.certifications.length > 0;
  
  return (
    <div className="education-card-wrapper" data-testid="education-card">
      <Card className="education-card" shadow>
        <div className="education-card-inner">
          {/* Left side - Education Icon with accent background */}
          <div className="education-card-icon-column">
            <div className="education-card-icon">
              <EducationIcon className="education-icon-large" />
            </div>
            
            {/* Certification indicator */}
            {hasCertifications && (
              <div className="certifications-indicator">
                <span className="cert-count">{education.certifications.length}</span>
                <span className="cert-label">Certifications</span>
              </div>
            )}
          </div>
          
          {/* Right side - Content Container */}
          <div className="education-content">
            {/* School/University Header */}
            <div className="education-header">
              <SchoolHeader schoolName={education.schoolName} />
            </div>
            
            {/* Academic Information Panel */}
            <div className="education-details-panel">
              {/* Degree Information */}
              <div className="degree-container">
                <DegreeInfo degree={education.degree} />
              </div>
              
              {/* Fields of Study (Major/Minor) */}
              <div className="fields-container">
                <FieldsOfStudy major={education.major} minor={education.minor} />
              </div>
              
              {/* Graduation Date */}
              <div className="graduation-date-container">
                <DateChip date={education.duration} className="graduation-date-chip" />
              </div>
            </div>
            
            {/* Always visible Certifications Panel */}
            {hasCertifications && (
              <div id="certifications-panel" className="integrated-certifications-panel">
                <div className="certifications-header">
                  <h4 className="certifications-title">Professional Certifications</h4>
                </div>
                <div className="certifications-list">
                  {education.certifications.map((cert, i) => (
                    <div className={`certification-item certification-item-${i}`} key={`cert-${i}`}>
                      <CertificationBadge 
                        name={cert.name} 
                        issuer={cert.issuer}
                        date={cert.date}
                        credentialId={cert.credentialId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    schoolName: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    minor: PropTypes.string,
    duration: PropTypes.string.isRequired,
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        issuer: PropTypes.string,
        date: PropTypes.string,
        credentialId: PropTypes.string
      })
    )
  }).isRequired,
  index: PropTypes.number
};

// Apply memoization for performance optimization
export default memo(EducationCard);
