// DEBUG: Track React hydration flow
console.log('[DEBUG] Starting React app initialization...');

// Import browser compatibility fixes first
import '@utils/browserFixes';

// Import font loader for better font loading experience
// This is now non-blocking and won't prevent React hydration
import '@utils/fontLoader';

// Import CSS files first - order matters for CSS cascade
import '@assets/css/design-system/index.css';
import '@assets/css/index.css';

console.log('[DEBUG] CSS and utilities loaded');

// Import React and ReactDOM directly - using standard named imports
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('[DEBUG] React imported successfully');

// Import the main application
// App already includes the DebugProvider setup internally
// import TestApp from './TestApp.jsx';
import App from './App.jsx';

console.log('[DEBUG] App component imported, starting React render...');

// Create root and render application
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('[DEBUG] React root created');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('[DEBUG] React render initiated');
