/**
 * Context Developer Tool Component
 * 
 * A development-only component that visualizes registered contexts
 * and their current values in the application.
 */

import React, { useState, useEffect, useCallback, useRef, lazy, Suspense, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// Lazy load debug tools to prevent impact on initial load
const RenderDebugToolsImpl = lazy(() => import('./debug/RenderDebugTools'));
const PerformanceMonitorImpl = lazy(() => import('./debug/PerformanceMonitor'));
const ComponentProfilerViewerImpl = lazy(() => import('./debug/ComponentProfiler'));
const RenderVisualizerImpl = lazy(() => import('./debug/RenderVisualizer'));

// Import HOCs and functions directly
import { 
  withDebugTracking, 
  withRenderVisualizer,
  RenderProfiler
} from './debug';

// Create a context for debug tools state
const DebugContext = createContext({
  isDebugEnabled: false,
  toggleDebugTools: () => {},
  registerComponent: () => {},
  trackedComponents: {}
});

// Hook to access debug context
export const useDebug = () => useContext(DebugContext);

/**
 * Global Debug Provider 
 * Renders the DebugContext and debug tools, wrapping the entire application
 */
export const DebugProvider = ({ children }) => {
  const [isDebugEnabled, setIsDebugEnabled] = useState(
    localStorage.getItem('debug_tools_enabled') === 'true'
  );
  const [trackedComponents, setTrackedComponents] = useState({});
  
  // Register a component for debugging
  const registerComponent = useCallback((componentName, instance) => {
    if (isDebugEnabled) {
      setTrackedComponents(prev => ({
        ...prev,
        [componentName]: instance
      }));
    }
  }, [isDebugEnabled]);
  
  // Toggle debug tools
  const toggleDebugTools = useCallback(() => {
    const newState = !isDebugEnabled;
    setIsDebugEnabled(newState);
    localStorage.setItem('debug_tools_enabled', newState);
    
    // Publish global event so other parts of the app can react
    const event = new CustomEvent('debug:toggle', { detail: { enabled: newState } });
    window.dispatchEvent(event);
    
    console.log(`Debug tools ${newState ? 'enabled' : 'disabled'}`);
  }, [isDebugEnabled]);
  
  // Set up keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Shift+D to toggle debug tools
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDebugTools();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDebugTools]);
  
  // Set up global debug utils
  useEffect(() => {
    if (isDebugEnabled) {
      window.debugUtils = {
        toggleTools: toggleDebugTools,
        isEnabled: isDebugEnabled,
        trackedComponents,
        profile: (name, fn) => {
          console.time(`[PROFILE] ${name}`);
          const result = fn();
          console.timeEnd(`[PROFILE] ${name}`);
          return result;
        }
      };
    }
  }, [isDebugEnabled, toggleDebugTools, trackedComponents]);
  
  // Choose which debug tools to render
  const renderDebugTools = () => {
    if (!isDebugEnabled) return children;
    
    return (
      <Suspense fallback={children}>
        <RenderProfiler id="app-root">
          <RenderVisualizerImpl enabled={isDebugEnabled}>
            {/* Performance monitor */}
            <PerformanceMonitorImpl enabled={isDebugEnabled} />
            
            {/* Component profiler */}
            <ComponentProfilerViewerImpl enabled={isDebugEnabled} />
            
            {/* Main app content */}
            {children}
          </RenderVisualizerImpl>
        </RenderProfiler>
      </Suspense>
    );
  };
  
  return (
    <DebugContext.Provider value={{
      isDebugEnabled,
      toggleDebugTools,
      registerComponent,
      trackedComponents
    }}>
      {renderDebugTools()}
    </DebugContext.Provider>
  );
};

/**
 * Master Dev Tool Component
 * Provides context inspection and performance debugging tools
 */
const ContextDevTool = () => {
  // Tool states
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeTab, setActiveTab] = useState('context');
  const [contextData, setContextData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  
  // Access debug context
  const { isDebugEnabled, toggleDebugTools } = useDebug();
  
  // Refs
  const updateTimerRef = useRef(null);
  const toolsContainerRef = useRef(null);
  
  // Get all registered contexts
  const fetchContexts = useCallback(() => {
    const contextsList = {};
    
    // Find all contexts that have been registered with __CONTEXT_DEV_TOOLS__
    if (window.__CONTEXT_DEV_TOOLS__) {
      Object.entries(window.__CONTEXT_DEV_TOOLS__).forEach(([name, context]) => {
        contextsList[name] = context.value;
      });
    }
    
    setContextData(contextsList);
    setLastUpdated(Date.now());
  }, []);
  
  // Toggle open/closed state
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  }, []);
  
  // Toggle minimized state
  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);
  
  // Update contexts periodically when open and showing context tab
  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'context') {
      fetchContexts();
      updateTimerRef.current = setInterval(fetchContexts, 1000);
    }
    
    return () => {
      if (updateTimerRef.current) {
        clearInterval(updateTimerRef.current);
      }
    };
  }, [isOpen, isMinimized, activeTab, fetchContexts]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Shift+E to toggle context tools
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        toggleOpen();
        setActiveTab('context');
      }
      
      // Ctrl+Shift+T to toggle between tabs when open
      if (e.ctrlKey && e.shiftKey && e.key === 'T' && isOpen) {
        setActiveTab(prev => prev === 'context' ? 'debug' : 'context');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleOpen]);
  
  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }
  
  // Tool button that's always visible
  const toolButton = (
    <div
      onClick={toggleOpen}
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        zIndex: 9999,
        backgroundColor: isDebugEnabled ? '#2563eb' : '#333',
        color: '#fff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: isDebugEnabled 
          ? '0 0 10px rgba(37, 99, 235, 0.7), 0 0 5px rgba(37, 99, 235, 0.4)' 
          : '0 2px 4px rgba(0, 0, 0, 0.3)',
        border: isDebugEnabled ? '2px solid rgba(219, 234, 254, 0.8)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      {isOpen ? '✕' : '⚙️'}
    </div>
  );
  
  // Early return if closed
  if (!isOpen) {
    return toolButton;
  }
  
  return (
    <>
      {toolButton}
      
      {createPortal(
        <div
          ref={toolsContainerRef}
          style={{
            position: 'fixed',
            left: '10px',
            bottom: isMinimized ? '60px' : '60px',
            backgroundColor: '#282c34',
            border: '1px solid #555',
            borderRadius: '4px',
            zIndex: 9998,
            width: isMinimized ? 'auto' : '400px',
            maxHeight: isMinimized ? 'auto' : '80vh',
            overflowY: 'auto',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              padding: '10px',
              backgroundColor: '#444',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #555'
            }}
          >
            <strong style={{ color: '#ffffff' }}>Dev Tools</strong>
            <div>
              <button
                onClick={toggleDebugTools}
                style={{
                  background: isDebugEnabled ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                  border: isDebugEnabled ? '1px solid #2563eb' : '1px solid #666',
                  color: isDebugEnabled ? '#60a5fa' : '#ffffff',
                  marginRight: '8px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  borderRadius: '2px'
                }}
              >
                {isDebugEnabled ? 'Debug: ON' : 'Debug: OFF'}
              </button>
              <button
                onClick={toggleMinimize}
                style={{
                  background: 'transparent',
                  border: '1px solid #666',
                  color: '#ffffff',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  borderRadius: '2px'
                }}
              >
                {isMinimized ? '+' : '-'}
              </button>
            </div>
          </div>
          
          {/* Tabs - only shown when not minimized */}
          {!isMinimized && (
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #555',
              backgroundColor: '#333'
            }}>
              <button
                onClick={() => setActiveTab('context')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: activeTab === 'context' ? '#444' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'context' ? '2px solid #60a5fa' : '2px solid transparent',
                  color: activeTab === 'context' ? '#fff' : '#aaa',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: activeTab === 'context' ? 'bold' : 'normal'
                }}
              >
                Context
              </button>
              <button
                onClick={() => setActiveTab('debug')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: activeTab === 'debug' ? '#444' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'debug' ? '2px solid #60a5fa' : '2px solid transparent',
                  color: activeTab === 'debug' ? '#fff' : '#aaa',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: activeTab === 'debug' ? 'bold' : 'normal'
                }}
              >
                Debug
              </button>
            </div>
          )}
          
          {/* Content - only shown when not minimized */}
          {!isMinimized && (
            <div style={{ padding: '10px', color: '#ddd' }}>
              {activeTab === 'context' && (
                <>
                  {Object.keys(contextData).length === 0 ? (
                    <div style={{ color: '#999', fontSize: '12px', padding: '10px 0' }}>
                      No contexts registered. Make sure to use registerContext.
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '10px', color: '#999', marginBottom: '10px' }}>
                        Updated: {new Date(lastUpdated).toLocaleTimeString()}
                      </div>
                      
                      {Object.entries(contextData).map(([name, value]) => (
                        <div key={name} style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#61dafb', marginBottom: '5px' }}>
                            {name}
                          </div>
                          <pre
                            style={{
                              fontSize: '12px',
                              backgroundColor: '#1e1e1e',
                              padding: '8px',
                              borderRadius: '4px',
                              overflow: 'auto',
                              maxHeight: '150px'
                            }}
                          >
                            {JSON.stringify(value, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              
              {activeTab === 'debug' && (
                <div>
                  <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Debug Tools</h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Performance</div>
                    <button
                      onClick={() => {
                        if (window.chrome && window.chrome.devtools) {
                          try {
                            window.chrome.devtools.inspectedWindow.eval(
                              "console.log('FPS meter and paint flashing enabled');"
                            );
                          } catch (e) {
                            console.log('Chrome DevTools API not available');
                          }
                        }
                        
                        // Toggle the Performance Monitor
                        const event = new KeyboardEvent('keydown', {
                          key: 'P',
                          ctrlKey: true,
                          shiftKey: true
                        });
                        document.dispatchEvent(event);
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid #666',
                        color: '#fff',
                        padding: '5px 10px',
                        margin: '2px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                        fontSize: '11px'
                      }}
                    >
                      FPS Monitor
                    </button>
                    
                    <button
                      onClick={() => {
                        const event = new KeyboardEvent('keydown', {
                          key: 'C',
                          ctrlKey: true,
                          shiftKey: true
                        });
                        document.dispatchEvent(event);
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid #666',
                        color: '#fff',
                        padding: '5px 10px',
                        margin: '2px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                        fontSize: '11px'
                      }}
                    >
                      Component Profiler
                    </button>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Visualization</div>
                    <button
                      onClick={() => {
                        const event = new KeyboardEvent('keydown', {
                          key: 'V',
                          ctrlKey: true,
                          shiftKey: true
                        });
                        document.dispatchEvent(event);
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid #666',
                        color: '#fff',
                        padding: '5px 10px',
                        margin: '2px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                        fontSize: '11px'
                      }}
                    >
                      Render Highlighter
                    </button>
                  </div>
                  
                  <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #555' }}>
                    <div style={{ color: '#999', fontSize: '10px' }}>
                      <strong>Global Debug Status:</strong> {isDebugEnabled ? 'Enabled' : 'Disabled'}
                      <p style={{ marginTop: '5px' }}>
                        All components are automatically wrapped with debug tools when enabled.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{ borderTop: '1px solid #555', paddingTop: '10px', marginTop: '10px' }}>
                <div style={{ fontSize: '10px', color: '#999' }}>
                  <p>Keyboard shortcuts:</p>
                  <p>- Ctrl+Shift+E: Toggle Context DevTools</p>
                  <p>- Ctrl+Shift+D: Toggle Render Debug Tools</p>
                  <p>- Ctrl+Shift+T: Switch tabs</p>
                  <p>- Ctrl+Shift+P: Toggle Performance Monitor</p>
                  <p>- Ctrl+Shift+C: Toggle Component Profiler</p>
                  <p>- Ctrl+Shift+V: Toggle Render Visualization</p>
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

// Use in entry file to wrap the entire app
export const withGlobalDebug = (AppComponent) => {
  // Don't do anything in production
  if (import.meta.env.PROD) {
    return AppComponent;
  }
  
  const DebugWrappedApp = (props) => {
    return (
      <DebugProvider>
        <AppComponent {...props} />
        <ContextDevTool />
      </DebugProvider>
    );
  };
  
  DebugWrappedApp.displayName = `DebugWrapped(${AppComponent.displayName || AppComponent.name || 'App'})`;
  return DebugWrappedApp;
};

export default ContextDevTool;
