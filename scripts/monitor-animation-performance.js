/**
 * Animation Performance Monitoring Script
 * 
 * This script helps identify performance issues with animations.
 * Usage: Import this script in your main App component during development.
 */

class AnimationPerformanceMonitor {
  constructor() {
    this.frameTimes = [];
    this.animatingElements = new Map();
    this.isMonitoring = false;
    this.threshold = 16; // 60fps = ~16ms per frame
    this.reportingInterval = 3000; // Report every 3 seconds
    this.longestFrameTime = 0;
    this.animationObserver = null;
    this.debugMode = false;
  }

  /**
   * Start monitoring animation performance
   * @param {Object} options Configuration options
   * @param {number} options.threshold Frame time threshold in ms (default: 16ms)
   * @param {number} options.reportingInterval Reporting interval in ms (default: 3000ms)
   * @param {boolean} options.debug Enable detailed logging
   */
  start(options = {}) {
    if (this.isMonitoring) return;
    
    this.threshold = options.threshold || this.threshold;
    this.reportingInterval = options.reportingInterval || this.reportingInterval;
    
    // Enable debug mode by default in development for better diagnostics
    const isDev = import.meta.env ? import.meta.env.DEV : false;
    this.debugMode = options.debug ?? isDev;
    
    this.isMonitoring = true;
    
    // Check for browser compatibility
    const browserSupport = this.checkBrowserSupport();
    if (!browserSupport.supported) {
      console.warn('Animation performance monitoring has limited support in this browser:', browserSupport.reason);
      if (!browserSupport.canProceed) {
        console.error('Animation performance monitoring cannot proceed due to browser limitations');
        return;
      }
    }
    
    this.setupPerformanceObserver();
    this.setupMutationObserver();
    this.setupFrameMonitoring();
    this.logStart();
    
    setTimeout(() => this.report(), this.reportingInterval);
  }

  /**
   * Check browser compatibility for performance monitoring
   * @returns {Object} Object with support information
   */
  checkBrowserSupport() {
    const result = {
      supported: true,
      canProceed: true,
      reason: ''
    };
    
    // Check for performance API
    if (typeof performance === 'undefined') {
      result.supported = false;
      result.reason = 'Performance API not available';
      result.canProceed = false;
      return result;
    }
    
    // Check for PerformanceObserver
    if (typeof PerformanceObserver === 'undefined') {
      result.supported = false;
      result.reason = 'PerformanceObserver API not available';
      // Can still proceed with basic monitoring
    }
    
    // Check for requestAnimationFrame
    if (typeof requestAnimationFrame === 'undefined') {
      result.supported = false;
      result.reason = 'requestAnimationFrame not available';
      result.canProceed = false;
      return result;
    }
    
    // Check for supportedEntryTypes
    if (PerformanceObserver.supportedEntryTypes) {
      const supportedTypes = PerformanceObserver.supportedEntryTypes;
      
      // Check for specific entry types
      const hasAnimation = supportedTypes.includes('animation');
      const hasPaint = supportedTypes.includes('paint');
      const hasLayoutShift = supportedTypes.includes('layout-shift');
      
      if (!hasAnimation && !hasPaint && !hasLayoutShift) {
        result.supported = false;
        result.reason = 'No required entry types supported (animation, paint, or layout-shift)';
        // Can still proceed with basic monitoring
      } else if (!hasAnimation) {
        result.supported = false;
        result.reason = 'Animation entry type not supported, using fallbacks';
      }
    } else {
      result.supported = false;
      result.reason = 'Cannot determine supported entry types';
    }
    
    return result;
  }

  /**
   * Stop monitoring animation performance
   */
  stop() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    if (this.animationObserver) {
      this.animationObserver.disconnect();
    }
    
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    cancelAnimationFrame(this.frameId);
    this.logStop();
  }

  /**
   * Setup Performance Observer to monitor animation events
   */
  setupPerformanceObserver() {
    if (typeof PerformanceObserver === 'undefined') {
      if (this.debugMode) {
        console.info('PerformanceObserver API not available in this browser');
      }
      return;
    }
    
    // Check for supported entry types
    const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];
    const supportsAnimation = supportedEntryTypes.includes('animation');
    
    if (!supportsAnimation) {
      if (this.debugMode) {
        console.info('Animation entry type not supported in this browser, using fallback monitoring');
      }
      // Setup fallback monitoring using other entry types
      this.setupFallbackMonitoring();
      return;
    }
    
    // If animation entry type is supported, continue with preferred monitoring
    this.animationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'animation') {
          this.recordAnimation(entry);
        }
      }
    });
    
    try {
      this.animationObserver.observe({ entryTypes: ['animation'] });
      if (this.debugMode) {
        console.info('Animation performance monitoring active');
      }
    } catch (e) {
      console.warn('Error setting up animation performance monitoring:', e);
      // Fall back to alternative monitoring
      this.setupFallbackMonitoring();
    }
  }
  
  /**
   * Setup fallback monitoring when animation entry type is not supported
   * Uses other performance metrics like 'measure', 'paint', and 'layout-shift'
   */
  setupFallbackMonitoring() {
    // Track paint events (FP, FCP, LCP)
    const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];
    
    // Track paint events if supported
    if (supportedEntryTypes.includes('paint')) {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (this.debugMode) {
            console.log(`Paint metric: ${entry.name}, Duration: ${entry.startTime.toFixed(2)}ms`);
          }
        }
      });
      
      try {
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        if (this.debugMode) {
          console.warn('Paint metrics observation not supported');
        }
      }
    }
    
    // Track layout shifts if supported
    if (supportedEntryTypes.includes('layout-shift')) {
      const layoutObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.value > 0.01) { // Only report significant shifts
            if (this.debugMode) {
              console.log(`Layout shift detected: ${entry.value.toFixed(3)}`);
            }
          }
        }
      });
      
      try {
        layoutObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        if (this.debugMode) {
          console.warn('Layout shift metrics observation not supported');
        }
      }
    }
  }

  /**
   * Setup Mutation Observer to detect DOM changes during animations
   */
  setupMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || 
             mutation.attributeName === 'class') &&
            mutation.target.classList.contains('motion-safe')) {
          
          const id = this.getElementIdentifier(mutation.target);
          this.animatingElements.set(id, mutation.target);
        }
      }
    });
    
    this.mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  /**
   * Monitor frame rate using requestAnimationFrame
   */
  setupFrameMonitoring() {
    let lastFrameTime = performance.now();
    
    const checkFrame = (timestamp) => {
      if (!this.isMonitoring) return;
      
      const frameTime = timestamp - lastFrameTime;
      this.frameTimes.push(frameTime);
      
      // Keep only the last 300 frames (5 seconds at 60fps)
      if (this.frameTimes.length > 300) {
        this.frameTimes.shift();
      }
      
      if (frameTime > this.longestFrameTime) {
        this.longestFrameTime = frameTime;
        if (this.debugMode && frameTime > this.threshold) {
          console.warn(`Long frame detected: ${frameTime.toFixed(2)}ms`);
        }
      }
      
      lastFrameTime = timestamp;
      this.frameId = requestAnimationFrame(checkFrame);
    };
    
    this.frameId = requestAnimationFrame(checkFrame);
  }

  /**
   * Get a unique identifier for a DOM element
   */
  getElementIdentifier(element) {
    let identifier = element.id || '';
    identifier += element.className || '';
    identifier += element.tagName || '';
    return `${identifier}_${Date.now()}`;
  }

  /**
   * Record an animation performance entry
   */
  recordAnimation(entry) {
    if (this.debugMode) {
      console.log(`Animation: ${entry.name}, Duration: ${entry.duration.toFixed(2)}ms`);
    }
  }

  /**
   * Log monitor start
   */
  logStart() {
    console.group('🔍 Animation Performance Monitoring');
    console.log('▶️ Monitoring started');
    console.log(`📊 Threshold: ${this.threshold}ms (${Math.round(1000 / this.threshold)}fps)`);
    console.log(`⏱️ Reporting interval: ${this.reportingInterval / 1000}s`);
    
    // Log browser compatibility information if in debug mode
    if (this.debugMode) {
      const support = this.checkBrowserSupport();
      if (!support.supported) {
        console.warn(`⚠️ Limited browser support: ${support.reason}`);
      }
      
      // Log supported entry types
      if (typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes) {
        console.log('📋 Supported entry types:', PerformanceObserver.supportedEntryTypes.join(', '));
      }
    }
    console.groupEnd();
  }

  /**
   * Log monitor stop
   */
  logStop() {
    console.log('⏹️ Animation performance monitoring stopped');
    console.log(`📈 Highest frame time recorded: ${this.longestFrameTime.toFixed(2)}ms`);
  }

  /**
   * Report performance metrics
   */
  report() {
    if (!this.isMonitoring) return;
    
    const averageFrameTime = this.getAverageFrameTime();
    const droppedFrames = this.getDroppedFrames();
    const animatingElementsCount = this.animatingElements.size;
    
    console.group('🔍 Animation Performance Report');
    
    // Basic metrics
    console.log(`📊 Average frame time: ${averageFrameTime.toFixed(2)}ms (${(1000 / averageFrameTime).toFixed(1)} FPS)`);
    console.log(`⏱️ Longest frame: ${this.longestFrameTime.toFixed(2)}ms`);
    console.log(`🔴 Dropped frames: ${droppedFrames}`);
    console.log(`🔄 Animating elements: ${animatingElementsCount}`);
    
    // Performance assessment
    if (averageFrameTime > this.threshold * 1.5) {
      console.warn('⚠️ Performance issues detected! Consider optimizing animations.');
      
      if (droppedFrames > 5) {
        console.warn('   - Multiple dropped frames detected');
      }
      
      if (this.longestFrameTime > 100) {
        console.warn('   - Very long frames detected (>100ms)');
      }
    } else if (averageFrameTime < this.threshold) {
      console.log('✅ Animation performance is good!');
    }
    
    // Component-specific information in debug mode
    if (this.debugMode && animatingElementsCount > 0) {
      console.group('Animating Elements');
      this.animatingElements.forEach((element, id) => {
        const selector = element.tagName.toLowerCase() + 
          (element.className ? '.' + element.className.replace(/\s+/g, '.') : '') +
          (element.id ? '#' + element.id : '');
        console.log(`${selector}`);
      });
      console.groupEnd();
    }
    
    console.groupEnd();
    
    // Clear tracked elements
    this.animatingElements.clear();
    
    // Reset longest frame time
    this.longestFrameTime = 0;
    
    // Schedule next report
    if (this.isMonitoring) {
      setTimeout(() => this.report(), this.reportingInterval);
    }
  }

  /**
   * Get the average frame time
   */
  getAverageFrameTime() {
    if (this.frameTimes.length === 0) return 0;
    
    const sum = this.frameTimes.reduce((acc, time) => acc + time, 0);
    return sum / this.frameTimes.length;
  }

  /**
   * Get the number of dropped frames
   */
  getDroppedFrames() {
    return this.frameTimes.filter(time => time > this.threshold).length;
  }
}

// Export instance
const animationMonitor = new AnimationPerformanceMonitor();

// Make it available globally in dev mode
// Just check for window as this is dev-only code anyway
if (typeof window !== 'undefined') {
  window.__ANIMATION_MONITOR = animationMonitor;
}

export default animationMonitor;

/**
 * Usage:
 * 
 * // In your App.js or main component during development:
 * import animationMonitor from './scripts/monitor-animation-performance';
 * 
 * useEffect(() => {
 *   if (process.env.NODE_ENV !== 'production') {
 *     animationMonitor.start({ 
 *       threshold: 16, 
 *       reportingInterval: 5000,
 *       debug: true
 *     });
 *     
 *     return () => animationMonitor.stop();
 *   }
 * }, []);
 */ 