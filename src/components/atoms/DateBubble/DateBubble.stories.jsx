import React from 'react';
import DateBubble from './DateBubble';

const meta = {
  title: 'Atoms/DateBubble',
  component: DateBubble,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: 'Date text to display',
    },
    level: {
      control: 'select',
      options: ['', 'low', 'medium', 'high', 'critical'],
      description: 'Security level',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the bubble',
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;

// Default date bubble
export const Default = {
  args: {
    date: '2024',
    size: 'md',
  }
};

// Different sizes
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DateBubble date="2024" size="sm" />
      <DateBubble date="2024" size="md" />
      <DateBubble date="2024" size="lg" />
    </div>
  )
};

// Security levels
export const SecurityLevels = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DateBubble date="2024" level="low" />
      <DateBubble date="2024" level="medium" />
      <DateBubble date="2024" level="high" />
      <DateBubble date="2024" level="critical" />
    </div>
  )
};

// Variants
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DateBubble date="2024" variant="security" />
      <DateBubble date="2024" variant="terminal" />
    </div>
  )
};

// Clickable
export const Clickable = {
  args: {
    date: '2024',
    onClick: () => console.log('DateBubble clicked'),
  }
};
