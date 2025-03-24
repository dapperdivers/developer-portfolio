/**
 * Atomic Design Decorators for Storybook
 * 
 * This module provides decorators for components following the Atomic Design pattern.
 * These decorators handle presentation concerns for different component types (atoms, molecules, organisms)
 * and provide consistent styling for themed components.
 */

import React from 'react';
import type { Decorator } from '../index';

/**
 * Provides a centered layout with dark background for atomic components.
 * Useful for showcasing small, self-contained components.
 * 
 * @example
 * export const Default = Template.bind({});
 * Default.decorators = [withAtomLayout];
 */
export const withAtomLayout: Decorator = (Story) => {
  return (
    <div style={{ 
      padding: '2rem', 
      background: '#121212', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <Story />
    </div>
  );
};

/**
 * Provides a full-width layout with dark background for molecule components.
 * Suitable for more complex components that combine multiple atoms.
 * 
 * @example
 * export const Default = Template.bind({});
 * Default.decorators = [withMoleculeLayout];
 */
export const withMoleculeLayout: Decorator = (Story) => {
  return (
    <div style={{ 
      padding: '2rem', 
      background: '#121212',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Story />
    </div>
  );
};

/**
 * Provides a full-page layout with dark background for organism components.
 * Ideal for page-level components or complex UI sections.
 * 
 * @example
 * export const Default = Template.bind({});
 * Default.decorators = [withOrganismLayout];
 */
export const withOrganismLayout: Decorator = (Story) => {
  return (
    <div style={{ 
      background: '#0a1929',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Story />
    </div>
  );
};

/**
 * Provides a security-themed background with grid pattern.
 * Useful for components with security or technical themes.
 * 
 * @example
 * export const Default = Template.bind({});
 * Default.decorators = [withSecurityTheme];
 */
export const withSecurityTheme: Decorator = (Story) => {
  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #0a2e38 0%, #000 100%)',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Security grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to right, rgba(79, 209, 197, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 209, 197, 0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Story />
      </div>
    </div>
  );
};

/**
 * Provides a contact-themed background with gradient.
 * Suitable for contact forms, profile cards, or social components.
 * 
 * @example
 * export const Default = Template.bind({});
 * Default.decorators = [withContactTheme];
 */
export const withContactTheme: Decorator = (Story) => {
  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #0a1929 0%, #0a2e38 100%)',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    }}>
      <Story />
    </div>
  );
};