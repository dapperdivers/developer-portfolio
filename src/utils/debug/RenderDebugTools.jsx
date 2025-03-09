import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RenderProfiler } from './ComponentProfiler';

// Lazy load the tools to avoid impacting initial performance
const PerformanceMonitor = lazy(() => import('./PerformanceMonitor'));
const ComponentProfilerViewer = lazy(() => import('./ComponentProfiler'));
const RenderVisualizer = lazy(() => import('./RenderVisualizer'));

// Utility to add or remove DOM markers for debug monitoring
const setupDebugMonitoring = (enabled) => {
  if (enabled) {
    document.documentElement.classList.add('debug-monitoring');
    
    // Add paint flashing if Chrome DevTools API is available
    if (window.chrome && window.chrome.devtools) {
      try {
        window.chrome.devtools.executeScript({
          code: 'void(0)'
        });
      } catch {
        console.log('Chrome DevTools API not available');
      }
    }
    
    console.log('Debug monitoring enabled - Press Ctrl+Shift+D to toggle tools');
  } else {
    document.documentElement.classList.remove('debug-monitoring');
    
    // Remove debug paint flashing
    if (window.chrome && window.chrome.devtools) {
      try {
        window.chrome.devtools.executeScript({
          code: 'void(0)'
        });
      } catch {
        console.log('Chrome DevTools API not available');
      }
    }
  }
};

/**
 * Master debug tools component
 * Combines all performance monitoring and visualization tools
 */
const RenderDebugTools = ({ defaultEnabled = false, children }) => {
  const [isEnabled, setIsEnabled] = useState(
    localStorage.getItem('debug_tools_enabled') === 'true' || defaultEnabled
  );
  
  // Set up keyboard shortcut to toggle tools
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsEnabled(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Persist enabled state
  useEffect(() => {
    localStorage.setItem('debug_tools_enabled', isEnabled);
    setupDebugMonitoring(isEnabled);
    
    // Log state change
    console.log(`Debug tools ${isEnabled ? 'enabled' : 'disabled'}`);
    
    // Add utility commands to console
    if (isEnabled) {
      window.debugUtils = {
        profiler: window.PERFORMANCE_DEBUG || {},
        toggleMonitoring: () => setIsEnabled(prev => !prev),
        capturePerformance: () => {
          // Capture long-tasks 
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
              console.warn('Long task detected:', entry.duration, 'ms', entry);
            });
          });
          observer.observe({ entryTypes: ['longtask'] });
        }
      };
      
      console.log('Debug utilities available in window.debugUtils');
    } else {
      delete window.debugUtils;
    }
  }, [isEnabled]);
  
  if (!isEnabled) {
    return children;
  }
  
  return (
    <Suspense fallback={children}>
      {/* Wrap with all debug tools when enabled */}
      <RenderProfiler id="app-root">
        <RenderVisualizer enabled={isEnabled}>
          {/* Tools UI */}
          <PerformanceMonitor enabled={isEnabled} />
          <ComponentProfilerViewer enabled={isEnabled} />
          
          {/* Main app content */}
          {children}
        </RenderVisualizer>
      </RenderProfiler>
    </Suspense>
  );
};

// Export higher-order component to easily wrap any component with debugging
export const withDebugTracking = (Component, options = {}) => {
  const componentName = options.name || Component.displayName || Component.name;
  
  const DebugTrackedComponent = (props) => {
    return (
      <RenderProfiler id={componentName} log={options.log}>
        <Component {...props} />
      </RenderProfiler>
    );
  };
  
  DebugTrackedComponent.displayName = `DebugTracked(${componentName})`;
  return DebugTrackedComponent;
};

export default RenderDebugTools; 