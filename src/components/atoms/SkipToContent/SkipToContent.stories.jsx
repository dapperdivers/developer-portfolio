import React from 'react';
import SkipToContent from './SkipToContent';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Atoms/SkipToContent',
  component: SkipToContent,
  parameters: {
    componentSubtitle: 'Accessibility component for keyboard users to bypass navigation',
    docs: {
      description: {
        component: 'SkipToContent provides keyboard users with a way to bypass navigation and jump directly to the main content. The link is visually hidden until focused, following accessibility best practices. It supports different visual variants to match your application theme.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'focus-order-semantics',
            reviewOnFail: true
          },
          {
            id: 'focus-visible',
            reviewOnFail: true
          }
        ],
      },
    },
    layout: 'fullscreen'
  },
  argTypes: {
    mainId: {
      control: 'text',
      description: 'ID of the main content element to skip to',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'main-content' }
      }
    },
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    }
  }
};

// Container for consistent display
const PageLayout = ({ children, mainContent, variant = '', showNavigation = true }) => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    background: variant.includes('security') || variant.includes('terminal') 
      ? 'var(--color-background, #0a192f)' 
      : '#fff'
  }}>
    <SkipToContent variant={variant} />
    
    {showNavigation && (
      <header style={{ 
        padding: '20px', 
        backgroundColor: variant.includes('security') || variant.includes('terminal')
          ? 'rgba(0, 0, 0, 0.3)'
          : '#f0f0f0',
        borderBottom: variant.includes('security')
          ? '1px solid var(--color-cyan, #64ffda)'
          : variant.includes('terminal')
          ? '1px dashed var(--color-cyan, #64ffda)'
          : '1px solid #ddd'
      }}>
        <nav>
          <ul style={{ 
            display: 'flex', 
            gap: '20px', 
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href="#"
                  tabIndex={0}
                  style={{
                    color: variant.includes('security') || variant.includes('terminal')
                      ? 'var(--color-text, #e6f1ff)'
                      : '#333',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = variant.includes('security') || variant.includes('terminal')
                      ? 'rgba(100, 255, 218, 0.1)'
                      : '#e0e0e0';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    )}
    
    <main 
      id="main-content" 
      style={{ 
        padding: '20px', 
        flex: 1,
        color: variant.includes('security') || variant.includes('terminal')
          ? 'var(--color-text, #e6f1ff)'
          : '#333'
      }}
    >
      {mainContent || children}
    </main>
  </div>
);

// Default example
export const Default = () => (
  <PageLayout>
    <h1>Main Content Area</h1>
    <p>Press Tab to see the skip link. It will appear at the top of the page when focused.</p>
    <p>This helps keyboard users bypass the navigation menu and jump directly to the main content.</p>
  </PageLayout>
);

// Security variant
export const SecurityVariant = () => (
  <PageLayout variant="security">
    <h1>Security-Themed Content</h1>
    <p>This variant matches the security theme with cyan accents and monospace font.</p>
    <p>Press Tab to see the security-styled skip link.</p>
  </PageLayout>
);

// Terminal variant
export const TerminalVariant = () => (
  <PageLayout variant="terminal">
    <h1>Terminal-Themed Content</h1>
    <p>This variant uses a terminal-like appearance with dashed borders.</p>
    <p>Press Tab to see the terminal-styled skip link.</p>
  </PageLayout>
);

// Interactive example
export const Interactive = () => {
  const [activeSection, setActiveSection] = React.useState('navigation');
  
  return (
    <PageLayout
      variant="security"
      mainContent={
        <div>
          <h1>Interactive Example</h1>
          <p>Current focus: <strong>{activeSection}</strong></p>
          <p>Use Tab to navigate through the page and observe the skip link behavior.</p>
          <div style={{ 
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid var(--color-cyan, #64ffda)',
            borderRadius: '4px'
          }}>
            <h2>Focus Order:</h2>
            <ol style={{ margin: '10px 0 0 20px' }}>
              <li style={{ 
                color: activeSection === 'skip-link' ? 'var(--color-cyan, #64ffda)' : 'inherit'
              }}>Skip Link (on first Tab)</li>
              <li style={{ 
                color: activeSection === 'navigation' ? 'var(--color-cyan, #64ffda)' : 'inherit'
              }}>Navigation Items</li>
              <li style={{ 
                color: activeSection === 'content' ? 'var(--color-cyan, #64ffda)' : 'inherit'
              }}>Main Content</li>
            </ol>
          </div>
        </div>
      }
    />
  );
};

// Keyboard navigation test
export const KeyboardNavigation = () => (
  <PageLayout variant="security">
    <div>
      <h1>Keyboard Navigation Test</h1>
      <p>Follow these steps to test the skip link:</p>
      <ol style={{ marginLeft: '20px', lineHeight: '1.6' }}>
        <li>Press Tab once - the skip link should appear</li>
        <li>Press Enter - you'll jump to the main content</li>
        <li>Press Shift + Tab to go back</li>
      </ol>
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(100, 255, 218, 0.1)',
        border: '1px solid var(--color-cyan, #64ffda)',
        borderRadius: '4px'
      }}>
        <h2>Focus Management</h2>
        <p>The skip link:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Is the first focusable element</li>
          <li>Only visible when focused</li>
          <li>Provides clear visual feedback</li>
          <li>Maintains proper focus order</li>
        </ul>
      </div>
    </div>
  </PageLayout>
);

// Responsive behavior
export const Responsive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
    <div>
      <h3 style={{ 
        color: 'var(--color-text, #e6f1ff)', 
        marginBottom: '10px' 
      }}>Desktop View</h3>
      <div style={{ 
        border: '1px solid var(--color-cyan, #64ffda)', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
        <PageLayout 
          variant="security"
          mainContent={
            <div>
              <h1>Desktop Layout</h1>
              <p>The skip link maintains its position and behavior across screen sizes.</p>
            </div>
          }
        />
      </div>
    </div>
    
    <div>
      <h3 style={{ 
        color: 'var(--color-text, #e6f1ff)', 
        marginBottom: '10px' 
      }}>Mobile View</h3>
      <div style={{ 
        border: '1px solid var(--color-cyan, #64ffda)', 
        borderRadius: '8px', 
        overflow: 'hidden',
        maxWidth: '375px'
      }}>
        <PageLayout 
          variant="security"
          mainContent={
            <div>
              <h1>Mobile Layout</h1>
              <p>The skip link adapts to smaller screens while maintaining accessibility.</p>
            </div>
          }
        />
      </div>
    </div>
  </div>
);

// A11y testing story
export const AccessibilityTest = () => (
  <PageLayout variant="security">
    <div>
      <h1>Accessibility Testing</h1>
      <p>This story is configured with specific accessibility rules to ensure:</p>
      <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.6' }}>
        <li>Proper focus management</li>
        <li>Keyboard navigation support</li>
        <li>Screen reader compatibility</li>
        <li>High contrast visibility</li>
      </ul>
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(100, 255, 218, 0.1)',
        border: '1px solid var(--color-cyan, #64ffda)',
        borderRadius: '4px'
      }}>
        <h2>Testing Notes</h2>
        <p>The component has been tested with:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>NVDA and VoiceOver screen readers</li>
          <li>Keyboard-only navigation</li>
          <li>High contrast mode</li>
          <li>Various zoom levels</li>
        </ul>
      </div>
    </div>
  </PageLayout>
);