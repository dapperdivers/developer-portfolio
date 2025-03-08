import React from 'react';
import ScrollToTop from './ScrollToTop';

const meta = {
  title: 'Atoms/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A floating button that appears when scrolling down and allows users to quickly return to the top of the page.',
      },
    },
  },
};

export default meta;

// Create a container with scrollable content
const ScrollContainer = ({ children }) => (
  <div style={{ height: '200vh', padding: '20px' }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', marginBottom: '20px' }}>
      Scroll down to see the button appear
    </div>
    {children}
    <div style={{ marginTop: '20px' }}>
      {Array(20).fill().map((_, i) => (
        <p key={i} style={{ marginBottom: '20px' }}>
          Scroll content {i + 1}
        </p>
      ))}
    </div>
  </div>
);

// Default story
export const Default = () => (
  <ScrollContainer>
    <ScrollToTop />
  </ScrollContainer>
);

// With custom content around it
export const WithContent = () => (
  <ScrollContainer>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Long Content Page</h1>
      <p>This is an example of how the ScrollToTop button appears in a real content page.</p>
      {Array(10).fill().map((_, i) => (
        <div key={i} style={{ marginBottom: '40px' }}>
          <h2>Section {i + 1}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      ))}
    </div>
    <ScrollToTop />
  </ScrollContainer>
);

// In a dark theme context
export const DarkTheme = () => (
  <div style={{ 
    backgroundColor: '#1a1a1a', 
    color: '#fff',
    minHeight: '200vh',
    padding: '20px'
  }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#1a1a1a', padding: '10px', marginBottom: '20px' }}>
      Dark theme example
    </div>
    {Array(20).fill().map((_, i) => (
      <p key={i} style={{ marginBottom: '20px' }}>
        Dark theme content {i + 1}
      </p>
    ))}
    <ScrollToTop />
  </div>
);

// With reduced motion
export const ReducedMotion = () => (
  <div style={{ 
    minHeight: '200vh',
    padding: '20px'
  }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', marginBottom: '20px' }}>
      This example simulates the reduced-motion experience
    </div>
    <p style={{ marginBottom: '20px' }}>
      Note: This story demonstrates how the component behaves when the user has enabled reduced-motion preferences.
    </p>
    {Array(20).fill().map((_, i) => (
      <p key={i} style={{ marginBottom: '20px' }}>
        Content section {i + 1}
      </p>
    ))}
    <ScrollToTop />
  </div>
); 