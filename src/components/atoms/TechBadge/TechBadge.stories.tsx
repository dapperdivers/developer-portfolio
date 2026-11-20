import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import TechBadge from './TechBadge';

const meta = {
  title: 'Atoms/TechBadge',
  component: TechBadge,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Display technology badges with various styles and security levels',
    docs: {
      description: {
        component: 'TechBadge is a chip: --radius-chip, --surface-inset fill, 1px border and JetBrains Mono xs text. Variants and levels only change the text and border tone; red appears only at the critical level.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Size variant of the badge',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
      description: 'Visual variant of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    level: {
      control: { type: 'select', options: ['', 'low', 'medium', 'high', 'critical'] },
      description: 'Security level for color coding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
} satisfies Meta<typeof TechBadge>;

export default meta;

// Container for consistent badge display
const BadgeContainer = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {children}
  </div>
);

// Default badge
export const Default: StoryFn = () => (
  <TechBadge label="Kubernetes" />
);

// Size variants
export const Sizes: StoryFn = () => (
  <BadgeContainer>
    <TechBadge label="Small" size="sm" />
    <TechBadge label="Medium" size="md" />
    <TechBadge label="Large" size="lg" />
  </BadgeContainer>
);

// Visual variants
export const Variants: StoryFn = () => (
  <BadgeContainer>
    <TechBadge label="Default" />
    <TechBadge label="Security" variant="security" />
    <TechBadge label="Terminal" variant="terminal" />
  </BadgeContainer>
);

// Security levels
export const SecurityLevels: StoryFn = () => (
  <BadgeContainer>
    <TechBadge label="Low" variant="security" level="low" />
    <TechBadge label="Medium" variant="security" level="medium" />
    <TechBadge label="High" variant="security" level="high" />
    <TechBadge label="Critical" variant="security" level="critical" />
  </BadgeContainer>
);

// Interactive badges
export const Interactive: StoryFn = () => (
  <BadgeContainer>
    <TechBadge 
      label="Click me" 
      interactive 
      onClick={() => undefined}
    />
    <TechBadge 
      label="Security" 
      variant="security" 
      interactive 
      onClick={() => undefined}
    />
  </BadgeContainer>
);

// Tech stack example
export const TechStack: StoryFn = () => (
  <div>
    <h4 style={{ marginBottom: '10px' }}>Platform</h4>
    <BadgeContainer>
      <TechBadge label="Kubernetes" />
      <TechBadge label="Talos Linux" />
      <TechBadge label="Flux CD" />
      <TechBadge label="Ceph" />
    </BadgeContainer>

    <h4 style={{ margin: '20px 0 10px' }}>Languages</h4>
    <BadgeContainer>
      <TechBadge label="TypeScript" variant="terminal" />
      <TechBadge label="Go" variant="terminal" />
      <TechBadge label="Python" variant="terminal" />
      <TechBadge label="Bash" variant="terminal" />
    </BadgeContainer>

    <h4 style={{ margin: '20px 0 10px' }}>Security</h4>
    <BadgeContainer>
      <TechBadge label="OIDC" variant="security" level="low" />
      <TechBadge label="mTLS" variant="security" level="low" />
      <TechBadge label="Secrets rotation" variant="security" level="medium" />
      <TechBadge label="Exposed admin port" variant="security" level="critical" />
    </BadgeContainer>
  </div>
);

// Responsive example
export const Responsive: StoryFn = () => (
  <div>
    <div style={{ 
      border: '1px solid var(--surface-border)', 
      padding: '20px',
      marginBottom: '20px',
      maxWidth: '600px'
    }}>
      <h4 style={{ marginBottom: '10px' }}>Desktop View</h4>
      <div className="compact-tech-stack">
        <TechBadge label="Kubernetes" size="md" />
        <TechBadge label="TypeScript" size="md" />
        <TechBadge label="Flux CD" size="md" />
      </div>
    </div>
    
    <div style={{ 
      border: '1px solid var(--surface-border)', 
      padding: '15px',
      maxWidth: '300px'
    }}>
      <h4 style={{ marginBottom: '10px' }}>Mobile View</h4>
      <div className="compact-tech-stack">
        <TechBadge label="Kubernetes" size="sm" />
        <TechBadge label="TypeScript" size="sm" />
        <TechBadge label="Flux CD" size="sm" />
      </div>
    </div>
  </div>
);
