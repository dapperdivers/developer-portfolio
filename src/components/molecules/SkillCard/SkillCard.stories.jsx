import React from 'react';
import SkillCard from './SkillCard';

export default {
  title: 'Molecules/SkillCard',
  component: SkillCard,
  tags: ['autodocs'],
  argTypes: {
    skill: {
      control: 'object',
      description: 'Skill data object',
    },
    index: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Index for animation staggering',
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Whether to use simplified animations for performance',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler when skill card is selected',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'SkillCard is a component for displaying individual skills with icon, name, and description. It supports expandable view and can trigger a detailed view when clicked.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-allowed-role', enabled: true },
        ],
      },
    },
  },
};

// Mock data for skill examples
const skillMocks = {
  security: {
    skillName: 'Penetration Testing',
    iconName: 'security',
    description: 'Identifying and exploiting security vulnerabilities in systems',
    securityDomain: 'Offensive Security',
    level: 4
  },
  development: {
    skillName: 'React',
    iconName: 'react',
    description: 'Building user interfaces with the React library',
    securityDomain: 'Development',
    level: 5
  },
  infrastructure: {
    skillName: 'Kubernetes',
    iconName: 'kubernetes',
    description: 'Container orchestration for microservices architecture',
    securityDomain: 'Infrastructure',
    level: 3
  }
};

// Default story
export const Default = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: false,
  }
};

// Security Domain Skill
export const SecuritySkill = {
  args: {
    skill: skillMocks.security,
    index: 1,
    reducedMotion: false,
  }
};

// Infrastructure Skill
export const InfrastructureSkill = {
  args: {
    skill: skillMocks.infrastructure,
    index: 2,
    reducedMotion: false,
  }
};

// With Reduced Motion
export const ReducedMotion = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: true,
  }
};

// Multiple Skills
export const MultipleSkills = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <SkillCard 
        skill={skillMocks.development} 
        index={0} 
      />
      <SkillCard 
        skill={skillMocks.security} 
        index={1} 
      />
      <SkillCard 
        skill={skillMocks.infrastructure} 
        index={2} 
      />
    </div>
  )
};

// Responsive behavior example
export const Responsive = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};