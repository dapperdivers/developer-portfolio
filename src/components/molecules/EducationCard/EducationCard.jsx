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
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import './EducationCard.css';

/**
 * Compact education card component for displaying educational background.
 * Optimized for space efficiency while maintaining readability and
 * integrating both educational details and certifications in a single layout.
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
 * @returns {React.ReactElement} Compact EducationCard component
 */
const EducationCard = ({ education, index = 0 }) => {
  const hasCertifications = education.certifications && education.certifications.length > 0;
  const { animationEnabled, slideUpVariants, animationStaggerDelay } = useAnimation();
  
  // Optimized card wrapper variants for compact design
  const cardWrapperVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1.275],
        delay: animationStaggerDelay * index
      }
    }
  };
  
  // Simplified hover variants for better performance
  const cardHoverVariants = {
    initial: { boxShadow: 'var(--shadow-md)' },
    hover: { 
      boxShadow: 'var(--shadow-lg)',
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };
  
  // Consolidated icon animation
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };
  
  // Simplified certification list variants
  const certListVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const certItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  return (
    <motion.div 
      className="education-card-wrapper education-card-wrapper--compact" 
      data-testid="education-card"
      variants={animationEnabled ? cardWrapperVariants : null}
      initial="hidden"
      animate="visible"
    >
      <Card className="education-card education-card--compact" shadow>
        <motion.div 
          className="education-card-inner education-card-inner--compact"
          variants={animationEnabled ? cardHoverVariants : null}
          initial="initial"
          whileHover="hover"
        >
          {/* Compact Left side - Education Icon */}
          <div className="education-card-icon-column education-card-icon-column--compact">
            <motion.div 
              className="education-card-icon education-card-icon--compact"
              variants={animationEnabled ? iconVariants : null}
              initial="initial"
              whileHover="hover"
            >
              <EducationIcon className="education-icon-compact" />
            </motion.div>
            
            {/* Compact Certification indicator */}
            {hasCertifications && (
              <div className="certifications-indicator certifications-indicator--compact">
                <span className="cert-count cert-count--compact">{education.certifications.length}</span>
                <span className="cert-label cert-label--compact">Certs</span>
              </div>
            )}
          </div>
          
          {/* Compact Right side - Content Container */}
          <div className="education-content education-content--compact">
            {/* Inline School and Date Header */}
            <div className="education-header education-header--compact">
              <div className="education-header-content">
                <SchoolHeader schoolName={education.schoolName} className="school-header--compact" />
                <DateChip date={education.duration} className="graduation-date-chip graduation-date-chip--compact" />
              </div>
            </div>
            
            {/* Compact Academic Information Panel */}
            <div className="education-details-panel education-details-panel--compact">
              {/* Inline Degree and Fields */}
              <div className="academic-info-row">
                <div className="degree-container degree-container--compact">
                  <DegreeInfo degree={education.degree} className="degree-info--compact" />
                </div>
                <div className="fields-container fields-container--compact">
                  <FieldsOfStudy major={education.major} minor={education.minor} className="fields-of-study--compact" />
                </div>
              </div>
            </div>
            
            {/* Compact Certifications Panel */}
            {hasCertifications && (
              <motion.div 
                className="integrated-certifications-panel integrated-certifications-panel--compact"
                variants={animationEnabled ? slideUpVariants : null}
                initial="hidden"
                animate="visible"
              >
                <div className="certifications-header certifications-header--compact">
                  <h5 className="certifications-title certifications-title--compact">Certifications</h5>
                </div>
                <motion.div 
                  className="certifications-list certifications-list--compact"
                  variants={animationEnabled ? certListVariants : null}
                  initial="hidden"
                  animate="visible"
                >
                  {education.certifications.map((cert, i) => (
                    <motion.div 
                      className="certification-item certification-item--compact" 
                      key={`cert-${i}`}
                      variants={animationEnabled ? certItemVariants : null}
                    >
                      <CertificationBadge 
                        name={cert.name} 
                        issuer={cert.issuer}
                        date={cert.date}
                        credentialId={cert.credentialId}
                        className="certification-badge--compact"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </Card>
    </motion.div>
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