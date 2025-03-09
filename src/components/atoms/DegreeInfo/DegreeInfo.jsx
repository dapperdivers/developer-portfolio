import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './DegreeInfo.css';

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
const DegreeInfo = ({ degree, className = "", animated = true }) => {
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

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

DegreeInfo.propTypes = {
  degree: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default DegreeInfo;
