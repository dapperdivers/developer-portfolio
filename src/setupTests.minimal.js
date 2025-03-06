// Minimal setup for tests
import '@testing-library/jest-dom';
import { vi } from 'vitest';

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
  
  // Add static methods
  global.URL.createObjectURL = vi.fn(blob => `mock-url:${blob}`);
  global.URL.revokeObjectURL = vi.fn();
  global.URL.canParse = vi.fn(() => true);
  global.URL.parse = vi.fn(url => new URL(url));
}

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage for tests
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    clear: vi.fn(() => { store = {}; }),
    removeItem: vi.fn(key => { delete store[key]; }),
    key: vi.fn(idx => Object.keys(store)[idx]),
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
  constructor(callback, options = {}) {
    this.callback = callback;
    this.entries = [];
    this.targetElements = new Set();
    
    // Add required properties to match IntersectionObserver interface
    this.root = options.root || null;
    this.rootMargin = options.rootMargin || '0px';
    this.thresholds = options.threshold ? 
      Array.isArray(options.threshold) ? options.threshold : [options.threshold] : 
      [0];
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
  
  takeRecords() {
    return [];
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
  URL.createObjectURL = vi.fn().mockImplementation(object => {
    return `mock-url-${Math.random().toString(36).substr(2, 9)}`;
  });
  
  URL.revokeObjectURL = vi.fn();
}

// Clean up after tests
afterEach(() => {
  vi.clearAllMocks();
  document.body.innerHTML = '';
  mockLocalStorage.clear();
});

// Handle fetch mock
global.fetch = vi.fn();

// Fix for document.createRange for tests with Popper.js
const origCreateRange = document.createRange;
document.createRange = () => {
  if (origCreateRange) {
    try {
      return origCreateRange.call(document);
    } catch (e) {
      // Fallback to mock if original throws
    }
  }
  
  // Create a complete mock Range
  const mockRange = {
    // Basic Range methods
    setStart: vi.fn(),
    setEnd: vi.fn(),
    collapse: vi.fn(),
    selectNode: vi.fn(),
    selectNodeContents: vi.fn(),
    cloneContents: vi.fn(() => document.createDocumentFragment()),
    deleteContents: vi.fn(),
    extractContents: vi.fn(() => document.createDocumentFragment()),
    insertNode: vi.fn(),
    surroundContents: vi.fn(),
    compareBoundaryPoints: vi.fn(() => 0),
    cloneRange: vi.fn(function() { return this; }),
    detach: vi.fn(),
    
    // Range properties
    startContainer: document.body,
    startOffset: 0,
    endContainer: document.body,
    endOffset: 0,
    collapsed: true,
    commonAncestorContainer: document.body,
    
    // For Popper
    getBoundingClientRect: vi.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    })),
    getClientRects: vi.fn(() => ({
      item: vi.fn(() => null),
      length: 0,
      [Symbol.iterator]: function*() {}
    }))
  };
  
  return mockRange;
};
