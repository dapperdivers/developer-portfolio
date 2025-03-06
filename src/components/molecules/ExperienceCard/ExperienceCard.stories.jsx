import React from 'react';
import ExperienceCard from './ExperienceCard';

export default {
  title: 'Molecules/ExperienceCard',
  component: ExperienceCard,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Experience data object',
    },
    index: {
      control: 'number',
      description: 'Index for staggered animations',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Card component for displaying job experience information with company logo, role, date, and description.',
      },
    },
  },
};

// Example experience data
const exampleExperiences = [
  {
    company: 'Tech Innovations Inc.',
    role: 'Senior Frontend Developer',
    date: 'January 2022 - Present',
    desc: 'Led the development of responsive web applications using React and modern JavaScript frameworks.',
    companylogo: 'https://ui-avatars.com/api/?name=TI&background=0D8ABC&color=fff',
    descBullets: [
      'Implemented atomic design system across multiple projects',
      'Reduced bundle size by 40% through code splitting and lazy loading',
      'Mentored junior developers on React best practices'
    ]
  },
  {
    company: 'Digital Solutions',
    role: 'UI/UX Developer',
    date: 'March 2020 - December 2021',
    desc: 'Designed and developed user interfaces for client web applications.',
    companylogo: 'https://ui-avatars.com/api/?name=DS&background=2D8A5F&color=fff',
    descBullets: [
      'Created reusable component libraries using React and Styled Components',
      'Collaborated with UX designers to implement design systems',
      'Optimized application performance using React performance tools'
    ]
  },
  {
    company: 'Web Creators',
    role: 'Frontend Developer',
    date: 'June 2018 - February 2020',
    desc: 'Developed responsive websites for various clients using modern frontend technologies.',
    companylogo: 'https://ui-avatars.com/api/?name=WC&background=A85C32&color=fff',
    descBullets: [
      'Built interactive web applications using React and Redux',
      'Implemented responsive designs using CSS Grid and Flexbox',
      'Integrated RESTful APIs with frontend applications'
    ]
  }
];

// Template for experience card
const Template = (args) => (
  <div style={{ maxWidth: '400px' }}>
    <ExperienceCard {...args} />
  </div>
);

// Default experience card
export const Default = {
  args: {
  data: exampleExperiences[0],
  index: 0,
}
};

// Second experience example
export const SecondExperience = {
  args: {
  data: exampleExperiences[1],
  index: 1,
}
};

// Third experience example
export const ThirdExperience = {
  args: {
  data: exampleExperiences[2],
  index: 2,
}
};

// Multiple experience cards
export const MultipleCards = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
    gap: '24px',
    maxWidth: '1200px'
  }}>
    {exampleExperiences.map((experience, index) => (
      <ExperienceCard 
        key={index} 
        data={experience} 
        index={index} 
      />
    ))}
  </div>
);

// Experience card without bullet points
export const WithoutBullets = {
  args: {
  data: {
    ...exampleExperiences[0],
    descBullets: []
  },
  index: 0,
}
};
