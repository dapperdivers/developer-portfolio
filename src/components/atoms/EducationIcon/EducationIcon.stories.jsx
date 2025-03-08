import React from 'react';
import EducationIcon from './EducationIcon';

export default {
  title: 'Atoms/EducationIcon',
  component: EducationIcon,
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
    }
  }
};

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
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.1)',
        borderRadius: '8px'
      }}>
        <EducationIcon className="education-icon-large" />
        <div style={{ color: '#fff' }}>
          <div style={{ fontWeight: 'bold' }}>Master of Science</div>
          <div style={{ color: 'var(--color-text-muted, #8892b0)', fontSize: '0.875rem' }}>
            Artificial Intelligence
          </div>
        </div>
      </div>
    </div>
  </IconContainer>
);

// Timeline example
export const InTimeline = () => (
  <IconContainer>
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      position: 'relative',
      paddingLeft: '3rem'
    }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '1.5rem',
        top: '2rem',
        bottom: '2rem',
        width: '2px',
        background: 'var(--color-cyan, #64ffda)',
        transform: 'translateX(-50%)'
      }} />
      
      <div>
        <EducationIcon className="education-icon-large" />
        <div style={{ 
          marginTop: '1rem',
          color: '#fff'
        }}>
          <div style={{ fontWeight: 'bold' }}>2023</div>
          <div style={{ marginTop: '0.5rem' }}>Ph.D. in Computer Science</div>
          <div style={{ color: 'var(--color-text-muted, #8892b0)', fontSize: '0.875rem' }}>
            Stanford University
          </div>
        </div>
      </div>
      
      <div>
        <EducationIcon />
        <div style={{ 
          marginTop: '1rem',
          color: '#fff'
        }}>
          <div style={{ fontWeight: 'bold' }}>2020</div>
          <div style={{ marginTop: '0.5rem' }}>Master's in AI</div>
          <div style={{ color: 'var(--color-text-muted, #8892b0)', fontSize: '0.875rem' }}>
            MIT
          </div>
        </div>
      </div>
      
      <div>
        <EducationIcon />
        <div style={{ 
          marginTop: '1rem',
          color: '#fff'
        }}>
          <div style={{ fontWeight: 'bold' }}>2018</div>
          <div style={{ marginTop: '0.5rem' }}>Bachelor's in CS</div>
          <div style={{ color: 'var(--color-text-muted, #8892b0)', fontSize: '0.875rem' }}>
            UC Berkeley
          </div>
        </div>
      </div>
    </div>
  </IconContainer>
);

// Grid layout
export const IconGrid = () => (
  <IconContainer>
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '2rem',
      padding: '2rem',
      background: 'rgba(100, 255, 218, 0.05)',
      borderRadius: '8px',
      border: '1px solid var(--color-cyan, #64ffda)'
    }}>
      {[...Array(6)].map((_, index) => (
        <div 
          key={index}
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <EducationIcon className={index % 2 === 0 ? 'education-icon-large' : ''} />
        </div>
      ))}
    </div>
  </IconContainer>
);

// Responsive example
export const Responsive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Desktop View</h3>
      <IconContainer>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.5rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '8px'
        }}>
          <EducationIcon className="education-icon-large" />
          <div style={{ color: '#fff' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Master's Degree</div>
            <div style={{ color: 'var(--color-text-muted, #8892b0)' }}>
              Computer Science & Engineering
            </div>
          </div>
        </div>
      </IconContainer>
    </div>
    
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Mobile View</h3>
      <IconContainer style={{ maxWidth: '350px' }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '8px'
        }}>
          <EducationIcon />
          <div style={{ color: '#fff' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Master's Degree</div>
            <div style={{ 
              color: 'var(--color-text-muted, #8892b0)',
              fontSize: '0.875rem'
            }}>
              Computer Science & Engineering
            </div>
          </div>
        </div>
      </IconContainer>
    </div>
  </div>
);
