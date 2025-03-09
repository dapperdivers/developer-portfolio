// Use named imports to allow tree-shaking in production builds
import { useState, useCallback, useEffect, useMemo, ReactElement, useRef } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createTypedContext } from '@utils/contextUtils';

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
}

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
    }, delay * 1000);
  }, [animationEnabled]);

  /**
   * Reset all animations to hidden state
   */
  const resetEntryAnimations = useCallback(() => {
    setEntryAnimations({});
    playedAnimationsRef.current.clear();
    setInView(false);
  }, []);
  
  /**
   * Helper to calculate animation delay based on index
   */
  const getAnimationDelay = useCallback((index: number): string => {
    return `${animationStaggerDelay * index}s`;
  }, [animationStaggerDelay]);

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
    getAnimationDelay
  }), [
    inView, 
    animationEnabled, 
    entryAnimations, 
    registerEntryAnimation, 
    playEntryAnimation, 
    resetEntryAnimations,
    animationStaggerDelay,
    getAnimationDelay
  ]);

  return (
    <AnimationContextProvider value={contextValue}>
      {children}
    </AnimationContextProvider>
  );
};

// Export the context and hook
export { AnimationContext, useAnimation };
