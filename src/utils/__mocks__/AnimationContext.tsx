// This is a mock for src/utils/AnimationContext.tsx
// It re-exports the mock from src/context/__mocks__/AnimationContext.tsx
// to ensure consistent mocking across the application

import {
  AnimationContext,
  AnimationProvider,
  useAnimation
} from '../../context/__mocks__/AnimationContext';

// Define animation variants directly to avoid import issues
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

export {
  AnimationContext,
  AnimationProvider,
  useAnimation,
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  staggerContainerVariants,
  pulseVariants,
  matrixVariants,
  glitchVariants
};

export default {
  AnimationContext,
  AnimationProvider,
  useAnimation
};