import React from 'react';
import TimelineDecorations from './TimelineDecorations';

/**
 * # TimelineDecorations
 * 
 * The TimelineDecorations component is a container that brings together multiple decoration
 * elements to create a unified visual theme for timelines and other UI components. It combines
 * binary streams, matrix backgrounds, and other decorative elements in a configurable way.
 * 
 * ## Features
 * 
 * - Support for multiple theme variants: security, terminal
 * - Configurable display of decorations on each side (left, right, top, bottom)
 * - Customizable density of decorative elements
 * - Positioned as an absolute container to wrap around content
 * 
 * ## Usage
 * 
 * ```jsx
 * import TimelineDecorations from '@components/atoms/TimelineDecorations';
 * 
 * // Basic container with decorations
 * <div style={{ position: 'relative' }}>
 *   <TimelineDecorations 
 *     variant="security"
 *     showLeft={true}
 *     showRight={true}
 *   />
 *   <div style={{ position: 'relative', zIndex: 1 }}>
 *     Your content here
 *   </div>
 * </div>
 * 
 * // Full border with all sides
 * <TimelineDecorations
 *   variant="security"
 *   showLeft={true}
 *   showRight={true}
 *   showTop={true}
 *   showBottom={true}
 *   binaryStreamCount={40}
 * />
 * ```
 * 
 * ## Accessibility
 * 
 * This component is purely decorative and doesn't affect content accessibility.
 * All decorative elements are properly marked to be ignored by screen readers.
 */
export default {
  title: 'Atoms/TimelineDecorations',
  component: TimelineDecorations,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'security', 'terminal'],
      description: 'Visual variant/theme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'security' },
      }
    },
    showLeft: {
      control: 'boolean',
      description: 'Whether to show the left side decorations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    showRight: {
      control: 'boolean',
      description: 'Whether to show the right side decorations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    showTop: {
      control: 'boolean',
      description: 'Whether to show top binary stream (security variant)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    showBottom: {
      control: 'boolean',
      description: 'Whether to show bottom binary stream (security variant)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    binaryStreamCount: {
      control: { type: 'number', min: 10, max: 100, step: 5 },
      description: 'Number of binary stream characters',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 40 },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'TimelineDecorations is a container component that brings together various decoration elements for timelines. It supports multiple themes including security and terminal variants, and can be configured to show decorations on different sides.',
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
        height: '300px',
        border: '1px solid #333',
        background: '#121212',
        margin: '1rem 0',
        padding: '1rem',
        overflow: 'hidden'
      }}>
        <Story />
        <div style={{ position: 'relative', zIndex: 1, color: '#e1e1e1', textAlign: 'center', marginTop: '2rem' }}>
          <h4>Container Content</h4>
          <p>The decorations are positioned around this content</p>
        </div>
      </div>
    ),
  ],
};


// Default story (Security variant)
export const Default = {
  args: {
    variant: 'security',
    showLeft: true,
    showRight: true,
    showTop: false,
    showBottom: false,
    binaryStreamCount: 40,
  }
};

// Full Security Variant
export const FullSecurityVariant = {
  args: {
    variant: 'security',
    showLeft: true,
    showRight: true,
    showTop: true,
    showBottom: true,
    binaryStreamCount: 40,
  }
};

// Terminal Variant
export const TerminalVariant = {
  args: {
    variant: 'terminal',
    showLeft: true,
    showRight: true,
    showTop: false,
    showBottom: false,
    binaryStreamCount: 40,
  }
};

// Left Side Only
export const LeftSideOnly = {
  args: {
    variant: 'security',
    showLeft: true,
    showRight: false,
    showTop: false,
    showBottom: false,
    binaryStreamCount: 40,
  }
};

// High Density
export const HighDensity = {
  args: {
    variant: 'security',
    showLeft: true,
    showRight: true,
    showTop: false,
    showBottom: false,
    binaryStreamCount: 80,
  }
};

// Container with Content
export const ContainerWithContent = {
  render: () => (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <TimelineDecorations 
        variant="security"
        showLeft={true}
        showRight={true}
        showTop={true}
        showBottom={true}
        binaryStreamCount={40}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: '#0f0', textAlign: 'center' }}>
        <h3>Timeline Content</h3>
        <p>With decorative elements surrounding it</p>
      </div>
    </div>
  )
};

// Responsive behavior example
export const Responsive = {
  args: {
    variant: 'security',
    showLeft: true,
    showRight: true,
    showTop: false,
    showBottom: false,
    binaryStreamCount: 20,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};