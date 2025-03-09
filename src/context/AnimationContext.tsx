// Use named imports to allow tree-shaking in production builds
import { useState, useCallback, useEffect, useMemo, ReactElement, useRef } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createTypedContext } from '@utils/contextUtils';
import { useAnimation as useFramerAnimation, AnimationControls, Variants } from 'framer-motion';

// At the top of the file, add this declaration for the global window object
declare global {
  interface Window {
    __DEBUG_FLAGS?: {
      disableAnimations: boolean;
      debugScrolling: boolean;
      monitorLayout: boolean;
      [key: string]: boolean;
    };
  }
}

// Animation Context Types
export interface AnimationState {
  [key: string]: 'hidden' | 'visible' | string;
}

export interface AnimationContextType {
  inView: boolean;
  setInView: Dispatch<SetStateAction<boolean>>;
  animationEnabled: boolean;
  entryAnimations: AnimationState;
  registerEntryAnimation: (id: string, initialState?: string) => void;
  playEntryAnimation: (id: string, delay?: number) => void;
  resetEntryAnimations: () => void;
  animationStaggerDelay: number;
  getAnimationDelay: (index: number) => string;
  // New framer-motion specific properties
  controls: AnimationControls;
  getVariants: (duration?: number, delay?: number) => Variants;
  fadeInVariants: Variants;
  slideUpVariants: Variants;
  scaleVariants: Variants;
  pulseVariants: Variants;
  matrixVariants: Variants;
  glitchVariants: Variants;
}

// Define standard variants to use across components
const defaultFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const defaultSlideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const defaultScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const defaultPulse: Variants = {
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

const defaultMatrix: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.05 
    } 
  }
};

const defaultGlitch: Variants = {
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
 * Default values for the animation context
 */
const defaultAnimationContext: AnimationContextType = {
  inView: false,
  setInView: () => {},
  animationEnabled: true,
  animationStaggerDelay: 0.15,
  entryAnimations: {},
  registerEntryAnimation: () => {},
  playEntryAnimation: () => {},
  resetEntryAnimations: () => {},
  getAnimationDelay: () => String(),
  // New framer-motion defaults
  controls: {} as AnimationControls,
  getVariants: () => ({}),
  fadeInVariants: defaultFadeIn,
  slideUpVariants: defaultSlideUp,
  scaleVariants: defaultScale,
  pulseVariants: defaultPulse,
  matrixVariants: defaultMatrix,
  glitchVariants: defaultGlitch
};

/**
 * Animation Context for coordinating animations across components
 * Using the decoupled factory pattern
 */
const { 
  context: AnimationContext, 
  useTypedContext: useAnimation,
  Provider: AnimationContextProvider
} = createTypedContext<AnimationContextType>(defaultAnimationContext, 'useAnimation');

export interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * Animation Provider component
 * 
 * @component
 * @param {AnimationProviderProps} props - Component props
 * @returns {JSX.Element} Provider component
 */
export const AnimationProvider = ({ children }: AnimationProviderProps): ReactElement => {
  // Animation settings
  const [inView, setInView] = useState<boolean>(false);
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(true);
  const [entryAnimations, setEntryAnimations] = useState<AnimationState>({});
  const [animationStaggerDelay, setAnimationStaggerDelay] = useState<number>(0.15);
  
  // Store played animations in a ref to prevent re-renders
  const playedAnimationsRef = useRef<Set<string>>(new Set());
  
  // Initialize framer-motion animation controls
  const controls = useFramerAnimation();

  // Check if reduced motion is preferred
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setAnimationEnabled(!e.matches);
      
      // Reduce stagger delay for reduced motion
      if (e.matches) {
        setAnimationStaggerDelay(0.05);
      } else {
        setAnimationStaggerDelay(0.15);
      }
    };
    
    // Set initial value
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Add listener for debug flag changes
    const handleDebugToggle = (e: CustomEvent) => {
      const isEnabled = !(e.detail?.enabled === false);
      setAnimationEnabled(isEnabled);
      console.log(`[AnimationContext] Animations ${isEnabled ? 'enabled' : 'disabled'}`);
    };
    
    window.addEventListener('debug:toggle-animations', handleDebugToggle as EventListener);
    
    // Check for global debug flags
    if (window.__DEBUG_FLAGS && 'disableAnimations' in window.__DEBUG_FLAGS) {
      setAnimationEnabled(!window.__DEBUG_FLAGS.disableAnimations);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('debug:toggle-animations', handleDebugToggle as EventListener);
    };
  }, []);

  /**
   * Register a new animation entry
   */
  const registerEntryAnimation = useCallback((id: string, initialState: string = 'hidden') => {
    // Only register if not already played
    if (!playedAnimationsRef.current.has(id)) {
      setEntryAnimations(prev => ({
        ...prev,
        [id]: initialState
      }));
    }
  }, []);

  /**
   * Play animation for specific entry
   */
  const playEntryAnimation = useCallback((id: string, delay: number = 0) => {
    // Skip if already played
    if (playedAnimationsRef.current.has(id)) {
      return;
    }

    // If animations disabled, immediately set to visible
    if (!animationEnabled) {
      setEntryAnimations(prev => ({
        ...prev,
        [id]: 'visible'
      }));
      playedAnimationsRef.current.add(id);
      return;
    }

    // Otherwise play with delay
    setTimeout(() => {
      setEntryAnimations(prev => ({
        ...prev,
        [id]: 'visible'
      }));
      playedAnimationsRef.current.add(id);
      
      // Also start framer-motion animation if we're using it
      controls.start(id);
    }, delay * 1000);
  }, [animationEnabled, controls]);

  /**
   * Reset all animations to hidden state
   */
  const resetEntryAnimations = useCallback(() => {
    setEntryAnimations({});
    playedAnimationsRef.current.clear();
    setInView(false);
    controls.stop();
  }, [controls]);
  
  /**
   * Helper to calculate animation delay based on index
   */
  const getAnimationDelay = useCallback((index: number): string => {
    return `${animationStaggerDelay * index}s`;
  }, [animationStaggerDelay]);
  
  /**
   * Helper to generate variants with custom timing
   */
  const getVariants = useCallback((duration: number = 0.5, delay: number = 0): Variants => {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { 
          duration, 
          delay 
        } 
      }
    };
  }, []);

  // Create context value
  const contextValue = useMemo((): AnimationContextType => ({
    inView,
    setInView,
    animationEnabled,
    entryAnimations,
    registerEntryAnimation,
    playEntryAnimation,
    resetEntryAnimations,
    animationStaggerDelay,
    getAnimationDelay,
    // Add framer-motion specific values
    controls,
    getVariants,
    fadeInVariants: defaultFadeIn,
    slideUpVariants: defaultSlideUp,
    scaleVariants: defaultScale,
    pulseVariants: defaultPulse,
    matrixVariants: defaultMatrix,
    glitchVariants: defaultGlitch
  }), [
    inView, 
    animationEnabled, 
    entryAnimations, 
    registerEntryAnimation, 
    playEntryAnimation, 
    resetEntryAnimations,
    animationStaggerDelay,
    getAnimationDelay,
    controls,
    getVariants
  ]);

  return (
    <AnimationContextProvider value={contextValue}>
      {children}
    </AnimationContextProvider>
  );
};

// Export the context and hook
export { AnimationContext, useAnimation };

// Export animation variants for direct import
export const MotionVariants = {
  fadeIn: defaultFadeIn,
  slideUp: defaultSlideUp,
  scale: defaultScale,
  pulse: defaultPulse,
  matrix: defaultMatrix,
  glitch: defaultGlitch,
  
  // Specialized variants
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  },
  
  // Binary stream variants by position
  binaryLeft: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: [0, 0.8, 0],
      y: [-10, 0, 10],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    })
  },
  
  binaryRight: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: [0, 0.8, 0],
      y: [10, 0, -10],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    })
  },
  
  binaryTop: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: [0, 0.8, 0],
      x: [-10, 0, 10],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    })
  },
  
  binaryBottom: {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: [0, 0.8, 0],
      x: [10, 0, -10],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    })
  },

  // Timeline-specific variants
  timeline: {
    entry: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          ease: "easeOut" 
        }
      }
    },
    
    connector: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    
    line: {
      hidden: { height: 0, opacity: 0 },
      visible: { 
        height: "100%", 
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeInOut"
        }
      }
    },
    
    nodeLine: {
      hidden: { width: 0, opacity: 0 },
      visible: { 
        width: "12px", 
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    
    card: {
      hidden: { opacity: 0, x: -10 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      },
      expanded: {
        scale: 1.02,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    },
    
    dataFlow: {
      hidden: { opacity: 0 },
      visible: {
        opacity: [0, 0.8, 0],
        x: [-10, 0, 10],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },
    
    // Decryption animation
    decrypt: {
      hidden: { opacity: 0, width: "0%" },
      visible: {
        opacity: 1,
        width: "100%",
        transition: {
          duration: 0.7,
          ease: "easeInOut"
        }
      }
    },
    
    // Type in/cursor animation
    typing: {
      hidden: { width: "0%" },
      visible: {
        width: "100%",
        transition: {
          duration: 0.8,
          ease: "steps(30, end)"
        }
      }
    },
    
    cursor: {
      hidden: { opacity: 1 },
      visible: {
        opacity: [1, 0, 1],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: "steps(2, start)"
        }
      }
    }
  }
};
