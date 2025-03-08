import React from 'react';
import SkillCardExpanded from './SkillCardExpanded';

// Animation variants for the stories
const defaultAnimationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export default {
  title: 'Molecules/SkillCardExpanded',
  component: SkillCardExpanded,
  parameters: {
    docs: {
      description: {
        component: 'Expanded view of a skill card showing detailed information about a skill.',
      },
    },
  },
  argTypes: {
    skill: {
      control: 'object',
      description: 'Skill data object containing details about the skill',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the expanded view is closed',
    },
    animationVariants: {
      control: 'object',
      description: 'Animation variants for the component',
    },
  },
};

/**
 * Default story showing a basic skill card expanded view
 */
export const Default = {
  args: {
    skill: {
      skillName: 'React',
      iconName: 'logos:react',
      description: 'A JavaScript library for building user interfaces',
      level: 4,
    },
    animationVariants: defaultAnimationVariants,
  },
};

/**
 * Story showing a security domain skill
 */
export const SecuritySkill = {
  args: {
    skill: {
      skillName: 'Penetration Testing',
      iconName: 'carbon:security',
      description: 'Advanced penetration testing and vulnerability assessment',
      securityDomain: 'Offensive Security',
      level: 5,
    },
    animationVariants: defaultAnimationVariants,
  },
};

/**
 * Story showing a skill with minimum level
 */
export const MinimumLevel = {
  args: {
    skill: {
      skillName: 'New Technology',
      iconName: 'mdi:new-box',
      description: 'Recently started learning this technology',
      level: 1,
    },
    animationVariants: defaultAnimationVariants,
  },
};

/**
 * Story showing a skill with no level indicator
 */
export const NoLevel = {
  args: {
    skill: {
      skillName: 'Documentation',
      iconName: 'mdi:file-document',
      description: 'Technical documentation and writing',
    },
    animationVariants: defaultAnimationVariants,
  },
};

/**
 * Story showing a skill with a long description
 */
export const LongDescription = {
  args: {
    skill: {
      skillName: 'Cloud Architecture',
      iconName: 'mdi:cloud',
      description: 'Extensive experience in designing and implementing cloud-native solutions using various services and best practices. Proficient in microservices architecture, serverless computing, and container orchestration. Strong understanding of cloud security, cost optimization, and performance tuning.',
      level: 4,
    },
    animationVariants: defaultAnimationVariants,
  },
};

/**
 * Story showing a skill with custom animation variants
 */
export const CustomAnimation = {
  args: {
    skill: {
      skillName: 'Animation',
      iconName: 'mdi:animation',
      description: 'Custom animation and motion design',
      level: 3,
    },
    animationVariants: {
      hidden: { opacity: 0, y: 50, rotateX: 90 },
      visible: { opacity: 1, y: 0, rotateX: 0 },
      exit: { opacity: 0, y: -50, rotateX: -90 },
    },
  },
};

/**
 * Story showing the component in dark mode
 */
export const DarkMode = {
  args: {
    skill: {
      skillName: 'Dark Mode Design',
      iconName: 'mdi:weather-night',
      description: 'Designing for dark mode experiences',
      level: 4,
    },
    animationVariants: defaultAnimationVariants,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 