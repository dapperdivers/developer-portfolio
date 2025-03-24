/**
 * Animation Context Provider for Storybook
 *
 * This module provides a mock Animation context provider for testing components
 * in Storybook that depend on animation state and controls.
 */

import React from 'react';
import { AnimationContext, AnimationContextType } from '../../../src/context/AnimationContext';
import type { Decorator } from '../index';

// Define standard variants to use across components
const defaultFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const defaultSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const defaultScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const defaultPulse = {
  hidden: { opacity: 0.6 },
  visible: {
    opacity: [0.6, 1, 0.6],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

const defaultMatrix = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.05
    }
  }
};

const defaultGlitch = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    x: [0, -2, 3, -1, 0],
    transition: {
      duration: 0.5,
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.2
      }
    }
  }
};

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
  
  // Add missing properties used by components
  controls: {
    start: () => Promise.resolve(),
    stop: () => Promise.resolve(),
    set: () => Promise.resolve(),
    mount: () => Promise.resolve(),
    unmount: () => Promise.resolve()
  } as any, // Use type assertion to avoid TypeScript errors
  getVariants: (duration = 0.5, delay = 0) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay } }
  }),
  fadeInVariants: defaultFadeIn,
  slideUpVariants: defaultSlideUp,
  scaleVariants: defaultScale,
  pulseVariants: defaultPulse,
  matrixVariants: defaultMatrix,
  glitchVariants: defaultGlitch,
  prefersReducedMotion: false,
  isLowPowerDevice: false,
  optimizeVariants: (variants) => variants,
  enablePerformanceMonitoring: () => {},
  disablePerformanceMonitoring: () => {}
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