import React from "react";
import { motion } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import './DegreeInfo.css';

export interface DegreeInfoProps {
  /** Degree title (e.g., Bachelor of Science) */
  degree: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Component for displaying degree information
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.degree - Degree title (e.g., Bachelor of Science)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} DegreeInfo component
 */
const DegreeInfo = ({ degree, className = "", animated = true }: DegreeInfoProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div 
      className={`degree-info ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={slideUpVariants}
    >
      <span className="degree-label">Degree</span>
      <motion.h4 
        className="degree-value"
        whileHover={shouldAnimate ? { 
          x: 2,
          color: 'var(--color-text-bright)',
          borderLeftColor: 'var(--color-primary-light)',
          transition: { duration: 0.2 }
        } : {}}
      >
        {degree}
      </motion.h4>
    </motion.div>
  );
};

export default DegreeInfo;
