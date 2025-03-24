/**
 * Storybook Utils Index
 * 
 * This file re-exports all decorators and utilities from the utils directory,
 * providing a clean, centralized import point for Storybook stories.
 * 
 * Example usage:
 * ```
 * import { 
 *   withDarkBackground, 
 *   withPortfolioContext,
 *   withHelmetProvider,
 *   withAnimationContext
 * } from '@stories-utils';
 * ```
 * 
 * Note: Decorators can be composed in story files using Storybook's native decorator system:
 * ```
 * export const MyStory = Template.bind({});
 * MyStory.decorators = [withPortfolioContext, withDarkBackground];
 * ```
 */

import type { ReactElement } from 'react';

// Types for decorators
export type Decorator = (Story: React.ComponentType<any>) => ReactElement;
export type ViewportDecorator = (viewportName: 'mobile' | 'tablet' | 'desktop') => Decorator;

// Mock Context Providers
export { withPortfolioContext } from './mocks/portfolioContext';
export { withHelmetProvider } from './mocks/helmetProvider';
export { withAnimationContext, mockAnimationData } from './mocks/animationContext';

// UI Decorators
export { 
  withDarkBackground,
  withViewport
} from './decorators/ui';

// Atomic Design Decorators
export {
  withAtomLayout,
  withMoleculeLayout,
  withOrganismLayout,
  withSecurityTheme,
  withContactTheme
} from './decorators/atomic';

// Mock Data
export { 
  mockPortfolioData,
  mockGithubProfile,
  mockStructuredData,
  mockThemeData
} from './mocks/data.js';