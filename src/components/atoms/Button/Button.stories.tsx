import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'One button system: primary, secondary and ghost, in two sizes',
    docs: {
      description: {
        component: 'Three canonical variants (primary: solid cyan; secondary: outlined cyan; ghost: low emphasis), two heights (sm 2rem, md 2.5rem), one radius, JetBrains Mono type and a shared focus ring. Status variants (success, danger, warning, info, critical, high, medium, low) are outlined tints; link, cyberpunk, light and dark are kept as aliases. Renders a button, or an anchor when href is given.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'critical', 'high', 'medium', 'low', 'cyberpunk'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button (lg is an alias of md)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    icon: {
      control: 'text',
      description: 'Iconify icon name (e.g. "mdi:home")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' }
      }
    },
    href: {
      control: 'text',
      description: 'URL for anchor tag rendering',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    onClick: { 
      action: 'clicked',
      description: 'Click event handler'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children, column = false }: { children: ReactNode; column?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: '1rem', alignItems: column ? 'flex-start' : 'center' }}>
    {children}
  </div>
);

const label: CSSProperties = {
  margin: '0 0 0.5rem',
  fontFamily: 'var(--font-family-jetbrains)',
  fontSize: 'var(--font-size-xs)',
  letterSpacing: 'var(--letter-spacing-technical)',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
};

// Default button
export const Default: Story = {
  args: {
    children: 'View project',
    variant: 'primary',
    size: 'md',
    icon: 'mdi:arrow-right',
    iconPosition: 'right',
  },
};

// Every variant in both sizes
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size}>
          <p style={label}>{size === 'md' ? 'Default (2.5rem)' : 'Small (2rem)'}</p>
          <Stack>
            <Button size={size} variant="primary">Primary</Button>
            <Button size={size} variant="secondary">Secondary</Button>
            <Button size={size} variant="ghost">Ghost</Button>
            <Button size={size} variant="primary" icon="mdi:download" iconPosition="right">With icon</Button>
            <Button size={size} variant="secondary" icon="mdi:github" iconPosition="left">With icon</Button>
            <Button size={size} variant="ghost" icon="mdi:github" ariaLabel="GitHub" />
          </Stack>
        </div>
      ))}
      <div>
        <p style={label}>Status (outlined tints)</p>
        <Stack>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="critical">Critical</Button>
          <Button variant="high">High</Button>
          <Button variant="medium">Medium</Button>
          <Button variant="low">Low</Button>
        </Stack>
      </div>
      <div>
        <p style={label}>Aliases (map onto the set above)</p>
        <Stack>
          <Button variant="link">link (ghost text)</Button>
          <Button variant="cyberpunk">cyberpunk (secondary)</Button>
          <Button variant="light">light (neutral outline)</Button>
          <Button variant="dark">dark (card surface)</Button>
        </Stack>
      </div>
    </div>
  ),
};

// States side by side. Hover and focus are forced with data-state styles via
// inline equivalents so they can be seen without interacting.
const hoverStyle = (variant: 'primary' | 'secondary' | 'ghost'): CSSProperties => {
  if (variant === 'primary') return { background: 'var(--color-primary-light)', borderColor: 'var(--color-primary-light)' };
  if (variant === 'secondary') return { background: 'rgba(var(--color-primary-rgb), 0.1)', borderColor: 'var(--color-primary)' };
  return { background: 'var(--surface-inset)', color: 'var(--color-primary)' };
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
        <div key={variant}>
          <p style={label}>{variant}</p>
          <Stack>
            <Button variant={variant}>Rest</Button>
            <Button variant={variant} style={hoverStyle(variant)}>Hover</Button>
            <Button variant={variant} style={{ boxShadow: 'var(--ring-focus)' }}>Focus</Button>
            <Button variant={variant} disabled>Disabled</Button>
          </Stack>
        </div>
      ))}
      <p style={{ ...label, textTransform: 'none' }}>
        Hover and Focus are drawn statically here; press Tab to see the real focus ring.
      </p>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <Stack>
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
    </Stack>
  ),
};

// Icons
export const WithIcons: Story = {
  render: () => (
    <Stack>
      <Button icon="mdi:home" iconPosition="left">Left icon</Button>
      <Button icon="mdi:arrow-right" iconPosition="right" variant="secondary">Right icon</Button>
      <Button icon="mdi:github" variant="secondary" ariaLabel="GitHub" />
      <Button icon="mdi:security" variant="critical" ariaLabel="Security alert" />
    </Stack>
  ),
};

// Links
export const Links: Story = {
  render: () => (
    <Stack column>
      <Button href="https://github.com/DapperDivers" target="_blank" rel="noopener noreferrer">External link</Button>
      <Button href="#" variant="secondary">Internal link</Button>
      <Button href="#" variant="link" icon="mdi:external-link" iconPosition="right">Text link</Button>
      <Button href="#" disabled>Disabled link</Button>
    </Stack>
  ),
};

// Form buttons
export const FormButtons: Story = {
  render: () => (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack>
        <Button type="submit">Send message</Button>
        <Button type="reset" variant="secondary">Reset</Button>
        <Button type="button" variant="ghost">Cancel</Button>
      </Stack>
    </form>
  ),
};

// Keyboard focus: tab to the button to see the ring
export const KeyboardFocus: Story = {
  render: () => <Button>Tab to focus</Button>,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    button?.focus();
    await expect(button).toHaveFocus();
  },
};

// Responsive: full-width stack on a narrow column
export const Narrow: Story = {
  render: () => (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Button>Primary action</Button>
      <Button variant="secondary">Secondary action</Button>
    </div>
  ),
};
