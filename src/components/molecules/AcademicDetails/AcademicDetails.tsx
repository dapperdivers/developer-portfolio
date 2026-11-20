import React from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateChip from '@atoms/DateChip';
import './AcademicDetails.css';

export interface AcademicDetailsProps {
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
 * Composite component for displaying academic details, combining school,
 * degree, fields of study, and graduation date.
 * 
 * @component
 */
const AcademicDetails = ({ 
  schoolName, 
  degree, 
  major, 
  minor, 
  graduationDate,
  className = "",
  animated = true
}: AcademicDetailsProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);
  
  // Content variants for staggered animations
  const containerVariants: Variants = {
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
  const itemVariants: Variants = {
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
          <DateChip date={graduationDate} className="graduation-date-chip" animated={shouldAnimate} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AcademicDetails;
