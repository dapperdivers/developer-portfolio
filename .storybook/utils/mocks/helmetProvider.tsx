/**
 * Helmet Context Provider for Storybook
 * 
 * This module provides a mock Helmet context provider for testing components
 * in Storybook that use react-helmet-async.
 */

import React from 'react';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import type { Decorator } from '../index';

/**
 * A decorator that provides a HelmetProvider with a mock context.
 * This is necessary for components that use react-helmet-async to work in Storybook.
 * 
 * @example
 * export default {
 *   title: 'Components/MyComponent',
 *   component: MyComponent,
 *   decorators: [withHelmetProvider],
 * };
 */
export const withHelmetProvider: Decorator = (Story) => {
  // Create an empty helmet context
  const helmetContext: { helmet?: HelmetServerState } = {};
  
  return (
    <HelmetProvider context={helmetContext}>
      <Story />
    </HelmetProvider>
  );
};

export default withHelmetProvider; 