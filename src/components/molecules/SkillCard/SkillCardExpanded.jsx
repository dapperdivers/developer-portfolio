import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

import Skill from '@atoms/Skill';
import './SkillCard.css';

/**
 * SkillCardExpanded component for displaying detailed information about a skill in a modal dialog.
 * Used when a SkillCard is clicked to show the full details.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {Function} props.onClose - Handler to close the expanded view
 * @param {Object} props.animationVariants - Animation variants for the component
 * @returns {React.ReactElement} SkillCardExpanded component
 */
const SkillCardExpanded = ({ skill, onClose, animationVariants }) => {
  // Generate level dots for the expanded skill card
  const renderLevelDots = (level) => {
    const dots = [];
    const maxLevel = 5;
    
    for (let i = 1; i <= maxLevel; i++) {
      dots.push(
        <div 
          key={i} 
          className={`skill-level-dot ${i <= level ? 'active' : ''}`}
          aria-hidden="true"
        />
      );
    }
    
    return (
      <div className="skill-level-indicator">
        {dots}
      </div>
    );
  };

  return (
    <motion.div
      className="skill-card-expanded"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expanded-skill-title"
    >
      <div className="skill-card-expanded-header">
        <div className="skill-card-expanded-title">
          <Skill 
            skill={skill}
            size="lg"
            variant="security"
            animate={false}
          />
          <h3 id="expanded-skill-title">{skill.skillName}</h3>
        </div>
        <button 
          className="skill-card-expanded-close"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>
      <div className="skill-card-expanded-content">
        {skill.description}
      </div>
      
      {skill.level && (
        <div className="skill-card-expanded-level">
          <span className="skill-card-expanded-level-label">Proficiency:</span>
          {renderLevelDots(skill.level)}
        </div>
      )}
      
      {skill.securityDomain && (
        <div 
          className={`skill-domain-badge domain-badge ${skill.securityDomain.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {skill.securityDomain}
        </div>
      )}
    </motion.div>
  );
};

SkillCardExpanded.propTypes = {
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
  /** Function to close the expanded view */
  onClose: PropTypes.func.isRequired, // Function to close the expanded view
  /** Animation variants for the component */
  animationVariants: PropTypes.object
};

// Apply memoization for performance
export default memo(SkillCardExpanded);
