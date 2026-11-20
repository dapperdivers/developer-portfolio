import React from "react";
import { motion, Variants } from "framer-motion";
import { useMotionEnabled } from '@utils/motion';
import './DateChip.css';

export interface DateChipProps {
  /** The date or duration text to display */
  date: string;
  /** Visual variant */
  variant?: 'default' | 'secure' | 'breach' | 'critical';
  /** Additional CSS classes */
  className?: string;
  /** Whether the entrance fade is enabled */
  animated?: boolean;
}

/**
 * A date or duration chip from the shared chip family.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - The date or duration text to display
 * @param {string} [props.variant] - Visual variant: 'default', 'secure', 'breach', 'critical'
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether the entrance fade is enabled
 * @returns {React.ReactElement} DateChip component
 */
const DateChip = ({ date, variant = 'default', className = "", animated = true }: DateChipProps) => {
  // Only animate if enabled and the user doesn't prefer reduced motion
  const shouldAnimate = useMotionEnabled(animated);
  
  // Define optimized animation variants for better performance
  const containerVariants: Variants = {
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
      initial={shouldAnimate ? 'hidden' : false}
      animate="visible"
    >
      <div className="date-chip-inner">
        <span className="date-chip-text">{date}</span>
      </div>
    </motion.div>
  );
};

export default DateChip;