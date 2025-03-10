/**
 * This file contains best practices for mocking modules that may
 * cause issues when testing with Vitest and ESM modules
 */
import React from 'react';
import { vi } from 'vitest';

// Proper way to mock a module with ESM compatibility
// Example:
// vi.mock('module-name', () => ({
//   __esModule: true,
//   default: vi.fn(),
//   namedExport: vi.fn()
// }));

// Axios mock implementation
export const createAxiosMock = () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    defaults: { headers: { common: {} } },
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() }
    }
  };
  
  return {
    __esModule: true,
    default: {
      create: vi.fn(() => mockAxiosInstance),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      isCancel: vi.fn(),
      CancelToken: {
        source: vi.fn(() => ({
          token: {},
          cancel: vi.fn()
        }))
      },
      ...mockAxiosInstance
    },
    create: vi.fn(() => mockAxiosInstance),
    get: vi.fn(),
    post: vi.fn(),
    isCancel: vi.fn()
  };
};

// React icons mock implementation
export const createReactIconsMock = () => {
  const IconComponent = ({ className, size, color, ...props }) => {
    return React.createElement('span', {
      ...props,
      className: `mock-icon ${className || ''}`,
      'data-testid': 'mock-icon',
      'data-size': size,
      'data-color': color,
    });
  };
  
  return {
    __esModule: true,
    Fa: { FaGithub: IconComponent, FaTwitter: IconComponent },
    Md: { MdEmail: IconComponent, MdPhone: IconComponent },
    Fi: { FiMenu: IconComponent, FiX: IconComponent },
    Bi: { BiUser: IconComponent, BiEnvelope: IconComponent }
  };
};

// Framer motion mock implementation
export const createFramerMotionMock = () => {
  const Component = ({ children, ...props }) => React.createElement('div', {
    ...props,
    'data-testid': 'motion-component',
  }, children);
  
  return {
    __esModule: true,
    motion: {
      div: Component,
      section: Component,
      nav: Component,
      button: Component,
      span: Component,
      p: Component,
      a: Component,
      ul: Component,
      li: Component,
      svg: Component,
      path: Component
    },
    AnimatePresence: ({ children }) => React.createElement('div', {
      'data-testid': 'animate-presence',
    }, children),
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn()
    }),
    useMotionValue: vi.fn(() => ({
      get: vi.fn(),
      set: vi.fn(),
      onChange: vi.fn()
    })),
    useTransform: vi.fn(() => ({
      get: vi.fn(),
      set: vi.fn()
    })),
    useInView: vi.fn(() => true)
  };
};

// React helmet async mock
export const createHelmetAsyncMock = () => {
  const HelmetProvider = ({ children }) => React.createElement(React.Fragment, {}, children);
  const Helmet = ({ children, ...props }) => {
    // Convert Helmet props to data attributes for testing
    const dataProps = Object.keys(props).reduce((acc, key) => {
      acc[`data-helmet-${key.toLowerCase()}`] = props[key];
      return acc;
    }, {});
    
    return React.createElement('div', {
      'data-testid': 'helmet-mock',
      ...dataProps,
      style: { display: 'none' }
    }, children);
  };
  
  return {
    __esModule: true,
    Helmet,
    HelmetProvider
  };
};

// LocalStorage mock implementation
export const createLocalStorageMock = () => {
  const store = {};
  
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    clear: vi.fn(() => Object.keys(store).forEach(key => delete store[key])),
    removeItem: vi.fn(key => delete store[key]),
    key: vi.fn(idx => Object.keys(store)[idx]),
    get length() { return Object.keys(store).length; }
  };
};
