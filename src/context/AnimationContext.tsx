import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

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

export interface AnimationContextType {
  /** False when the visitor prefers reduced motion or animations are switched off for debugging */
  animationEnabled: boolean;
  /** The visitor's OS-level reduced-motion preference */
  prefersReducedMotion: boolean;
}

const defaultAnimationContext: AnimationContextType = {
  animationEnabled: true,
  prefersReducedMotion: false,
};

export const AnimationContext = createContext<AnimationContextType>(defaultAnimationContext);

/** Read the animation settings. Works without a provider (animations on). */
export const useAnimation = (): AnimationContextType => useContext(AnimationContext);

export interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * Provides `animationEnabled` and `prefersReducedMotion`, and applies the
 * visitor's reduced-motion preference to every Framer Motion component below.
 */
export const AnimationProvider = ({ children }: AnimationProviderProps): ReactElement => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  // Switch controlled by the media query and the debug event/flag
  const [switchedOn, setSwitchedOn] = useState<boolean>(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(e.matches);
      setSwitchedOn(!e.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    // Debug switch: anything but `enabled: false` turns animations on
    const handleDebugToggle = (e: Event) => {
      const detail = e instanceof CustomEvent ? (e.detail as { enabled?: boolean } | null) : null;
      const isEnabled = !(detail?.enabled === false);
      setSwitchedOn(isEnabled);
      console.log(`[AnimationContext] Animations ${isEnabled ? 'enabled' : 'disabled'}`);
    };
    window.addEventListener('debug:toggle-animations', handleDebugToggle);

    // Initial debug flag overrides the media query value
    if (window.__DEBUG_FLAGS && 'disableAnimations' in window.__DEBUG_FLAGS) {
      setSwitchedOn(!window.__DEBUG_FLAGS.disableAnimations);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('debug:toggle-animations', handleDebugToggle);
    };
  }, []);

  const animationEnabled = switchedOn && !prefersReducedMotion;

  const value = useMemo<AnimationContextType>(
    () => ({ animationEnabled, prefersReducedMotion }),
    [animationEnabled, prefersReducedMotion]
  );

  return (
    <MotionConfig reducedMotion="user">
      <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
    </MotionConfig>
  );
};
