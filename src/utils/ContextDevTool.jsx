/**
 * Context Developer Tool Component
 * 
 * A development-only component that visualizes registered contexts
 * and their current values in the application.
 */

import { useState, useEffect } from 'react';
import { getRegisteredContexts } from './contextUtils';

// Styling for the dev tool
const styles = {
  devtool: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: 9999,
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '5px',
    padding: '10px',
    maxWidth: '400px',
    maxHeight: '500px',
    overflow: 'auto',
    fontSize: '14px',
    fontFamily: 'monospace',
    border: '1px solid #ddd',
    transition: 'all 0.3s ease'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  title: {
    margin: 0,
    fontSize: '16px',
    color: '#333'
  },
  button: {
    background: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '2px 5px',
    fontSize: '12px',
    borderRadius: '3px',
    border: '1px solid #ddd'
  },
  contextItem: {
    marginBottom: '10px',
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #eee'
  },
  contextName: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#0066cc'
  },
  contextDescription: {
    margin: '5px 0',
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic'
  },
  valueDisplay: {
    overflowX: 'auto',
    padding: '5px',
    backgroundColor: '#f5f5f5',
    borderRadius: '3px',
    fontSize: '12px'
  },
  toggleButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: 9998,
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    fontSize: '18px'
  },
  minimized: {
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

/**
 * Context Developer Tool Component
 * Only rendered in development mode
 */
const ContextDevTool = () => {
  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }
  
  const [contexts, setContexts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  // Refresh contexts from registry
  useEffect(() => {
    const fetchContexts = () => {
      const registeredContexts = getRegisteredContexts();
      setContexts(registeredContexts);
    };
    
    fetchContexts();
    
    // Refresh every 2 seconds
    const interval = setInterval(fetchContexts, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Toggle the visibility of the entire tool
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };
  
  // Toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // If tool is completely closed, only show toggle button
  if (!isOpen) {
    return (
      <button 
        style={styles.toggleButton} 
        onClick={toggleOpen}
        title="Show Context Dev Tool"
      >
        C
      </button>
    );
  }
  
  return (
    <div style={{
      ...styles.devtool,
      ...(isMinimized ? styles.minimized : {})
    }}>
      {isMinimized ? (
        <div onClick={toggleMinimize} style={{cursor: 'pointer'}}>C</div>
      ) : (
        <>
          <div style={styles.header}>
            <h4 style={styles.title}>Context DevTool ({contexts.length})</h4>
            <div>
              <button style={styles.button} onClick={toggleMinimize}>_</button>
              <button style={styles.button} onClick={toggleOpen}>×</button>
            </div>
          </div>
          
          {contexts.length === 0 ? (
            <div>No contexts registered</div>
          ) : (
            contexts.map((ctx) => (
              <div key={ctx.name} style={styles.contextItem}>
                <div style={styles.contextName}>{ctx.name}</div>
                {ctx.description && (
                  <div style={styles.contextDescription}>{ctx.description}</div>
                )}
                <div style={styles.valueDisplay}>
                  <pre>{JSON.stringify(ctx.defaultValue, null, 2)}</pre>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ContextDevTool;
