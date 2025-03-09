// Main debug tools
export { default as RenderDebugTools, withDebugTracking } from './RenderDebugTools';

// Performance monitoring
export { default as PerformanceMonitor } from './PerformanceMonitor';
export { useTrackRender, withRenderTracking } from './PerformanceMonitor';

// Component profiling
export { default as ComponentProfiler, RenderProfiler } from './ComponentProfiler';

// Render visualization
export { default as RenderVisualizer, withRenderVisualizer } from './RenderVisualizer';

/**
 * Measures time taken for a function to execute
 * @param {Function} fn - Function to measure
 * @param {string} name - Name of the operation (for logging)
 * @returns {any} - Return value from the function
 */
export const measurePerformance = (fn, name = 'Operation') => {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  
  console.log(`[PERF] ${name} took ${duration.toFixed(2)}ms`);
  
  return result;
};

/**
 * Creates a performance marker for debugging
 * @param {string} name - Marker name
 */
export const markPerformance = (name) => {
  if (performance && performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measures time between two performance marks
 * @param {string} name - Measure name
 * @param {string} startMark - Start mark name
 * @param {string} endMark - End mark name
 * @returns {number} - Duration in milliseconds
 */
export const measureBetweenMarks = (name, startMark, endMark) => {
  if (performance && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const entries = performance.getEntriesByName(name, 'measure');
      if (entries.length > 0) {
        return entries[0].duration;
      }
    } catch (e) {
      console.error('Error measuring performance:', e);
    }
  }
  return 0;
};

/**
 * Creates a wrapped function that measures execution time
 * @param {Function} fn - Function to wrap
 * @param {string} name - Name for logging
 * @returns {Function} - Wrapped function
 */
export const createMeasuredFunction = (fn, name) => {
  return (...args) => {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    
    markPerformance(startMark);
    const result = fn(...args);
    markPerformance(endMark);
    
    const duration = measureBetweenMarks(`${name}-measure`, startMark, endMark);
    console.log(`[PERF] ${name} took ${duration.toFixed(2)}ms`);
    
    return result;
  };
}; 