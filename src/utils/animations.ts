/**
 * Animation utilities and variants for the Developer Portfolio
 * 
 * This file contains reusable animation variants and utility functions
 * for consistent animations across the application.
 */

import { Variants } from 'framer-motion';

/**
 * Animation quality settings
 */
export type AnimationQuality = 'high' | 'medium' | 'low';

/**
 * Standard fade-in animation variant
 */
export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

/**
 * Slide-up animation variant with fade
 */
export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Scale animation variant with fade
 */
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Staggered children animation variant
 */
export const staggerContainerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Calculate animation delay based on index and quality settings
 * 
 * @param index Element index for staggered animations
 * @param quality Animation quality setting
 * @param baseDelay Base delay in seconds
 * @param staggerAmount Amount of stagger between elements
 * @returns Calculated delay in seconds
 */
export const getAnimationDelay = (
  index: number, 
  quality: AnimationQuality = 'medium',
  baseDelay: number = 0.1,
  staggerAmount: number = 0.05
): number => {
  // Adjust stagger based on quality
  const qualityMultiplier = {
    high: 1,
    medium: 0.7,
    low: 0.4
  };
  
  const adjustedStagger = staggerAmount * qualityMultiplier[quality];
  return baseDelay + (index * adjustedStagger);
};

/**
 * Get optimized animation variants based on quality setting
 *
 * @param variants Original animation variants
 * @param quality Animation quality setting
 * @returns Optimized variants
 */
export const getOptimizedVariants = (
  variants: Variants,
  quality: AnimationQuality = 'medium'
): Variants => {
  if (quality === 'low') {
    // Create a deep copy to avoid modifying the original
    const optimizedVariants = { ...variants };
    
    // Handle the visible state transition if it exists
    if (optimizedVariants.visible && typeof optimizedVariants.visible === 'object') {
      const visibleState = { ...optimizedVariants.visible };
      
      // Safely modify the transition if it exists
      if (visibleState.transition) {
        visibleState.transition = {
          ...visibleState.transition,
          // Safely adjust duration and stagger values
          ...(typeof visibleState.transition === 'object' && {
            duration: Math.max(0.2, ((visibleState.transition as any).duration || 0.3) * 0.7),
            staggerChildren: Math.max(0.05, ((visibleState.transition as any).staggerChildren || 0.1) * 0.5),
          })
        };
      }
      
      optimizedVariants.visible = visibleState;
    }
    
    return optimizedVariants;
  }
  
  return variants;
};

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