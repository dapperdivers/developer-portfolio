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
 * A DEGREE label (mono, uppercase) over the degree title.
 *
 * @component
 */
const DegreeInfo = ({ degree, className = "", animated = true }: DegreeInfoProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={`degree-info ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      <span className="degree-label">Degree</span>
      <h4 className="degree-value">{degree}</h4>
    </motion.div>
  );
};

export default DegreeInfo;
