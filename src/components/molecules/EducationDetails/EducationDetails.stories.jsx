import React from 'react';
import EducationDetails from './EducationDetails';


export default {
  title: 'Molecules/EducationDetails',
  component: EducationDetails,
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
        component: 'Description of the EducationDetails component',
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
    subHeader: 'Bachelor of Business Administration in Computer Information Systems',
    duration: 'January 2015',
    desc: 'J. Mack Robinson College of Business',
    descBullets: ['Minor in Information Security'],
    certifications: [
      { name: 'Practical Network Penetration Tester', issuer: 'TCM Security', date: 'Apr 2022' },
    ],
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