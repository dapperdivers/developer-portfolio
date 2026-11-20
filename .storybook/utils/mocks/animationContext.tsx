/**
 * Animation Context Provider for Storybook
 *
 * This module provides a mock Animation context provider for testing components
 * in Storybook that depend on animation state and controls.
 */

import React from 'react';
import { AnimationContext, AnimationContextType } from '../../../src/context/AnimationContext';
import type { Decorator } from '../index';

/**
 * Mock animation context data: animations on, no reduced-motion preference
 */
export const mockAnimationData: AnimationContextType = {
  animationEnabled: true,
  prefersReducedMotion: false
};

/**
 * Provides mock AnimationContext to stories
 * Use for components that depend on animation features
 * 
 * @example
 * // In a story file:
 * import { withAnimationContext } from '@stories-utils';
 * 
 * export default {
 *   title: 'Components/MyComponent',
 *   component: MyComponent,
 *   decorators: [withAnimationContext],
 * };
 */
export const withAnimationContext: Decorator = (Story) => {
  return React.createElement(
    AnimationContext.Provider,
    { value: mockAnimationData },
    React.createElement(Story)
  );
};

export default withAnimationContext; 