import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Background from './Background';

/**
 * # Background
 * 
 * The Background component creates a cyberpunk-themed backdrop for the entire site.
 * It combines several decorative elements including MatrixBackground for the digital rain effect,
 * BinaryStream for animated binary characters, a circuit grid overlay, and scanlines.
 * 
 * ## Features
 * 
 * - Matrix-style digital rain background
 * - Animated binary streams on all four sides
 * - Circuit grid overlay with hexagon pattern
 * - Scanline effect for retro monitor look
 * - Random glitch effects for digital distortion
 * - Color pulse effect for ambient lighting
 * - Digital noise texture for gritty aesthetic
 * - Vignette effect for depth
 * - Mobile responsive design
 * - Accessibility considerations (reduced motion)
 * 
 * ## Usage
 * 
 * ```jsx
 * import Background from '@components/layout/Background';
 * 
 * // Default usage with all effects
 * <Background>
 *   <div>Your site content goes here</div>
 * </Background>
 * 
 * // Custom configuration
 * <Background 
 *   enableCircuitGrid={true}
 *   enableScanlines={false}
 *   enableGlitch={true}
 *   enableColorPulse={true}
 *   enableNoise={true}
 * >
 *   <div>Your site content goes here</div>
 * </Background>
 * ```
 * 
 * ## Accessibility
 * 
 * The background effects are purely decorative and don't interfere with content accessibility.
 * The component respects prefers-reduced-motion settings by disabling animations.
 */
const meta = {
  title: 'Layout/Background',
  component: Background,
  tags: ['autodocs'],
  argTypes: {
    enableCircuitGrid: {
      control: 'boolean',
      description: 'Enable/disable the circuit grid overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    enableScanlines: {
      control: 'boolean',
      description: 'Enable/disable the scanline effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    enableGlitch: {
      control: 'boolean',
      description: 'Enable/disable the glitch effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    enableColorPulse: {
      control: 'boolean',
      description: 'Enable/disable the color pulse effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    enableNoise: {
      control: 'boolean',
      description: 'Enable/disable the noise texture effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'The Background component creates a cyberpunk-themed backdrop for the entire application, combining several decorative elements for an immersive experience.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Background>;

export default meta;
// BackgroundProps requires children, but the effect stories render the backdrop
// alone, so stories are typed against the component and args stay partial.
type Story = StoryObj<typeof Background>;

// Default Background with sample content
export const Default: Story = {
  render: (args) => (
    <Background {...args}>
      <div style={{
        padding: '50px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '600px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 20px rgba(5, 213, 250, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(5, 213, 250, 0.3)',
        }}>
          <h1 style={{
            color: '#05d5fa',
            marginBottom: '20px',
            fontSize: '28px',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(5, 213, 250, 0.7)'
          }}>
            CYBERPUNK BACKGROUND
          </h1>
          <p style={{ marginBottom: '15px', color: '#ffffff' }}>
            This cyberpunk-themed background creates an immersive digital environment
            for your portfolio site. It features Matrix-style digital rain, animated
            binary streams, circuit grid patterns, and a subtle scanline effect for
            that retro-futuristic aesthetic.
          </p>
          <p style={{ color: '#dddddd' }}>
            All effects are purely decorative and won't interfere with the content's
            accessibility. The component also respects user preferences for reduced motion.
          </p>
        </div>
      </div>
    </Background>
  )
};

// With Circuit Grid
export const WithCircuitGrid: Story = {
  args: {
    enableCircuitGrid: true,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Scanlines
export const WithScanlines: Story = {
  args: {
    enableCircuitGrid: false,
    enableScanlines: true,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Glitch Effect
export const WithGlitchEffect: Story = {
  args: {
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: true,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Color Pulse
export const WithColorPulse: Story = {
  args: {
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: true,
    enableNoise: false,
  }
};

// With Noise Texture
export const WithNoiseTexture: Story = {
  args: {
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: true,
  }
};

// Full Cyberpunk Theme
export const FullCyberpunkTheme: Story = {
  args: {
    enableCircuitGrid: true,
    enableScanlines: true,
    enableGlitch: true,
    enableColorPulse: true,
    enableNoise: true,
  }
};
