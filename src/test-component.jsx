import React from 'react';

// Directly create context with React namespace
const TestContext = React.createContext({
  message: 'Default message'
});

// Provider component
export const TestProvider = ({ children, testMessage = 'Test message works!' }) => {
  const value = React.useMemo(() => {
    return { message: testMessage };
  }, [testMessage]);

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};

// Consumer component to display the context value
export const TestConsumer = () => {
  const { message } = React.useContext(TestContext);
  
  return (
    <div className="test-component">
      <h2>Simple Context Test Component</h2>
      <p>Message from context: <strong>{message}</strong></p>
      <p>This component tests React context in production builds.</p>
    </div>
  );
};

// Main component that combines provider and consumer
const TestComponent = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="test-wrapper" style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1>Context Test Page</h1>
      
      <TestProvider>
        <TestConsumer />
      </TestProvider>
      
      <div className="counter" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
        <p>Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>
      
      <div className="info" style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>This is a minimal test component that isolates React context functionality.</p>
      </div>
    </div>
  );
};

export default TestComponent;
