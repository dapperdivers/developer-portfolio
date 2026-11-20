import React from "react";
import { motion } from 'framer-motion';
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
 * The school or university name, as a card heading.
 *
 * @component
 */
const SchoolHeader = ({ schoolName, className = "", animated = true }: SchoolHeaderProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={`school-header ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      <h3 className="school-name">{schoolName}</h3>
    </motion.div>
  );
};

export default SchoolHeader;
