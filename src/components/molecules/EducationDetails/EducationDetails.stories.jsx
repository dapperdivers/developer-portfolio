import React from 'react';
import EducationDetails from './EducationDetails';


export default {
  title: 'Molecules/EducationDetails',
  component: EducationDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Education entry with degree and major split out of the sub-header, bullet points and certification badges.',
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

// Same content at a 320px viewport
export const Responsive = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};