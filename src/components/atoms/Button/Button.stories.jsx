import React from 'react';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Interactive button component with cyberpunk-inspired design',
    docs: {
      description: {
        component: 'The Button component provides a versatile, accessible interface element with multiple variants, sizes, and states. It features cyberpunk-inspired styling, icon support, and security-themed variants. The component supports both button and anchor tag rendering, with full keyboard navigation and ARIA support.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'critical', 'high', 'medium', 'low'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
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
        defaultValue: { summary: false }
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
};

export default meta;

// Container for consistent display
const ButtonContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0'
  }}>
    {children}
  </div>
);

// Default button
export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  },
  render: (args) => (
    <ButtonContainer>
      <Button {...args} />
    </ButtonContainer>
  )
};

// Button Variants
export const Variants = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </div>
    </ButtonContainer>
  )
};

// Security Variants
export const SecurityVariants = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Button variant="critical">Critical</Button>
        <Button variant="high">High</Button>
        <Button variant="medium">Medium</Button>
        <Button variant="low">Low</Button>
      </div>
    </ButtonContainer>
  )
};

// Button Sizes
export const Sizes = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <Button size="sm">Small Button</Button>
        <Button size="md">Medium Button</Button>
        <Button size="lg">Large Button</Button>
      </div>
    </ButtonContainer>
  )
};

// Icons
export const WithIcons = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <Button icon="mdi:home" iconPosition="left">Left Icon</Button>
        <Button icon="mdi:arrow-right" iconPosition="right">Right Icon</Button>
        <Button icon="mdi:github" />
        <Button icon="mdi:security" variant="critical" />
      </div>
    </ButtonContainer>
  )
};

// States
export const States = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button variant="primary" className="hover">Hover</Button>
        <Button variant="primary" className="active">Active/Pressed</Button>
        <Button variant="primary" className="focus">Focused</Button>
      </div>
    </ButtonContainer>
  )
};

// Links
export const Links = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <Button href="https://example.com" target="_blank">External Link</Button>
        <Button href="#" variant="secondary">Internal Link</Button>
        <Button href="#" variant="link" icon="mdi:external-link" iconPosition="right">
          Text Link
        </Button>
        <Button href="#" disabled>Disabled Link</Button>
      </div>
    </ButtonContainer>
  )
};

// Form Buttons
export const FormButtons = {
  render: () => (
    <ButtonContainer>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '1rem' }}>
        <Button type="submit" variant="success">Submit</Button>
        <Button type="reset" variant="secondary">Reset</Button>
        <Button type="button" variant="danger">Cancel</Button>
      </form>
    </ButtonContainer>
  )
};

// Loading States
export const LoadingStates = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button icon="mdi:loading" disabled>Loading...</Button>
        <Button icon="mdi:refresh" variant="secondary" className="spin">
          Refreshing
        </Button>
        <Button icon="mdi:progress-upload" variant="success">
          Uploading
        </Button>
      </div>
    </ButtonContainer>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <ButtonContainer>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="primary" size="lg">Primary Action</Button>
            <Button variant="secondary" size="lg">Secondary Action</Button>
          </div>
        </ButtonContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <ButtonContainer>
          <div style={{ 
            maxWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </div>
        </ButtonContainer>
      </div>
    </div>
  )
};

// Accessibility Example
export const Accessibility = {
  render: () => (
    <ButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <Button 
          icon="mdi:account" 
          ariaLabel="User profile"
        />
        <Button
          icon="mdi:delete"
          variant="danger"
          ariaLabel="Delete item"
        >
          Delete
        </Button>
        <Button
          variant="success"
          icon="mdi:check"
          ariaLabel="Confirm selection"
          type="submit"
        >
          Confirm
        </Button>
      </div>
    </ButtonContainer>
  )
};
