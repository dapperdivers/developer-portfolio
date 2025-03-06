// Import Jest DOM utilities 
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Simple ESM-compatible setup file

// Mock framer-motion
vi.mock('framer-motion', () => {
  return {
    motion: {
      div: function MockMotionDiv(props) { 
        return { ...props, __mock: 'motion.div' };
      },
      section: function MockMotionSection(props) { 
        return { ...props, __mock: 'motion.section' };
      },
      button: function MockMotionButton(props) { 
        return { ...props, __mock: 'motion.button' };
      },
      a: function MockMotionA(props) { 
        return { ...props, __mock: 'motion.a' };
      },
      p: function MockMotionP(props) { 
        return { ...props, __mock: 'motion.p' };
      }
    },
    AnimatePresence: function MockAnimatePresence(props) {
      return { ...props, __mock: 'AnimatePresence' };
    }
  };
});

// Mock Iconify
vi.mock('@iconify/react', () => {
  return {
    Icon: function MockIcon(props) {
      return { 
        'data-testid': 'mock-icon',
        ...props,
        __mock: 'Icon'
      };
    }
  };
});

// Mock browsers APIs
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  };
  
  window.IntersectionObserver = class MockIntersectionObserver {
    constructor() {
      this.disconnect = () => {};
      this.observe = () => {};
      this.unobserve = () => {};
    }
  };
}

// Clean up after tests
afterEach(() => {
  jest.clearAllMocks();
});
