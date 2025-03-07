import React from 'react';
import TimelineEntry from './TimelineEntry';
import { AnimationProvider } from '@context/AnimationContext';

export default {
  title: 'Molecules/TimelineEntry',
  component: TimelineEntry,
  parameters: {
    componentSubtitle: 'A timeline entry component for displaying experience items',
  },
  decorators: [
    // Wrap all stories in AnimationProvider to ensure animations work properly
    (Story) => (
      <AnimationProvider>
        <div style={{ padding: '2rem', maxWidth: '1000px' }}>
          <Story />
        </div>
      </AnimationProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
    },
  },
};

// Sample data for the stories
const sampleData = {
  company: 'Example Tech',
  role: 'Senior Frontend Developer',
  date: 'Jan 2022 - Present',
  desc: 'Led the development of the company\'s flagship product, implementing modern web technologies and best practices.',
  companylogo: 'https://via.placeholder.com/150',
  descBullets: [
    'Rebuilt the frontend architecture using React and TypeScript',
    'Improved performance by 40% through code optimization',
    'Implemented CI/CD pipeline for automated testing and deployment',
    'Mentored junior developers and conducted code reviews'
  ]
};

// Function to extract year from date
const extractYear = (date) => date.split(' ')[0].split(' ')[1];

// Default template
const Template = (args) => <TimelineEntry {...args} />;

// Basic example
export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  index: 0,
  extractDateYear: extractYear,
  variant: 'security',
  id: 'story-timeline-entry-1'
};

// Security variant
export const SecurityVariant = Template.bind({});
SecurityVariant.args = {
  data: sampleData,
  index: 0,
  extractDateYear: extractYear,
  variant: 'security',
  id: 'story-timeline-entry-security'
};

// Terminal variant
export const TerminalVariant = Template.bind({});
TerminalVariant.args = {
  data: {
    ...sampleData,
    role: 'Backend Engineer',
    company: 'Terminal Systems'
  },
  index: 1,
  extractDateYear: extractYear,
  variant: 'terminal',
  id: 'story-timeline-entry-terminal'
};

// Multiple entries
export const TimelineSequence = () => (
  <div>
    <TimelineEntry
      data={{
        ...sampleData,
        company: 'First Company',
        role: 'Junior Developer',
        date: 'Jan 2018 - Dec 2019'
      }}
      index={0}
      extractDateYear={extractYear}
      variant="security"
      id="entry-1"
    />
    <TimelineEntry
      data={{
        ...sampleData,
        company: 'Second Company',
        role: 'Software Engineer',
        date: 'Jan 2020 - Dec 2021'
      }}
      index={1}
      extractDateYear={extractYear}
      variant="security"
      id="entry-2"
    />
    <TimelineEntry
      data={{
        ...sampleData,
        company: 'Current Company',
        role: 'Senior Developer',
        date: 'Jan 2022 - Present'
      }}
      index={2}
      extractDateYear={extractYear}
      variant="security"
      id="entry-3"
    />
  </div>
);

// Role-based tech badges
export const RoleBasedBadges = () => (
  <div>
    <TimelineEntry
      data={{
        ...sampleData,
        role: 'Frontend Developer'
      }}
      index={0}
      extractDateYear={extractYear}
      variant="security"
      id="frontend-entry"
    />
    <TimelineEntry
      data={{
        ...sampleData,
        role: 'Backend Developer'
      }}
      index={1}
      extractDateYear={extractYear}
      variant="security"
      id="backend-entry"
    />
    <TimelineEntry
      data={{
        ...sampleData,
        role: 'Full Stack Developer'
      }}
      index={2}
      extractDateYear={extractYear}
      variant="security"
      id="fullstack-entry"
    />
    <TimelineEntry
      data={{
        ...sampleData,
        role: 'Security Engineer'
      }}
      index={3}
      extractDateYear={extractYear}
      variant="security"
      id="security-entry"
    />
  </div>
);
