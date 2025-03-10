import React, { useState, useMemo, useContext, useEffect } from 'react';
import { fadeInVariants, scaleVariants, slideUpVariants, getAnimationDelay } from './animations';

interface AnimationSettings {
  enabled: boolean;
  reducedMotion: boolean;
  quality: 'high' | 'medium' | 'low';
  batchSize: number;
  throttleMs: number;
}

interface AnimationContextType extends AnimationSettings {
  setAnimationSettings: React.Dispatch<React.SetStateAction<AnimationSettings>>;
  shouldAnimate: (priority?: 'high' | 'medium' | 'low') => boolean;
  getOptimizedVariants: (variants: any) => any;
  fadeInVariants: typeof fadeInVariants;
  scaleVariants: typeof scaleVariants;
  slideUpVariants: typeof slideUpVariants;
  getAnimationDelay: typeof getAnimationDelay;
}

export const AnimationContext = React.createContext<AnimationContextType>({
  enabled: true,
  reducedMotion: false,
  quality: 'high',
  batchSize: 5,
  throttleMs: 16,
  setAnimationSettings: () => {},
  shouldAnimate: () => true,
  getOptimizedVariants: (variants) => variants,
  fadeInVariants,
  scaleVariants,
  slideUpVariants,
  getAnimationDelay,
});

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationSettings, setAnimationSettings] = useState<AnimationSettings>({
    enabled: true,
    reducedMotion: false,
    quality: 'medium',
    batchSize: 3,
    throttleMs: 32,
  });

  useEffect(() => {
    const checkPerformance = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const isHighEnd = memory.jsHeapSizeLimit > 2048 * 1024 * 1024;
        setAnimationSettings(prev => ({
          ...prev,
          quality: isHighEnd ? 'high' : 'medium',
          batchSize: isHighEnd ? 3 : 2,
          throttleMs: isHighEnd ? 32 : 48
        }));
      }
    };

    let frame = 0;
    let lastTime = performance.now();
    const checkFPS = () => {
      frame++;
      const time = performance.now();
      if (time >= lastTime + 1000) {
        const fps = Math.round((frame * 1000) / (time - lastTime));
        setAnimationSettings(prev => ({
          ...prev,
          throttleMs: fps > 50 ? 32 : 48,
          quality: fps > 50 ? prev.quality : 'low'
        }));
        frame = 0;
        lastTime = time;
      }
      requestAnimationFrame(checkFPS);
    };
    
    const rafId = requestAnimationFrame(checkFPS);
    checkPerformance();

    return () => cancelAnimationFrame(rafId);
  }, []);

  const contextValue = useMemo(() => ({
    ...animationSettings,
    setAnimationSettings,
    shouldAnimate: (priority: 'high' | 'medium' | 'low' = 'medium') => {
      if (!animationSettings.enabled) return false;
      if (animationSettings.reducedMotion && priority !== 'high') return false;
      return true;
    },
    getOptimizedVariants: (variants: any) => {
      if (animationSettings.quality === 'low') {
        return {
          ...variants,
          transition: {
            ...variants.transition,
            duration: Math.max(0.2, (variants.transition?.duration || 0.3) * 0.7),
            staggerChildren: Math.max(0.1, (variants.transition?.staggerChildren || 0.1) * 0.5),
          }
        };
      }
      return variants;
    },
    fadeInVariants,
    scaleVariants,
    slideUpVariants,
    getAnimationDelay,
  }), [animationSettings]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return {
    ...context,
    fadeInVariants,
    scaleVariants,
    slideUpVariants,
    getAnimationDelay,
  };
}; 