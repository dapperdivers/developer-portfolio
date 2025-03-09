import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { useAnimation } from '@context/AnimationContext';
import './EducationIcon.css';

/**
 * A component displaying an education icon with styling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} EducationIcon component
 */
const EducationIcon = ({ className = "", animated = true }) => {
  const { animationEnabled, scaleVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

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

EducationIcon.propTypes = {
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default EducationIcon;
