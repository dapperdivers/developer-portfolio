import { useState, useEffect } from 'react';

/**
 * Hook for optimizing animations based on device capabilities
 * 
 * This hook returns information about device capabilities and settings
 * that can help optimize animations for performance and accessibility.
 * 
 * @returns {Object} Animation optimization settings
 * @returns {boolean} disableAnimations - Whether animations should be disabled
 * @returns {boolean} prefersReducedMotion - Whether user prefers reduced motion
 * @returns {boolean} isLowPowerDevice - Whether device is low power
 * @returns {boolean} is3DSupported - Whether 3D transforms are well supported
 * @returns {boolean} isHighEndDevice - Whether device is high-end
 * @returns {Function} optimizeVariants - Function to optimize animation variants
 */
const useAnimationOptimization = () => {
  // Device capability states
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const [is3DSupported, setIs3DSupported] = useState(true);
  const [isHighEndDevice, setIsHighEndDevice] = useState(true);

  // Debug override from window.__DEBUG_FLAGS
  const debugFlags = typeof window !== 'undefined' ? window.__DEBUG_FLAGS : {};
  const disableAnimations = debugFlags?.disableAnimations || false;

  useEffect(() => {
    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Try to detect low power mode (iOS)
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setIsLowPowerDevice(!battery.charging && battery.level < 0.3);
        
        const handleBatteryChange = () => {
          setIsLowPowerDevice(!battery.charging && battery.level < 0.3);
        };
        
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
        
        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange);
          battery.removeEventListener('chargingchange', handleBatteryChange);
        };
      }).catch(() => {
        console.log('Battery status API not supported');
      });
    }

    // Check for 3D transform support
    const el = document.createElement('div');
    if (el.style.transform === undefined || 
        el.style.perspective === undefined || 
        el.style.backfaceVisibility === undefined) {
      setIs3DSupported(false);
    }

    // Detect device performance
    const detectDevicePerformance = () => {
      const start = performance.now();
      let result = 0;
      
      // Perform a heavy calculation to measure device speed
      for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // If calculation takes longer than 100ms, consider it a low-end device
      setIsHighEndDevice(duration < 100);
    };
    
    // Run performance detection after a short delay to not block main thread
    const perfTimer = setTimeout(detectDevicePerformance, 2000);
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(perfTimer);
    };
  }, []);

  /**
   * Optimize animation variants based on device capabilities
   * 
   * @param {Object} variants - Animation variants
   * @param {Object} options - Optimization options
   * @param {boolean} options.disable3DOnLowPower - Disable 3D transforms on low-power devices
   * @param {boolean} options.reduceComplexity - Reduce animation complexity on low-end devices
   * @returns {Object} Optimized animation variants
   */
  const optimizeVariants = (variants, options = {}) => {
    const { disable3DOnLowPower = true, reduceComplexity = true } = options;
    
    // If animations should be disabled, return empty animations
    if (disableAnimations || prefersReducedMotion) {
      // Create new variants that only change opacity for a subtle effect
      const reducedVariants = {};
      
      for (const key in variants) {
        if (key === 'visible' || key === 'show' || key === 'active') {
          reducedVariants[key] = { opacity: 1, transition: { duration: 0.1 } };
        } else if (key === 'hidden' || key === 'hide' || key === 'inactive') {
          reducedVariants[key] = { opacity: 0, transition: { duration: 0.1 } };
        } else {
          reducedVariants[key] = { opacity: 1 };
        }
      }
      
      return reducedVariants;
    }
    
    // If device is low powered or low end, optimize animations
    if ((isLowPowerDevice || !isHighEndDevice) && (disable3DOnLowPower || reduceComplexity)) {
      // Create a copy of the variants
      const optimizedVariants = JSON.parse(JSON.stringify(variants));
      
      // Remove or simplify expensive properties
      for (const key in optimizedVariants) {
        const variant = optimizedVariants[key];
        
        // Handle transition property
        if (variant.transition) {
          // Simplify transition - faster animations, less spring physics
          variant.transition.duration = variant.transition.duration 
            ? Math.min(variant.transition.duration, 0.3) 
            : 0.3;
            
          if (variant.transition.type === 'spring') {
            variant.transition.type = 'tween';
            variant.transition.ease = 'easeOut';
          }
        }
        
        // Remove 3D transforms if needed
        if (disable3DOnLowPower && !is3DSupported) {
          if (variant.rotateX !== undefined) delete variant.rotateX;
          if (variant.rotateY !== undefined) delete variant.rotateY;
          if (variant.rotateZ !== undefined) delete variant.rotateZ;
          if (variant.z !== undefined) delete variant.z;
          if (variant.perspective !== undefined) delete variant.perspective;
        }
        
        // Simplify complex animations
        if (reduceComplexity && !isHighEndDevice) {
          // Convert arrays (keyframes) to single values
          for (const prop in variant) {
            if (Array.isArray(variant[prop]) && prop !== 'transition') {
              variant[prop] = variant[prop][variant[prop].length - 1];
            }
          }
        }
      }
      
      return optimizedVariants;
    }
    
    // Return original variants if no optimization needed
    return variants;
  };

  return {
    disableAnimations: disableAnimations || prefersReducedMotion,
    prefersReducedMotion,
    isLowPowerDevice,
    is3DSupported,
    isHighEndDevice,
    optimizeVariants
  };
};

export default useAnimationOptimization; 