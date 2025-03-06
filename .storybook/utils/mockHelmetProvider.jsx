import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

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
export const withHelmetProvider = (Story) => {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Story />
    </HelmetProvider>
  );
};