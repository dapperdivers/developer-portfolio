import React from 'react';
import DateBubble from './DateBubble';

const meta = {
  title: 'Atoms/DateBubble',
  component: DateBubble,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Futuristic date display with holographic effects and security levels',
    docs: {
      description: {
        component: 'The DateBubble component presents dates in a cyberpunk-inspired, interactive format. It features holographic effects, scanning animations, and security level indicators. Perfect for timelines, security dashboards, and futuristic interfaces, it includes accessibility features, responsive design, and respects reduced motion preferences. The component supports various sizes, security levels, and visual variants with distinctive hover effects and keyboard navigation.'
      }
    }
  },
  argTypes: {
    date: {
      control: 'text',
      description: 'Date text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    level: {
      control: 'select',
      options: ['', 'low', 'medium', 'high', 'critical'],
      description: 'Security level affecting the visual appearance',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the bubble component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"md"' },
      }
    },
    animation: {
      description: 'Framer Motion animation props',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'null' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      }
    },
    id: {
      control: 'text',
      description: 'Unique ID for ARIA relationships',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom ARIA label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    }
  }
};

export default meta;

// Container component for consistent display
const BubbleContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0'
  }}>
    {children}
  </div>
);

// Default date bubble
export const Default = {
  args: {
    date: '2024',
    size: 'md'
  },
  render: (args) => (
    <BubbleContainer>
      <DateBubble {...args} />
    </BubbleContainer>
  )
};

// Size variations
export const Sizes = {
  render: () => (
    <BubbleContainer>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Small</h4>
          <DateBubble date="2024" size="sm" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Medium</h4>
          <DateBubble date="2024" size="md" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Large</h4>
          <DateBubble date="2024" size="lg" />
        </div>
      </div>
    </BubbleContainer>
  )
};

// Security level variations
export const SecurityLevels = {
  render: () => (
    <BubbleContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Low Security</h4>
          <DateBubble date="2024" level="low" variant="security" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Medium Security</h4>
          <DateBubble date="2024" level="medium" variant="security" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>High Security</h4>
          <DateBubble date="2024" level="high" variant="security" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Critical Security</h4>
          <DateBubble date="2024" level="critical" variant="security" />
        </div>
      </div>
    </BubbleContainer>
  )
};

// Visual variants
export const Variants = {
  render: () => (
    <BubbleContainer>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Default</h4>
          <DateBubble date="2024" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security</h4>
          <DateBubble date="2024" variant="security" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal</h4>
          <DateBubble date="2024" variant="terminal" />
        </div>
      </div>
    </BubbleContainer>
  )
};

// Interactive examples
export const Interactive = {
  render: () => (
    <BubbleContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Clickable</h4>
          <DateBubble 
            date="2024" 
            onClick={() => alert('DateBubble clicked!')}
            ariaLabel="Click to view details for year 2024"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With Animation</h4>
          <DateBubble 
            date="2024"
            animation={{
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5 }
            }}
          />
        </div>
      </div>
    </BubbleContainer>
  )
};

// Timeline example
export const InTimeline = {
  render: () => (
    <BubbleContainer>
      <div className="timeline-entry" style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'var(--color-border)',
          transform: 'translateX(-50%)'
        }} />
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <DateBubble date="2024" variant="security" level="critical" />
          <span style={{ color: 'var(--color-text-muted)' }}>System Security Breach</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <DateBubble date="2023" variant="security" level="high" />
          <span style={{ color: 'var(--color-text-muted)' }}>Security Audit</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <DateBubble date="2022" variant="security" level="low" />
          <span style={{ color: 'var(--color-text-muted)' }}>System Implementation</span>
        </div>
      </div>
    </BubbleContainer>
  )
};

// Responsive example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <BubbleContainer>
          <DateBubble date="2024" size="lg" variant="security" level="high" />
        </BubbleContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <BubbleContainer>
          <div style={{ maxWidth: '320px' }}>
            <DateBubble date="2024" size="sm" variant="security" level="high" />
          </div>
        </BubbleContainer>
      </div>
    </div>
  )
};

// Accessibility example
export const Accessibility = {
  render: () => (
    <BubbleContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With Custom ARIA Label</h4>
          <DateBubble 
            date="2024" 
            ariaLabel="Security incident from 2024"
            variant="security"
            level="high"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With ID for Relationships</h4>
          <DateBubble 
            date="2024"
            id="timeline-2024"
            variant="security"
            level="medium"
          />
        </div>
      </div>
    </BubbleContainer>
  )
};
