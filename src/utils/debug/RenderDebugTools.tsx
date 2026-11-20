import React, { lazy, Suspense, useState, useEffect } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { RenderProfiler } from './ComponentProfiler';
import type { PerformanceMonitorConfig } from './PerformanceMonitor';

export interface RenderDebugToolsProps {
  /** Whether debug tools are enabled by default */
  defaultEnabled?: boolean;
  /** Configuration for the performance monitor */
  performanceConfig?: Partial<PerformanceMonitorConfig>;
  /** Child components to render */
  children?: ReactNode;
}

export interface DebugTrackingOptions {
  /** Name the renders are recorded under; defaults to the component's own name */
  name?: string;
  /** Log each render to the console */
  log?: boolean;
}

// Lazy load the tools to avoid impacting initial performance
const PerformanceMonitor = lazy(() => import('./PerformanceMonitor'));
const ComponentProfilerViewer = lazy(() => import('./ComponentProfiler'));
const RenderVisualizer = lazy(() => import('./RenderVisualizer'));

// Default performance monitoring settings
const DEFAULT_PERFORMANCE_CONFIG: Partial<PerformanceMonitorConfig> = {
  longTaskThreshold: 50,
  fpsWarningThreshold: 30,
  showComponentTimings: true,
  showStackTraces: true,
  logToConsole: true,
  componentFilter: []
};

// Utility to add or remove DOM markers for debug monitoring
const setupDebugMonitoring = (enabled: boolean) => {
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
 * RenderDebugTools Component
 * 
 * Renders debug monitoring tools for performance profiling
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.defaultEnabled - Whether debug tools are enabled by default
 * @param {Object} props.performanceConfig - Configuration for the performance monitor
 * @param {React.ReactNode} props.children - Child components to render
 */
const RenderDebugTools = ({ 
  defaultEnabled = false, 
  performanceConfig = {}, 
  children 
}: RenderDebugToolsProps) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  
  // Merge performance configuration with defaults
  const mergedPerformanceConfig = {
    ...DEFAULT_PERFORMANCE_CONFIG,
    ...performanceConfig
  };
  
  // Set up keyboard shortcut to toggle tools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsEnabled(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Persist enabled state
  useEffect(() => {
    localStorage.setItem('debug_tools_enabled', String(isEnabled));
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
          <PerformanceMonitor 
            enabled={isEnabled} 
            config={mergedPerformanceConfig} 
          />
          <ComponentProfilerViewer enabled={isEnabled} />
          
          {/* Main app content */}
          {children}
        </RenderVisualizer>
      </RenderProfiler>
    </Suspense>
  );
};

// Export higher-order component to easily wrap any component with debugging
export const withDebugTracking = <P extends object>(
  Component: ComponentType<P>,
  options: DebugTrackingOptions = {}
) => {
  const componentName = options.name || Component.displayName || Component.name;
  
  const DebugTrackedComponent = (props: P) => {
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