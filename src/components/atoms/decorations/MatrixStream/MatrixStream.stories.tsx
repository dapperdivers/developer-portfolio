import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MatrixStream from './MatrixStream';
import { AnimationProvider } from '@context/AnimationContext';

const meta: Meta<typeof MatrixStream> = {
  title: 'Atoms/Decorations/MatrixStream',
  component: MatrixStream,
  parameters: {
    layout: 'centered',
    // The global matcher treats any prop ending in "background" as a colour, which catches isBackground
    controls: {
      matchers: { color: /^color$/i }
    },
    docs: {
      description: {
        component: 'MatrixStream component with framer-motion animations integrated with AnimationContext.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color', description: 'Character colour' },
    fontSize: { control: { type: 'number', min: 8, max: 48, step: 1 }, description: 'Character size in pixels' },
    speed: { control: { type: 'range', min: 0.5, max: 10, step: 0.5 }, description: 'How often characters change' },
    moveSpeed: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 }, description: 'Downward speed' },
    width: { control: { type: 'number', min: 10, max: 800, step: 10 }, description: 'Stream width in pixels' },
    height: { control: { type: 'number', min: 50, max: 800, step: 10 }, description: 'Stream height in pixels' },
    isBackground: { control: 'boolean', description: 'Render fixed behind the content' },
    className: { control: 'text' }
  },
  decorators: [
    (Story) => (
      <AnimationProvider>
        <Story />
      </AnimationProvider>
    )
  ]
} satisfies Meta<typeof MatrixStream>;

export default meta;
type Story = StoryObj<typeof MatrixStream>;

// Basic single stream
export const Default: Story = {
  args: {
    height: 300,
    moveSpeed: 0.3,
    speed: 1
  },
};

// Customized stream
export const Customized: Story = {
  args: {
    height: 400,
    width: 40,
    fontSize: 24,
    color: '#00ff99',
    speed: 1,
    moveSpeed: 0.2,
  },
};

// Multiple streams side by side
export const MultipleStreams: Story = {
  render: () => (
    <div className="matrix-stream-repeat">
      <MatrixStream height={200} moveSpeed={0.2} speed={1} />
      <MatrixStream height={250} moveSpeed={0.3} speed={1} />
      <MatrixStream height={180} moveSpeed={0.4} speed={1} />
    </div>
  ),
};

// Positioned streams
export const PositionedStreams: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', border: '1px solid #ccc' }}>
      <MatrixStream className="matrix-stream-left" height={300} moveSpeed={0.2} speed={1} />
      <MatrixStream className="matrix-stream-right" height={300} moveSpeed={0.2} speed={1} />
    </div>
  ),
};

// Different speeds demonstration
export const SpeedComparison: Story = {
  render: () => (
    <div className="matrix-stream-repeat">
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Faster</p>
        <MatrixStream height={200} moveSpeed={0.8} speed={2} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Medium</p>
        <MatrixStream height={200} moveSpeed={0.3} speed={1} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Very Slow</p>
        <MatrixStream height={200} moveSpeed={0.1} speed={0.5} />
      </div>
    </div>
  ),
};

// Background example
export const AsBackground: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', border: '1px solid #ccc', padding: '20px' }}>
      <MatrixStream 
        isBackground 
        width={400} 
        height={300} 
        moveSpeed={0.2}
        speed={1}
      />
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        color: 'white', 
        textAlign: 'center',
        padding: '20px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '8px'
      }}>
        <h2>Content Over Matrix</h2>
        <p>The matrix stream runs in the background</p>
      </div>
    </div>
  ),
};

// Decorative border example
export const DecorativeBorder: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', padding: '20px' }}>
      {/* Left border */}
      <MatrixStream 
        className="matrix-stream-left" 
        width={20} 
        height={300} 
        fontSize={14}
        moveSpeed={1}
      />
      {/* Right border */}
      <MatrixStream 
        className="matrix-stream-right" 
        width={20} 
        height={300}
        fontSize={14}
        moveSpeed={1}
      />
      <div style={{ 
        margin: '0 25px',
        padding: '20px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>Content Between Streams</h2>
        <p>Matrix streams as decorative borders</p>
      </div>
    </div>
  ),
};
