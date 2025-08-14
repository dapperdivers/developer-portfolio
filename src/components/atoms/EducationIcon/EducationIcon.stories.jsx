import React from 'react';
import EducationIcon from './EducationIcon';

const meta = {
  title: 'Atoms/EducationIcon',
  component: EducationIcon,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Graduation cap icon with interactive animations and size variants',
    docs: {
      description: {
        component: 'A visually appealing education icon component featuring gradient backgrounds, hover effects, and responsive sizing. Perfect for education-related sections and academic achievements.'
      }
    }
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' }
      }
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    }
  }
};

export default meta;

// Container for consistent display
const IconContainer = ({ children, style = {} }) => (
  <div style={{ 
    padding: '20px',
    background: 'var(--color-background, #0a192f)',
    borderRadius: '8px',
    maxWidth: '800px',
    ...style
  }}>
    {children}
  </div>
);

// Default icon
export const Default = () => (
  <IconContainer>
    <EducationIcon />
  </IconContainer>
);

// Size variants
export const Sizes = () => (
  <IconContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Default Size</h4>
        <EducationIcon />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Large Size</h4>
        <EducationIcon className="education-icon-large" />
      </div>
    </div>
  </IconContainer>
);

// With labels
export const WithLabels = () => (
  <IconContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.1)',
        borderRadius: '8px'
      }}>
        <EducationIcon />
        <div style={{ color: '#fff' }}>
          <div style={{ fontWeight: 'bold' }}>Bachelor of Science</div>
          <div style={{ color: 'var(--color-text-muted, #8892b0)', fontSize: '0.875rem' }}>
            Computer Science
          </div>
        </div>
      </div>
    </div>
  </IconContainer>
);