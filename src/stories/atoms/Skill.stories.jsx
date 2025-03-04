import React from 'react';
import Skill from '../../components/ui/Skill';

export default {
  title: 'Atoms/Skill',
  component: Skill,
  tags: ['autodocs'],
  argTypes: {
    skill: {
      control: 'object',
      description: 'Skill data object containing skillName and iconName',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the skill icon',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the component',
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Whether to use simplified animations for performance',
    },
    index: {
      control: 'number',
      description: 'Index for staggered animations',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component to display skills with icons and tooltips.',
      },
    },
  },
};

// Example skills data
const exampleSkills = [
  { skillName: 'JavaScript', iconName: 'logos:javascript' },
  { skillName: 'React', iconName: 'logos:react' },
  { skillName: 'HTML5', iconName: 'logos:html-5' },
  { skillName: 'CSS3', iconName: 'logos:css-3' },
  { skillName: 'Node.js', iconName: 'logos:nodejs' },
  { skillName: 'TypeScript', iconName: 'logos:typescript-icon' },
  { skillName: 'Git', iconName: 'logos:git-icon' },
  { skillName: 'Python', iconName: 'logos:python' },
  { skillName: 'Docker', iconName: 'logos:docker-icon' },
  { skillName: 'MongoDB', iconName: 'logos:mongodb-icon' },
];

// Template for single skill
const Template = (args) => <Skill {...args} />;

// Default skill
export const Default = Template.bind({});
Default.args = {
  skill: exampleSkills[0],
  size: 'md',
  animate: true,
  reducedMotion: false,
  index: 0,
};

// React skill
export const ReactSkill = Template.bind({});
ReactSkill.args = {
  skill: exampleSkills[1],
  size: 'md',
  animate: true,
};

// Small size skill
export const SmallSize = Template.bind({});
SmallSize.args = {
  skill: exampleSkills[2],
  size: 'sm',
};

// Medium size skill
export const MediumSize = Template.bind({});
MediumSize.args = {
  skill: exampleSkills[3],
  size: 'md',
};

// Large size skill
export const LargeSize = Template.bind({});
LargeSize.args = {
  skill: exampleSkills[4],
  size: 'lg',
};

// Non-animated skill
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  skill: exampleSkills[5],
  animate: false,
};

// Reduced motion skill
export const ReducedMotion = Template.bind({});
ReducedMotion.args = {
  skill: exampleSkills[6],
  reducedMotion: true,
};

// Multiple sizes side by side
export const SizeComparison = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Skill skill={exampleSkills[0]} size="sm" />
    <Skill skill={exampleSkills[0]} size="md" />
    <Skill skill={exampleSkills[0]} size="lg" />
  </div>
);

// Grid of skills
export const SkillGrid = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
    gap: '16px',
    maxWidth: '600px'
  }}>
    {exampleSkills.map((skill, index) => (
      <Skill 
        key={index} 
        skill={skill} 
        index={index} 
        size="md"
      />
    ))}
  </div>
);

// Staggered animation example
export const StaggeredAnimation = () => (
  <div style={{ 
    display: 'flex',
    gap: '16px',
    maxWidth: '600px'
  }}>
    {exampleSkills.slice(0, 5).map((skill, index) => (
      <Skill 
        key={index} 
        skill={skill} 
        index={index} 
        size="md"
      />
    ))}
  </div>
);
