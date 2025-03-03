// Minimal setup for tests
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Make jest available globally for all tests
global.jest = jest;

// Mock browser APIs
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  };
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
  
  // Helper for tests
  simulateIntersection(isIntersecting) {
    this.entries = [{ isIntersecting }];
    this.callback(this.entries, this);
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Clean up after tests
afterEach(() => {
  if (typeof jest !== 'undefined') {
    jest.clearAllMocks();
  }
});