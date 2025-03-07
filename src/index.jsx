// Import Firefox fix first before other imports to ensure it runs early
import '@utils/browserFixes';

// Ensure React is fully loaded and accessible in the global namespace
import React from 'react';
import ReactDOM from 'react-dom/client';

// Explicitly ensure React methods are present - critical for context in production builds
window.React = React;
// Expose the createContext method to ensure it's not tree-shaken
React.createContext = React.createContext || (() => {
  console.error('createContext polyfill used');
  return {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({}),
  };
});

import App from '@/App';

// Use ReactDOM instead of createRoot directly to avoid potential tree-shaking issues
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
