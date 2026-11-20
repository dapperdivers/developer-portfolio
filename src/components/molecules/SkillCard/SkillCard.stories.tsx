import type { Meta, StoryObj } from '@storybook/react-vite';
import SkillCard from './SkillCard';
import type { SkillCardData } from './SkillCard';

const meta = {
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
    animated: {
      control: 'boolean',
      description: 'Whether to animate the card',
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
} satisfies Meta<typeof SkillCard>;
export default meta;

type Story = StoryObj<typeof meta>;
// Stories that render their own cards and take no args
type RenderStory = StoryObj<typeof SkillCard>;

// Mock data for skill examples
const skillMocks = {
  security: {
    skillName: 'Penetration Testing',
    iconName: 'carbon:security',
    description: 'Identifying and exploiting security vulnerabilities in systems',
    securityDomain: 'Application Security',
    level: 4
  },
  development: {
    skillName: 'React',
    iconName: 'logos:react',
    description: 'Building user interfaces with the React library',
    level: 5
  },
  infrastructure: {
    skillName: 'Kubernetes',
    iconName: 'logos:kubernetes',
    description: 'Container orchestration for microservices architecture',
    securityDomain: 'Container Security',
    level: 3
  }
} satisfies Record<string, SkillCardData>;

// Default story
export const Default: Story = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: false,
  }
};

// Security Domain Skill
export const SecuritySkill: Story = {
  args: {
    skill: skillMocks.security,
    index: 1,
    reducedMotion: false,
  }
};

// Infrastructure Skill
export const InfrastructureSkill: Story = {
  args: {
    skill: skillMocks.infrastructure,
    index: 2,
    reducedMotion: false,
  }
};

// With Reduced Motion
export const ReducedMotion: Story = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: true,
  }
};

// Multiple Skills
export const MultipleSkills: RenderStory = {
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

// Mobile viewport
export const Responsive: Story = {
  args: {
    skill: skillMocks.development,
    index: 0,
    reducedMotion: true,
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  }
};