import type { Meta, StoryObj } from '@storybook/react';
import NetworkBackground from './NetworkBackground';
import { AnimationProvider } from '@context/AnimationContext';

const meta = {
  title: 'Atoms/NetworkBackground',
  component: NetworkBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A sophisticated network visualization component that creates an elegant cybersecurity-themed atmosphere. Features hub nodes that act as central connection points, with animated data flows between nodes.'
      }
    },
    backgrounds: {
      default: 'dark'
    }
  },
  tags: ['autodocs'],
  argTypes: {
    gridSize: {
      control: { type: 'number', min: 10, max: 100, step: 5 },
      description: 'Base grid size for node placement'
    },
    nodeColor: {
      control: 'color',
      description: 'Color of network nodes and connections'
    },
    networkIntensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Intensity of network animations and glow effects'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <Story />
          <div className="relative z-10 p-8">
            <h1 className="text-4xl font-bold mb-4 text-white">Network Background Demo</h1>
            <p className="text-lg text-white/80">
              Observe the animated network with hub nodes and data flows
            </p>
          </div>
        </div>
      </AnimationProvider>
    )
  ]
} satisfies Meta<typeof NetworkBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default network visualization with cyan nodes.
 */
export const Default: Story = {
  args: {
    gridSize: 30,
    nodeColor: '#00f5d4',
    networkIntensity: 0.5
  }
};

/**
 * Blue-toned network with increased activity.
 */
export const BlueNetwork: Story = {
  args: {
    gridSize: 25,
    nodeColor: '#3b82f6',
    networkIntensity: 0.7
  }
};

/**
 * Professional gray network with subtle animations.
 */
export const Professional: Story = {
  args: {
    gridSize: 40,
    nodeColor: '#94a3b8',
    networkIntensity: 0.4
  }
};

/**
 * High-intensity network with prominent hub nodes.
 */
export const ActiveNetwork: Story = {
  args: {
    gridSize: 25,
    nodeColor: '#00f5d4',
    networkIntensity: 0.8
  }
};

/**
 * Security monitoring theme with alert coloring.
 */
export const SecurityMonitor: Story = {
  args: {
    gridSize: 25,
    nodeColor: '#dc2626',
    networkIntensity: 0.7
  }
};
