import React from 'react';
import EducationIcon from './EducationIcon';

const meta = {
  title: 'Atoms/EducationIcon',
  component: EducationIcon,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

// Default education icon
export const Default = {};

// With custom class
export const WithCustomClass = {
  args: {
    className: 'education-icon-large',
  }
};

// In context
export const InContext = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <EducationIcon />
      <span>Bachelor of Science in Computer Science</span>
    </div>
  )
};

// Multiple icons
export const MultipleIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <EducationIcon />
      <EducationIcon className="education-icon-large" />
      <EducationIcon />
    </div>
  )
};
