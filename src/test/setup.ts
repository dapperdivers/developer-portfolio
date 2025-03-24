/**
 * Test Setup File
 *
 * This file sets up the testing environment for the Developer Portfolio project.
 * It includes mocks for various browser APIs, React components, and project-specific utilities.
 */

// Define animation variants directly to avoid hoisting issues
// These need to be defined BEFORE imports due to vi.mock() hoisting
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Helper functions - also need to be defined before imports
const getAnimationDelay = (index: number): string => `${index * 0.1}s`;
const optimizeVariants = (variants: any): any => variants;

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { vi, afterEach } from 'vitest';

// Import the context
import { AnimationContext } from '../utils/AnimationContext';
import { PortfolioContext } from '../context/PortfolioContext';

// Mock framer-motion
vi.mock('framer-motion', () => {
  const React = require('react');
  const { vi } = require('vitest');
  
  // Create a forwardRef component factory
  const createMotionComponent = (elementType) => {
    return React.forwardRef((props, ref) =>
      React.createElement(elementType, {
        ref,
        'data-motion': JSON.stringify(props),
        ...props
      })
    );
  };
  
  // Create motion components
  const motion = {
    div: createMotionComponent('div'),
    article: createMotionComponent('article'),
    button: createMotionComponent('button'),
    section: createMotionComponent('section'),
    span: createMotionComponent('span'),
    p: createMotionComponent('p'),
    a: createMotionComponent('a'),
    ul: createMotionComponent('ul'),
    li: createMotionComponent('li'),
    img: createMotionComponent('img'),
    header: createMotionComponent('header'),
    footer: createMotionComponent('footer'),
    main: createMotionComponent('main'),
    nav: createMotionComponent('nav'),
    h1: createMotionComponent('h1'),
    h2: createMotionComponent('h2'),
    h3: createMotionComponent('h3'),
    h4: createMotionComponent('h4'),
    h5: createMotionComponent('h5'),
    h6: createMotionComponent('h6')
  };
  
  // Animation controls mock
  const useAnimation = () => ({
    start: vi.fn(),
    set: vi.fn(),
    stop: vi.fn()
  });
  
  // InView hook mock
  const useInView = () => [vi.fn(), true];
  
  return {
    motion,
    m: motion, // Alias for motion
    useAnimation,
    useInView,
    AnimatePresence: ({ children }) => children,
    LazyMotion: ({ children }) => children,
    domAnimation: {},
    domMax: {}
  };
});

// Mock @context/AnimationContext
vi.mock('@context/AnimationContext', () => {
  const React = require('react');
  const { vi } = require('vitest');
  
  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const getAnimationDelay = (index) => `${index * 0.1}s`;
  const optimizeVariants = (variants) => variants;
  
  // Create the context
  const AnimationContext = {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({}),
  };
  
  // Create the hook
  const useAnimation = vi.fn().mockReturnValue({
    animationEnabled: true,
    shouldReduceMotion: false,
    fadeInVariants,
    slideUpVariants,
    scaleVariants,
    staggerContainerVariants,
    getAnimationDelay,
    getOptimizedVariants: optimizeVariants,
    optimizeVariants,
    prefersReducedMotion: false,
    isLowPowerDevice: false,
    animationStaggerDelay: 0.15
  });
  
  return {
    AnimationContext,
    useAnimation
  };
});
// Mock ../utils/AnimationContext
vi.mock('../utils/AnimationContext', () => {
  const React = require('react');
  const { vi } = require('vitest');
  
  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const getAnimationDelay = (index) => `${index * 0.1}s`;
  const optimizeVariants = (variants) => variants;
  
  // Create the context
  const AnimationContext = {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({}),
  };
  
  // Create the hook
  const useAnimation = vi.fn().mockReturnValue({
    animationEnabled: true,
    shouldReduceMotion: false,
    fadeInVariants,
    slideUpVariants,
    scaleVariants,
    staggerContainerVariants,
    getAnimationDelay,
    getOptimizedVariants: optimizeVariants,
    optimizeVariants,
    prefersReducedMotion: false,
    isLowPowerDevice: false,
    animationStaggerDelay: 0.15
  });
  
  // Create the provider component
  const AnimationProvider = ({ children }) =>
    React.createElement('div', { 'data-testid': 'animation-provider' }, children);
  
  return {
    AnimationContext,
    useAnimation,
    AnimationProvider
  };
});

// Mock ../utils/animations
vi.mock('../utils/animations', () => {
  const { vi } = require('vitest');
  
  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const getAnimationDelay = (index) => `${index * 0.1}s`;
  const optimizeVariants = (variants) => variants;
  const getOptimizedVariants = vi.fn().mockImplementation(optimizeVariants);
  
  return {
    fadeInVariants,
    slideUpVariants,
    scaleVariants,
    staggerContainerVariants,
    getAnimationDelay: vi.fn().mockImplementation(getAnimationDelay),
    getOptimizedVariants,
    optimizeVariants,
    ANIMATION_CONFIG: {
      DEFAULT_DURATION: 0.5,
      DEFAULT_STAGGER: 0.1,
      DEFAULT_DELAY: 0.2,
      REDUCED_MOTION_DURATION: 0.2,
      QUALITY_SETTINGS: {
        high: { batchSize: 5, throttleMs: 16 },
        medium: { batchSize: 3, throttleMs: 32 },
        low: { batchSize: 2, throttleMs: 48 }
      }
    }
  };
});

// Browser API Mocks
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

// Mock localStorage
const mockStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    clear: vi.fn(() => { store = {}; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    key: vi.fn((idx: number) => Object.keys(store)[idx]),
    get length() { return Object.keys(store).length; }
  };
};

const localStorageMock = mockStorage();
const sessionStorageMock = mockStorage();

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock, writable: true });

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  root: Element | Document | null;
  rootMargin: string;
  thresholds: number[];

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.elements = new Set();
    this.root = options.root || null;
    this.rootMargin = options.rootMargin || '0px';
    this.thresholds = options.threshold ? 
      Array.isArray(options.threshold) ? options.threshold : [options.threshold] : 
      [0];
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  // Test helper
  triggerIntersection(isIntersecting: boolean) {
    const entries = Array.from(this.elements).map(target => ({
      isIntersecting,
      target,
      boundingClientRect: { top: 0, left: 0, width: 100, height: 100 } as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: { top: 0, left: 0, width: 100, height: 100 } as DOMRectReadOnly,
      rootBounds: { top: 0, left: 0, width: 1000, height: 1000 } as DOMRectReadOnly,
      time: Date.now()
    }));

    this.callback(entries as IntersectionObserverEntry[], this);
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  callback: ResizeObserverCallback;
  elements: Set<Element>;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Test helper
  triggerResize() {
    const entries = Array.from(this.elements).map(target => ({
      target,
      contentRect: { width: 100, height: 100 } as DOMRectReadOnly,
      borderBoxSize: [{ inlineSize: 100, blockSize: 100 }],
      contentBoxSize: [{ inlineSize: 100, blockSize: 100 }],
      devicePixelContentBoxSize: [{ inlineSize: 100, blockSize: 100 }]
    }));

    this.callback(entries as ResizeObserverEntry[], this as ResizeObserver);
  }
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Global test data types
export interface MockSkill {
  skillName: string;
  iconName: string;
  description: string;
  securityDomain: string;
  level: number;
}

export interface MockProject {
  title: string;
  description: string;
  image: string;
  links: {
    github: string;
    live: string;
  };
  technologies: string[];
}

export interface MockExperience {
  role: string;
  company: string;
  date: string;
  desc: string;
  descBullets: string[];
  companylogo: string;
}

// Mock data
export const mockSkillData: MockSkill = {
  skillName: 'Test Skill',
  iconName: 'test-icon',
  description: 'Test description',
  securityDomain: 'Test Domain',
  level: 5
};

export const mockProjectData: MockProject = {
  title: 'Test Project',
  description: 'Test project description',
  image: '/test-image.jpg',
  links: {
    github: 'https://github.com/test',
    live: 'https://test.com'
  },
  technologies: ['React', 'Node.js']
};

export const mockExperienceData: MockExperience = {
  role: 'Test Role',
  company: 'Test Company',
  date: '2023 - Present',
  desc: 'Test description',
  descBullets: ['Test bullet 1', 'Test bullet 2'],
  companylogo: '/test-logo.png'
};

export const mockPortfolioData = {
  greetings: {
    name: 'Test User',
    title: 'Test Title',
    description: 'Test Description'
  },
  openSource: {
    githubToken: ''
  },
  contact: {
    email: 'test@example.com'
  },
  socialLinks: {
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/test'
  },
  skillsSection: {
    title: 'Skills',
    skills: [mockSkillData]
  },
  skillBars: [],
  educationInfo: [],
  experience: [mockExperienceData],
  projects: [mockProjectData],
  feedbacks: []
};

// Global test utilities
interface RenderOptions {
  animationEnabled?: boolean;
  portfolioData?: typeof mockPortfolioData;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    animationEnabled = true,
    portfolioData = mockPortfolioData
  }: RenderOptions = {}
): ReturnType<typeof render> => {
  // Create a mock AnimationContext value that matches the AnimationContextType
  const animationValue = {
    // Basic animation state
    inView: true,
    setInView: vi.fn(),
    animationEnabled,
    entryAnimations: {},
    registerEntryAnimation: vi.fn(),
    playEntryAnimation: vi.fn(),
    resetEntryAnimations: vi.fn(),
    animationStaggerDelay: 0.15,
    getAnimationDelay,
    
    // Framer-motion specific properties
    controls: {
      start: vi.fn(),
      set: vi.fn(),
      stop: vi.fn()
    },
    getVariants: (duration = 0.5, delay = 0) => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay }
      }
    }),
    
    // Animation variants
    fadeInVariants,
    slideUpVariants,
    scaleVariants,
    staggerContainerVariants,
    pulseVariants: {
      hidden: { opacity: 0.6 },
      visible: {
        opacity: [0.6, 1, 0.6],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    matrixVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          staggerChildren: 0.05
        }
      }
    },
    glitchVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        x: [0, -2, 3, -1, 0],
        transition: {
          duration: 0.5,
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.2
          }
        }
      }
    },
    
    // Animation optimization properties
    prefersReducedMotion: false,
    isLowPowerDevice: false,
    optimizeVariants,
    
    // Performance monitoring
    enablePerformanceMonitoring: vi.fn(),
    disablePerformanceMonitoring: vi.fn()
  };

  const portfolioValue = {
    ...portfolioData,
    updatePortfolioData: vi.fn(),
    isLoading: false,
    error: null
  };

  return render(
    React.createElement(PortfolioContext.Provider,
      { value: portfolioValue },
      React.createElement(AnimationContext.Provider,
        { value: animationValue as any },
        ui
      )
    )
  );
};

// Maintain backwards compatibility
export const renderWithAnimation = renderWithProviders;

// Global cleanup
afterEach(() => {
  vi.clearAllMocks();
  document.body.innerHTML = '';
  localStorageMock.clear();
  sessionStorageMock.clear();
});