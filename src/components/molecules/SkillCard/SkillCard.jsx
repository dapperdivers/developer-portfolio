import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import Skill from '@atoms/Skill';
import './SkillCard.css';

/**
 * SkillCard component for displaying individual skills with icon, name, and description.
 * Supports expandable view for detailed skill information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {number} props.index - Index for animation staggering
 * @param {boolean} props.reducedMotion - Whether to use simplified animations for performance
 * @param {Function} props.onClick - Click handler when skill card is selected
 * @param {string} props.className - Additional CSS class
 * @returns {React.ReactElement} SkillCard component
 */
const SkillCard = ({ 
  skill, 
  index = 0, 
  reducedMotion = false,
  onClick,
  className = '' // Default to empty string for optional className
}) => {
  // Get animation settings from context
  const { animationEnabled, getAnimationDelay, slideUpVariants } = useAnimation();
  
  // Determine if we should animate
  const shouldAnimate = animationEnabled && !reducedMotion;
  
  // Animation variants
  const cardVariants = {
    ...slideUpVariants,
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: '0 0 15px rgba(var(--color-cyan-rgb), 0.4)',
      borderColor: 'var(--color-cyan)',
      transition: { 
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: { 
        duration: 0.1
      }
    }
  };

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(skill);
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <motion.div 
      className={`skill-card ${className}`} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? "visible" : false}
      whileHover={shouldAnimate ? "hover" : false}
      whileTap={shouldAnimate ? "tap" : false}
      variants={cardVariants}
      {...getAnimationDelay(index)}
    >
      <div className="skill-card-icon">
        <Skill 
          skill={skill}
          index={index}
          size="md"
          variant="security"
          reducedMotion={reducedMotion}
        />
      </div>
      <h4 className="skill-card-name">{skill.skillName}</h4>
      <p className="skill-card-desc">{skill.description}</p>
      <span className="skill-card-read-more" aria-hidden="true">+</span>
    </motion.div>
  );
};

SkillCard.propTypes = {
  /** Skill data object */
  skill: PropTypes.shape({
    /** Name of the skill */
    skillName: PropTypes.string.isRequired,
    /** Icon name for the skill */
    iconName: PropTypes.string,
    /** Description of the skill */
    description: PropTypes.string,
    /** Security domain category */
    securityDomain: PropTypes.string,
    /** Skill proficiency level (1-5) */
    level: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }).isRequired,
  /** Index for staggered animations */
  index: PropTypes.number,
  /** Whether to use reduced animations for performance */
  reducedMotion: PropTypes.bool,
  /** Click handler function */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string
};

// Apply memoization for performance
export default memo(SkillCard);
