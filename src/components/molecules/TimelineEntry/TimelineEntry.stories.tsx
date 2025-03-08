import React from 'react';
import TimelineEntry from './TimelineEntry';
import type { Meta, StoryObj } from '@storybook/react';

// Sample experience data
const sampleData = {
  company: 'Tech Corp',
  role: 'Senior Software Engineer',
  date: '2024-01',
  desc: 'Led development of core platform features',
  companylogo: '/images/companies/techcorp.png',
  descBullets: [
    'Implemented microservices architecture',
    'Reduced system latency by 40%',
    'Mentored junior developers',
  ],
};

const meta: Meta<typeof TimelineEntry> = {
  title: 'Molecules/TimelineEntry',
  component: TimelineEntry,
  parameters: {
    docs: {
      description: {
        component: 'A timeline entry component that displays experience information with cyberpunk styling and animations.',
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Experience data object',
    },
    index: {
      control: 'number',
      description: 'Index of the entry for animation sequencing',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
    },
    extractDateYear: {
      description: 'Function to extract year from date string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimelineEntry>;

/**
 * Default story showing a basic timeline entry
 */
export const Default: Story = {
  args: {
    data: sampleData,
    index: 0,
    extractDateYear: (date: string) => date.split('-')[0],
  },
};

/**
 * Story showing the security variant
 */
export const SecurityVariant: Story = {
  args: {
    ...Default.args,
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
 * Story showing an entry with a long description
 */
export const LongDescription: Story = {
  args: {
    ...Default.args,
    data: {
      ...sampleData,
      desc: 'Led the development of a complex microservices architecture, implementing cutting-edge security features and optimizing system performance. Managed a team of developers and established best practices for code quality and deployment processes.',
      descBullets: [
        'Architected and implemented a scalable microservices infrastructure',
        'Reduced system latency by 40% through optimization and caching strategies',
        'Mentored junior developers and established coding standards',
        'Implemented automated testing and continuous deployment pipeline',
        'Managed third-party integrations and API development',
      ],
    },
  },
};

/**
 * Story showing an entry without bullet points
 */
export const NoBullets: Story = {
  args: {
    ...Default.args,
    data: {
      ...sampleData,
      descBullets: undefined,
    },
  },
};

/**
 * Story showing an entry with custom date formatting
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
 * Story showing an entry with a different index for animation
 */
export const DifferentIndex: Story = {
  args: {
    ...Default.args,
    index: 2,
  },
};

/**
 * Story showing the entry in dark mode
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
    variant: 'terminal',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 