import type { Meta, StoryObj } from '@storybook/react-vite';
import ConnectionHeader from './ConnectionHeader';

/**
 * # ConnectionHeader
 * 
 * The ConnectionHeader component displays a cyberpunk-style connection/status header
 * with a pulsing indicator, title, and status code. It's commonly used at the top of
 * timeline sections to indicate status or connection information.
 * 
 * ## Features
 * 
 * - Multiple theme variants: security, terminal, cyberpunk
 * - Animated indicator with pulsing effect
 * - Customizable title and status text
 * - Option to enable/disable animation
 * 
 * ## Usage
 * 
 * ```jsx
 * import ConnectionHeader from '@components/atoms/ConnectionHeader';
 * 
 * // Default usage
 * <ConnectionHeader />
 * 
 * // With custom options
 * <ConnectionHeader 
 *   title="SECURE CONNECTION ESTABLISHED" 
 *   statusCode="[0xFF2941] VERIFIED"
 *   variant="security"
 *   animate={true}
 * />
 * 
 * // Terminal variant
 * <ConnectionHeader 
 *   title="TERMINAL SESSION ACTIVE" 
 *   statusCode="[SYS:READY]"
 *   variant="terminal"
 * />
 * ```
 * 
 * ## Styling
 * 
 * The component uses theme colors that can be customized via CSS variables:
 * - Security variant: Uses `--color-primary` (cyan)
 * - Terminal variant: Uses `--color-success` (default: green)
 * - Cyberpunk variant: Uses `--color-warning` (default: yellow)
 */
const meta = {
  title: 'Atoms/ConnectionHeader',
  component: ConnectionHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'SECURE CONNECTION ESTABLISHED' },
      }
    },
    statusCode: {
      control: 'text',
      description: 'The status code to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '[0xFF2941] VERIFIED' },
      }
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal', 'cyberpunk'],
      description: 'The variant of the header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'security' },
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'ConnectionHeader is a cyberpunk-style component that displays a secure connection header for timeline decorations. It includes animation effects and different variants for visual styling.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '1rem',
        background: '#121212',
        margin: '1rem 0',
        color: '#e1e1e1'
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;


// Default story
export const Default: Story = {
  args: {
    title: 'SECURE CONNECTION ESTABLISHED',
    statusCode: '[0xFF2941] VERIFIED',
    animate: true,
    variant: 'security',
  }
};

// Terminal Variant
export const TerminalVariant: Story = {
  args: {
    title: 'TERMINAL SESSION ACTIVE',
    statusCode: '[SYS:READY]',
    animate: true,
    variant: 'terminal',
  }
};

// Cyberpunk Variant
export const CyberpunkVariant: Story = {
  args: {
    title: 'NEURAL LINK ONLINE',
    statusCode: '[UPLINK:STABLE]',
    animate: true,
    variant: 'cyberpunk',
  }
};

// Without Animation
export const WithoutAnimation: Story = {
  args: {
    title: 'SECURE CONNECTION ESTABLISHED',
    statusCode: '[0xFF2941] VERIFIED',
    animate: false,
    variant: 'security',
  }
};

// Different Messages
export const WarningMessage: Story = {
  args: {
    title: 'WARNING: UNAUTHORIZED ACCESS',
    statusCode: '[ERR:0x5523] ACCESS DENIED',
    animate: true,
    variant: 'security',
  }
};

// Responsive behavior example
export const Responsive: Story = {
  args: {
    title: 'CONNECTION ACTIVE',
    statusCode: '[0x5912] MOBILE',
    animate: true,
    variant: 'security',
  },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};