import React from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import type { Meta, StoryObj } from '@storybook/react';

// Sample experience data
const sampleExperience = [
  {
    company: 'Tech Corp',
    role: 'Senior Software Engineer',
    date: '2023-01',
    desc: 'Led development of core platform features',
    companylogo: '/images/companies/techcorp.png',
    descBullets: [
      'Implemented microservices architecture',
      'Reduced system latency by 40%',
      'Mentored junior developers',
    ],
  },
  {
    company: 'Startup Inc',
    role: 'Full Stack Developer',
    date: '2021-06',
    desc: 'Built and maintained customer-facing applications',
    companylogo: '/images/companies/startup.png',
    descBullets: [
      'Developed React-based dashboard',
      'Implemented CI/CD pipeline',
      'Improved test coverage to 90%',
    ],
  },
  {
    company: 'Digital Solutions',
    role: 'Software Developer',
    date: '2020-03',
    desc: 'Worked on various client projects',
    companylogo: '/images/companies/digital.png',
    descBullets: [
      'Built responsive web applications',
      'Integrated third-party APIs',
      'Optimized database queries',
    ],
  },
];

const meta: Meta<typeof ExperienceTimeline> = {
  title: 'Molecules/ExperienceTimeline',
  component: ExperienceTimeline,
  parameters: {
    docs: {
      description: {
        component: 'A timeline component specifically designed for displaying work experience with cyberpunk styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the timeline is in loading state',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether there was an error loading data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExperienceTimeline>;

/**
 * Default story showing a basic experience timeline
 */
export const Default: Story = {
  args: {
    experience: sampleExperience,
    extractDateYear: (date: string) => date.split('-')[0],
    variant: 'security',
  },
};

/**
 * Story showing the terminal variant
 */
export const TerminalVariant: Story = {
  args: {
    ...Default.args,
    variant: 'terminal',
  },
};

/**
 * Story showing loading state
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

/**
 * Story showing error state
 */
export const Error: Story = {
  args: {
    ...Default.args,
    hasError: true,
    errorMessage: 'Failed to load experience data. Please try again.',
  },
};

/**
 * Story showing empty state
 */
export const Empty: Story = {
  args: {
    ...Default.args,
    experience: [],
    emptyMessage: 'No work experience available.',
  },
};

/**
 * Story showing custom date formatting
 */
export const CustomDateFormat: Story = {
  args: {
    ...Default.args,
    extractDateYear: (date: string) => {
      const [year, month] = date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    },
  },
};

/**
 * Story showing single entry
 */
export const SingleEntry: Story = {
  args: {
    ...Default.args,
    experience: [sampleExperience[0]],
  },
};

/**
 * Story showing many entries
 */
export const ManyEntries: Story = {
  args: {
    ...Default.args,
    experience: [
      ...sampleExperience,
      ...sampleExperience.map((exp, index) => ({
        ...exp,
        company: `${exp.company} ${index + 4}`,
        date: `201${9 - index}-01`,
      })),
    ],
  },
};

/**
 * Story showing the timeline in dark mode
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
    variant: 'security',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 