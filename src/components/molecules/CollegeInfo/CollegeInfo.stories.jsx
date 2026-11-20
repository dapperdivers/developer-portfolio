import React from 'react';
import CollegeInfo from './CollegeInfo';


export default {
  title: 'Molecules/CollegeInfo',
  component: CollegeInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'School name, degree, major, optional minor and graduation date for one education entry.',
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

// Same content at a 320px viewport
export const Responsive = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};