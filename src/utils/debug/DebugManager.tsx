import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import PerformanceMonitor from './PerformanceMonitor';
import { RenderProfiler } from './ComponentProfiler';

// Types for our debug configuration
export interface DebugConfig {
  // Global settings
  enabled: boolean;
  
  // Component specific flags
  components: {
    [componentName: string]: boolean;
  };
  
  // Feature flags
  features: {
    profiling: boolean;
    backgroundEffects: boolean;
    animations: boolean;
    scrollDebugging: boolean;
    layoutMonitoring: boolean;
    renderVisualizer: boolean;
    showFPS: boolean;
  };
  
  // Performance monitoring configuration
  performance: {
    longTaskThreshold: number;
    fpsWarningThreshold: number;
    showComponentTimings: boolean;
    showStackTraces: boolean;
    logToConsole: boolean;
    componentFilter: string[];
  };
}

// Default configuration
const DEFAULT_CONFIG: DebugConfig = {
  enabled: import.meta.env.DEV,
  components: {},
  features: {
    profiling: false,
    backgroundEffects: true,
    animations: true,
    scrollDebugging: false,
    layoutMonitoring: false,
    renderVisualizer: false,
    showFPS: false
  },
  performance: {
    longTaskThreshold: 50,
    fpsWarningThreshold: 30,
    showComponentTimings: true,
    showStackTraces: true,
    logToConsole: true,
    componentFilter: []
  }
};

// Add a registry for automatically registering components
interface ComponentRegistry {
  [componentName: string]: {
    debugEnabled: boolean;
    renderCount: number;
    lastRenderTime: number;
  };
}

// NEW: Add a map to track globally wrapped components
const globalWrappedComponents = new Map<string, React.ComponentType<any>>();

// Create debug context
interface DebugContextType {
  config: DebugConfig;
  toggleDebug: () => void;
  toggleFeature: (feature: keyof DebugConfig['features']) => void;
  toggleComponent: (componentName: string) => void;
  isComponentDebugged: (componentName: string) => boolean;
  registerComponent: (componentName: string) => void;
  componentRegistry: ComponentRegistry;
  // Add setter for config
  setConfig: React.Dispatch<React.SetStateAction<DebugConfig>>;
  // Auto-registration mechanism
  autoRegisterComponent: <P extends object>(
    Component: React.ComponentType<P>,
    componentName: string
  ) => React.ComponentType<P>;
}

export const DebugContext = createContext<DebugContextType>({
  config: DEFAULT_CONFIG,
  toggleDebug: () => {},
  toggleFeature: () => {},
  toggleComponent: () => {},
  isComponentDebugged: () => false,
  registerComponent: () => {},
  componentRegistry: {},
  setConfig: () => {},
  autoRegisterComponent: <P extends object>(Component: React.ComponentType<P>) => Component
});

// Custom hook to use debug context
export const useDebugManager = () => useContext(DebugContext);

// Debug provider component
interface DebugProviderProps {
  children: ReactNode;
  initialConfig?: Partial<DebugConfig>;
}

export const DebugProvider: React.FC<DebugProviderProps> = ({ 
  children, 
  initialConfig = {} 
}) => {
  // Merge default config with initial config
  const [config, setConfig] = useState<DebugConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig,
    components: {
      ...DEFAULT_CONFIG.components,
      ...(initialConfig.components || {})
    },
    features: {
      ...DEFAULT_CONFIG.features,
      ...(initialConfig.features || {})
    },
    performance: {
      ...DEFAULT_CONFIG.performance,
      ...(initialConfig.performance || {})
    }
  });

  // Add component registry state
  const [componentRegistry, setComponentRegistry] = useState<ComponentRegistry>({});

  // Toggle overall debugging
  const toggleDebug = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    // Store in localStorage for persistence
    localStorage.setItem('debug_tools_enabled', (!config.enabled).toString());
    
    console.log(`Debug tools ${!config.enabled ? 'enabled' : 'disabled'}`);
  }, [config.enabled]);

  // Toggle specific feature
  const toggleFeature = useCallback((feature: keyof DebugConfig['features']) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
    
    console.log(`Debug feature '${feature}' ${!config.features[feature] ? 'enabled' : 'disabled'}`);
    
    // Dispatch event for components to listen to
    window.dispatchEvent(new CustomEvent('debug:feature-toggle', {
      detail: { 
        feature, 
        enabled: !config.features[feature] 
      }
    }));
  }, [config.features]);

  // Toggle debugging for specific component
  const toggleComponent = useCallback((componentName: string) => {
    setConfig(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [componentName]: !prev.components[componentName]
      }
    }));
    
    console.log(`Debug for component '${componentName}' ${!config.components[componentName] ? 'enabled' : 'disabled'}`);
  }, [config.components]);

  // Check if a component should be debugged
  const isComponentDebugged = useCallback((componentName: string) => {
    return config.enabled && (config.components[componentName] ?? false);
  }, [config]);

  // Add function to register components
  const registerComponent = useCallback((componentName: string) => {
    setComponentRegistry(prev => {
      // Only update if not already registered
      if (!prev[componentName]) {
        return {
          ...prev,
          [componentName]: {
            debugEnabled: config.components[componentName] ?? false,
            renderCount: 0,
            lastRenderTime: Date.now()
          }
        };
      }
      return prev;
    });
    
    // Add to config if not present
    if (config.components[componentName] === undefined) {
      setConfig(prev => ({
        ...prev,
        components: {
          ...prev.components,
          [componentName]: true
        }
      }));
    }
  }, [config.components]);

  // NEW: Function to auto-register and wrap components
  const autoRegisterComponent = useCallback(<P extends object>(
    Component: React.ComponentType<P>,
    componentName: string
  ): React.ComponentType<P> => {
    // Check if component is already registered
    if (globalWrappedComponents.has(componentName)) {
      return globalWrappedComponents.get(componentName) as React.ComponentType<P>;
    }
    
    // Create the wrapped component
    const WrappedComponent = withDebugging(Component, componentName);
    
    // Store it in our map
    globalWrappedComponents.set(componentName, WrappedComponent);
    
    // Add to configuration if not already there
    if (config.components[componentName] === undefined) {
      setConfig(prevConfig => ({
        ...prevConfig,
        components: {
          ...prevConfig.components,
          [componentName]: false // Default to disabled
        }
      }));
    }
    
    // Return the wrapped component
    return WrappedComponent;
  }, [config.components, setConfig]);

  // Initialize debug settings from localStorage
  useEffect(() => {
    const savedDebugEnabled = localStorage.getItem('debug_tools_enabled');
    if (savedDebugEnabled !== null) {
      setConfig(prev => ({
        ...prev,
        enabled: savedDebugEnabled === 'true'
      }));
    }
  }, []);

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDebug();
      }
      
      // Only process other shortcuts if debugging is enabled
      if (!config.enabled) return;
      
      // Ctrl+Shift+B to toggle background effects
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        toggleFeature('backgroundEffects');
      }
      
      // Ctrl+Shift+A to toggle animations
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        toggleFeature('animations');
      }
      
      // Ctrl+Shift+S to toggle scroll debugging
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        toggleFeature('scrollDebugging');
      }
      
      // Ctrl+Shift+L to toggle layout monitoring
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        toggleFeature('layoutMonitoring');
      }
      
      // Ctrl+Shift+P to toggle profiling
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        toggleFeature('profiling');
      }
      
      // Ctrl+Shift+F to toggle FPS display
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        toggleFeature('showFPS');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config.enabled, toggleDebug, toggleFeature]);

  // Enable layout monitoring when that feature is enabled
  useEffect(() => {
    let layoutObserver: PerformanceObserver | null = null;
    
    if (config.enabled && config.features.layoutMonitoring && window.PerformanceObserver) {
      try {
        layoutObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.duration > 16) { // One frame at 60fps is ~16ms
              console.warn(`[LAYOUT] Expensive layout: ${Math.round(entry.duration)}ms`);
            }
          });
        });
        
        layoutObserver.observe({ entryTypes: ['layout'] });
      } catch (e) {
        console.error('Layout observer not supported', e);
      }
    }
    
    return () => {
      if (layoutObserver) {
        layoutObserver.disconnect();
      }
    };
  }, [config.enabled, config.features.layoutMonitoring]);

  // Create context value
  const contextValue: DebugContextType = {
    config,
    toggleDebug,
    toggleFeature,
    toggleComponent,
    isComponentDebugged,
    registerComponent,
    componentRegistry,
    setConfig,
    autoRegisterComponent
  };

  return (
    <DebugContext.Provider value={contextValue}>
      {children}
      
      {/* Render debug UI if enabled */}
      {config.enabled && config.features.showFPS && (
        <PerformanceMonitor enabled={true} config={config.performance} />
      )}
      
      {/* Debug panel */}
      {config.enabled && createPortal(
        <DebugPanel />,
        document.body
      )}
    </DebugContext.Provider>
  );
};

// Debug panel component
const DebugPanel: React.FC = () => {
  const { config, toggleDebug, toggleFeature, toggleComponent, setConfig } = useDebugManager();
  const [isMinimized, setIsMinimized] = useState(true);
  
  // Toggle panel
  const togglePanel = () => {
    setIsMinimized(prev => !prev);
  };
  
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: isMinimized ? '8px' : '12px',
        borderRadius: '4px',
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: '12px',
        maxWidth: isMinimized ? 'auto' : '300px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
      }}
    >
      {isMinimized ? (
        <button
          onClick={togglePanel}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0',
            margin: '0'
          }}
        >
          🐞
        </button>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <strong>Debug Panel</strong>
            <button
              onClick={togglePanel}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              −
            </button>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={toggleDebug}
              style={{
                background: config.enabled ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
                border: '1px solid #555',
                borderRadius: '3px',
                color: '#fff',
                cursor: 'pointer',
                padding: '4px 8px',
                width: '100%',
                textAlign: 'left'
              }}
            >
              Debug Mode: {config.enabled ? 'ON' : 'OFF'}
            </button>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ marginBottom: '6px', borderBottom: '1px solid #555', paddingBottom: '4px' }}>
              Features:
            </div>
            {Object.entries(config.features).map(([feature, enabled]) => (
              <div key={feature} style={{ marginBottom: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleFeature(feature as keyof DebugConfig['features'])}
                    style={{ marginRight: '6px' }}
                  />
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </label>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{ marginBottom: '6px', borderBottom: '1px solid #555', paddingBottom: '4px' }}>
              Components:
            </div>
            {Object.entries(config.components).map(([component, enabled]) => (
              <div key={component} style={{ marginBottom: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleComponent(component)}
                    style={{ marginRight: '6px' }}
                  />
                  {component}
                </label>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '12px', fontSize: '10px', color: '#999' }}>
            <div>Keyboard shortcuts:</div>
            <div>Ctrl+Shift+D: Toggle debug</div>
            <div>Ctrl+Shift+B: Toggle background</div>
            <div>Ctrl+Shift+A: Toggle animations</div>
            <div>Ctrl+Shift+P: Toggle profiling</div>
            <div>Ctrl+Shift+F: Toggle FPS</div>
          </div>
          
          {/* Performance monitoring section */}
          <div className="debug-section">
            <h4>Performance Monitoring</h4>
            <div className="debug-controls">
              <label>
                <input 
                  type="number" 
                  value={config.performance.longTaskThreshold}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      longTaskThreshold: parseInt(e.target.value)
                    }
                  }))}
                />
                Long task threshold (ms)
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={config.performance.logToConsole} 
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      logToConsole: e.target.checked
                    }
                  }))}
                />
                Log to console
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// HOC to inject debugging to components
export function withDebugging<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const WithDebugging: React.FC<P> = (props) => {
    const { isComponentDebugged, config, registerComponent } = useDebugManager();
    
    // Auto-register this component
    useEffect(() => {
      registerComponent(componentName);
    }, [registerComponent]);
    
    const shouldDebug = isComponentDebugged(componentName);
    
    if (!shouldDebug) {
      return <Component {...props} />;
    }
    
    return (
      <RenderProfiler id={componentName} log={config.features.profiling}>
        <Component {...props} />
      </RenderProfiler>
    );
  };
  
  WithDebugging.displayName = `WithDebugging(${componentName})`;
  return WithDebugging;
}

// Add DebugComponentRegistrar component
export const DebugComponentRegistrar: React.FC = () => {
  // This component is a placeholder for registering components dynamically
  return null;
}; 