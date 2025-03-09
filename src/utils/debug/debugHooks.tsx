import { useEffect, useState, useCallback, useRef } from 'react';
import { useDebugManager } from './DebugManager';

/**
 * Hook to track component renders
 * @param componentName Name of the component to track
 * @returns The number of renders
 */
export const useRenderTracking = (componentName: string) => {
  const renderCountRef = useRef(0);
  const { config, isComponentDebugged } = useDebugManager();
  
  useEffect(() => {
    renderCountRef.current++;
    
    if (config.enabled && config.features.profiling && isComponentDebugged(componentName)) {
      console.log(`[RENDER] ${componentName}: ${renderCountRef.current}`);
    }
  });
  
  return renderCountRef.current;
};

/**
 * Hook to optimize performance based on FPS monitoring
 * @param initialCount Initial count of items to render
 * @returns Optimized count and FPS info
 */
export const useAdaptivePerformance = (initialCount: number = 100) => {
  const [fps, setFps] = useState(60);
  const [optimizedCount, setOptimizedCount] = useState(initialCount);
  const { config } = useDebugManager();
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number | null>(null);

  // FPS monitoring function
  const monitorPerformance = useCallback(() => {
    if (!config.enabled) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    frameCountRef.current += 1;
    const now = performance.now();
    const elapsed = now - lastTimeRef.current;
    
    // Update FPS every second
    if (elapsed >= 1000) {
      const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
      setFps(currentFps);
      
      // Adaptive optimization
      if (currentFps < 40 && optimizedCount > 20) {
        // Reduce count by 25% when FPS is low
        setOptimizedCount(prev => Math.max(20, Math.floor(prev * 0.75)));
      } else if (currentFps > 55 && optimizedCount < initialCount) {
        // Increase count by 10% when FPS is high
        setOptimizedCount(prev => Math.min(initialCount, Math.floor(prev * 1.1)));
      }
      
      // Reset counters
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
    
    // Continue monitoring
    rafRef.current = requestAnimationFrame(monitorPerformance);
  }, [config.enabled, optimizedCount, initialCount]);
  
  // Start/stop monitoring based on debug settings
  useEffect(() => {
    if (config.enabled && config.features.profiling) {
      rafRef.current = requestAnimationFrame(monitorPerformance);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [config.enabled, config.features.profiling, monitorPerformance]);
  
  return { 
    optimizedCount, 
    fps,
    isOptimized: optimizedCount !== initialCount
  };
};

/**
 * Hook to monitor and debug animations
 */
export const useAnimationDebug = () => {
  const { config } = useDebugManager();
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  
  // Listen for animation toggle events
  useEffect(() => {
    const handleAnimationToggle = (e: CustomEvent) => {
      if (e.detail.feature === 'animations') {
        setIsAnimationEnabled(e.detail.enabled);
      }
    };
    
    window.addEventListener('debug:feature-toggle', handleAnimationToggle as EventListener);
    
    // Initial state from config
    setIsAnimationEnabled(!config.features.animations);
    
    return () => {
      window.removeEventListener('debug:feature-toggle', handleAnimationToggle as EventListener);
    };
  }, [config.features.animations]);
  
  return { 
    isAnimationEnabled,
    debugEnabled: config.enabled
  };
};

/**
 * Hook to check if background effects should be shown
 * @returns Boolean indicating if effects should be shown
 */
export const useBackgroundEffects = () => {
  const { config } = useDebugManager();
  const [showEffects, setShowEffects] = useState(true);
  
  // Listen for background effects toggle events
  useEffect(() => {
    const handleEffectsToggle = (e: CustomEvent) => {
      if (e.detail.feature === 'backgroundEffects') {
        setShowEffects(e.detail.enabled);
      }
    };
    
    window.addEventListener('debug:feature-toggle', handleEffectsToggle as EventListener);
    
    // Initial state from config
    setShowEffects(config.features.backgroundEffects);
    
    return () => {
      window.removeEventListener('debug:feature-toggle', handleEffectsToggle as EventListener);
    };
  }, [config.features.backgroundEffects]);
  
  return showEffects;
};

/**
 * Hook to instrument layout changes and detect performance issues
 * @param elementRef Reference to element to observe layout changes
 */
export const useLayoutDebug = (elementRef: React.RefObject<HTMLElement>) => {
  const { config } = useDebugManager();
  
  useEffect(() => {
    if (!config.enabled || !config.features.layoutMonitoring || !elementRef.current) {
      return;
    }
    
    const element = elementRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const startTime = performance.now();
        
        // Force a layout calculation
        const { width, height } = entry.contentRect;
        const layout = element.getBoundingClientRect();
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 16) {
          console.warn(`[LAYOUT] Slow layout in ${element.tagName}: ${Math.round(duration)}ms`);
        }
      }
    });
    
    resizeObserver.observe(element);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [config.enabled, config.features.layoutMonitoring, elementRef]);
}; 