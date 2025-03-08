import React from 'react';
import TechBadge from './TechBadge';

export default {
  title: 'Atoms/TechBadge',
  component: TechBadge,
  parameters: {
    componentSubtitle: 'Display technology badges with various styles and security levels',
    docs: {
      description: {
        component: 'TechBadge is a versatile component for displaying technology labels, skills, and security clearance levels. It supports different sizes, variants, and interactive states.'
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
        defaultValue: { summary: false }
      }
    }
  }
};

// Container for consistent badge display
const BadgeContainer = ({ children }) => (
  <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {children}
  </div>
);

// Default badge
export const Default = () => (
  <TechBadge label="React" />
);

// Size variants
export const Sizes = () => (
  <BadgeContainer>
    <TechBadge label="Small" size="sm" />
    <TechBadge label="Medium" size="md" />
    <TechBadge label="Large" size="lg" />
  </BadgeContainer>
);

// Visual variants
export const Variants = () => (
  <BadgeContainer>
    <TechBadge label="Default" />
    <TechBadge label="Security" variant="security" />
    <TechBadge label="Terminal" variant="terminal" />
  </BadgeContainer>
);

// Security levels
export const SecurityLevels = () => (
  <BadgeContainer>
    <TechBadge label="Low" variant="security" level="low" />
    <TechBadge label="Medium" variant="security" level="medium" />
    <TechBadge label="High" variant="security" level="high" />
    <TechBadge label="Critical" variant="security" level="critical" />
  </BadgeContainer>
);

// Interactive badges
export const Interactive = () => (
  <BadgeContainer>
    <TechBadge 
      label="Click me" 
      interactive 
      onClick={() => alert('Badge clicked!')}
    />
    <TechBadge 
      label="Security" 
      variant="security" 
      interactive 
      onClick={() => alert('Security badge clicked!')}
    />
  </BadgeContainer>
);

// Tech stack example
export const TechStack = () => (
  <div>
    <h4 style={{ marginBottom: '10px' }}>Frontend</h4>
    <BadgeContainer>
      <TechBadge label="React" />
      <TechBadge label="TypeScript" />
      <TechBadge label="Next.js" />
      <TechBadge label="Tailwind CSS" />
    </BadgeContainer>
    
    <h4 style={{ margin: '20px 0 10px' }}>Backend</h4>
    <BadgeContainer>
      <TechBadge label="Node.js" variant="terminal" />
      <TechBadge label="Express" variant="terminal" />
      <TechBadge label="MongoDB" variant="terminal" />
      <TechBadge label="GraphQL" variant="terminal" />
    </BadgeContainer>
    
    <h4 style={{ margin: '20px 0 10px' }}>Security</h4>
    <BadgeContainer>
      <TechBadge label="OAuth" variant="security" level="high" />
      <TechBadge label="JWT" variant="security" level="medium" />
      <TechBadge label="HTTPS" variant="security" level="critical" />
      <TechBadge label="2FA" variant="security" level="high" />
    </BadgeContainer>
  </div>
);

// Custom styling
export const CustomStyling = () => (
  <BadgeContainer>
    <TechBadge 
      label="Gradient" 
      style={{ 
        background: 'linear-gradient(45deg, #ff00cc, #3333ff)',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }} 
    />
    <TechBadge 
      label="Neon" 
      style={{ 
        background: '#000',
        color: '#0ff',
        border: '1px solid #0ff',
        textShadow: '0 0 5px #0ff',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
      }} 
    />
    <TechBadge 
      label="Outlined" 
      style={{ 
        background: 'transparent',
        border: '2px solid currentColor',
        fontWeight: '600'
      }} 
    />
  </BadgeContainer>
);

// Responsive example
export const Responsive = () => (
  <div>
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px',
      marginBottom: '20px',
      maxWidth: '600px'
    }}>
      <h4 style={{ marginBottom: '10px' }}>Desktop View</h4>
      <div className="compact-tech-stack">
        <TechBadge label="React" size="md" />
        <TechBadge label="TypeScript" size="md" />
        <TechBadge label="Node.js" size="md" />
      </div>
    </div>
    
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '15px',
      maxWidth: '300px'
    }}>
      <h4 style={{ marginBottom: '10px' }}>Mobile View</h4>
      <div className="compact-tech-stack">
        <TechBadge label="React" size="sm" />
        <TechBadge label="TypeScript" size="sm" />
        <TechBadge label="Node.js" size="sm" />
      </div>
    </div>
  </div>
);
