import React from "react";
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { useMotionEnabled, scaleVariants } from '@utils/motion';
import './EducationIcon.css';

export interface EducationIconProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * A component displaying an education icon with styling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} EducationIcon component
 */
const EducationIcon = ({ className = "", animated = true }: EducationIconProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div 
      className={`education-icon-container ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={scaleVariants}
      whileHover={shouldAnimate ? { 
        y: -3, 
        scale: 1.05,
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
    >
      <FaGraduationCap className="education-icon" aria-hidden="true" />
    </motion.div>
  );
};

export default EducationIcon;
