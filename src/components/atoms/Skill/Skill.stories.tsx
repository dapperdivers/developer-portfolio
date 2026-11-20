import type { Meta, StoryFn } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import Skill from './Skill';

const meta = {
  title: 'Atoms/Skill',
  component: Skill,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Display individual skills with icons and tooltips',
    docs: {
      description: {
        component: 'Skill component displays individual skills with icons, optional tooltips, and proficiency levels. It supports different sizes, animations, and security-themed variants.'
      }
    }
  },
  argTypes: {
    skill: {
      control: 'object',
      description: 'Skill data object containing name, icon, and optional level',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{ skillName: "", iconName: "" }' }
      }
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Size of the skill icon',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: { type: 'select', options: ['', 'security'] },
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Whether to use simplified animations for performance',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showLevel: {
      control: 'boolean',
      description: 'Whether to show the proficiency level indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    index: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Index for staggered animations',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    }
  }
} satisfies Meta<typeof Skill>;

export default meta;

// Example skills data with levels and categories
const exampleSkills = [
  { 
    skillName: 'JavaScript',
    iconName: 'logos:javascript',
    level: 5,
    category: 'frontend'
  },
  { 
    skillName: 'React',
    iconName: 'logos:react',
    level: 4,
    category: 'frontend'
  },
  { 
    skillName: 'HTML5',
    iconName: 'logos:html-5',
    level: 5,
    category: 'frontend'
  },
  { 
    skillName: 'Node.js',
    iconName: 'logos:nodejs',
    level: 4,
    category: 'backend'
  },
  { 
    skillName: 'Python',
    iconName: 'logos:python',
    level: 3,
    category: 'backend'
  },
  { 
    skillName: 'Docker',
    iconName: 'logos:docker-icon',
    level: 3,
    category: 'devops'
  },
  { 
    skillName: 'AWS',
    iconName: 'logos:aws',
    level: 4,
    category: 'cloud'
  },
  { 
    skillName: 'MongoDB',
    iconName: 'logos:mongodb-icon',
    level: 3,
    category: 'database'
  }
];

// Container for consistent display
const SkillContainer = ({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ 
    padding: '20px',
    background: 'var(--color-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: 'var(--radius-card)',
    ...style
  }}>
    {children}
  </div>
);

// Default skill
export const Default: StoryFn = () => (
  <SkillContainer style={{ maxWidth: '28rem' }}>
    <h4 style={{ color: 'var(--color-text)', margin: '0 0 0.75rem', fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-technical)', textTransform: 'uppercase' }}>
      Toolbox
    </h4>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {exampleSkills.map((skill, index) => (
        <Skill key={skill.skillName} skill={skill} variant="security" showLevel index={index} />
      ))}
    </div>
  </SkillContainer>
);

// Size variants
export const Sizes: StoryFn = () => (
  <SkillContainer>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Small</h4>
        <Skill skill={exampleSkills[0]} size="sm" />
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Medium</h4>
        <Skill skill={exampleSkills[0]} size="md" />
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Large</h4>
        <Skill skill={exampleSkills[0]} size="lg" />
      </div>
    </div>
  </SkillContainer>
);

// Visual variants
export const Variants: StoryFn = () => (
  <SkillContainer>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Default</h4>
        <Skill skill={exampleSkills[0]} />
      </div>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '10px' }}>Security</h4>
        <Skill skill={exampleSkills[0]} variant="security" />
      </div>
    </div>
  </SkillContainer>
);

// With proficiency levels
export const WithLevels: StoryFn = () => (
  <SkillContainer>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '20px' }}>
      {exampleSkills.slice(0, 5).map((skill, index) => (
        <div key={index}>
          <h4 style={{ color: 'var(--color-text)', marginBottom: '10px', fontSize: '14px' }}>Level {skill.level}</h4>
          <Skill 
            skill={skill} 
            variant="security"
            showLevel={true}
            index={index}
          />
        </div>
      ))}
    </div>
  </SkillContainer>
);

// Staggered animation
export const StaggeredAnimation: StoryFn = () => (
  <SkillContainer>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {exampleSkills.map((skill, index) => (
        <Skill 
          key={index}
          skill={skill}
          variant="security"
          index={index}
          showLevel={true}
        />
      ))}
    </div>
  </SkillContainer>
);

// Skill grid by category
export const SkillGrid: StoryFn = () => (
  <SkillContainer style={{ maxWidth: '800px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '15px' }}>Frontend</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {exampleSkills
            .filter(skill => skill.category === 'frontend')
            .map((skill, index) => (
              <Skill 
                key={index}
                skill={skill}
                variant="security"
                showLevel={true}
                index={index}
              />
            ))}
        </div>
      </div>
      
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '15px' }}>Backend</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {exampleSkills
            .filter(skill => skill.category === 'backend')
            .map((skill, index) => (
              <Skill 
                key={index}
                skill={skill}
                variant="security"
                showLevel={true}
                index={index}
              />
            ))}
        </div>
      </div>
      
      <div>
        <h4 style={{ color: 'var(--color-text)', marginBottom: '15px' }}>DevOps & Cloud</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {exampleSkills
            .filter(skill => ['devops', 'cloud'].includes(skill.category))
            .map((skill, index) => (
              <Skill 
                key={index}
                skill={skill}
                variant="security"
                showLevel={true}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  </SkillContainer>
);

// Responsive example
export const Responsive: StoryFn = () => (
  <div>
    <SkillContainer style={{ maxWidth: '800px', marginBottom: '30px' }}>
      <h4 style={{ color: 'var(--color-text)', marginBottom: '15px' }}>Desktop View</h4>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: '20px'
      }}>
        {exampleSkills.slice(0, 6).map((skill, index) => (
          <Skill 
            key={index}
            skill={skill}
            variant="security"
            showLevel={true}
            index={index}
          />
        ))}
      </div>
    </SkillContainer>

    <SkillContainer style={{ maxWidth: '300px' }}>
      <h4 style={{ color: 'var(--color-text)', marginBottom: '15px' }}>Mobile View</h4>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px'
      }}>
        {exampleSkills.slice(0, 6).map((skill, index) => (
          <Skill 
            key={index}
            skill={skill}
            variant="security"
            showLevel={true}
            size="sm"
            index={index}
          />
        ))}
      </div>
    </SkillContainer>
  </div>
);
