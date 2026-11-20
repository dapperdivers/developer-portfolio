import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import BinaryStream from './BinaryStream';
import { AnimationProvider } from '@context/AnimationContext';

/**
 * BinaryStream draws a falling column of 0s and 1s on a canvas.
 * It is decorative: size it with `width` and `height`, and position it
 * with the `binary-stream-left` / `binary-stream-right` helper classes
 * or `isBackground`.
 */
const meta: Meta<typeof BinaryStream> = {
  title: 'Atoms/Decorations/BinaryStream',
  component: BinaryStream,
  parameters: {
    layout: 'centered',
    // The global matcher treats any prop ending in "background" as a colour, which catches isBackground
    controls: {
      matchers: { color: /^color$/i }
    },
    docs: {
      description: {
        component: 'BinaryStream component with canvas-based animation for cyberpunk binary effects.'
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
};

export default meta;
type Story = StoryObj<typeof BinaryStream>;

// Basic single stream
export const Default: Story = {
  args: {
    height: 300,
    moveSpeed: 0.3,
    speed: 1
  },
};

// Customized stream with glow effect
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
    <div className="binary-stream-repeat">
      <BinaryStream height={200} moveSpeed={0.2} speed={1} color="#0F0" />
      <BinaryStream height={250} moveSpeed={0.3} speed={1} color="#00ff99" />
      <BinaryStream height={180} moveSpeed={0.4} speed={1} color="#66ff66" />
    </div>
  ),
};

// Positioned streams
export const PositionedStreams: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', border: '1px solid #ccc' }}>
      <BinaryStream className="binary-stream-left" height={300} moveSpeed={0.2} speed={1} />
      <BinaryStream className="binary-stream-right" height={300} moveSpeed={0.2} speed={1} />
    </div>
  ),
};

// Different speeds demonstration
export const SpeedComparison: Story = {
  render: () => (
    <div className="binary-stream-repeat">
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Faster</p>
        <BinaryStream height={200} moveSpeed={0.8} speed={2} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Medium</p>
        <BinaryStream height={200} moveSpeed={0.3} speed={1} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Very Slow</p>
        <BinaryStream height={200} moveSpeed={0.1} speed={0.5} />
      </div>
    </div>
  ),
};

// Background example
export const AsBackground: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', border: '1px solid #ccc', padding: '20px' }}>
      <BinaryStream 
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
        <h2>Binary Background</h2>
        <p>The binary stream runs in the background</p>
      </div>
    </div>
  ),
};

// Decorative border example
export const DecorativeBorder: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px', padding: '20px' }}>
      {/* Left border */}
      <BinaryStream 
        className="binary-stream-left" 
        width={20} 
        height={300} 
        fontSize={14}
        moveSpeed={0.2}
        speed={1}
      />
      {/* Right border */}
      <BinaryStream 
        className="binary-stream-right" 
        width={20} 
        height={300}
        fontSize={14}
        moveSpeed={0.2}
        speed={1}
      />
      <div style={{ 
        margin: '0 25px',
        padding: '20px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>Binary Borders</h2>
        <p>Binary streams as decorative borders</p>
      </div>
    </div>
  ),
};

// Color variations
export const ColorVariations: Story = {
  render: () => (
    <div className="binary-stream-repeat">
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Classic Green</p>
        <BinaryStream height={200} color="#0F0" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Cyan</p>
        <BinaryStream height={200} color="#00ffff" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Blue</p>
        <BinaryStream height={200} color="#0088ff" />
      </div>
    </div>
  ),
};