import type { Meta, StoryObj } from '@storybook/react-vite';
import DataStream from './DataStream';

const meta = {
  title: 'Atoms/DataStream',
  component: DataStream,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated data stream lines with cybersecurity theming for visualizing data flow.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security variant theme'
    },
    delay: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Animation delay in seconds'
    },
    duration: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: 'Animation duration in seconds'
    },
    intensity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Visual intensity level'
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Whether the streams animate'
    },
  },
  // Shared wrapper for every story
  render: (args) => (
    <div className="bg-gray-900 p-8 min-h-screen">
      <div className="w-96 space-y-4">
        <DataStream {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof DataStream>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    delay: 0,
    duration: 2.5,
    intensity: 'medium',
  },
};

export const Secure: Story = {
  args: {
    variant: 'secure',
    delay: 0,
    duration: 2.5,
    intensity: 'medium',
  },
};

export const Breach: Story = {
  args: {
    variant: 'breach',
    delay: 0,
    duration: 2.5,
    intensity: 'high',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    delay: 0,
    duration: 1.5,
    intensity: 'high',
  },
};

export const MultipleStreams: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-8 min-h-screen">
      <div className="w-96 space-y-2">
        <DataStream {...args} delay={0} />
        <DataStream {...args} delay={0.3} />
        <DataStream {...args} delay={0.6} />
      </div>
    </div>
  ),
  args: {
    variant: 'default',
    duration: 2.5,
    intensity: 'medium',
  },
};

export const HighIntensity: Story = {
  args: {
    variant: 'default',
    delay: 0,
    duration: 1.8,
    intensity: 'high',
  },
};

export const LowIntensity: Story = {
  args: {
    variant: 'default',
    delay: 0,
    duration: 3.5,
    intensity: 'low',
  },
};