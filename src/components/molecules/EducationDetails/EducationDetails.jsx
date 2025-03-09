import React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useAnimation } from "@context/AnimationContext";
import DateChip from '@atoms/DateChip';
import CertificationBadge from '@molecules/CertificationBadge';
import './EducationDetails.css';

/**
 * Enhanced component for displaying education details including 
 * degree, duration, description, and certifications.
 * Uses framer-motion for animations controlled by AnimationContext.
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
  // Get animation context values
  const { slideUpVariants, animationEnabled, animationStaggerDelay } = useAnimation();
  
  // Extract degree and major from subHeader if it follows the pattern "X in Y"
  const degreeMatch = subHeader.match(/^(.*?)\s+in\s+(.*)$/);
  const degree = degreeMatch ? degreeMatch[1] : subHeader;
  const major = degreeMatch ? degreeMatch[2] : '';
  
  // Animation variants for certifications with staggered children
  const certContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationStaggerDelay,
        delayChildren: 0.2
      }
    }
  };
  
  // Item variant for each certification badge
  const certItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div 
      className={`education-details ${className}`}
      variants={slideUpVariants}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
    >
      {/* University name */}
      <motion.h5 
        className="education-school-name"
        initial={animationEnabled ? { opacity: 0, x: -20 } : {}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {schoolName}
      </motion.h5>
      
      {/* Academic information section */}
      <motion.div 
        className="education-academic-info"
        initial={animationEnabled ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>
      
      {/* Date chip moved to bottom */}
      <motion.div
        initial={animationEnabled ? { opacity: 0, y: 10 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DateChip date={duration} className="education-date-chip" />
      </motion.div>
      
      {descBullets.length > 0 && (
        <motion.ul 
          className="education-bullets"
          initial={animationEnabled ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {descBullets.map((bullet, i) => (
            <motion.li 
              key={i} 
              className="education-bullet-item"
              initial={animationEnabled ? { opacity: 0, x: -10 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
            >
              {bullet}
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      {certifications.length > 0 && (
        <motion.div 
          className="education-certifications-container"
          initial={animationEnabled ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h6 className="certifications-title">Certifications</h6>
          <motion.div 
            className="education-certifications"
            variants={certContainerVariants}
            initial={animationEnabled ? "hidden" : "visible"}
            animate="visible"
          >
            {certifications.map((cert, i) => (
              <motion.div 
                key={`cert-${i}`}
                variants={certItemVariants}
                className="certification-badge-wrapper"
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
    </motion.div>
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
