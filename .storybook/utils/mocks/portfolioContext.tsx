/**
 * Portfolio Context Provider for Storybook
 * 
 * This module provides a mock Portfolio context provider for testing components
 * in Storybook that depend on portfolio data.
 */

import React from 'react';
import PortfolioContext from '../../../src/context/PortfolioContext';
import { mockPortfolioData } from './data';
import type { Decorator } from '../index';

/**
 * Provides mock PortfolioContext to stories
 * Use for components that depend on portfolio data
 * 
 * @example
 * // In a story file:
 * import { withPortfolioContext } from '@stories-utils';
 * 
 * export default {
 *   title: 'Components/MyComponent',
 *   component: MyComponent,
 *   decorators: [withPortfolioContext],
 * };
 */
export const withPortfolioContext: Decorator = (Story) => {
  const portfolioContextValue = mockPortfolioData;
  return (
    <PortfolioContext.Provider value={portfolioContextValue}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default withPortfolioContext; 