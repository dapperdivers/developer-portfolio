import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import './Skill.css';

/**
 * Skill component for displaying individual skills with icons and tooltips.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {string} props.skill.skillName - Name of the skill
 * @param {string} props.skill.iconName - Iconify icon name
 * @param {number} [props.index=0] - Index for staggered animations
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.size='md'] - Size of the skill icon (sm, md, lg)
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {boolean} [props.reducedMotion=false] - Whether to use simplified animations for performance
 * @returns {React.ReactElement} Skill component
 */
const Skill = ({ 
  skill, 
  index = 0, 
  className = '', 
  size = 'md', 
  animate = true,
  reducedMotion = false
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
    reducedMotion ? 'reduced-motion' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants - optimized for performance when needed
  const skillVariants = reducedMotion ? {
    // Simplified animations for low-end devices
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.05 * index,
        duration: 0.2
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95 
    }
  } : {
    // Full animations for capable devices
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
  
  // Tooltip animations - also optimized for performance
  const tooltipVariants = reducedMotion ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.1 }
    }
  } : {
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
          {(skill.iconName || skill.fontAwesomeClassname) && (
            <Icon 
              icon={skill.iconName || skill.fontAwesomeClassname} 
              className="skill-icon-svg" 
              onError={(err) => console.warn(`Icon failed to load: ${skill.iconName || skill.fontAwesomeClassname}`, err)}
            />
          )}
          
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
        {(skill.iconName || skill.fontAwesomeClassname) && (
          <Icon 
            icon={skill.iconName || skill.fontAwesomeClassname} 
            className="skill-icon-svg" 
            onError={(err) => console.warn(`Icon failed to load: ${skill.iconName || skill.fontAwesomeClassname}`, err)}
          />
        )}
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
    iconName: PropTypes.string,
    fontAwesomeClassname: PropTypes.string // Kept for backward compatibility
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  animate: PropTypes.bool,
  reducedMotion: PropTypes.bool
};

// Apply memoization for performance
export default memo(Skill);
