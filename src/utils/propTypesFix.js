/**
 * PropTypes and React-is Compatibility Fix
 * 
 * This file ensures that React-is and prop-types related functionality 
 * works correctly in production builds by ensuring React types are defined
 * before they're accessed by react-is.
 */

// Ensure React is available
import React from 'react';

// Make sure window.React is defined
if (typeof window !== 'undefined') {
  window.React = window.React || React;
}

// Define React types that might be used by react-is
if (typeof React !== 'undefined' && React !== null) {
  // Ensure React has an object type
  if (typeof React !== 'object') {
    console.warn('React is not an object type, creating backup');
    window.React = window.React || {};
    React = window.React;
  }
  
  // Create a safe function to define React symbols
  const defineReactSymbol = (name, fallbacks) => {
    try {
      if (React[name] === undefined) {
        for (const fallback of fallbacks) {
          if (fallback !== undefined) {
            React[name] = fallback;
            return;
          }
        }
        
        // If no fallbacks work, use Symbol.for
        if (typeof Symbol !== 'undefined' && Symbol.for) {
          React[name] = Symbol.for(`react.${name.toLowerCase()}`);
        }
      }
    } catch (e) {
      console.warn(`Error defining React.${name}`, e);
    }
  };
  
  // Define all React symbols safely
  defineReactSymbol('AsyncMode', [React.AsyncMode, React.unstable_AsyncMode, Symbol.for('react.async_mode')]);
  defineReactSymbol('ConcurrentMode', [React.ConcurrentMode, React.unstable_ConcurrentMode, Symbol.for('react.concurrent_mode')]);
  defineReactSymbol('ContextConsumer', [React.ContextConsumer, Symbol.for('react.context.consumer')]);
  defineReactSymbol('ContextProvider', [React.ContextProvider, Symbol.for('react.context.provider')]);
  defineReactSymbol('Element', [React.Element, Symbol.for('react.element')]);
  defineReactSymbol('ForwardRef', [React.ForwardRef, Symbol.for('react.forward_ref')]);
  defineReactSymbol('Fragment', [React.Fragment, Symbol.for('react.fragment')]);
  defineReactSymbol('Lazy', [React.Lazy, Symbol.for('react.lazy')]);
  defineReactSymbol('Memo', [React.Memo, Symbol.for('react.memo')]);
  defineReactSymbol('Portal', [React.Portal, Symbol.for('react.portal')]);
  defineReactSymbol('Profiler', [React.Profiler, Symbol.for('react.profiler')]);
  defineReactSymbol('StrictMode', [React.StrictMode, Symbol.for('react.strict_mode')]);
  defineReactSymbol('Suspense', [React.Suspense, Symbol.for('react.suspense')]);
  
  // Also ensure symbols that react-is might be expecting
  if (!Symbol.for) {
    const symbolMap = {};
    Symbol.for = (key) => {
      if (!symbolMap[key]) symbolMap[key] = Symbol(key);
      return symbolMap[key];
    };
  }
}

// Log success
console.log('PropTypes compatibility fix applied');
