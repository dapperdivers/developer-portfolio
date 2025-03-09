import React from 'react';
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
 *   enableMatrix={true}
 *   enableBinaryStreams={true} 
 *   enableCircuitGrid={true}
 *   enableScanlines={false}
 *   enableGlitch={true}
 *   enableColorPulse={true}
 *   enableNoise={true}
 *   matrixCharCount={150}
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
export default {
  title: 'Layout/Background',
  component: Background,
  tags: ['autodocs'],
  argTypes: {
    enableMatrix: {
      control: 'boolean',
      description: 'Enable/disable the matrix effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableBinaryStreams: {
      control: 'boolean',
      description: 'Enable/disable the binary streams',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableCircuitGrid: {
      control: 'boolean',
      description: 'Enable/disable the circuit grid overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableScanlines: {
      control: 'boolean',
      description: 'Enable/disable the scanline effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableGlitch: {
      control: 'boolean',
      description: 'Enable/disable the glitch effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableColorPulse: {
      control: 'boolean',
      description: 'Enable/disable the color pulse effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    enableNoise: {
      control: 'boolean',
      description: 'Enable/disable the noise texture effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    matrixCharCount: {
      control: { type: 'number', min: 10, max: 500, step: 10 },
      description: 'Number of matrix characters to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 100 },
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
};

// Default Background with sample content
export const Default = {
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

// Matrix Only
export const MatrixOnly = {
  args: {
    enableMatrix: true,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Binary Streams
export const WithBinaryStreams = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: true,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Circuit Grid
export const WithCircuitGrid = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: false,
    enableCircuitGrid: true,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Scanlines
export const WithScanlines = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: true,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Glitch Effect
export const WithGlitchEffect = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: true,
    enableColorPulse: false,
    enableNoise: false,
  }
};

// With Color Pulse
export const WithColorPulse = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: true,
    enableNoise: false,
  }
};

// With Noise Texture
export const WithNoiseTexture = {
  args: {
    enableMatrix: false,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: true,
  }
};

// High Density Matrix
export const HighDensityMatrix = {
  args: {
    enableMatrix: true,
    enableBinaryStreams: false,
    enableCircuitGrid: false,
    enableScanlines: false,
    enableGlitch: false,
    enableColorPulse: false,
    enableNoise: false,
    matrixCharCount: 300,
  }
};

// Full Cyberpunk Theme
export const FullCyberpunkTheme = {
  args: {
    enableMatrix: true,
    enableBinaryStreams: true,
    enableCircuitGrid: true,
    enableScanlines: true,
    enableGlitch: true,
    enableColorPulse: true,
    enableNoise: true,
    matrixCharCount: 150,
  }
};
