// Import browser compatibility fixes first
import '@utils/browserFixes';

// Import React and ReactDOM directly - using standard named imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main application
// Note: App is already wrapped with withGlobalDebug in App.jsx,
// so we're importing the DebugWrappedApp component here
import App from '@/App';

// Create root and render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
