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
          background: 'var(--surface-card)',
          padding: 'var(--spacing-5)',
          borderRadius: 'var(--radius-card)',
          maxWidth: '600px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--surface-border)',
        }}>
          <p style={{
            margin: '0 0 var(--spacing-2)',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-family-jetbrains)',
            fontSize: 'var(--font-size-xs)',
            letterSpacing: 'var(--letter-spacing-technical)',
            textTransform: 'uppercase',
          }}>
            ~/background
          </p>
          <h1 style={{
            margin: '0 0 var(--spacing-3)',
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
          }}>
            The page backdrop
          </h1>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            Digital rain, binary streams, a circuit grid and a faint scanline sit behind
            the content. They are decorative only and switch off for visitors who prefer
            reduced motion.
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
