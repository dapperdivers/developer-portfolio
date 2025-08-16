import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';

import Skill from '@atoms/Skill';
import Modal from '@atoms/Modal';
import './SkillCard.css';

/**
 * SkillCardExpanded component for displaying detailed information about a skill in a modal dialog.
 * Now uses the Modal atom component for proper full-screen modal behavior.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {Function} props.onClose - Handler to close the expanded view
 * @param {boolean} props.isVisible - Whether the expanded card is visible
 * @returns {React.ReactElement} SkillCardExpanded component
 */
const SkillCardExpanded = ({ 
  skill, 
  onClose, 
  isVisible = true 
}) => {
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
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
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="md"
      className="skill-card-expanded-modal"
      contentProps={{
        'aria-labelledby': 'expanded-skill-title'
      }}
    >
      <div className="skill-card-expanded-content-wrapper">
        {/* Header */}
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
        </div>
        
        {/* Content */}
        <div className="skill-card-expanded-content">
          {skill.description}
        </div>
        
        {/* Level */}
        {skill.level && (
          <div className="skill-card-expanded-level">
            <span className="skill-card-expanded-level-label">Proficiency:</span>
            {renderLevelDots(skill.level)}
          </div>
        )}
        
        {/* Domain Badge */}
        {skill.securityDomain && (
          <motion.div 
            className={`skill-domain-badge domain-badge ${skill.securityDomain.toLowerCase().replace(/\s+/g, '-')}`}
            initial={animationEnabled ? { opacity: 0, x: -10 } : false}
            animate={animationEnabled ? { opacity: 1, x: 0 } : false}
            transition={{ delay: 0.2 }}
          >
            {skill.securityDomain}
          </motion.div>
        )}
      </div>
    </Modal>
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
  onClose: PropTypes.func.isRequired,
  /** Whether the expanded card is visible */
  isVisible: PropTypes.bool
};

// Apply memoization for performance
export default memo(SkillCardExpanded);
