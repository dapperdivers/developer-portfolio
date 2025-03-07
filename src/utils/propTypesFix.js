/**
 * React PropTypes Compatibility Module
 * 
 * This module provides necessary symbol definitions for prop-types library
 * in a clean, decoupled manner.
 */

import React from 'react';

// Export symbols that might be used by prop-types and react-is
export const ReactSymbols = {
  asyncMode: Symbol.for('react.async_mode'),
  concurrentMode: Symbol.for('react.concurrent_mode'),
  contextConsumer: Symbol.for('react.context.consumer'),
  contextProvider: Symbol.for('react.context.provider'),
  element: Symbol.for('react.element'),
  forwardRef: Symbol.for('react.forward_ref'),
  fragment: Symbol.for('react.fragment'),
  lazy: Symbol.for('react.lazy'),
  memo: Symbol.for('react.memo'),
  portal: Symbol.for('react.portal'),
  profiler: Symbol.for('react.profiler'),
  strictMode: Symbol.for('react.strict_mode'),
  suspense: Symbol.for('react.suspense')
};

/**
 * Check if a component type is a specific React type
 * @param {any} type - Component type to check
 * @param {Symbol} expectedType - Expected React type
 * @returns {boolean} True if the types match
 */
export function isReactTypeOf(type, expectedType) {
  return type === expectedType || 
    (type && type.$$typeof === expectedType);
}

// Create a small helper to get the correct ReactIs behavior
export const ReactTypeUtils = {
  isFragment: (element) => isReactTypeOf(element?.type, ReactSymbols.fragment),
  isPortal: (element) => isReactTypeOf(element?.type, ReactSymbols.portal),
  isMemo: (element) => isReactTypeOf(element?.type, ReactSymbols.memo),
  isForwardRef: (element) => isReactTypeOf(element?.type, ReactSymbols.forwardRef),
  isContext: (element) => (
    isReactTypeOf(element?.type, ReactSymbols.contextProvider) || 
    isReactTypeOf(element?.type, ReactSymbols.contextConsumer)
  )
};

// Log initialization
console.log('React PropTypes compatibility module initialized');
