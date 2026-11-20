import React from 'react';
import { motion, HTMLMotionProps, MotionStyle, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './Progress.css';

export interface ProgressProps extends Omit<HTMLMotionProps<'div'>, 'color'> {
  /** Current progress value (a number, or a string that parses to one) */
  value?: number | string;
  /** Maximum progress value (a number, or a string that parses to one) */
  max?: number | string;
  /** Progress bar color variant */
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'critical' | 'high' | 'medium' | 'low';
  /** Additional CSS classes */
  className?: string;
  /** Additional CSS classes for the bar itself */
  barClassName?: string;
  /** Additional inline styles */
  style?: MotionStyle;
  /** Progress bar variant */
  variant?: '' | 'security' | 'terminal';
  /** Whether to apply striped styling */
  striped?: boolean;
  /** Whether to animate the progress bar */
  animated?: boolean;
  /** Progress bar size */
  size?: '' | 'thin' | 'thick';
}

/**
 * Custom Progress component with security-themed variants
 * 
 * @component
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
}: ProgressProps) => {
  const stripesMoving = useMotionEnabled(animated);
  
  // Convert string values to numbers if needed and calculate width as percentage
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const numericMax = typeof max === 'string' ? parseFloat(max) : max;
  const percent = Math.round((numericValue / numericMax) * 100);
  
  // Define animation variants
  const progressVariants: Variants = {
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
  
  const stripesVariants: Variants = {
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
        {...(striped && stripesMoving ? {
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

export default Progress;
