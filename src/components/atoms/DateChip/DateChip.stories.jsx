import React from 'react';
import DateChip from './DateChip';

const meta = {
  title: 'atoms/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Cybersecurity-themed date and duration display with professional styling',
    docs: {
      description: {
        component: 'The DateChip component presents dates and durations in a professional cybersecurity-themed format. It features dark navy backgrounds with cyan accents, technical typography using JetBrains Mono, subtle grid patterns, and enhanced readability. The component includes multiple security variants (default, secure, breach, critical) with appropriate visual styling and animations. Perfect for timelines, experience sections, and security dashboards.'
      }
    },
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a192f' },
        { name: 'navy', value: '#0f172a' },
        { name: 'black', value: '#000000' }
      ]
    }
  },
  argTypes: {
    date: {
      control: 'text',
      description: 'The date or duration text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Visual variant for different security contexts',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    }
  }
};

export default meta;

// Container component for consistent display with cybersecurity theme
const ChipContainer = ({ children, background = '#0a192f', title }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0',
    border: '1px solid rgba(100, 255, 218, 0.2)',
    backdropFilter: 'blur(10px)'
  }}>
    {title && (
      <h4 style={{ 
        marginBottom: '1rem', 
        color: '#64ffda',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </h4>
    )}
    {children}
  </div>
);

// Default cybersecurity date chip
export const Default = {
  args: {
    date: '2020 - 2024',
    variant: 'default'
  },
  render: (args) => (
    <ChipContainer title="Default Variant">
      <DateChip {...args} />
    </ChipContainer>
  )
};

// Security Variants Showcase
export const SecurityVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ChipContainer title="Default - Standard Security Level">
        <DateChip date="2020 - 2024" variant="default" />
      </ChipContainer>
      <ChipContainer title="Secure - Enhanced Security Level">
        <DateChip date="2022 - Present" variant="secure" />
      </ChipContainer>
      <ChipContainer title="Breach - Security Warning Level">
        <DateChip date="Security Event" variant="breach" />
      </ChipContainer>
      <ChipContainer title="Critical - Critical Security Level">
        <DateChip date="Incident Alert" variant="critical" />
      </ChipContainer>
    </div>
  )
};

// Date Format Examples
export const DateFormats = {
  render: () => (
    <ChipContainer title="Various Date Formats">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        alignItems: 'flex-start'
      }}>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Year Range
          </p>
          <DateChip date="2020 - 2024" />
        </div>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Single Year
          </p>
          <DateChip date="2024" />
        </div>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Present Date
          </p>
          <DateChip date="2022 - Present" />
        </div>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Month Range
          </p>
          <DateChip date="Jan 2023 - Dec 2023" />
        </div>
      </div>
    </ChipContainer>
  )
};

// Duration Format Examples
export const DurationFormats = {
  render: () => (
    <ChipContainer title="Duration Formats">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        alignItems: 'flex-start'
      }}>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Years
          </p>
          <DateChip date="3 Years" />
        </div>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Months
          </p>
          <DateChip date="6 Months" />
        </div>
        <div>
          <p style={{ 
            marginBottom: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.8)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem'
          }}>
            Combined Duration
          </p>
          <DateChip date="2 Years 3 Months" />
        </div>
      </div>
    </ChipContainer>
  )
};

// Security Timeline Example
export const SecurityTimeline = {
  render: () => (
    <ChipContainer title="Cybersecurity Timeline Example">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        position: 'relative'
      }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(100, 255, 218, 0.6), rgba(100, 255, 218, 0.2))',
          transform: 'translateX(-50%)',
          borderRadius: '1px'
        }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2024" variant="secure" />
          <span style={{ 
            color: '#e6f1ff', 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.9rem'
          }}>
            Security Certification Achieved
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2023" variant="breach" />
          <span style={{ 
            color: '#e6f1ff', 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.9rem'
          }}>
            Security Incident Response
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2022" variant="default" />
          <span style={{ 
            color: '#e6f1ff', 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.9rem'
          }}>
            Security Training Completed
          </span>
        </div>
      </div>
    </ChipContainer>
  )
};

// Interactive Playground
export const Playground = {
  args: {
    date: '2020 - Present',
    variant: 'default'
  },
  render: (args) => (
    <ChipContainer title="Interactive Playground">
      <div style={{ textAlign: 'center' }}>
        <DateChip {...args} />
        <p style={{ 
          marginTop: '1rem', 
          color: 'rgba(100, 255, 218, 0.7)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem'
        }}>
          Hover to see cybersecurity effects • Try different variants above
        </p>
      </div>
    </ChipContainer>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <ChipContainer title="Desktop View">
        <DateChip date="2020 - Present" variant="secure" />
      </ChipContainer>
      
      <ChipContainer title="Mobile View">
        <div style={{ maxWidth: '320px' }}>
          <DateChip date="2020 - Present" variant="secure" />
        </div>
      </ChipContainer>
    </div>
  )
};

// Security Dashboard Grid
export const SecurityDashboard = {
  render: () => (
    <ChipContainer title="Security Dashboard Layout">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <DateChip date="Last Scan" variant="secure" />
          <p style={{ 
            marginTop: '0.5rem', 
            color: 'rgba(100, 255, 218, 0.7)',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            System Secure
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <DateChip date="Threat Detected" variant="breach" />
          <p style={{ 
            marginTop: '0.5rem', 
            color: 'rgba(255, 204, 0, 0.8)',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            Warning Level
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <DateChip date="Critical Alert" variant="critical" />
          <p style={{ 
            marginTop: '0.5rem', 
            color: 'rgba(255, 45, 85, 0.8)',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            Immediate Action
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <DateChip date="Next Update" variant="default" />
          <p style={{ 
            marginTop: '0.5rem', 
            color: 'rgba(230, 241, 255, 0.8)',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            Scheduled
          </p>
        </div>
      </div>
    </ChipContainer>
  )
};