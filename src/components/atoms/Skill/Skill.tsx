import React, { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useMotionEnabled } from '@utils/motion';
import '@assets/css/tailwind.css';

/* 
 * NOTE: Fallback icon functionality has been moved to a comment for now.
 * It should be implemented in the parent Skills component that uses this Skill component.
 * The parent can check for icons that fail to load and update the skill prop accordingly.
 * 
 * Fallback icon logic:
 * 
 * function getFallbackIcon(skill) {
 *   const { skillName, category } = skill;
 *   const name = skillName?.toLowerCase() || '';
 *   
 *   // Check common categories first
 *   if (category) {
 *     const cat = category.toLowerCase();
 *     if (cat.includes('frontend') || cat.includes('front-end')) return 'vscode-icons:file-type-html';
 *     if (cat.includes('backend') || cat.includes('back-end')) return 'vscode-icons:file-type-node';
 *     if (cat.includes('database')) return 'vscode-icons:file-type-sql';
 *     if (cat.includes('mobile')) return 'vscode-icons:file-type-reactts';
 *     if (cat.includes('devops')) return 'vscode-icons:file-type-docker';
 *     if (cat.includes('cloud')) return 'logos:aws';
 *   }
 *   
 *   // Try to match by skill name
 *   if (name.includes('react')) return 'logos:react';
 *   if (name.includes('angular')) return 'logos:angular-icon';
 *   if (name.includes('vue')) return 'logos:vue';
 *   if (name.includes('node')) return 'logos:nodejs-icon';
 *   if (name.includes('python')) return 'logos:python';
 *   if (name.includes('java')) return 'logos:java';
 *   if (name.includes('javascript') || name.includes('js')) return 'logos:javascript';
 *   if (name.includes('typescript') || name.includes('ts')) return 'logos:typescript-icon';
 *   if (name.includes('html')) return 'logos:html-5';
 *   if (name.includes('css')) return 'logos:css-3';
 *   if (name.includes('sass')) return 'logos:sass';
 *   if (name.includes('sql') || name.includes('database')) return 'vscode-icons:file-type-sql';
 *   if (name.includes('git')) return 'logos:git-icon';
 *   if (name.includes('docker')) return 'logos:docker-icon';
 *   if (name.includes('aws')) return 'logos:aws';
 *   if (name.includes('azure')) return 'logos:microsoft-azure';
 *   if (name.includes('google cloud') || name.includes('gcp')) return 'logos:google-cloud';
 *   
 *   // Default fallback icons by general category
 *   if (name.includes('design')) return 'vscode-icons:file-type-sketch';
 *   if (name.includes('test')) return 'vscode-icons:file-type-jest';
 *   if (name.includes('code') || name.includes('programming')) return 'vscode-icons:file-type-code';
 *   
 *   // Final fallback
 *   return 'vscode-icons:file-type-code';
 * }
 */

// Framer Motion takes `false` for these props at runtime (it also blocks an inherited
// variant label), but its types only allow labels and targets.
const MOTION_OFF = false as unknown as undefined;

/** Skill data object */
export interface SkillData {
  /** Name of the skill */
  skillName: string;
  /** Iconify icon name */
  iconName?: string;
  /** Skill proficiency level (1-5) */
  level?: number | string;
  /** Skill category */
  category?: string;
}

export interface SkillProps {
  /** Skill data object */
  skill: SkillData;
  /** Index for staggered animations */
  index?: number;
  /** Additional CSS classes */
  className?: string;
  /** Size of the skill icon */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant ('', 'security') */
  variant?: string;
  /** Whether to animate the component */
  animate?: boolean;
  /** Whether to use simplified animations for performance */
  reducedMotion?: boolean;
  /** Whether to show the proficiency level indicator */
  showLevel?: boolean;
}

/**
 * Skill component for displaying individual skills with icons and tooltips.
 * Updated with security-themed variant.
 * 
 * @component
 */
const Skill = ({ 
  skill, 
  index = 0,
  className = '', 
  size = 'md', 
  variant = '',
  animate = true,
  reducedMotion = false,
  showLevel = false
}: SkillProps) => {
  const shouldAnimate = useMotionEnabled(animate);
  
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
    variant ? `skill-${variant}` : '',
    reducedMotion ? 'reduced-motion' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants - optimized for performance when needed
  const skillVariants: Variants = reducedMotion ? {
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
  
  // Create level indicator if needed
  const levelIndicator = showLevel && skill.level && (
    <div className={`skill-level level-${skill.level}`}>
      {skill.level}
    </div>
  );
  
  // Render a motion component regardless, but only enable animations if shouldAnimate is true
  return (
    <motion.div
      className={baseClasses}
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? "visible" : false}
      whileHover={shouldAnimate ? "hover" : MOTION_OFF}
      whileTap={shouldAnimate ? "tap" : MOTION_OFF}
      variants={skillVariants}
    >
      <div 
        className="skill-icon" 
        aria-label={skill.skillName}
        role="img"
      >
        {skill.iconName && (
          <Icon 
            icon={skill.iconName} 
            className="skill-icon-svg" 
            width="24"
            height="24"
            onError={(err) => {
              console.warn(`Icon failed to load: ${skill.iconName}`, err);
              // Log error only - fallback handling should happen at the parent component
            }}
            aria-label={`${skill.skillName} icon`}
            style={{
              display: 'block', // Fix layout issues
              width: '100%',
              height: '100%',
              maxWidth: '24px',
              maxHeight: '24px'
            }}
          />
        )}
        
        {/* Show level indicator if requested and level is provided */}
        {levelIndicator}
      </div>
    </motion.div>
  );
};

export default memo(Skill);
