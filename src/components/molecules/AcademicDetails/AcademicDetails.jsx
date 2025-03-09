import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
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
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} AcademicDetails component
 */
const AcademicDetails = ({ 
  schoolName, 
  degree, 
  major, 
  minor, 
  graduationDate,
  className = "",
  animated = true
}) => {
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Content variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  // Item variant for child components
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className={`academic-details ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      {/* School/University Header */}
      <SchoolHeader 
        schoolName={schoolName} 
        animated={shouldAnimate} 
      />
      
      {/* Academic Information Panel */}
      <motion.div 
        className="academic-panel"
        variants={shouldAnimate ? containerVariants : {}}
      >
        {/* Degree Information */}
        <motion.div variants={shouldAnimate ? itemVariants : {}}>
          <DegreeInfo degree={degree} animated={shouldAnimate} />
        </motion.div>
        
        {/* Fields of Study (Major/Minor) */}
        <motion.div variants={shouldAnimate ? itemVariants : {}}>
          <FieldsOfStudy major={major} minor={minor} animated={shouldAnimate} />
        </motion.div>
        
        {/* Graduation Date */}
        <motion.div 
          className="graduation-date-container"
          variants={shouldAnimate ? itemVariants : {}}
        >
          <DateChip date={graduationDate} className="graduation-date-chip" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

AcademicDetails.propTypes = {
  schoolName: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  graduationDate: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default AcademicDetails;
