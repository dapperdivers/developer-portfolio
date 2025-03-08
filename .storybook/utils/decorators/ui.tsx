/**
 * UI Decorators for Storybook
 * 
 * This module provides purely visual/layout decorators for Storybook stories.
 * These decorators only handle presentation concerns and have no dependencies
 * on data providers or context.
 */

import React from 'react';
import type { Decorator, ViewportDecorator } from '../index';

/**
 * Provides dark background and appropriate styling for dark mode
 * stories. Useful for testing component appearance in dark mode.
 * 
 * @example
 * export const DarkMode = Template.bind({});
 * DarkMode.decorators = [withDarkBackground];
 */
export const withDarkBackground: Decorator = (Story) => {
  return (
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
};

/**
 * Viewport sizes available for the withViewport decorator
 */
type ViewportName = 'mobile' | 'tablet' | 'desktop';

/**
 * Viewport dimensions for different device sizes
 */
interface ViewportDimensions {
  width: string;
  height: string;
}

/**
 * Map of viewport names to their dimensions
 */
type ViewportMap = Record<ViewportName, ViewportDimensions>;

/**
 * Provides a responsive testing environment with different viewport sizes
 * 
 * @param viewportName - The name of the viewport to simulate (mobile, tablet, desktop)
 * @returns A decorator function
 * 
 * @example
 * export const Mobile = Template.bind({});
 * Mobile.decorators = [withViewport('mobile')];
 */
export const withViewport: ViewportDecorator = (viewportName) => (Story) => {
  const viewports: ViewportMap = {
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