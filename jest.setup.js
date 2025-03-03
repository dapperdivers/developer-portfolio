/**
 * Global Jest setup file
 * This file is imported before all test files
 */

// Set test environment variables
process.env.NODE_ENV = 'test';

// Setup function for ESM
export default async () => {
  // Add additional polyfills and globals needed for tests
  if (typeof window !== 'undefined') {
    // Browser-specific polyfills for test environment
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = callback => setTimeout(callback, 0);
    }
    
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = id => clearTimeout(id);
    }
    
    // Mock intersection observer
    window.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        this.entries = [];
      }
      
      observe() {
        // Do nothing
      }
      
      unobserve() {
        // Do nothing
      }
      
      disconnect() {
        // Do nothing
      }
      
      // Helper method for tests
      simulateIntersection(isIntersecting) {
        this.entries = [{ isIntersecting }];
        this.callback(this.entries, this);
      }
    };
    
    // Mock ResizeObserver
    window.ResizeObserver = class ResizeObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  // Log setup completion for debugging
  console.log('Jest setup complete');
};
