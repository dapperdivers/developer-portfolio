import React from 'react';
import ExperienceCard from './ExperienceCard';
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

const meta: Meta<typeof ExperienceCard> = {
  title: 'Molecules/ExperienceCard',
  component: ExperienceCard,
  parameters: {
    docs: {
      description: {
        component: 'A card component that displays detailed information about a work experience entry.',
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
      description: 'Index for animation sequencing',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
    },
    colorOverride: {
      control: 'object',
      description: 'Custom color override for the card',
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the card header',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to show card shadow',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

/**
 * Default story showing a basic experience card
 */
export const Default: Story = {
  args: {
    data: sampleData,
    index: 0,
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
 * Story showing a card with custom colors
 */
export const CustomColors: Story = {
  args: {
    ...Default.args,
    colorOverride: {
      r: 64,
      g: 156,
      b: 255,
    },
  },
};

/**
 * Story showing a card without header
 */
export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false,
  },
};

/**
 * Story showing a card without shadow
 */
export const NoShadow: Story = {
  args: {
    ...Default.args,
    shadow: false,
  },
};

/**
 * Story showing a card with custom styling
 */
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'custom-card bg-gray-100 p-6',
  },
};

/**
 * Story showing a card with long content
 */
export const LongContent: Story = {
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
        'Led technical design reviews and documentation efforts',
      ],
    },
  },
};

/**
 * Story showing a card without bullet points
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
 * Story showing a card without company logo
 */
export const NoLogo: Story = {
  args: {
    ...Default.args,
    data: {
      ...sampleData,
      companylogo: undefined,
    },
  },
};

/**
 * Story showing the card in dark mode
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