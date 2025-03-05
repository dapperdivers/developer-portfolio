// Minimal setup for tests
import '@testing-library/jest-dom';

// Set up testing environment for ESM compatibility
// This fixes issues with modules that use import.meta and dynamic imports

// Define URL class if not available in test environment
if (typeof URL === 'undefined') {
  global.URL = class URL {
    constructor(url) {
      this.href = url;
      this.pathname = url;
      this.search = '';
      this.hash = '';
    }
    
    toString() {
      return this.href;
    }
  };
}

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage for tests
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    key: jest.fn(idx => Object.keys(store)[idx]),
    get length() { return Object.keys(store).length; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: { ...mockLocalStorage },
  writable: true
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
    this.targetElements = new Set();
  }
  
  observe(element) {
    this.targetElements.add(element);
  }
  
  unobserve(element) {
    this.targetElements.delete(element);
  }
  
  disconnect() {
    this.targetElements.clear();
  }
  
  // Helper for tests
  simulateIntersection(isIntersecting, element = null) {
    const targets = element ? [element] : Array.from(this.targetElements);
    this.entries = targets.map(target => ({
      isIntersecting,
      target,
      boundingClientRect: { top: 0, left: 0, width: 100, height: 100 },
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: isIntersecting ? { top: 0, left: 0, width: 100, height: 100 } : { top: 0, left: 0, width: 0, height: 0 },
      rootBounds: { top: 0, left: 0, width: 1000, height: 1000 },
      time: Date.now()
    }));
    
    if (this.entries.length > 0) {
      this.callback(this.entries, this);
    }
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observedElements = new Set();
  }
  
  observe(element) {
    this.observedElements.add(element);
  }
  
  unobserve(element) {
    this.observedElements.delete(element);
  }
  
  disconnect() {
    this.observedElements.clear();
  }
  
  // Helper for tests
  triggerResize(entries = []) {
    if (entries.length === 0 && this.observedElements.size > 0) {
      entries = Array.from(this.observedElements).map(target => ({
        target,
        contentRect: { width: 100, height: 100 }
      }));
    }
    
    if (entries.length > 0 && this.callback) {
      this.callback(entries, this);
    }
  }
}

global.ResizeObserver = MockResizeObserver;

// Fix requestAnimationFrame for tests
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = callback => {
    return setTimeout(callback, 0);
  };
  
  window.cancelAnimationFrame = id => {
    clearTimeout(id);
  };
}

// Fix createObjectURL for tests
if (!URL.createObjectURL) {
  URL.createObjectURL = jest.fn().mockImplementation(object => {
    return `mock-url-${Math.random().toString(36).substr(2, 9)}`;
  });
  
  URL.revokeObjectURL = jest.fn();
}

// Clean up after tests
afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
  mockLocalStorage.clear();
});

// Handle fetch mock
global.fetch = jest.fn();

// Fix for document.createRange for tests with Popper.js
document.createRange = () => {
  const range = new Range();
  
  range.getBoundingClientRect = jest.fn();
  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0
    };
  };
  
  return range;
};