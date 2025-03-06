/**
 * Setup file for Vitest tests
 * This file runs before each test file
 */

import { vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add Testing Library's custom matchers to Vitest's expect
expect.extend(matchers);

// Make vi available globally to replace jest
global.vi = vi;

// Add a compatibility layer for jest -> vitest, so we don't have to change all tests at once
global.jest = {
  fn: vi.fn,
  mock: vi.mock,
  spyOn: vi.spyOn,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
  restoreAllMocks: vi.restoreAllMocks,
  hoisted: vi.hoisted,
  isolateModules: vi.isolateModules
};

// Enhance the compatibility layer with more jest functions
const enhancedFn = () => {
  const mockFn = vi.fn();
  mockFn.mockReturnValue = (val) => {
    mockFn.mockImplementation(() => val);
    return mockFn;
  };
  mockFn.mockResolvedValue = (val) => {
    mockFn.mockImplementation(() => Promise.resolve(val));
    return mockFn;
  };
  mockFn.mockRejectedValue = (val) => {
    mockFn.mockImplementation(() => Promise.reject(val));
    return mockFn;
  };
  mockFn.mockImplementationOnce = vi.fn().mockImplementationOnce;
  mockFn.mockReturnValueOnce = (val) => {
    mockFn.mockImplementationOnce(() => val);
    return mockFn;
  };
  mockFn.mockResolvedValueOnce = (val) => {
    mockFn.mockImplementationOnce(() => Promise.resolve(val));
    return mockFn;
  };
  mockFn.mockRejectedValueOnce = (val) => {
    mockFn.mockImplementationOnce(() => Promise.reject(val));
    return mockFn;
  };
  return mockFn;
};

global.jest.fn = enhancedFn;

// Mock portfolio.js completely to avoid the import.meta issue
vi.mock('../src/portfolio', () => {
  return {
    default: {
      greetings: {
        name: "John Doe",
        title: "Hi, I'm John Doe",
        description: "A passionate Full Stack Web Developer with experience in JavaScript, React.js, Node.js, and MongoDB.",
        resumeLink: "https://cv.example.com"
      },
      openSource: {
        githubUserName: "johndoe"
      },
      contact: {
        title: "Contact Me",
        subtitle: "Discuss a project or just want to say hi?",
        email: "contact@johndoe.com"
      },
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://www.linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        mail: "mailto:contact@johndoe.com"
      },
      skillsSection: {
        title: "Skills",
        subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
        skills: [
          "Develop highly interactive Front end / User Interfaces for your web applications",
          "Progressive Web Applications (PWA) in normal and SPA Stacks",
          "Integration of third party services such as Firebase/ AWS / Digital Ocean"
        ],
        softwareSkills: [
          {
            skillName: "html-5",
            fontAwesomeClassname: "fab fa-html5",
            iconName: "html-5"
          },
          {
            skillName: "css3",
            fontAwesomeClassname: "fab fa-css3-alt",
            iconName: "css3"
          },
          {
            skillName: "JavaScript",
            fontAwesomeClassname: "fab fa-js",
            iconName: "javascript"
          },
          {
            skillName: "reactjs",
            fontAwesomeClassname: "fab fa-react",
            iconName: "react"
          },
          {
            skillName: "nodejs",
            fontAwesomeClassname: "fab fa-node",
            iconName: "nodejs"
          }
        ]
      },
      getImagePath: (path) => `/mock-assets/${path}`,
      SkillBars: [
        {
          Stack: "Frontend/Design", 
          progressPercentage: "90"
        },
        {
          Stack: "Backend",
          progressPercentage: "70"
        },
        {
          Stack: "Programming",
          progressPercentage: "60"
        }
      ],
      educationInfo: [
        {
          schoolName: "Example University",
          subHeader: "Bachelor of Science in Computer Science",
          duration: "September 2016 - April 2020",
          desc: "Graduated with honors.",
          descBullets: [
            "Specialized in web technologies and artificial intelligence",
            "Active member of coding club"
          ]
        }
      ],
      experience: [
        {
          role: "Software Engineer",
          company: "Example Corp",
          companylogo: "/example-logo.png",
          date: "June 2020 – Present",
          desc: "Building amazing software products",
          descBullets: [
            "Led a team of developers",
            "Reduced loading time by 40%"
          ]
        },
        {
          role: "Junior Developer",
          company: "Sample Inc",
          companylogo: "/sample-logo.png",
          date: "Jan 2019 – May 2020",
          desc: "Focused on front-end development",
          descBullets: [
            "Developed reusable components",
            "Implemented state management"
          ]
        }
      ],
      projects: [
        {
          name: "Example Project",
          desc: "A showcase project demonstrating my skills",
          github: "https://github.com/johndoe/example-project",
          link: "https://example-project.com",
          isTopProject: true,
          tags: ["web", "frontend"]
        }
      ],
      feedbacks: [
        {
          name: "Jane Smith",
          feedback: "Working with John was a pleasure. Very professional and skilled developer."
        }
      ]
    }
  };
});

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

// Clean up after tests
afterEach(() => {
  vi.clearAllMocks();
  document.body.innerHTML = '';
  mockLocalStorage.clear();
});
