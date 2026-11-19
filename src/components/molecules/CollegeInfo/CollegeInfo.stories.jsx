import React from 'react';
import CollegeInfo from './CollegeInfo';


export default {
  title: 'Molecules/CollegeInfo',
  component: CollegeInfo,
  tags: ['autodocs'],
  argTypes: {
    // Add component props here
    // Example:
    // variant: {
    //   control: 'select',
    //   options: ['primary', 'secondary'],
    //   description: 'The button variant',
    // },
  },
  parameters: {
    docs: {
      description: {
        component: 'Description of the CollegeInfo component',
      },
    },
    a11y: {
      config: {
        rules: [
          // Component-specific accessibility rules
        ],
      },
    },
  },
};


// Default story
export const Default = {
  args: {
    schoolName: 'Georgia State University',
    degree: 'Bachelor of Business Administration',
    major: 'Computer Information Systems',
    minor: 'Information Security',
    graduationDate: 'January 2015',
  }
};

// Responsive behavior example
export const Responsive = {
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};