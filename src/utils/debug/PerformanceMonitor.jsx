import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Performance monitor component
 * Tracks FPS, component renders, and layout thrashing
 */
const PerformanceMonitor = ({ enabled = false }) => {
  const [visible, setVisible] = useState(enabled);
  const [performanceData, setPerformanceData] = useState({
    fps: 0,
    memory: 0,
    renderCount: 0,
    layoutTime: 0,
    paintTime: 0,
    lastUpdate: Date.now(),
  });
  
  const frameCounter = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const renderTimings = useRef({});
  const rafId = useRef(null);
  const performanceEntries = useRef([]);
  
  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Track frame rate
  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;
    frameCounter.current++;
    
    // Update FPS counter once per second
    if (delta >= 1000) {
      const fps = Math.round((frameCounter.current * 1000) / delta);
      const memory = performance?.memory?.usedJSHeapSize ? 
        Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)) : 0;
      
      setPerformanceData(prev => ({
        ...prev,
        fps,
        memory,
        lastUpdate: Date.now(),
      }));
      
      // Reset counters
      frameCounter.current = 0;
      lastFrameTime.current = now;
      
      // Clear old performance entries
      performanceEntries.current = [];
    }
    
    // Process performance entries
    if (performance && performance.getEntriesByType) {
      const entries = performance.getEntriesByType('measure');
      if (entries.length > 0) {
        performanceEntries.current = performanceEntries.current.concat(entries);
        
        // Analyze layout and paint times
        const layoutEntries = entries.filter(e => e.name.includes('layout'));
        const paintEntries = entries.filter(e => e.name.includes('paint'));
        
        if (layoutEntries.length > 0) {
          const avgLayoutTime = layoutEntries.reduce((sum, entry) => sum + entry.duration, 0) / layoutEntries.length;
          setPerformanceData(prev => ({ ...prev, layoutTime: Math.round(avgLayoutTime) }));
        }
        
        if (paintEntries.length > 0) {
          const avgPaintTime = paintEntries.reduce((sum, entry) => sum + entry.duration, 0) / paintEntries.length;
          setPerformanceData(prev => ({ ...prev, paintTime: Math.round(avgPaintTime) }));
        }
        
        // Clear processed entries
        performance.clearMeasures();
      }
    }
    
    // Request next frame
    rafId.current = requestAnimationFrame(calculateFPS);
  }, []);
  
  // Start monitoring
  useEffect(() => {
    if (visible) {
      // Start FPS monitoring
      rafId.current = requestAnimationFrame(calculateFPS);
      
      // Set up performance observer if available
      let observer;
      if (window.PerformanceObserver) {
        observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          performanceEntries.current = performanceEntries.current.concat(entries);
        });
        
        observer.observe({ entryTypes: ['measure', 'paint', 'layout'] });
      }
      
      // Track render count
      const originalRender = React.Component.prototype.render;
      React.Component.prototype.render = function() {
        setPerformanceData(prev => ({ ...prev, renderCount: prev.renderCount + 1 }));
        return originalRender.apply(this, arguments);
      };
      
      return () => {
        cancelAnimationFrame(rafId.current);
        observer?.disconnect();
        React.Component.prototype.render = originalRender;
      };
    }
  }, [visible, calculateFPS]);
  
  // Component tracking
  const trackRender = (componentName) => {
    renderTimings.current[componentName] = renderTimings.current[componentName] || 0;
    renderTimings.current[componentName]++;
    
    console.log(`[RENDER] ${componentName}: ${renderTimings.current[componentName]} renders`);
  };
  
  // Early return if not visible
  if (!visible) return null;
  
  return createPortal(
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: performanceData.fps < 30 ? '#ff5555' : performanceData.fps < 50 ? '#ffaa00' : '#55ff55',
        fontFamily: 'monospace',
        fontSize: '12px',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        userSelect: 'none',
        pointerEvents: 'auto',
        maxWidth: '300px',
      }}
    >
      <div><strong>Performance Monitor</strong> (Ctrl+Shift+P to toggle)</div>
      <div>{`FPS: ${performanceData.fps}`}</div>
      {performanceData.memory > 0 && <div>{`Memory: ${performanceData.memory} MB`}</div>}
      <div>{`Renders: ${performanceData.renderCount}`}</div>
      <div>{`Layout: ${performanceData.layoutTime}ms`}</div>
      <div>{`Paint: ${performanceData.paintTime}ms`}</div>
      <div style={{ fontSize: '10px', marginTop: '5px', color: '#999' }}>
        {new Date(performanceData.lastUpdate).toLocaleTimeString()}
      </div>
    </div>,
    document.body
  );
};

export default PerformanceMonitor;

/**
 * Hook to track component renders
 * @param {string} componentName - Name of the component to track
 */
export const useTrackRender = (componentName) => {
  const renderCountRef = useRef(0);
  
  useEffect(() => {
    renderCountRef.current++;
    console.log(`[RENDER] ${componentName}: ${renderCountRef.current}`);
  });
  
  return renderCountRef.current;
};

/**
 * Higher-order component to track renders of a component
 * @param {React.Component} Component - Component to track
 * @param {string} componentName - Name to use in tracking
 */
export const withRenderTracking = (Component, componentName = Component.displayName || Component.name) => {
  const TrackedComponent = (props) => {
    useTrackRender(componentName);
    return <Component {...props} />;
  };
  
  TrackedComponent.displayName = `Tracked(${componentName})`;
  return TrackedComponent;
}; 