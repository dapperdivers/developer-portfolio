import React from 'react';
import Timeline from './Timeline';
import type { Meta, StoryObj } from '@storybook/react';

// Sample entry component for the stories
const TimelineEntry = ({ data, date, formatDate }) => (
  <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
    <h3>{data.title}</h3>
    <p>{data.description}</p>
    <small>{formatDate(date)}</small>
  </div>
);

// Sample timeline items
const sampleItems = [
  {
    id: '1',
    date: '2024-01-01',
    content: {
      title: 'Project Alpha',
      description: 'Started working on Project Alpha',
    },
  },
  {
    id: '2',
    date: '2024-02-15',
    content: {
      title: 'Major Release',
      description: 'Released version 2.0 of the application',
    },
  },
  {
    id: '3',
    date: '2024-03-30',
    content: {
      title: 'New Features',
      description: 'Implemented key security features',
    },
  },
];

const meta: Meta<typeof Timeline> = {
  title: 'Molecules/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      description: {
        component: 'A flexible timeline component with cyberpunk styling and various display options.',
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
    showDecorations: {
      control: 'boolean',
      description: 'Whether to show decorative elements',
    },
    showMatrixBg: {
      control: 'boolean',
      description: 'Whether to show matrix background',
    },
    showBinaryStreams: {
      control: 'boolean',
      description: 'Whether to show binary streams',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

/**
 * Default story showing a basic timeline
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    entryComponent: TimelineEntry,
    formatDate: (date: string) => new Date(date).toLocaleDateString(),
  },
};

/**
 * Story showing the security variant
 */
export const SecurityVariant: Story = {
  args: {
    ...Default.args,
    variant: 'security',
    showDecorations: true,
    showMatrixBg: true,
    showBinaryStreams: true,
  },
};

/**
 * Story showing the terminal variant
 */
export const TerminalVariant: Story = {
  args: {
    ...Default.args,
    variant: 'terminal',
    showDecorations: true,
    showMatrixBg: true,
    showBinaryStreams: false,
  },
};

/**
 * Story showing loading state
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    skeletonCount: 3,
  },
};

/**
 * Story showing error state
 */
export const Error: Story = {
  args: {
    ...Default.args,
    hasError: true,
    errorMessage: 'Failed to load timeline data. Please try again.',
  },
};

/**
 * Story showing empty state
 */
export const Empty: Story = {
  args: {
    ...Default.args,
    items: [],
    emptyMessage: 'No timeline entries available.',
  },
};

/**
 * Story showing custom date formatting
 */
export const CustomDateFormat: Story = {
  args: {
    ...Default.args,
    formatDate: (date: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};

/**
 * Story showing the timeline without decorations
 */
export const NoDecorations: Story = {
  args: {
    ...Default.args,
    showDecorations: false,
    showMatrixBg: false,
    showBinaryStreams: false,
  },
};

/**
 * Story showing custom connection header and footer
 */
export const CustomConnections: Story = {
  args: {
    ...Default.args,
    connectionHeader: (
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        Custom Header
      </div>
    ),
    connectionFooter: (
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        Custom Footer
      </div>
    ),
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