// Import browser compatibility fixes first
import '@utils/browserFixes';

// Import React and ReactDOM directly - using standard named imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main application
import App from '@/App';

// Create root and render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
