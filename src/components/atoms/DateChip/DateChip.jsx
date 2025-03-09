import React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useAnimation } from '@context/AnimationContext';
import './DateChip.css';

/**
 * A stylized date/duration display component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - The date or duration text to display
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} DateChip component
 */
const DateChip = ({ date, className = "" }) => {
  // Get animation context values
  const { animationEnabled, fadeInVariants, shouldReduceMotion } = useAnimation();
  
  // Only animate if animations are enabled and user doesn't prefer reduced motion
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Define animation variants
  const chipVariants = {
    initial: { 
      y: 0,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
    },
    hover: { 
      y: shouldAnimate ? -2 : 0,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const glowVariants = {
    initial: { 
      opacity: 0,
      rotate: 0
    },
    hover: { 
      opacity: 0.8,
      rotate: shouldAnimate ? 360 : 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeOut" },
        rotate: { duration: 2, ease: "linear", repeat: Infinity }
      }
    }
  };
  
  return (
    <motion.div 
      className={`date-chip ${className}`}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="date-chip-inner"
        variants={chipVariants}
        initial="initial"
        whileHover="hover"
      >
        <span className="date-chip-text">{date}</span>
        <motion.div 
          className="date-chip-glow"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />
      </motion.div>
    </motion.div>
  );
};

DateChip.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default DateChip;
