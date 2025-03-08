import React from 'react';
import SchoolHeader from './SchoolHeader';

const meta = {
  title: 'Atoms/SchoolHeader',
  component: SchoolHeader,
  tags: ['autodocs'],
  argTypes: {
    schoolName: {
      control: 'text',
      description: 'Name of the school or institution',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

// Default story
export const Default = {
  args: {
    schoolName: 'University of Technology',
  }
};

// Long school name
export const LongSchoolName = {
  args: {
    schoolName: 'Massachusetts Institute of Technology - School of Computer Science and Engineering',
  }
};

// With custom class
export const WithCustomClass = {
  args: {
    schoolName: 'Stanford University',
    className: 'highlighted-header',
  }
};

// Multiple schools example
export const MultipleSchools = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <SchoolHeader schoolName="Harvard University" />
    <SchoolHeader schoolName="Yale University" />
    <SchoolHeader schoolName="Princeton University" />
  </div>
);

// With container
export const WithContainer = () => (
  <div style={{ 
    maxWidth: '600px', 
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  }}>
    <SchoolHeader schoolName="Oxford University" />
    <p style={{ marginTop: '1rem' }}>
      Founded in 1096, Oxford University is one of the oldest and most prestigious universities in the world.
    </p>
  </div>
); 