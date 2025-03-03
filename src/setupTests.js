// Import testing utilities
import '@testing-library/jest-dom';

// Mock modules that might cause problems in the test environment
// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Iconify
jest.mock('@iconify/react', () => ({
  Icon: ({ icon, ...props }) => <span data-icon={icon} {...props} />,
}));

// Setup global mocks
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0].includes('Warning: ReactDOM.render is no longer supported') ||
    args[0].includes('Warning: The current testing environment') ||
    args[0].includes('Warning: An update to')
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Clean up after each test
afterEach(() => {
  // Clean up any global messes
  jest.clearAllMocks();
});
