// Import browser compatibility fixes first
import '@utils/browserFixes';

// Import font loader for better font loading experience
import '@utils/fontLoader';

// Import CSS files first - order matters for CSS cascade
import '@assets/css/design-system/index.css';
import '@assets/css/index.css';

// Import React and ReactDOM directly - using standard named imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main application
// App already includes the DebugProvider setup internally
// import TestApp from './TestApp.jsx';
import App from './App.jsx';

// Create root and render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
