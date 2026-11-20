import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './SecurityClassification.css';

export interface SecurityClassificationProps extends HTMLMotionProps<'div'> {
  /** Classification label text */
  label?: string;
  /** Security variant theme */
  variant?: 'default' | 'secure' | 'breach' | 'critical';
  /** Renders nothing unless true */
  expanded?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether the bars pulse */
  animated?: boolean;
}

const SecurityClassification = ({ 
  label = 'DECLASSIFIED',
  variant = 'default',
  expanded = false,
  className = '',
  animated = true,
  ...props
}: SecurityClassificationProps) => {
  const motionOn = useMotionEnabled(animated);

  const classificationClasses = [
    'security-classification',
    `security-classification--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const barVariants: Variants = {
    hidden: { opacity: 0.3, height: 16 },
    visible: { 
      opacity: [0.3, 1, 0.3], 
      height: [16, 20, 16],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!expanded) return null;

  return (
    <motion.div 
      className={classificationClasses}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      {...props}
    >
      <span className="security-classification__label">{label}</span>
      <div className="security-classification__bars">
        <motion.div 
          className="security-classification__bar security-classification__bar--1"
          variants={barVariants}
          initial="hidden"
          animate={motionOn ? "visible" : "hidden"}
          transition={{ delay: 0 }}
        />
        <motion.div 
          className="security-classification__bar security-classification__bar--2"
          variants={barVariants}
          initial="hidden"
          animate={motionOn ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        />
        <motion.div 
          className="security-classification__bar security-classification__bar--3"
          variants={barVariants}
          initial="hidden"
          animate={motionOn ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        />
      </div>
    </motion.div>
  );
};

export default SecurityClassification;