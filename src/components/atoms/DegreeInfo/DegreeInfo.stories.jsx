import React from 'react';
import DegreeInfo from './DegreeInfo';

const meta = {
  title: 'Atoms/DegreeInfo',
  component: DegreeInfo,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Display academic degree information with visual emphasis',
    docs: {
      description: {
        component: 'The DegreeInfo component presents academic degree information in a visually appealing format. It features a labeled structure with hover effects and responsive design, making it perfect for academic portfolios and educational sections. The component includes a subtle left border accent and smooth transitions for interactive feedback.'
      }
    }
  },
  argTypes: {
    degree: {
      control: 'text',
      description: 'The full title of the academic degree',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
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

// Container component for consistent spacing and background
const DegreeContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    maxWidth: '600px',
    margin: '1rem 0',
    borderRadius: '8px'
  }}>
    {children}
  </div>
);

// Default degree info
export const Default = {
  args: {
    degree: 'Bachelor of Science in Computer Science'
  },
  render: (args) => (
    <DegreeContainer>
      <DegreeInfo {...args} />
    </DegreeContainer>
  )
};

// Academic Levels
export const AcademicLevels = {
  render: () => (
    <DegreeContainer>
      <DegreeInfo degree="Doctor of Philosophy in Computer Science" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="Master of Science in Software Engineering" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="Bachelor of Science in Computer Science" />
    </DegreeContainer>
  )
};

// Degree Formats
export const DegreeFormats = {
  render: () => (
    <DegreeContainer>
      <DegreeInfo degree="Ph.D. in Artificial Intelligence" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="M.Sc. Computer Science" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="BSc (Hons) Computing" />
    </DegreeContainer>
  )
};

// Specializations
export const WithSpecializations = {
  render: () => (
    <DegreeContainer>
      <DegreeInfo degree="Master of Science in Cybersecurity with Network Security Specialization" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="Bachelor of Engineering in Computer Science and Artificial Intelligence" />
    </DegreeContainer>
  )
};

// Custom Styling
export const CustomStyling = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DegreeContainer background="var(--color-background-alt)">
        <DegreeInfo 
          degree="Master of Computer Science" 
          className="custom-degree-dark"
        />
      </DegreeContainer>
      <DegreeContainer background="var(--color-background-light)">
        <DegreeInfo 
          degree="Bachelor of Information Technology" 
          className="custom-degree-light"
        />
      </DegreeContainer>
    </div>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <DegreeContainer>
          <DegreeInfo degree="Master of Science in Data Science and Analytics" />
        </DegreeContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <DegreeContainer>
          <div style={{ maxWidth: '320px' }}>
            <DegreeInfo degree="Master of Science in Data Science and Analytics" />
          </div>
        </DegreeContainer>
      </div>
    </div>
  )
};

// International Degrees
export const InternationalDegrees = {
  render: () => (
    <DegreeContainer>
      <DegreeInfo degree="Diplôme d'Ingénieur en Informatique" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="Laurea Magistrale in Informatica" />
      <div style={{ margin: '1.5rem 0' }} />
      <DegreeInfo degree="Master en Ciencias de la Computación" />
    </DegreeContainer>
  )
};
