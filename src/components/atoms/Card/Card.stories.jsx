import React from 'react';
import Card from './Card';
import Button from '@atoms/Button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Versatile container component with cyberpunk-inspired themes',
    docs: {
      description: {
        component: 'The Card component provides a flexible container for content with cyberpunk and security-themed styling options. It supports headers, footers, hover effects, shadows, and animations. The component is fully accessible and responsive, with support for custom content, interactive elements, and decorative variants.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title displayed in the header',
      table: {
        type: { summary: 'node' },
        defaultValue: { summary: 'undefined' }
      }
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text displayed below the title',
      table: {
        type: { summary: 'node' },
        defaultValue: { summary: 'undefined' }
      }
    },
    header: {
      control: { disable: true },
      description: 'Custom header content (overrides title/subtitle)',
      table: {
        type: { summary: 'node' },
        defaultValue: { summary: 'undefined' }
      }
    },
    footer: {
      control: { disable: true },
      description: 'Custom footer content',
      table: {
        type: { summary: 'node' },
        defaultValue: { summary: 'undefined' }
      }
    },
    hoverable: {
      control: 'boolean',
      description: 'Enables hover animation effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    bordered: {
      control: 'boolean',
      description: 'Adds a border to the card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    shadow: {
      control: 'boolean',
      description: 'Adds a drop shadow effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' }
      }
    },
    animation: {
      control: { disable: true },
      description: 'Framer Motion animation properties',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'undefined' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  }
};

export default meta;

// Container for consistent display
const CardContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0'
  }}>
    {children}
  </div>
);

// Default card
export const Default = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    bordered: true,
    shadow: false,
    hoverable: false
  },
  render: (args) => (
    <CardContainer>
      <div style={{ maxWidth: '350px' }}>
        <Card {...args}>
          <p>This is the content of the card. You can add any elements or components here.</p>
        </Card>
      </div>
    </CardContainer>
  )
};

// Visual Variants
export const Variants = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Default</h4>
          <Card title="Default Card" subtitle="Standard styling">
            <p>Default card variant with basic styling.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security</h4>
          <Card 
            title="Security Card" 
            subtitle="Cybersecurity theme"
            variant="security"
            bordered
          >
            <p>Security-themed card with enhanced visual effects.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal</h4>
          <Card 
            title="Terminal Card" 
            subtitle="Console-style interface"
            variant="terminal"
          >
            <p>Terminal-style card mimicking command-line interface.</p>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};

// Interactive Features
export const Interactive = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Hoverable</h4>
          <Card 
            title="Hover Effect"
            hoverable
            shadow
          >
            <p>This card has hover animation and shadow effects.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With Actions</h4>
          <Card 
            title="Interactive Card"
            variant="security"
            hoverable
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Confirm</Button>
              </div>
            }
          >
            <p>Card with interactive buttons in the footer.</p>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};

// Custom Headers
export const Headers = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Title & Subtitle</h4>
          <Card 
            title="Main Title"
            subtitle="Supporting information"
            variant="security"
          >
            <p>Card with standard title and subtitle.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Custom Header</h4>
          <Card
            header={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0 }}>Custom Header</h3>
                  <small>With extra elements</small>
                </div>
                <Button size="sm" variant="primary" icon="mdi:cog" />
              </div>
            }
            variant="terminal"
          >
            <p>Card with custom header layout and components.</p>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};

// Animated Cards
export const Animations = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Fade In</h4>
          <Card
            title="Fade Animation"
            variant="security"
            animation={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.5 }
            }}
          >
            <p>This card fades in when mounted.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Slide Up</h4>
          <Card
            title="Slide Animation"
            variant="terminal"
            animation={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 }
            }}
          >
            <p>This card slides up when mounted.</p>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};

// Layout Examples
export const Layouts = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Grid Layout</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <Card title="Card 1" variant="security" hoverable shadow>
              <p>Grid item 1</p>
            </Card>
            <Card title="Card 2" variant="security" hoverable shadow>
              <p>Grid item 2</p>
            </Card>
            <Card title="Card 3" variant="security" hoverable shadow>
              <p>Grid item 3</p>
            </Card>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Nested Cards</h4>
          <Card 
            title="Parent Card" 
            variant="terminal"
            shadow
          >
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Card variant="security" bordered={false}>
                <p>Nested card content</p>
              </Card>
              <Card variant="security" bordered={false}>
                <p>Another nested card</p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <CardContainer>
          <Card
            title="Desktop Card"
            subtitle="Full-width content"
            variant="security"
            shadow
          >
            <p>This card adapts to desktop viewport width.</p>
          </Card>
        </CardContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <CardContainer>
          <div style={{ maxWidth: '320px' }}>
            <Card
              title="Mobile Card"
              subtitle="Constrained width"
              variant="security"
              shadow
            >
              <p>This card is optimized for mobile viewing.</p>
            </Card>
          </div>
        </CardContainer>
      </div>
    </div>
  )
};

// Accessibility Example
export const Accessibility = {
  render: () => (
    <CardContainer>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With ARIA Label</h4>
          <Card
            title="Accessible Card"
            variant="security"
            ariaLabel="Security notification card with important update"
          >
            <p>This card has a descriptive ARIA label for screen readers.</p>
          </Card>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Interactive Elements</h4>
          <Card
            title="Interactive Card"
            variant="terminal"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button 
                  variant="secondary" 
                  size="sm"
                  ariaLabel="Dismiss notification"
                >
                  Dismiss
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  ariaLabel="View notification details"
                >
                  View Details
                </Button>
              </div>
            }
          >
            <p>Card with accessible interactive elements.</p>
          </Card>
        </div>
      </div>
    </CardContainer>
  )
};
