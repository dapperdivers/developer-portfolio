import React from 'react';
import BinaryStream from './BinaryStream';

/**
 * # BinaryStream
 * 
 * The BinaryStream component displays animated binary digits (0s and 1s) that flow along 
 * one side of a container. It's used to create cyberpunk-style UI elements in timeline 
 * decorations.
 * 
 * ## Features
 * 
 * - Can be positioned on any side of a container (left, right, top, bottom)
 * - Customizable number of binary digits
 * - Configurable animation speed through delay settings
 * 
 * ## Usage
 * 
 * ```jsx
 * import BinaryStream from '@components/atoms/BinaryStream';
 * 
 * // Default usage (left side)
 * <BinaryStream />
 * 
 * // With custom options
 * <BinaryStream 
 *   position="right" 
 *   count={30} 
 *   baseDelay={0.1} 
 * />
 * ```
 * 
 * ## Accessibility
 * 
 * This is a decorative element and should not receive keyboard focus.
 * It is automatically set with appropriate ARIA attributes.
 */
export default {
  title: 'Atoms/BinaryStream',
  component: BinaryStream,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'The side to position the stream',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      }
    },
    count: {
      control: { type: 'number', min: 5, max: 100, step: 5 },
      description: 'The number of binary digits to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 30 },
      }
    },
    baseDelay: {
      control: { type: 'number', min: 0.05, max: 0.5, step: 0.05 },
      description: 'Base animation delay in seconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0.1 },
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'BinaryStream is a decorative component that displays animated binary digits (0s and 1s). It is used to create cyberpunk-style UI elements in timeline decorations.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-hidden-focus', enabled: false }, // Decorative element
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative', 
        height: '200px',
        border: '1px solid #333',
        background: '#121212',
        margin: '1rem 0',
        overflow: 'hidden'
      }}>
        <Story />
      </div>
    ),
  ],
};


// Default story
export const Default = {
  args: {
    position: 'left',
    count: 30,
    baseDelay: 0.1,
  }
};

// Right Position
export const RightPosition = {
  args: {
    position: 'right',
    count: 30,
    baseDelay: 0.1,
  }
};

// Top Position
export const TopPosition = {
  args: {
    position: 'top',
    count: 25,
    baseDelay: 0.1,
  }
};

// Bottom Position
export const BottomPosition = {
  args: {
    position: 'bottom',
    count: 25,
    baseDelay: 0.1,
  }
};

// Fast Animation
export const FastAnimation = {
  args: {
    position: 'left',
    count: 30,
    baseDelay: 0.05,
  }
};

// Slow Animation
export const SlowAnimation = {
  args: {
    position: 'left',
    count: 30,
    baseDelay: 0.3,
  }
};

// Multiple Streams
export const MultipleStreams = {
  render: () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#121212' }}>
      <BinaryStream position="left" count={20} baseDelay={0.1} />
      <BinaryStream position="right" count={20} baseDelay={0.15} />
      <BinaryStream position="top" count={15} baseDelay={0.2} />
      <BinaryStream position="bottom" count={15} baseDelay={0.25} />
    </div>
  )
};

// Responsive behavior example
export const Responsive = {
  args: {
    position: 'left',
    count: 15,
    baseDelay: 0.1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};