import React, { useState, useEffect } from 'react';
import { 
  DebugProvider, 
  useDebug, 
  withDebug, 
  PerformanceDisplay 
} from './index';
import PerformanceMonitor from './PerformanceMonitor';

/**
 * Example component using the debug hook
 */
const HookedComponent = () => {
  // Track this component's renders
  useDebug('HookedComponent');
  
  const [counter, setCounter] = useState(0);
  
  return (
    <div className="example-component">
      <h3>Component with Debug Hook</h3>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(c => c + 1)}>Increment</button>
    </div>
  );
};

/**
 * Example component that will be wrapped with withDebug
 */
const SimpleComponent = ({ name }) => {
  const [counter, setCounter] = useState(0);
  
  return (
    <div className="example-component">
      <h3>Component with Debug HOC: {name}</h3>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(c => c + 1)}>Increment</button>
    </div>
  );
};

// Wrap the component with the debug HOC
const DebuggedComponent = withDebug(SimpleComponent, 'SimpleComponent');

// Test component that will create some measurable performance impact
const PerformanceTest = () => {
  const [counter, setCounter] = useState(0);

  // Create some CPU load
  useEffect(() => {
    const interval = setInterval(() => {
      // Do some heavy computation
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      setCounter(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Create some memory allocation
  const array = new Array(10000).fill(0).map(() => new Object());

  return (
    <div>
      <h3>Performance Test Component</h3>
      <p>Counter: {counter}</p>
      <p>Array length: {array.length}</p>
    </div>
  );
};

/**
 * Main example showing how to use the debug utilities
 */
export const DebugExample = () => {
  // State to toggle debug features
  const [showPerformance, setShowPerformance] = useState(false);
  
  return (
    <DebugProvider initialConfig={{
      // Start with debugging enabled
      enabled: true,
      // Enable specific components by default
      components: {
        HookedComponent: true,
        SimpleComponent: true,
      },
      // Enable specific features
      features: {
        profiling: true,
        showFPS: true,
      },
      performance: {
        longTaskThreshold: 50,
        fpsWarningThreshold: 30,
        showComponentTimings: true,
        showStackTraces: true,
        logToConsole: true,
        monitorScriptExecution: true,
        monitorNetworkActivity: true,
      }
    }}>
      <div className="debug-example">
        <h2>Debug Utilities Example</h2>
        
        <div className="toggle-controls">
          <label>
            <input 
              type="checkbox" 
              checked={showPerformance} 
              onChange={() => setShowPerformance(!showPerformance)} 
            />
            Show Performance Monitor
          </label>
        </div>
        
        <div className="components-demo">
          <HookedComponent />
          <DebuggedComponent name="Example" />
        </div>
        
        {/* Keyboard shortcuts help */}
        <div className="shortcuts-help">
          <h4>Keyboard Shortcuts</h4>
          <ul>
            <li><kbd>Ctrl+Shift+D</kbd>: Toggle Debug Panel</li>
            <li><kbd>Ctrl+Shift+P</kbd>: Toggle Performance Monitor</li>
          </ul>
        </div>
        
        {/* Optional performance display */}
        {showPerformance && (
          <PerformanceDisplay 
            enabled={true} 
            position="bottom-right"
            trackComponents={['HookedComponent', 'SimpleComponent']}
          />
        )}
        
        <PerformanceTest />
        <PerformanceMonitor 
          enabled={true}
          initialExpanded={true}
          config={{
            longTaskThreshold: 50,
            fpsWarningThreshold: 30,
            showComponentTimings: true,
            showStackTraces: true,
            logToConsole: true,
            monitorScriptExecution: true,
            monitorNetworkActivity: true,
          }}
          positionStyle={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999
          }}
        />
      </div>
    </DebugProvider>
  );
};

export default DebugExample; 