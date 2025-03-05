/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/src/__tests__/basic*.test.js?(x)",
    "<rootDir>/src/components/**/__tests__/*.test.jsx",
    "<rootDir>/src/containers/**/__tests__/*.test.jsx",
    "<rootDir>/src/hooks/**/__tests__/*.test.js?(x)",
    "<rootDir>/src/utils/**/__tests__/*.test.js?(x)"
  ],
  
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  resetMocks: false,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.minimal.js",
    "<rootDir>/src/setupJest.js"
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // This is important for handling ESM in Jest
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", {
      configFile: "./babel.config.cjs"
    }]
  },
  
  // Mock CSS imports and other assets
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^framer-motion$": "<rootDir>/src/__mocks__/framerMotionMock.js",
    "^@iconify/react$": "<rootDir>/src/__mocks__/iconifyMock.js",
    "^lottie-react$": "<rootDir>/src/__mocks__/lottieMock.js"
  },
  
  // This allows transpiling of files in node_modules that use ES modules
  transformIgnorePatterns: [
    "/node_modules/(?!(@iconify|framer-motion|axios|react-icons)/)"
  ],
  
  // Mock implementation for import.meta.url
  globals: {
    "import.meta": {
      url: "file:///mock/url"
    }
  },
  
  // This allows importing ESM modules
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  
  // Improve ESM module mocking
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  
  // Handle hoisting properly
  injectGlobals: true,
  
  // Cache for faster tests
  cacheDirectory: "<rootDir>/.jest-cache",
  
  // Handle resolver for ESM modules
  resolver: undefined,
  
  // Improved error handling
  errorOnDeprecated: true,
  
  // Test timeout
  testTimeout: 10000
};