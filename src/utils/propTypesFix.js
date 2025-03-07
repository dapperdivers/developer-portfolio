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
if (typeof React !== 'undefined') {
  // Legacy mode types that might be missing
  React.AsyncMode = React.AsyncMode || React.unstable_AsyncMode || Symbol.for('react.async_mode');
  React.ConcurrentMode = React.ConcurrentMode || React.unstable_ConcurrentMode || Symbol.for('react.concurrent_mode');
  React.ContextConsumer = React.ContextConsumer || Symbol.for('react.context.consumer');
  React.ContextProvider = React.ContextProvider || Symbol.for('react.context.provider');
  React.Element = React.Element || Symbol.for('react.element');
  React.ForwardRef = React.ForwardRef || Symbol.for('react.forward_ref');
  React.Fragment = React.Fragment || Symbol.for('react.fragment');
  React.Lazy = React.Lazy || Symbol.for('react.lazy');
  React.Memo = React.Memo || Symbol.for('react.memo');
  React.Portal = React.Portal || Symbol.for('react.portal');
  React.Profiler = React.Profiler || Symbol.for('react.profiler');
  React.StrictMode = React.StrictMode || Symbol.for('react.strict_mode');
  React.Suspense = React.Suspense || Symbol.for('react.suspense');
  
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
