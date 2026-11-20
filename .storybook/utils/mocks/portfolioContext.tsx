/**
 * Portfolio Context Provider for Storybook
 * 
 * This module provides a mock Portfolio context provider for testing components
 * in Storybook that depend on portfolio data.
 */

import React from 'react';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData } from './data';
import type { Decorator } from '../index';
import type { PortfolioData } from '@/types/portfolio';

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
  // The mock is a deliberately small subset of the site data
  const portfolioContextValue = mockPortfolioData as unknown as PortfolioData;
  return (
    <PortfolioContext.Provider value={portfolioContextValue}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default withPortfolioContext; 