/**
 * This file contains best practices for mocking modules that may
 * cause issues when testing with Jest and ESM modules
 */

// Proper way to mock a module with ESM compatibility
// Example:
// jest.mock('module-name', () => ({
//   __esModule: true,
//   default: jest.fn(),
//   namedExport: jest.fn()
// }));

// Axios mock implementation
export const createAxiosMock = () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    defaults: { headers: { common: {} } },
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  };
  
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockAxiosInstance),
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      isCancel: jest.fn(),
      CancelToken: {
        source: jest.fn(() => ({
          token: {},
          cancel: jest.fn()
        }))
      },
      ...mockAxiosInstance
    },
    create: jest.fn(() => mockAxiosInstance),
    get: jest.fn(),
    post: jest.fn(),
    isCancel: jest.fn()
  };
};

// React icons mock implementation
export const createReactIconsMock = () => {
  const IconComponent = ({ className, size, color, ...props }) => {
    return null; // Return null in tests
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
  const Component = ({ children, ...props }) => children;
  
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
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn()
    }),
    useMotionValue: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      onChange: jest.fn()
    })),
    useTransform: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn()
    })),
    useInView: jest.fn(() => true)
  };
};

// React helmet async mock
export const createHelmetAsyncMock = () => {
  const HelmetProvider = ({ children }) => children;
  const Helmet = ({ children, ...props }) => null;
  
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
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => Object.keys(store).forEach(key => delete store[key])),
    removeItem: jest.fn(key => delete store[key]),
    key: jest.fn(idx => Object.keys(store)[idx]),
    get length() { return Object.keys(store).length; }
  };
};