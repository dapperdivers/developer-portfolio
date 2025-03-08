import React from 'react';
import FieldsOfStudy from './FieldsOfStudy';

export default {
  title: 'Atoms/FieldsOfStudy',
  component: FieldsOfStudy,
  parameters: {
    componentSubtitle: 'Display major and minor fields of study with visual hierarchy',
    docs: {
      description: {
        component: 'A component for displaying academic fields of study, featuring a clear visual distinction between major and minor fields. Supports responsive layouts and themed styling.'
      }
    }
  },
  argTypes: {
    major: {
      control: 'text',
      description: 'Major field of study',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    minor: {
      control: 'text',
      description: 'Minor field of study (optional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' }
      }
    }
  }
};

// Container for consistent display
const StudyContainer = ({ children, style = {} }) => (
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

// Default example with both major and minor
export const Default = () => (
  <StudyContainer>
    <FieldsOfStudy 
      major="Computer Science"
      minor="Mathematics"
    />
  </StudyContainer>
);

// Major only
export const MajorOnly = () => (
  <StudyContainer>
    <FieldsOfStudy 
      major="Software Engineering"
    />
  </StudyContainer>
);

// Long field names
export const LongFieldNames = () => (
  <StudyContainer>
    <FieldsOfStudy 
      major="Artificial Intelligence and Machine Learning Engineering"
      minor="Human-Computer Interaction and User Experience Design"
    />
  </StudyContainer>
);

// Multiple examples
export const MultipleExamples = () => (
  <StudyContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Technical Fields</h4>
        <FieldsOfStudy 
          major="Computer Science"
          minor="Data Science"
        />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Business Fields</h4>
        <FieldsOfStudy 
          major="Business Administration"
          minor="Economics"
        />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Arts Fields</h4>
        <FieldsOfStudy 
          major="Digital Media Design"
          minor="Interactive Arts"
        />
      </div>
    </div>
  </StudyContainer>
);

// With custom styling
export const CustomStyling = () => (
  <StudyContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.1)',
        border: '1px solid var(--color-cyan, #64ffda)',
        borderRadius: '4px'
      }}>
        <FieldsOfStudy 
          major="Cybersecurity"
          minor="Network Engineering"
          className="security-themed"
        />
      </div>
      
      <div style={{ 
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px dashed var(--color-cyan, #64ffda)',
        borderRadius: '4px'
      }}>
        <FieldsOfStudy 
          major="DevOps Engineering"
          minor="Cloud Architecture"
          className="terminal-themed"
        />
      </div>
    </div>
  </StudyContainer>
);

// Responsive behavior
export const Responsive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Desktop View</h3>
      <StudyContainer>
        <FieldsOfStudy 
          major="Computer Engineering"
          minor="Robotics"
        />
      </StudyContainer>
    </div>
    
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Mobile View</h3>
      <StudyContainer style={{ maxWidth: '350px' }}>
        <FieldsOfStudy 
          major="Computer Engineering"
          minor="Robotics"
        />
      </StudyContainer>
    </div>
  </div>
);

// With academic context
export const AcademicContext = () => (
  <StudyContainer>
    <div style={{ 
      padding: '1.5rem',
      background: 'rgba(100, 255, 218, 0.05)',
      border: '1px solid var(--color-cyan, #64ffda)',
      borderRadius: '8px'
    }}>
      <div style={{ 
        color: '#fff',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Stanford University</h3>
        <p style={{ color: 'var(--color-text-muted, #8892b0)' }}>Class of 2023</p>
      </div>
      
      <FieldsOfStudy 
        major="Computer Science"
        minor="Artificial Intelligence"
      />
      
      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.1)',
        borderRadius: '4px',
        color: 'var(--color-text-muted, #8892b0)',
        fontSize: '0.875rem'
      }}>
        <p>Specialized in Machine Learning and Neural Networks</p>
        <p style={{ marginTop: '0.5rem' }}>GPA: 3.92/4.0</p>
      </div>
    </div>
  </StudyContainer>
); 