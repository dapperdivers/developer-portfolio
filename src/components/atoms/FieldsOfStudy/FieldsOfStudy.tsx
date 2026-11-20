import React from "react";
import { motion } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import './FieldsOfStudy.css';

export interface FieldsOfStudyProps {
  /** Major field of study */
  major?: string;
  /** Minor field of study */
  minor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * MAJOR and MINOR fields of study, each a mono label over an Inter
 * semibold value. Either is left out when empty.
 *
 * @component
 */
const FieldsOfStudy = ({ major, minor, className = "", animated = true }: FieldsOfStudyProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={`fields-of-study ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      {major && (
        <div className="fields-of-study__field">
          <span className="field-label">Major</span>
          <div className="field-value">{major}</div>
        </div>
      )}

      {minor && (
        <div className="fields-of-study__field">
          <span className="field-label">Minor</span>
          <div className="field-value">{minor.replace("Minor in ", "")}</div>
        </div>
      )}
    </motion.div>
  );
};

export default FieldsOfStudy;
