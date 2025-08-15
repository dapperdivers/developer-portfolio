import React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useAnimation } from '@context/AnimationContext';
import './DateChip.css';

/**
 * A stylized date/duration display component with cybersecurity theming.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - The date or duration text to display
 * @param {string} [props.variant] - Visual variant: 'default', 'secure', 'breach', 'critical'
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} DateChip component
 */
const DateChip = ({ date, variant = 'default', className = "" }) => {
  // Get animation context values
  const { animationEnabled, fadeInVariants, prefersReducedMotion } = useAnimation();
  
  // Only animate if animations are enabled and user doesn't prefer reduced motion
  const shouldAnimate = animationEnabled && !prefersReducedMotion;
  
  // Define optimized animation variants for better performance
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const chipVariants = {
    initial: { 
      y: 0,
      scale: 1,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(100, 255, 218, 0.1)"
    },
    hover: { 
      y: shouldAnimate ? -3 : 0,
      scale: shouldAnimate ? 1.02 : 1,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4), 0 0 30px rgba(100, 255, 218, 0.2)",
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
  
  // Build className with variant support
  const chipClasses = [
    'date-chip',
    variant !== 'default' && `date-chip--${variant}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <motion.div 
      className={chipClasses}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
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
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  className: PropTypes.string
};

export default DateChip;