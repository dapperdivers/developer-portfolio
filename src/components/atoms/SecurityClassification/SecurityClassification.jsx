import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './SecurityClassification.css';

const SecurityClassification = ({ 
  label = 'DECLASSIFIED',
  variant = 'default',
  expanded = false,
  className = '',
  ...props
}) => {
  const { animationEnabled } = useAnimation();

  const classificationClasses = [
    'security-classification',
    `security-classification--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const barVariants = {
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
          animate={animationEnabled ? "visible" : "hidden"}
          transition={{ delay: 0 }}
        />
        <motion.div 
          className="security-classification__bar security-classification__bar--2"
          variants={barVariants}
          initial="hidden"
          animate={animationEnabled ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        />
        <motion.div 
          className="security-classification__bar security-classification__bar--3"
          variants={barVariants}
          initial="hidden"
          animate={animationEnabled ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        />
      </div>
    </motion.div>
  );
};

SecurityClassification.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default SecurityClassification;