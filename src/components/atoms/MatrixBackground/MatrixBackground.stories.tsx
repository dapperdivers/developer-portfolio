import React from 'react';
import MatrixBackground from './MatrixBackground';

/**
 * # MatrixBackground
 * 
 * The MatrixBackground component creates a Matrix-style digital rain effect with animated
 * binary digits placed throughout the container. It's a decorative element used to enhance
 * cyberpunk-themed UI components.
 * 
 * ## Features
 * 
 * - Customizable number of matrix characters
 * - Option for random or ordered positioning
 * - Each character has randomized opacity and animation delay
 * 
 * ## Usage
 * 
 * ```jsx
 * import MatrixBackground from '@components/atoms/MatrixBackground';
 * 
 * // Default usage
 * <MatrixBackground />
 * 
 * // With custom options
 * <MatrixBackground 
 *   characterCount={50} 
 *   randomPositioning={true} 
 * />
 * 
 * // Inside a container with content
 * <div style={{ position: 'relative' }}>
 *   <MatrixBackground />
 *   <div style={{ position: 'relative', zIndex: 1 }}>
 *     Your content here
 *   </div>
 * </div>
 * ```
 * 
 * ## Accessibility
 * 
 * This is a purely decorative component and should be invisible to screen readers.
 */
export default {
  title: 'Atoms/MatrixBackground',
  component: MatrixBackground,
  tags: ['autodocs'],
  argTypes: {
    characterCount: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: 'The number of characters to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 50 },
      }
    },
    randomPositioning: {
      control: 'boolean',
      description: 'Whether to use random positioning',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'MatrixBackground is a decorative component that creates a digital rain effect, similar to the effect seen in the Matrix movies. It displays binary digits with varying opacity and animation delays for a cyberpunk aesthetic.',
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
    characterCount: 50,
    randomPositioning: true,
  }
};

// High Density
export const HighDensity = {
  args: {
    characterCount: 150,
    randomPositioning: true,
  }
};

// Low Density
export const LowDensity = {
  args: {
    characterCount: 20,
    randomPositioning: true,
  }
};

// Ordered Positioning
export const OrderedPositioning = {
  args: {
    characterCount: 50,
    randomPositioning: false,
  }
};

// Container with Background
export const ContainerWithBackground = {
  render: () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MatrixBackground characterCount={100} randomPositioning={true} />
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: '#0f0', textAlign: 'center' }}>
        <h3>Cyberpunk Interface</h3>
        <p>With Matrix Background Effect</p>
      </div>
    </div>
  )
};

// Responsive behavior example
export const Responsive = {
  args: {
    characterCount: 30,
    randomPositioning: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};