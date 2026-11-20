import React, { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';

import Skill from '@atoms/Skill';
import './SkillCard.css';
import type { Skill as SkillData } from '@/types/portfolio';

/** The skill shape the card and its expanded view take. */
export type SkillCardData = SkillData;

export interface SkillCardProps {
  /** Skill data object */
  skill: SkillCardData;
  /** Index for staggered animations */
  index?: number;
  /** Whether to use reduced animations for performance */
  reducedMotion?: boolean;
  /** Called with the skill when the card is selected */
  onClick?: (skill: SkillCardData) => void;
  /** Additional CSS class names */
  className?: string;
  /** Whether to animate the card */
  animated?: boolean;
}

/**
 * SkillCard component for displaying individual skills with icon, name, and description.
 * Supports expandable view for detailed skill information.
 * 
 * @component
 */
const SkillCard = ({ 
  skill, 
  index = 0, 
  reducedMotion = false,
  onClick,
  className = '', // Default to empty string for optional className
  animated = true
}: SkillCardProps) => {
  const motionOn = useMotionEnabled(animated);
  
  // Determine if we should animate
  const shouldAnimate = motionOn && !reducedMotion;
  
  // Animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.1 // Stagger based on index
      }
    },
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      whileHover={shouldAnimate ? "hover" : undefined}
      whileTap={shouldAnimate ? "tap" : undefined}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="skill-card-icon">
        <Skill 
          skill={skill}
          index={index}
          size="md"
          variant="security"
          animate={animated}
          reducedMotion={reducedMotion}
        />
      </div>
      <h4 className="skill-card-name">{skill.skillName}</h4>
      <p className="skill-card-desc">
        <span className="skill-card-desc__text">{skill.description}</span>
      </p>
      <span className="skill-card-read-more" aria-hidden="true">+</span>
    </motion.div>
  );
};

// Apply memoization for performance
export default memo(SkillCard);
