import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './ExperienceToggle.css';

const ExperienceToggle = ({ 
  expanded = false, 
  onClick,
  variant = 'default',
  className = '',
  ...props
}) => {
  const { animationEnabled } = useAnimation();

  const toggleClasses = [
    'experience-toggle',
    `experience-toggle--${variant}`,
    expanded && 'experience-toggle--expanded',
    className
  ].filter(Boolean).join(' ');

  const glowVariants = {
    collapsed: {
      opacity: 0,
      scale: 1
    },
    expanded: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={toggleClasses}
      onClick={onClick}
      whileHover={animationEnabled ? { scale: 1.1 } : {}}
      whileTap={animationEnabled ? { scale: 0.9 } : {}}
      {...props}
    >
      <motion.div
        className="experience-toggle__icon"
        animate={animationEnabled ? { rotate: expanded ? 180 : 0 } : {}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="experience-toggle__chevron">⌄</span>
      </motion.div>
      
      <motion.div 
        className="experience-toggle__glow"
        variants={glowVariants}
        animate={expanded ? "expanded" : "collapsed"}
      />
    </motion.div>
  );
};

ExperienceToggle.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  className: PropTypes.string,
};

export default ExperienceToggle;