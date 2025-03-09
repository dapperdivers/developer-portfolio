import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Enhanced performance monitor component
 * Tracks FPS, component renders, layout thrashing, memory usage, and long tasks
 */
const PerformanceMonitor = ({ enabled = false }) => {
  const [visible, setVisible] = useState(enabled);
  const [expanded, setExpanded] = useState(false);
  const [performanceData, setPerformanceData] = useState({
    fps: 0,
    memory: 0,
    renderCount: 0,
    layoutTime: 0,
    paintTime: 0,
    scriptTime: 0,
    longTasks: [],
    eventHandlers: 0,
    lastUpdate: Date.now(),
  });
  
  const frameCounter = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const renderTimings = useRef({});
  const rafId = useRef(null);
  const performanceEntries = useRef([]);
  const longTasksRef = useRef([]);
  
  // Track long tasks with PerformanceObserver
  useEffect(() => {
    if (!visible || !window.PerformanceObserver) return;
    
    // Observer for long tasks (tasks that block the main thread)
    const longTaskObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // Store only the 10 most recent long tasks
        longTasksRef.current = [
          ...longTasksRef.current.slice(-9),
          {
            duration: Math.round(entry.duration),
            timestamp: Date.now()
          }
        ];
        
        // Update state with new long tasks
        setPerformanceData(prev => ({
          ...prev,
          longTasks: longTasksRef.current
        }));
        
        console.warn(`[PERFORMANCE] Long task detected: ${Math.round(entry.duration)}ms`);
      });
    });
    
    try {
      // Register observer for long tasks (tasks > 50ms)
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Long task observer not supported', e);
    }
    
    return () => {
      longTaskObserver.disconnect();
    };
  }, [visible]);
  
  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setVisible(prev => !prev);
      }
      
      // Expand/collapse with Alt+P
      if (e.altKey && e.key === 'P' && visible) {
        setExpanded(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);
  
  // Count event handlers in DOM (potential memory leaks and perf issues)
  const countEventHandlers = useCallback(() => {
    if (!visible) return 0;
    
    try {
      let count = 0;
      const events = [
        'click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 
        'keydown', 'keyup', 'keypress', 'scroll', 'resize', 'focus', 'blur'
      ];
      
      events.forEach(eventType => {
        // Use internal Chrome API if available (more accurate)
        if (window.getEventListeners) {
          try {
            count += window.getEventListeners(document).length || 0;
            count += window.getEventListeners(window).length || 0;
          } catch (e) {
            // API not available in this browser
          }
        }
      });
      
      return count;
    } catch (e) {
      return 0;
    }
  }, [visible]);
  
  // Track frame rate and other performance metrics
  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;
    frameCounter.current++;
    
    // Update FPS counter once per second
    if (delta >= 1000) {
      const fps = Math.round((frameCounter.current * 1000) / delta);
      const memory = performance?.memory?.usedJSHeapSize ? 
        Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)) : 0;
      
      // Count event handlers (potential leaks)
      const eventHandlers = countEventHandlers();
      
      setPerformanceData(prev => ({
        ...prev,
        fps,
        memory,
        eventHandlers,
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
        
        // Analyze performance categories
        const layoutEntries = entries.filter(e => e.name.includes('layout'));
        const paintEntries = entries.filter(e => e.name.includes('paint'));
        const scriptEntries = entries.filter(e => e.name.includes('script') || e.name.includes('evaluation'));
        
        if (layoutEntries.length > 0) {
          const avgLayoutTime = layoutEntries.reduce((sum, entry) => sum + entry.duration, 0) / layoutEntries.length;
          setPerformanceData(prev => ({ ...prev, layoutTime: Math.round(avgLayoutTime) }));
        }
        
        if (paintEntries.length > 0) {
          const avgPaintTime = paintEntries.reduce((sum, entry) => sum + entry.duration, 0) / paintEntries.length;
          setPerformanceData(prev => ({ ...prev, paintTime: Math.round(avgPaintTime) }));
        }
        
        if (scriptEntries.length > 0) {
          const avgScriptTime = scriptEntries.reduce((sum, entry) => sum + entry.duration, 0) / scriptEntries.length;
          setPerformanceData(prev => ({ ...prev, scriptTime: Math.round(avgScriptTime) }));
        }
        
        // Clear processed entries
        performance.clearMeasures();
      }
    }
    
    // Request next frame
    rafId.current = requestAnimationFrame(calculateFPS);
  }, [countEventHandlers]);
  
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
  
  // Determine color based on FPS
  const getFpsColor = (fps) => {
    if (fps < 30) return '#ff5555';
    if (fps < 50) return '#ffaa00';
    return '#55ff55';
  };
  
  // Add some diagnostic tests
  const runDiagnostics = useCallback(() => {
    // Frame rate test
    console.log(`[DIAGNOSTICS] Current frame rate: ${performanceData.fps} FPS`);
    
    // Long task test
    let longTaskCount = 0;
    let testStart = performance.now();
    
    // Simulate expensive operation (should trigger long task)
    const arr = new Array(1000000).fill(0);
    arr.forEach((_, i) => {
      arr[i] = Math.sqrt(i) * Math.sin(i);
    });
    
    let testDuration = performance.now() - testStart;
    console.log(`[DIAGNOSTICS] Expensive operation test: ${Math.round(testDuration)}ms`);
    
    // Check if Background component is causing any slowdown
    console.log('[DIAGNOSTICS] Try toggling background with Ctrl+Shift+B to test performance impact');
    
    // Check memory usage
    if (performanceData.memory > 0) {
      console.log(`[DIAGNOSTICS] Memory usage: ${performanceData.memory}MB`);
    }
    
    // Animation impact test
    console.log('[DIAGNOSTICS] Starting animation impact test...');
    let framesBefore = 0;
    let testAnimationTimer = null;
    let startTime = performance.now();
    
    const checkFrames = () => {
      if (performance.now() - startTime >= 1000) {
        let framesAfter = frameCounter.current;
        console.log(`[DIAGNOSTICS] Animation impact: ${framesAfter - framesBefore} frames in 1 second`);
        clearTimeout(testAnimationTimer);
      } else {
        testAnimationTimer = setTimeout(checkFrames, 100);
      }
    };
    
    // Start checking frames
    checkFrames();
    
  }, [performanceData]);
  
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
        color: getFpsColor(performanceData.fps),
        fontFamily: 'monospace',
        fontSize: '12px',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        userSelect: 'none',
        maxWidth: expanded ? '400px' : '300px',
        maxHeight: expanded ? '80vh' : 'auto',
        overflow: expanded ? 'auto' : 'visible',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <strong>Performance Monitor</strong>
        <div>
          <button 
            onClick={() => setExpanded(prev => !prev)}
            style={{
              background: 'transparent',
              border: '1px solid #555',
              color: '#fff',
              marginRight: '5px',
              cursor: 'pointer',
              fontSize: '10px',
              width: '20px',
              height: '20px',
            }}
          >
            {expanded ? '−' : '+'}
          </button>
          <button 
            onClick={runDiagnostics}
            style={{
              background: 'transparent',
              border: '1px solid #555',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '10px',
              width: '20px',
              height: '20px',
            }}
          >
            🔍
          </button>
        </div>
      </div>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FPS:</span>
          <span style={{ color: getFpsColor(performanceData.fps) }}>{performanceData.fps}</span>
        </div>
        
        {performanceData.memory > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Memory:</span>
            <span>{performanceData.memory} MB</span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Renders:</span>
          <span>{performanceData.renderCount}</span>
        </div>
      </div>
      
      {expanded && (
        <>
          <div style={{ marginTop: '10px', borderTop: '1px solid #444', paddingTop: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Layout:</span>
              <span>{performanceData.layoutTime}ms</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Paint:</span>
              <span>{performanceData.paintTime}ms</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Script:</span>
              <span>{performanceData.scriptTime}ms</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Event handlers:</span>
              <span>{performanceData.eventHandlers}</span>
            </div>
          </div>
          
          {performanceData.longTasks.length > 0 && (
            <div style={{ marginTop: '10px', borderTop: '1px solid #444', paddingTop: '5px' }}>
              <div style={{ marginBottom: '5px', color: '#ff5555' }}>
                Long tasks:
              </div>
              {performanceData.longTasks.map((task, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#ff9999' }}>
                  {new Date(task.timestamp).toLocaleTimeString()}: {task.duration}ms
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#999' }}>
            <div>Keyboard shortcuts:</div>
            <div>- Ctrl+Shift+P: Toggle monitor</div>
            <div>- Alt+P: Expand/collapse</div>
            <div>- Ctrl+Shift+B: Toggle background</div>
          </div>
        </>
      )}
      
      <div style={{ fontSize: '10px', marginTop: '5px', color: '#999', textAlign: 'right' }}>
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