import React from 'react';
import ReactDOM from 'react-dom/client';
import TestComponent from './test-component';

// Apply a simple CSS reset
const globalStyle = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
  }
  .header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
  }
  .footer {
    margin-top: 30px;
    padding-top: 10px;
    border-top: 1px solid #eaeaea;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
`;

// Render the test page
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
    <div className="header">
      <h1>React Context Test Page</h1>
      <p>This page is designed to test React context functionality in both development and production builds.</p>
    </div>
    
    <TestComponent />
    
    <div className="footer">
      <p>Build type: {process.env.NODE_ENV}</p>
      <p>Built with Vite and React {React.version}</p>
    </div>
  </React.StrictMode>
);
