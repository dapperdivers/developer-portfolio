import React, { Profiler, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Component that tracks render performance of its children
 */
export const RenderProfiler = ({ id, children, log = false }) => {
  // Called when a component finishes rendering
  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    // Store and analyze render data
    if (window.PERFORMANCE_DEBUG) {
      window.PERFORMANCE_DEBUG.recordRender(id, {
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        timestamp: Date.now(),
      });
    }
    
    // Log render information if enabled
    if (log) {
      console.log(`[PROFILER] ${id}:`, {
        actualDuration: Math.round(actualDuration * 100) / 100,
        baseDuration: Math.round(baseDuration * 100) / 100,
      });
    }
  };

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
};

/**
 * Component to visualize render profiling data
 */
const ComponentProfilerViewer = ({ enabled = false }) => {
  const [visible, setVisible] = useState(enabled);
  const [profilerData, setProfilerData] = useState({});
  const [expandedComponents, setExpandedComponents] = useState({});
  
  // Toggle visibility with Ctrl+Shift+C
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        setVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Set up global profiler data collection
  useEffect(() => {
    // Initialize global performance debug object if not exists
    if (!window.PERFORMANCE_DEBUG) {
      window.PERFORMANCE_DEBUG = {
        renders: {},
        recordRender: (id, data) => {
          if (!window.PERFORMANCE_DEBUG.renders[id]) {
            window.PERFORMANCE_DEBUG.renders[id] = [];
          }
          
          // Keep only the last 100 renders
          if (window.PERFORMANCE_DEBUG.renders[id].length >= 100) {
            window.PERFORMANCE_DEBUG.renders[id].shift();
          }
          
          window.PERFORMANCE_DEBUG.renders[id].push(data);
        },
        clear: () => {
          window.PERFORMANCE_DEBUG.renders = {};
        }
      };
    }
    
    // Update data every second when visible
    let interval;
    if (visible) {
      interval = setInterval(() => {
        if (window.PERFORMANCE_DEBUG) {
          setProfilerData({ ...window.PERFORMANCE_DEBUG.renders });
        }
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [visible]);
  
  // Toggle component expanded state
  const toggleComponent = useCallback((id) => {
    setExpandedComponents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);
  
  // Clear profiler data
  const clearData = useCallback(() => {
    if (window.PERFORMANCE_DEBUG) {
      window.PERFORMANCE_DEBUG.clear();
      setProfilerData({});
    }
  }, []);
  
  // Early return if not visible
  if (!visible) return null;
  
  // Calculate statistics for each component
  const componentStats = Object.entries(profilerData).map(([id, renders]) => {
    if (!renders || renders.length === 0) return null;
    
    const actualDurations = renders.map(r => r.actualDuration);
    const baseDurations = renders.map(r => r.baseDuration);
    
    return {
      id,
      renderCount: renders.length,
      avgActualDuration: actualDurations.reduce((sum, val) => sum + val, 0) / actualDurations.length,
      maxActualDuration: Math.max(...actualDurations),
      avgBaseDuration: baseDurations.reduce((sum, val) => sum + val, 0) / baseDurations.length,
      lastRender: renders[renders.length - 1].timestamp,
      renders: renders.slice(-10), // Keep only last 10 for display
      isExpanded: expandedComponents[id] || false,
    };
  }).filter(Boolean);
  
  // Sort by average render duration (slowest first)
  componentStats.sort((a, b) => b.avgActualDuration - a.avgActualDuration);
  
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontSize: '12px',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        maxHeight: '80vh',
        maxWidth: '400px',
        overflow: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <strong>Component Profiler</strong>
        <div>
          <button 
            onClick={clearData}
            style={{
              background: 'transparent',
              border: '1px solid #555',
              color: '#ffffff',
              padding: '2px 5px',
              cursor: 'pointer',
              marginRight: '5px',
              fontSize: '10px',
            }}
          >
            Clear
          </button>
          <button
            onClick={() => setVisible(false)}
            style={{
              background: 'transparent',
              border: '1px solid #555',
              color: '#ffffff',
              padding: '2px 5px',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            Close
          </button>
        </div>
      </div>
      
      <div style={{ fontSize: '10px', marginBottom: '10px', color: '#999' }}>
        Ctrl+Shift+C to toggle | {componentStats.length} components tracked
      </div>
      
      {componentStats.length === 0 ? (
        <div style={{ color: '#999', fontSize: '11px' }}>No render data collected yet</div>
      ) : (
        <div>
          {componentStats.map(stat => (
            <div key={stat.id} style={{ marginBottom: '10px' }}>
              <div 
                onClick={() => toggleComponent(stat.id)}
                style={{ 
                  cursor: 'pointer',
                  padding: '5px',
                  backgroundColor: 'rgba(50, 50, 50, 0.5)',
                  borderRadius: '3px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{stat.id}</div>
                <div>
                  {Math.round(stat.avgActualDuration * 100) / 100}ms
                  {stat.avgActualDuration > 16 && (
                    <span style={{ color: '#ff5555', marginLeft: '5px' }}>⚠</span>
                  )}
                </div>
              </div>
              
              {stat.isExpanded && (
                <div style={{ fontSize: '11px', padding: '5px', backgroundColor: 'rgba(30, 30, 30, 0.5)' }}>
                  <div>Renders: {stat.renderCount}</div>
                  <div>Avg Time: {Math.round(stat.avgActualDuration * 100) / 100}ms</div>
                  <div>Max Time: {Math.round(stat.maxActualDuration * 100) / 100}ms</div>
                  <div>Base Time: {Math.round(stat.avgBaseDuration * 100) / 100}ms</div>
                  
                  <div style={{ marginTop: '5px', borderTop: '1px solid #444', paddingTop: '5px' }}>
                    <div style={{ marginBottom: '3px' }}>Recent renders:</div>
                    {stat.renders.map((render, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        color: render.actualDuration > 16 ? '#ff5555' : '#aaaaaa',
                        fontSize: '10px'
                      }}>
                        <span>{new Date(render.timestamp).toLocaleTimeString()}</span>
                        <span>{Math.round(render.actualDuration * 100) / 100}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ComponentProfilerViewer; 