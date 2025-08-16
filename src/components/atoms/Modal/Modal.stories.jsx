import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'Atoms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A full-screen modal component that uses React portals to escape parent constraints. Perfect for displaying detailed content with cybersecurity theming.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open'
    },
    onClose: {
      action: 'closed',
      description: 'Handler function called when modal is closed'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Modal size variant'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes the modal'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button'
    }
  }
};

// Template for creating stories
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: 'var(--color-cyan)',
          color: 'var(--color-navy)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-jetbrains)'
        }}
      >
        Open Modal
      </button>
      
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div style={{ color: 'var(--color-offwhite)', fontFamily: 'var(--font-family-inter)' }}>
          <h2 style={{ 
            color: 'var(--color-cyan)', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-family-jetbrains)'
          }}>
            Modal Content
          </h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            This is a full-screen modal that uses React portals to render at the document body level,
            ensuring it escapes any parent container constraints.
          </p>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            The modal features cybersecurity theming with a dark backdrop, glowing borders,
            and smooth animations. It's fully accessible with keyboard navigation support.
          </p>
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(var(--color-cyan-rgb), 0.1)',
            border: '1px solid rgba(var(--color-cyan-rgb), 0.3)',
            borderRadius: '6px',
            marginTop: '1rem'
          }}>
            <strong style={{ color: 'var(--color-cyan)' }}>Features:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
              <li>React portals for proper rendering</li>
              <li>Full viewport coverage</li>
              <li>Keyboard navigation (ESC to close)</li>
              <li>Click outside to close</li>
              <li>Responsive design</li>
              <li>Accessibility support</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  size: 'md',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true
};

// Small modal
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true
};

// Large modal
export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true
};

// Extra large modal
export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true
};

// Modal without close button
export const NoCloseButton = Template.bind({});
NoCloseButton.args = {
  size: 'md',
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: false
};

// Modal that doesn't close on backdrop click
export const NoBackdropClose = Template.bind({});
NoBackdropClose.args = {
  size: 'md',
  closeOnBackdropClick: false,
  closeOnEscape: true,
  showCloseButton: true
};

// Skill card content example
export const SkillCardExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mockSkill = {
    skillName: 'Advanced Threat Detection',
    iconName: 'mdi:shield-search',
    description: 'Comprehensive threat detection and analysis using machine learning algorithms and behavioral analytics to identify sophisticated attack patterns and zero-day exploits.',
    level: 4,
    securityDomain: 'Threat Intelligence'
  };
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: 'var(--color-cyan)',
          color: 'var(--color-navy)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-jetbrains)'
        }}
      >
        Open Skill Details
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        className="skill-modal"
      >
        <div style={{ color: 'var(--color-offwhite)' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(var(--color-cyan-rgb), 0.3)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(var(--color-cyan-rgb), 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(var(--color-cyan-rgb), 0.4)'
            }}>
              🛡️
            </div>
            <h3 style={{ 
              color: 'var(--color-cyan)', 
              margin: 0,
              fontFamily: 'var(--font-family-jetbrains)',
              fontSize: '1.25rem'
            }}>
              {mockSkill.skillName}
            </h3>
          </div>
          
          {/* Content */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>
              {mockSkill.description}
            </p>
          </div>
          
          {/* Level */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <span style={{ 
              fontFamily: 'var(--font-family-jetbrains)',
              color: 'var(--color-gray-400)',
              fontSize: '0.9rem'
            }}>
              Proficiency:
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map(dot => (
                <div
                  key={dot}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: dot <= mockSkill.level 
                      ? 'var(--color-cyan)' 
                      : 'rgba(var(--color-cyan-rgb), 0.2)',
                    border: '1px solid rgba(var(--color-cyan-rgb), 0.3)',
                    boxShadow: dot <= mockSkill.level 
                      ? '0 0 6px rgba(var(--color-cyan-rgb), 0.4)' 
                      : 'none'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Domain Badge */}
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '500',
            fontFamily: 'var(--font-family-jetbrains)',
            background: 'linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.2) 0%, rgba(var(--color-cyan-rgb), 0.1) 100%)',
            border: '1px solid rgba(var(--color-cyan-rgb), 0.3)',
            color: 'var(--color-cyan)'
          }}>
            {mockSkill.securityDomain}
          </div>
        </div>
      </Modal>
    </>
  );
};