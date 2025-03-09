import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './Progress.css';

/**
 * Custom Progress component with security-themed variants
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number|string} [props.value=0] - Current progress value (can be a number or string that can be parsed to a number)
 * @param {number|string} [props.max=100] - Maximum progress value (can be a number or string that can be parsed to a number)
 * @param {string} [props.color="primary"] - Progress bar color variant
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.barClassName=""] - Additional CSS classes for the bar itself
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {string} [props.variant=""] - Progress bar variant ("security" or "terminal")
 * @param {boolean} [props.striped=false] - Whether to apply striped styling
 * @param {boolean} [props.animated=false] - Whether to animate the progress bar
 * @param {string} [props.size=""] - Progress bar size ("thin" or "thick")
 * @returns {React.ReactElement} Progress component
 */
const Progress = ({
  value = 0,
  max = 100,
  color = "primary",
  className = "",
  barClassName = "",
  style = {},
  variant = "",
  striped = false,
  animated = false,
  size = "",
  ...rest
}) => {
  const { animationEnabled, shouldReduceMotion } = useAnimation();
  
  // Convert string values to numbers if needed and calculate width as percentage
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const numericMax = typeof max === 'string' ? parseFloat(max) : max;
  const percent = Math.round((numericValue / numericMax) * 100);
  
  // Define animation variants
  const progressVariants = {
    initial: { 
      width: '0%'
    },
    animate: { 
      width: `${percent}%`,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const stripesVariants = {
    static: {
      backgroundPosition: "1rem 0"
    },
    animated: {
      backgroundPosition: ["1rem 0", "0 0"],
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  // Construct class names
  const baseClassName = "tailwind-progress";
  const barBaseClassName = "tailwind-progress-bar";
  const colorClassName = `tailwind-progress-${color}`;
  
  const combinedClassName = [
    baseClassName,
    variant ? `tailwind-progress-${variant}` : '',
    size ? `tailwind-progress-${size}` : '',
    className
  ].filter(Boolean).join(' ');
  
  const combinedBarClassName = [
    barBaseClassName,
    colorClassName,
    striped ? 'tailwind-progress-striped' : '',
    // Remove animated class as we'll handle it with framer-motion
    barClassName
  ].filter(Boolean).join(' ');
  
  return (
    <motion.div 
      className={combinedClassName} 
      style={style}
      role="progressbar"
      aria-valuenow={numericValue}
      aria-valuemin={0} 
      aria-valuemax={numericMax}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      <motion.div 
        className={combinedBarClassName} 
        variants={progressVariants}
        initial="initial"
        animate="animate"
        // Apply stripes animation if animated is true and not reduced motion
        {...(striped && animated && animationEnabled && !shouldReduceMotion ? {
          variants: stripesVariants,
          animate: "animated",
        } : striped ? {
          variants: stripesVariants,
          animate: "static"
        } : {})}
      />
      <span className="tailwind-progress-label">
        {percent}% complete
      </span>
    </motion.div>
  );
};

Progress.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger', 'critical', 'high', 'medium', 'low']),
  className: PropTypes.string,
  barClassName: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  striped: PropTypes.bool,
  animated: PropTypes.bool,
  size: PropTypes.oneOf(['', 'thin', 'thick'])
};

export default Progress;
