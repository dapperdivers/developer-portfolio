import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import { AnimationContext } from '@utils/AnimationContext';
import { PortfolioContext } from '@context/PortfolioContext';
import { slideUpVariants, fadeInVariants, scaleVariants } from '@utils/animations';

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

Object.defineProperty(window, 'localStorage', { value: mockStorage(), writable: true });
Object.defineProperty(window, 'sessionStorage', { value: mockStorage(), writable: true });

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

  takeRecords(): ResizeObserverEntry[] {
    return [];
  }
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Define types for motion components
type MotionProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('div', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    )),
    article: React.forwardRef<HTMLElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('article', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    )),
    button: React.forwardRef<HTMLButtonElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('button', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    ))
  },
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn()
  }),
  useInView: () => [vi.fn(), true],
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}));

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
  reducedMotion?: boolean;
  quality?: 'low' | 'medium' | 'high';
  batchSize?: number;
  throttleMs?: number;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { 
    animationEnabled = true,
    portfolioData = mockPortfolioData,
    reducedMotion = false,
    quality = 'high',
    batchSize = 5,
    throttleMs = 16
  }: RenderOptions = {}
): ReturnType<typeof render> => {
  const animationValue = {
    enabled: animationEnabled,
    reducedMotion,
    quality,
    batchSize,
    throttleMs,
    setAnimationSettings: vi.fn(),
    shouldAnimate: () => animationEnabled,
    getOptimizedVariants: (variants: any) => variants,
    fadeInVariants,
    scaleVariants,
    slideUpVariants,
    getAnimationDelay: (index: number) => ({
      transition: { delay: index * 0.1 }
    })
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
        { value: animationValue }, 
        ui
      )
    )
  );
};

// For backwards compatibility
export const renderWithAnimation = renderWithProviders;

// Global cleanup
afterEach(() => {
  vi.clearAllMocks();
  document.body.innerHTML = '';
  (window.localStorage as any).clear();
  (window.sessionStorage as any).clear();
});