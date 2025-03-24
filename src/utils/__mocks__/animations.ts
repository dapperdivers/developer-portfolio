/**
 * Mock for animations.ts
 * 
 * This file provides mock implementations of animation utilities and variants
 * for testing purposes.
 */

import { vi } from 'vitest';

// Define animation variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Animation quality settings
 */
export type AnimationQuality = 'high' | 'medium' | 'low';

/**
 * Calculate animation delay based on index and quality settings
 */
export const getAnimationDelay = vi.fn((
  index: number, 
  quality: AnimationQuality = 'medium',
  baseDelay: number = 0.1,
  staggerAmount: number = 0.05
): number => {
  return baseDelay + (index * staggerAmount);
});

/**
 * Get optimized animation variants based on quality setting
 */
export const getOptimizedVariants = vi.fn((
  variants: any,
  quality: AnimationQuality = 'medium'
): any => {
  return variants;
});

/**
 * Animation configuration constants
 */
export const ANIMATION_CONFIG = {
  DEFAULT_DURATION: 0.5,
  DEFAULT_STAGGER: 0.1,
  DEFAULT_DELAY: 0.2,
  REDUCED_MOTION_DURATION: 0.2,
  QUALITY_SETTINGS: {
    high: {
      batchSize: 5,
      throttleMs: 16
    },
    medium: {
      batchSize: 3,
      throttleMs: 32
    },
    low: {
      batchSize: 2,
      throttleMs: 48
    }
  }
};