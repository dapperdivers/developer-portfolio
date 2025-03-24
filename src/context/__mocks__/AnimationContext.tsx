import React, { createContext, useContext } from 'react';
import { vi } from 'vitest';
import type { ReactNode } from 'react';

// Define animation variants directly to avoid hoisting issues
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const pulseVariants = {
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

const matrixVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.05 
    } 
  }
};

const glitchVariants = {
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

// Create a mock context
export const AnimationContext = createContext(null);

// Mock animation context value
const mockAnimationValue = {
  inView: true,
  setInView: vi.fn(),
  animationEnabled: true,
  entryAnimations: {},
  registerEntryAnimation: vi.fn(),
  playEntryAnimation: vi.fn(),
  resetEntryAnimations: vi.fn(),
  animationStaggerDelay: 0.15,
  getAnimationDelay: (index: number) => `${index * 0.1}s`,
  // Framer-motion specific properties
  controls: {
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn()
  },
  getVariants: (duration = 0.5, delay = 0) => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration, 
        delay 
      } 
    }
  }),
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  pulseVariants,
  matrixVariants,
  glitchVariants,
  staggerContainerVariants,
  
  // Animation optimization properties
  prefersReducedMotion: false,
  isLowPowerDevice: false,
  optimizeVariants: (variants: any) => variants,
  
  // Performance monitoring (dev only)
  enablePerformanceMonitoring: vi.fn(),
  disablePerformanceMonitoring: vi.fn()
};

// Provider component for tests
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div data-testid="animation-provider">
      <AnimationContext.Provider value={mockAnimationValue}>
        {children}
      </AnimationContext.Provider>
    </div>
  );
};

// Custom hook to use the context
export const useAnimation = vi.fn().mockReturnValue(mockAnimationValue);

export default {
  AnimationContext,
  AnimationProvider,
  useAnimation,
  // Export variants for direct import
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  staggerContainerVariants,
  pulseVariants,
  matrixVariants,
  glitchVariants
};