import React from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import './SchoolHeader.css';

export interface SchoolHeaderProps {
  /** Name of the school or institution */
  schoolName: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * A simple component for displaying the school/university name
 * 
 * @component
 */
const SchoolHeader = ({ schoolName, className = "", animated = true }: SchoolHeaderProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);
  
  // Decoration line animation
  const decorationVariants: Variants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "60px", 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className={`school-header ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      <motion.h3 
        className="school-name"
        variants={shouldAnimate ? {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        } : {}}
      >
        {schoolName}
      </motion.h3>
      <motion.div 
        className="school-header-decoration"
        variants={shouldAnimate ? decorationVariants : {}}
      ></motion.div>
    </motion.div>
  );
};

export default SchoolHeader;
