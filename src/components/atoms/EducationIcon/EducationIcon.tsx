import React from "react";
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useMotionEnabled, scaleVariants } from '@utils/motion';
import './EducationIcon.css';

export interface EducationIconProps {
  /** Glyph to show; defaults to the graduation cap */
  icon?: IconType;
  /** Glyph colour; defaults to the brand cyan */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * An education glyph in an inset tile (the same surface as the other chips).
 *
 * @component
 */
const EducationIcon = ({ icon: Icon = FaGraduationCap, color, className = "", animated = true }: EducationIconProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={`education-icon-container ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? scaleVariants : {}}
    >
      <Icon className="education-icon" style={color ? { color } : undefined} aria-hidden="true" />
    </motion.div>
  );
};

export default EducationIcon;
