import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

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
    <div 
      className={`skill-card ${className}`} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} /* Using explicit number for tabIndex */
      role="button"
      aria-haspopup="dialog"
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
    </div>
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
