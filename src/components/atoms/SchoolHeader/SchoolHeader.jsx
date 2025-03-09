import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './SchoolHeader.css';

/**
 * A simple component for displaying the school/university name
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.schoolName - Name of the school or institution
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} SchoolHeader component
 */
const SchoolHeader = ({ schoolName, className = "", animated = true }) => {
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Decoration line animation
  const decorationVariants = {
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

SchoolHeader.propTypes = {
  schoolName: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default SchoolHeader;
