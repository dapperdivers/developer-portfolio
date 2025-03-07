import React from 'react';
import TechBadge from './TechBadge';

export default {
  title: 'Atoms/TechBadge',
  component: TechBadge,
  parameters: {
    componentSubtitle: 'Display technology badges for skill and experience indicators',
  },
  argTypes: {
    label: { control: 'text' },
    level: {
      control: { type: 'select', options: ['', 'low', 'medium', 'high', 'critical'] },
    },
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    onClick: { action: 'clicked' },
  },
};

// Default template
const Template = (args) => <TechBadge {...args} />;

// Basic badge
export const Default = Template.bind({});
Default.args = {
  label: 'React',
};

// With different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <TechBadge label="Small" size="sm" />
    <TechBadge label="Medium" size="md" />
    <TechBadge label="Large" size="lg" />
  </div>
);

// With different variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <TechBadge label="Default" />
    <TechBadge label="Security" variant="security" />
    <TechBadge label="Terminal" variant="terminal" />
  </div>
);

// With security levels
export const SecurityLevels = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <TechBadge label="Low" variant="security" level="low" />
    <TechBadge label="Medium" variant="security" level="medium" />
    <TechBadge label="High" variant="security" level="high" />
    <TechBadge label="Critical" variant="security" level="critical" />
  </div>
);

// Interactive badge
export const Interactive = Template.bind({});
Interactive.args = {
  label: 'Click me',
  onClick: () => alert('Badge clicked')
};

// Tech stack showcase
export const TechStack = () => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <TechBadge label="React" />
    <TechBadge label="TypeScript" />
    <TechBadge label="Node.js" />
    <TechBadge label="GraphQL" />
    <TechBadge label="Docker" />
    <TechBadge label="AWS" />
  </div>
);

// With custom styling
export const CustomStyling = () => (
  <TechBadge 
    label="Custom Style" 
    style={{ 
      background: 'linear-gradient(45deg, #ff00cc, #3333ff)',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }} 
  />
);
