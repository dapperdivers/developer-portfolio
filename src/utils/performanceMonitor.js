/**
 * Performance monitoring utilities for measuring and optimizing application performance.
 * These utilities help track rendering performance, animation smoothness, and resource usage.
 */

// Check if performance API is available
const hasPerformanceAPI = typeof performance !== 'undefined' && 
                         typeof performance.mark === 'function' && 
                         typeof performance.measure === 'function';

// Import environment configuration
import envConfig from '@utils/envConfig';

// Check if we're in development mode
const isDev = envConfig.isDevelopment;

/**
 * Create a performance marker
 * @param {string} markName - Name of the performance mark
 */
export const markStart = (markName) => {
  if (hasPerformanceAPI && isDev) {
    performance.mark(`${markName}-start`);
  }
};

/**
 * End a performance mark and log the result
 * @param {string} markName - Name of the performance mark
 * @param {boolean} shouldLog - Whether to log the result to console
 * @returns {number|null} - Duration in ms, or null if performance API unavailable
 */
export const markEnd = (markName, shouldLog = true) => {
  if (!hasPerformanceAPI || !isDev) return null;
  
  const endMarkName = `${markName}-end`;
  const startMarkName = `${markName}-start`;
  const measureName = `⏱️ ${markName}`;
  
  performance.mark(endMarkName);
  
  try {
    performance.measure(measureName, startMarkName, endMarkName);
    const entries = performance.getEntriesByName(measureName);
    const duration = entries[0]?.duration;
    
    if (shouldLog && duration !== undefined) {
      console.info(`${measureName}: ${duration.toFixed(2)}ms`);
    }
    
    // Clean up
    performance.clearMarks(startMarkName);
    performance.clearMarks(endMarkName);
    performance.clearMeasures(measureName);
    
    return duration;
  } catch (e) {
    console.warn('Performance measurement error:', e);
    return null;
  }
};

/**
 * Higher-order component to measure component render time
 * @param {React.Component} Component - Component to measure
 * @param {string} componentName - Name of the component for logging
 * @returns {React.Component} - Enhanced component with performance monitoring
 */
export const withPerformanceTracking = (Component, componentName) => {
  if (!isDev) return Component;
  
  return (props) => {
    const markName = `render-${componentName || Component.displayName || Component.name || 'Component'}`;
    markStart(markName);
    
    // Use a ref to track when the component has actually rendered to the DOM
    const componentRef = React.useRef();
    
    React.useEffect(() => {
      if (componentRef.current) {
        markEnd(markName);
      }
    }, []);
    
    return React.createElement(Component, {
      ...props,
      ref: componentRef
    });
  };
};

/**
 * Track FPS during animations
 */
export class FPSMonitor {
  constructor(sampleInterval = 1000) {
    this.frames = 0;
    this.isRunning = false;
    this.lastTime = 0;
    this.fps = 0;
    this.sampleInterval = sampleInterval;
    this.onFpsUpdate = null;
  }
  
  start(onFpsUpdate = null) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.frames = 0;
    this.lastTime = performance.now();
    this.onFpsUpdate = onFpsUpdate;
    
    this._tick();
  }
  
  stop() {
    this.isRunning = false;
  }
  
  _tick() {
    if (!this.isRunning) return;
    
    this.frames++;
    const now = performance.now();
    const elapsed = now - this.lastTime;
    
    if (elapsed >= this.sampleInterval) {
      this.fps = Math.round((this.frames * 1000) / elapsed);
      this.lastTime = now;
      this.frames = 0;
      
      if (isDev) {
        console.info(`Current FPS: ${this.fps}`);
      }
      
      if (this.onFpsUpdate) {
        this.onFpsUpdate(this.fps);
      }
    }
    
    requestAnimationFrame(() => this._tick());
  }
  
  getFPS() {
    return this.fps;
  }
}

/**
 * Helper to detect slow devices where animations should be reduced
 * @returns {boolean} - True if the device is likely to be slow
 */
export const isSlowDevice = () => {
  // Check for hardware concurrency (CPU cores)
  const hasLowCores = navigator.hardwareConcurrency <= 4;
  
  // Check device memory (if available)
  const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // If two or more checks are true, consider it a slow device
  return (hasLowCores && hasLowMemory) || prefersReducedMotion;
};

/**
 * Enable animation based on device capability
 * @returns {boolean} - Whether animations should be enabled
 */
export const shouldEnableAnimation = () => {
  // If user has explicitly set a preference in localStorage, respect that
  const storedPreference = localStorage.getItem('enableAnimations');
  if (storedPreference !== null) {
    return storedPreference === 'true';
  }
  
  // Check environment configuration for default setting
  if (typeof envConfig.enableAnimations !== 'undefined') {
    return envConfig.enableAnimations && !isSlowDevice();
  }
  
  // Otherwise, base on device capabilities
  return !isSlowDevice();
};

/**
 * Set animation preference
 * @param {boolean} enabled - Whether animations should be enabled
 */
export const setAnimationPreference = (enabled) => {
  localStorage.setItem('enableAnimations', String(enabled));
};

// Export singleton FPS monitor instance
export const globalFPSMonitor = new FPSMonitor();