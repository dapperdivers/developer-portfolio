import React from 'react';

const Introduction = () => (
  <div style={{ 
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  }}>
    <h1 style={{ color: '#0062cc', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
      Developer Portfolio Component Library
    </h1>
    
    <p>
      Welcome to the component library for the Developer Portfolio project.
      This Storybook contains all the UI components that make up the portfolio website.
    </p>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Component Organization</h2>
    <p>
      Components are organized following the Atomic Design methodology:
    </p>
    <ul style={{ lineHeight: '1.6' }}>
      <li><strong>Atoms</strong> - Basic building blocks like buttons, cards, and inputs</li>
      <li><strong>Molecules</strong> - Combinations of atoms that form more complex components</li>
      <li><strong>Organisms</strong> - Complex components made up of molecules and atoms</li>
      <li><strong>Layout</strong> - Components that define the layout structure</li>
    </ul>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Getting Started</h2>
    <p>
      Browse components by category in the sidebar. Each component has various examples
      showing different states and variations.
    </p>
    
    <div style={{ 
      background: '#f5f5f5', 
      padding: '15px', 
      borderRadius: '5px',
      marginTop: '20px',
      borderLeft: '4px solid #0062cc'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Tips for Using This Storybook</h3>
      <ul style={{ lineHeight: '1.6', margin: '0' }}>
        <li>Click the "Docs" tab to see detailed documentation for each component</li>
        <li>Use the "Controls" panel to interact with component props</li>
        <li>View the component in different device sizes using the viewport toolbar</li>
      </ul>
    </div>
  </div>
);

export default {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    options: {
      showPanel: false,
    },
  }
};

export const Main = () => <Introduction />;