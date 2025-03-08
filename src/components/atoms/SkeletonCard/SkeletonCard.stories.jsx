import React from 'react';
import SkeletonCard from './SkeletonCard';

export default {
  title: 'Atoms/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    componentSubtitle: 'Loading placeholder cards with security-themed variants',
    docs: {
      description: {
        component: 'SkeletonCard provides animated loading placeholders for various content types. It supports different card types (project, experience, skill) and visual variants (default, security, terminal) with customizable animations.'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select', options: ['project', 'experience', 'skill', 'default'] },
      description: 'Type of skeleton card to display',
      table: {
        type: { summary: 'project | experience | skill | default' },
        defaultValue: { summary: 'project' }
      }
    },
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    index: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Index for staggered animation timing',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    }
  }
};

// Container for consistent display
const CardContainer = ({ children, style = {} }) => (
  <div style={{ 
    maxWidth: '600px',
    padding: '20px',
    background: 'var(--color-background, #0a192f)',
    ...style
  }}>
    {children}
  </div>
);

// Default project skeleton
export const Default = () => (
  <CardContainer>
    <SkeletonCard type="project" />
  </CardContainer>
);

// All card types
export const CardTypes = () => (
  <CardContainer>
    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Project Card</h4>
    <SkeletonCard type="project" />
    
    <h4 style={{ color: '#fff', margin: '20px 0' }}>Experience Card</h4>
    <SkeletonCard type="experience" />
    
    <h4 style={{ color: '#fff', margin: '20px 0' }}>Skill Card</h4>
    <SkeletonCard type="skill" />
    
    <h4 style={{ color: '#fff', margin: '20px 0' }}>Default Card</h4>
    <SkeletonCard type="default" />
  </CardContainer>
);

// Visual variants
export const Variants = () => (
  <CardContainer>
    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Default Variant</h4>
    <SkeletonCard type="project" />
    
    <h4 style={{ color: '#fff', margin: '20px 0' }}>Security Variant</h4>
    <SkeletonCard type="project" variant="security" />
    
    <h4 style={{ color: '#fff', margin: '20px 0' }}>Terminal Variant</h4>
    <SkeletonCard type="project" variant="terminal" />
  </CardContainer>
);

// Staggered animation
export const StaggeredLoading = () => (
  <CardContainer>
    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Staggered Animation</h4>
    {[0, 1, 2].map((index) => (
      <SkeletonCard
        key={index}
        type="project"
        variant="security"
        index={index}
      />
    ))}
  </CardContainer>
);

// Mixed variants and types
export const MixedContent = () => (
  <CardContainer>
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>Projects</h4>
        <SkeletonCard type="project" variant="security" index={0} />
        <SkeletonCard type="project" variant="terminal" index={1} />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>Experience</h4>
        <SkeletonCard type="experience" variant="security" index={2} />
        <SkeletonCard type="experience" variant="terminal" index={3} />
      </div>
    </div>
  </CardContainer>
);

// Loading state grid
export const LoadingGrid = () => (
  <CardContainer style={{ maxWidth: '1200px' }}>
    <div style={{ 
      display: 'grid', 
      gap: '20px', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
    }}>
      {[...Array(6)].map((_, index) => (
        <SkeletonCard
          key={index}
          type="project"
          variant={index % 2 === 0 ? 'security' : 'terminal'}
          index={index}
        />
      ))}
    </div>
  </CardContainer>
);

// Responsive example
export const Responsive = () => (
  <div>
    <CardContainer style={{ maxWidth: '900px', marginBottom: '30px' }}>
      <h4 style={{ color: '#fff', marginBottom: '15px' }}>Desktop View</h4>
      <div style={{ 
        display: 'grid', 
        gap: '20px', 
        gridTemplateColumns: 'repeat(3, 1fr)'
      }}>
        <SkeletonCard type="project" variant="security" />
        <SkeletonCard type="project" variant="terminal" />
        <SkeletonCard type="project" variant="security" />
      </div>
    </CardContainer>

    <CardContainer style={{ maxWidth: '400px' }}>
      <h4 style={{ color: '#fff', marginBottom: '15px' }}>Mobile View</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <SkeletonCard type="project" variant="security" />
        <SkeletonCard type="project" variant="terminal" />
      </div>
    </CardContainer>
  </div>
); 