import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAnimation } from '@context//AnimationContext';

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
 * @param {Object} props.animationVariants - Custom animation variants for the component
 * @param {boolean} props.isVisible - Whether the expanded card is visible
 * @returns {React.ReactElement} SkillCardExpanded component
 */
const SkillCardExpanded = ({ 
  skill, 
  onClose, 
  animationVariants,
  isVisible = true 
}) => {
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
  // Default animation variants
  const defaultVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Use provided variants or default
  const variants = animationVariants || defaultVariants;
  
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="skill-card-expanded"
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
          exit={animationEnabled ? "exit" : false}
          variants={variants}
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
            <motion.button 
              className="skill-card-expanded-close"
              onClick={onClose}
              aria-label="Close"
              whileHover={animationEnabled ? { scale: 1.1 } : false}
              whileTap={animationEnabled ? { scale: 0.95 } : false}
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </motion.button>
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
            <motion.div 
              className={`skill-domain-badge domain-badge ${skill.securityDomain.toLowerCase().replace(/\s+/g, '-')}`}
              initial={animationEnabled ? { opacity: 0, x: -10 } : false}
              animate={animationEnabled ? { opacity: 1, x: 0 } : false}
              transition={{ delay: 0.2 }}
            >
              {skill.securityDomain}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
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
  /** Animation variants for the component */
  animationVariants: PropTypes.object,
  /** Whether the expanded card is visible */
  isVisible: PropTypes.bool
};

// Apply memoization for performance
export default memo(SkillCardExpanded);
