import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import './Skill.css';

/**
 * Skill component for displaying individual skills with icons and tooltips.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {string} props.skill.skillName - Name of the skill
 * @param {string} props.skill.fontAwesomeClassname - Iconify icon name
 * @param {number} [props.index=0] - Index for staggered animations
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.size='md'] - Size of the skill icon (sm, md, lg)
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} Skill component
 */
const Skill = ({ 
  skill, 
  index = 0, 
  className = '', 
  size = 'md', 
  animate = true 
}) => {
  // Size classes
  const sizeMap = {
    sm: 'skill-icon-sm',
    md: 'skill-icon-md',
    lg: 'skill-icon-lg'
  };
  
  const sizeClass = sizeMap[size] || sizeMap.md;
  
  // Base classes
  const baseClasses = [
    'skill-icon-wrapper',
    sizeClass,
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants
  const skillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * index,
        duration: 0.4
      }
    },
    hover: { 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    },
    tap: { 
      scale: 0.9 
    }
  };
  
  const tooltipVariants = {
    hidden: { opacity: 0, y: 5, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { delay: 0.1, duration: 0.2 }
    }
  };
  
  // Render with animation
  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        variants={skillVariants}
      >
        <div 
          className="skill-icon" 
          aria-label={skill.skillName}
          role="img"
        >
          <Icon 
            icon={skill.fontAwesomeClassname} 
            className="skill-icon-svg"
          />
          
          <motion.span 
            className="skill-tooltip"
            variants={tooltipVariants}
            initial="hidden"
            whileHover="visible"
          >
            {skill.skillName}
          </motion.span>
        </div>
      </motion.div>
    );
  }
  
  // Render without animation
  return (
    <div className={baseClasses}>
      <div 
        className="skill-icon" 
        aria-label={skill.skillName}
        role="img"
      >
        <Icon 
          icon={skill.fontAwesomeClassname} 
          className="skill-icon-svg"
        />
        <span className="skill-tooltip">
          {skill.skillName}
        </span>
      </div>
    </div>
  );
};

Skill.propTypes = {
  skill: PropTypes.shape({
    skillName: PropTypes.string.isRequired,
    fontAwesomeClassname: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  animate: PropTypes.bool
};

// Apply memoization for performance
export default memo(Skill);
