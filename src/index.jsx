// Import Firefox fix first before other imports to ensure it runs early
import '@utils/browserFixes';

// ========== CRITICAL: REACT AVAILABILITY BOOTSTRAP ==========
// This ensures React and its methods are available globally before any other imports
// Fix for "Cannot read properties of undefined (reading 'createContext')" in production

// Ensure React is fully loaded and accessible in the global namespace
import React from 'react';
import ReactDOM from 'react-dom/client';

// Global React assignment - MUST come before any animation or context libraries
window.React = React; 

// Make sure common React methods that might be tree-shaken are explicitly preserved
window.React.createContext = React.createContext;
window.React.useContext = React.useContext;
window.React.useState = React.useState;
window.React.useEffect = React.useEffect;
window.React.useRef = React.useRef;
window.React.useCallback = React.useCallback;
window.React.useMemo = React.useMemo;
window.React.useReducer = React.useReducer;
window.React.useLayoutEffect = React.useLayoutEffect;
window.React.memo = React.memo;
window.React.forwardRef = React.forwardRef;
window.React.createRef = React.createRef;
window.React.cloneElement = React.cloneElement;
window.React.isValidElement = React.isValidElement;
window.React.Fragment = React.Fragment;
window.React.Component = React.Component;
window.React.PureComponent = React.PureComponent;
window.React.Children = React.Children;

// Fallback polyfill if createContext is somehow still missing
React.createContext = React.createContext || ((defaultValue) => {
  console.error('createContext polyfill used');
  return {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children(defaultValue),
    _currentValue: defaultValue
  };
});
// ========== END REACT AVAILABILITY BOOTSTRAP ==========

import App from '@/App';

// Use ReactDOM instead of createRoot directly to avoid potential tree-shaking issues
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
