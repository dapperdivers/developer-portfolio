import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './FieldsOfStudy.css';

/**
 * Component for displaying major and minor fields of study
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.major - Major field of study
 * @param {string} [props.minor] - Minor field of study (optional)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} FieldsOfStudy component
 */
const FieldsOfStudy = ({ major, minor, className = "", animated = true }) => {
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Item variants for staggered children
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Container variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className={`fields-of-study ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={slideUpVariants}
    >
      <motion.div 
        className="major-container"
        variants={shouldAnimate ? containerVariants : {}}
      >
        <motion.span 
          className="field-label"
          variants={shouldAnimate ? itemVariants : {}}
        >
          Major
        </motion.span>
        <motion.div 
          className="major-value"
          variants={shouldAnimate ? itemVariants : {}}
        >
          {major}
        </motion.div>
      </motion.div>
      
      {minor && (
        <motion.div 
          className="minor-container"
          variants={shouldAnimate ? containerVariants : {}}
        >
          <motion.span 
            className="field-label"
            variants={shouldAnimate ? itemVariants : {}}
          >
            Minor
          </motion.span>
          <motion.div 
            className="minor-value"
            variants={shouldAnimate ? itemVariants : {}}
          >
            {minor.replace("Minor in ", "")}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

FieldsOfStudy.propTypes = {
  major: PropTypes.string.isRequired,
  minor: PropTypes.string,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default FieldsOfStudy;
