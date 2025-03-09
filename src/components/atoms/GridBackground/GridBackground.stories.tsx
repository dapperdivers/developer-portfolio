import type { Meta, StoryObj } from '@storybook/react';
import GridBackground from './GridBackground';
import { AnimationProvider } from '@context/AnimationContext';

const meta = {
  title: 'Atoms/GridBackground',
  component: GridBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A subtle grid background component that creates a professional and organized visual structure. Features customizable grid size, colors, and smooth animations.'
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
      description: 'Size of grid cells in pixels'
    },
    gridColor: {
      control: 'color',
      description: 'Color of grid lines'
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color'
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
            <h1 className="text-4xl font-bold mb-4 text-white">Grid Background Demo</h1>
            <p className="text-lg text-white/80">
              Adjust the controls to customize the grid appearance
            </p>
          </div>
        </div>
      </AnimationProvider>
    )
  ]
} satisfies Meta<typeof GridBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default grid background with subtle lines.
 */
export const Default: Story = {
  args: {
    gridSize: 30,
    gridColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)'
  }
};

/**
 * Larger grid cells for a more spacious layout.
 */
export const LargeGrid: Story = {
  args: {
    gridSize: 50,
    gridColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.95)'
  }
};

/**
 * Blue-tinted grid for a cooler atmosphere.
 */
export const BlueGrid: Story = {
  args: {
    gridSize: 30,
    gridColor: 'rgba(147, 197, 253, 0.1)',
    backgroundColor: 'rgba(15, 23, 42, 0.98)'
  }
};

/**
 * High contrast grid for better visibility.
 */
export const HighContrast: Story = {
  args: {
    gridSize: 30,
    gridColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.98)'
  }
};
