import React from 'react';
import Skill from './Skill';

export default {
  title: 'Atoms/Skill',
  component: Skill,
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
        defaultValue: { summary: true }
      }
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Whether to use simplified animations for performance',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showLevel: {
      control: 'boolean',
      description: 'Whether to show the proficiency level indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    index: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Index for staggered animations',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    }
  }
};

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
const SkillContainer = ({ children, style = {} }) => (
  <div style={{ 
    padding: '20px',
    background: 'var(--color-background, #0a192f)',
    borderRadius: '8px',
    ...style
  }}>
    {children}
  </div>
);

// Default skill
export const Default = () => (
  <SkillContainer>
    <Skill skill={exampleSkills[0]} />
  </SkillContainer>
);

// Size variants
export const Sizes = () => (
  <SkillContainer>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Small</h4>
        <Skill skill={exampleSkills[0]} size="sm" />
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Medium</h4>
        <Skill skill={exampleSkills[0]} size="md" />
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Large</h4>
        <Skill skill={exampleSkills[0]} size="lg" />
      </div>
    </div>
  </SkillContainer>
);

// Visual variants
export const Variants = () => (
  <SkillContainer>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Default</h4>
        <Skill skill={exampleSkills[0]} />
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Security</h4>
        <Skill skill={exampleSkills[0]} variant="security" />
      </div>
    </div>
  </SkillContainer>
);

// With proficiency levels
export const WithLevels = () => (
  <SkillContainer>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '20px' }}>
      {exampleSkills.slice(0, 5).map((skill, index) => (
        <div key={index}>
          <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '14px' }}>Level {skill.level}</h4>
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
export const StaggeredAnimation = () => (
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
export const SkillGrid = () => (
  <SkillContainer style={{ maxWidth: '800px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>Frontend</h4>
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
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>Backend</h4>
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
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>DevOps & Cloud</h4>
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
export const Responsive = () => (
  <div>
    <SkillContainer style={{ maxWidth: '800px', marginBottom: '30px' }}>
      <h4 style={{ color: '#fff', marginBottom: '15px' }}>Desktop View</h4>
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
      <h4 style={{ color: '#fff', marginBottom: '15px' }}>Mobile View</h4>
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
