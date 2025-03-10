import React, { memo } from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from '@atoms/Card';
import EducationIcon from '@atoms/EducationIcon';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateChip from '@atoms/DateChip';
import CertificationBadge from '@molecules/CertificationBadge';
import { useAnimation } from '@context/AnimationContext';
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
  const { 
    animationEnabled, 
    getAnimationDelay,
    slideUpVariants 
  } = useAnimation();
  
  // Card inner hover variants
  const cardInnerVariants = {
    initial: { boxShadow: 'var(--shadow-md)' },
    hover: { 
      boxShadow: 'var(--shadow-lg)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  // Icon variants
  const iconVariants = {
    initial: { 
      scale: 1, 
      y: 0, 
      backgroundColor: 'rgba(100, 255, 218, 0.08)' 
    },
    hover: { 
      scale: 1.1, 
      y: -5, 
      backgroundColor: 'rgba(100, 255, 218, 0.12)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  // Certifications indicator variants
  const certIndicatorVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  // Certification item variants with staggered children
  const certListVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const certItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  return (
    <Card
      className="education-card"
      shadow
      animation={{
        ...slideUpVariants,
        ...getAnimationDelay(index)
      }}
      animated={animationEnabled}
    >
      <motion.div 
        className="education-card-inner"
        variants={animationEnabled ? cardInnerVariants : null}
        initial="initial"
        whileHover="hover"
      >
        {/* Left side - Education Icon with accent background */}
        <div className="education-card-icon-column">
          <motion.div 
            className="education-card-icon"
            variants={animationEnabled ? iconVariants : null}
            initial="initial"
            whileHover="hover"
          >
            <EducationIcon className="education-icon-large" />
          </motion.div>
          
          {/* Certification indicator */}
          {hasCertifications && (
            <motion.div 
              className="certifications-indicator"
              variants={animationEnabled ? certIndicatorVariants : null}
              initial="initial"
              whileHover="hover"
            >
              <span className="cert-count">{education.certifications.length}</span>
              <span className="cert-label">Certifications</span>
            </motion.div>
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
            <motion.div 
              id="certifications-panel" 
              className="integrated-certifications-panel"
              variants={animationEnabled ? slideUpVariants : null}
              initial="hidden"
              animate="visible"
            >
              <div className="certifications-header">
                <h4 className="certifications-title">Professional Certifications</h4>
              </div>
              <motion.div 
                className="certifications-list"
                variants={animationEnabled ? certListVariants : null}
                initial="hidden"
                animate="visible"
              >
                {education.certifications.map((cert, i) => (
                  <motion.div 
                    className={`certification-item certification-item-${i}`} 
                    key={`cert-${i}`}
                    variants={animationEnabled ? certItemVariants : null}
                    whileHover="hover"
                  >
                    <CertificationBadge 
                      name={cert.name} 
                      issuer={cert.issuer}
                      date={cert.date}
                      credentialId={cert.credentialId}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Card>
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
