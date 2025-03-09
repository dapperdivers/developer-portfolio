import React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useAnimation } from "@context/AnimationContext";
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
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} CollegeInfo component
 */
const CollegeInfo = ({ 
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  // Hover variants
  const hoverVariants = {
    hover: {
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      scale: 1.01,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className={`college-info ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      whileHover={shouldAnimate ? "hover" : ""}
      variants={shouldAnimate ? {
        ...slideUpVariants,
        ...hoverVariants
      } : {}}
    >
      {/* University name */}
      <motion.h5 
        className="college-name"
        variants={shouldAnimate ? itemVariants : {}}
      >
        {schoolName}
      </motion.h5>
      
      {/* Academic information section */}
      <motion.div 
        className="academic-info"
        variants={shouldAnimate ? containerVariants : {}}
      >
        {/* Degree */}
        <motion.div 
          className="degree-container"
          variants={shouldAnimate ? itemVariants : {}}
        >
          <span className="academic-label">Degree</span>
          <h6 className="degree-value">{degree}</h6>
        </motion.div>
        
        {/* Major */}
        <motion.div 
          className="major-container"
          variants={shouldAnimate ? itemVariants : {}}
        >
          <span className="academic-label">Major</span>
          <div className="major-value">{major}</div>
        </motion.div>
        
        {/* Minor (if provided) */}
        {minor && (
          <motion.div 
            className="minor-container"
            variants={shouldAnimate ? itemVariants : {}}
          >
            <span className="academic-label">Minor</span>
            <div className="minor-value">{minor.replace("Minor in ", "")}</div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Date chip for graduation date */}
      <motion.div variants={shouldAnimate ? itemVariants : {}}>
        <DateChip date={graduationDate} className="graduation-date-chip" />
      </motion.div>
    </motion.div>
  );
};

CollegeInfo.propTypes = {
  schoolName: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  graduationDate: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default CollegeInfo;
