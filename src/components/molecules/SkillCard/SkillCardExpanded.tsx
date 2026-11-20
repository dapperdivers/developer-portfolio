import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';

import Skill from '@atoms/Skill';
import Modal from '@atoms/Modal';
import './SkillCard.css';
import type { SkillCardData } from './SkillCard';

export interface SkillCardExpandedProps {
  /** Skill data object */
  skill: SkillCardData;
  /** Function to close the expanded view */
  onClose: () => void;
  /** Whether the expanded card is visible */
  isVisible?: boolean;
  /** Whether to animate the modal and its content */
  animated?: boolean;
}

/**
 * SkillCardExpanded component for displaying detailed information about a skill in a modal dialog.
 * Now uses the Modal atom component for proper full-screen modal behavior.
 * 
 * @component
 */
const SkillCardExpanded = ({ 
  skill, 
  onClose, 
  isVisible = true,
  animated = true
}: SkillCardExpandedProps) => {
  const motionOn = useMotionEnabled(animated);
  
  // Generate level dots for the expanded skill card
  const renderLevelDots = (level: number) => {
    const dots: React.ReactElement[] = [];
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
      animated={animated}
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
            initial={motionOn ? { opacity: 0, x: -10 } : false}
            animate={motionOn ? { opacity: 1, x: 0 } : false}
            transition={{ delay: 0.2 }}
          >
            {skill.securityDomain}
          </motion.div>
        )}
      </div>
    </Modal>
  );
};

// Apply memoization for performance
export default memo(SkillCardExpanded);
