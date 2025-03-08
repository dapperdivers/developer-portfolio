import React from 'react';
import TimelineNode from './TimelineNode';


export default {
  title: 'Atoms/TimelineCore/Node/TimelineNode',
  component: TimelineNode,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the timeline node',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual variant of the node',
    },
    active: {
      control: 'boolean',
      description: 'Whether the node is active',
    },
    animated: {
      control: 'boolean',
      description: 'Whether the node should be animated',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether node is part of interactive timeline',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'TimelineNode is a versatile component for rendering nodes in timeline visualizations. It supports different sizes, visual variants, and interactive states.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
};


// Default story
export const Default = {
  args: {
    size: 'md',
    variant: '',
    active: false,
    animated: false,
    interactive: false,
  }
};

// Active Node
export const Active = {
  args: {
    size: 'md',
    variant: '',
    active: true,
    animated: true,
    interactive: false,
  }
};

// Security Variant
export const Security = {
  args: {
    size: 'md',
    variant: 'security',
    active: false,
    animated: false,
    interactive: false,
  }
};

// Terminal Variant
export const Terminal = {
  args: {
    size: 'md',
    variant: 'terminal',
    active: false,
    animated: false,
    interactive: false,
  }
};

// Different Sizes
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <TimelineNode size="sm" />
      <TimelineNode size="md" />
      <TimelineNode size="lg" />
    </div>
  )
};

// Interactive Node
export const Interactive = {
  args: {
    size: 'md',
    variant: '',
    active: false,
    animated: true,
    interactive: true,
    id: 'interactive-node',
  }
};

// Responsive behavior example
export const Responsive = {
  args: {
    size: 'md',
    variant: '',
    active: false,
    animated: true,
    style: { margin: '1rem' },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};