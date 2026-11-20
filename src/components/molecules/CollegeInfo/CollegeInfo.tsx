import React from "react";
import { motion, Variants } from "framer-motion";
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import DateChip from '@atoms/DateChip';
import './CollegeInfo.css';

export interface CollegeInfoProps {
  /** Name of the school or institution */
  schoolName: string;
  /** Degree title (e.g., Bachelor of Science) */
  degree: string;
  /** Major field of study */
  major: string;
  /** Minor field of study */
  minor?: string;
  /** Graduation date */
  graduationDate: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * College information component that displays university name, academic details,
 * and graduation date.
 * 
 * @component
 */
const CollegeInfo = ({ 
  schoolName, 
  degree, 
  major, 
  minor, 
  graduationDate,
  className = "",
  animated = true
}: CollegeInfoProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  // Hover variants
  const hoverVariants: Variants = {
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
        <DateChip date={graduationDate} className="graduation-date-chip" animated={shouldAnimate} />
      </motion.div>
    </motion.div>
  );
};

export default CollegeInfo;
