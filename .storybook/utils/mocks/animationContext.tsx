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
 * Mock animation context data with working no-op implementations
 */
export const mockAnimationData: AnimationContextType = {
  inView: true, // Always in view for stories
  setInView: () => {}, // No-op for stories
  animationEnabled: true,
  entryAnimations: {},
  registerEntryAnimation: (id: string, initialState: string = 'visible') => {
    // In Storybook, we'll default all animations to visible
    // This ensures elements are shown immediately without animations
    console.log(`[Storybook] Registered animation for ${id} with state ${initialState}`);
  },
  playEntryAnimation: (id: string, delay: number = 0) => {
    console.log(`[Storybook] Playing animation for ${id} with delay ${delay}`);
  },
  resetEntryAnimations: () => {
    console.log(`[Storybook] Reset animations`);
  },
  animationStaggerDelay: 0,
  getAnimationDelay: (index: number) => '0s', // No delay in Storybook
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
  return (
    <AnimationContext.Provider value={mockAnimationData}>
      <Story />
    </AnimationContext.Provider>
  );
};

export default withAnimationContext; 