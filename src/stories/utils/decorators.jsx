/**
 * Storybook Decorators
 * 
 * This file contains reusable decorators for Storybook stories,
 * primarily for providing context to components that require it.
 */

import React from 'react';
import PortfolioContext from '../../context/PortfolioContext';
import { mockPortfolioData } from './mockData';

/**
 * Provides PortfolioContext to stories
 * Use for components that depend on portfolio data
 * 
 * @example
 * // In a story file:
 * import { withPortfolioContext } from '../utils/decorators';
 * 
 * export default {
 *   title: 'Components/MyComponent',
 *   component: MyComponent,
 *   decorators: [withPortfolioContext],
 * };
 */
export const withPortfolioContext = (Story) => (
  <PortfolioContext.Provider value={mockPortfolioData}>
    <Story />
  </PortfolioContext.Provider>
);

/**
 * Provides dark background and appropriate styling for dark mode
 * stories. Useful for testing component appearance in dark mode.
 * 
 * @example
 * export const DarkMode = Template.bind({});
 * DarkMode.decorators = [withDarkBackground];
 */
export const withDarkBackground = (Story) => (
  <div style={{ 
    padding: '2rem', 
    backgroundColor: '#121212', 
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Story />
  </div>
);

/**
 * Example of using multiple decorators together
 * Provides both portfolio context and a dark background
 */
export const withPortfolioAndDarkMode = (Story) => (
  <PortfolioContext.Provider value={mockPortfolioData}>
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#121212', 
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Story />
    </div>
  </PortfolioContext.Provider>
);

/**
 * Provides a responsive testing environment with different viewport sizes
 * @param {*} viewportName - The name of the viewport to simulate
 * @returns A decorator function
 * 
 * @example
 * export const Mobile = Template.bind({});
 * Mobile.decorators = [withViewport('mobile')];
 */
export const withViewport = (viewportName) => (Story) => {
  const viewports = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '1280px', height: '800px' },
  };
  
  return (
    <div style={{ 
      ...viewports[viewportName],
      overflow: 'auto',
      resize: 'both',
      border: '1px dashed #ccc',
      padding: '8px'
    }}>
      <Story />
    </div>
  );
};
