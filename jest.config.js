/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/src/__tests__/basic*.test.js?(x)",
    "<rootDir>/src/components/ui/__tests__/*.test.jsx",
    "<rootDir>/src/components/layout/__tests__/*.test.jsx",
    "<rootDir>/src/utils/__tests__/*.test.js?(x)"
  ],
  
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.minimal.js"
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // For ESM support
  extensionsToTreatAsEsm: [".jsx"],
  
  // Cache directory for Jest
  cacheDirectory: "<rootDir>/.jest-cache",
  
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  
  // Mock all imports from these modules with a single module
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^framer-motion$": "<rootDir>/src/__mocks__/framerMotionMock.js",
    "^@iconify/react$": "<rootDir>/src/__mocks__/iconifyMock.js",
    "^lottie-react$": "<rootDir>/src/__mocks__/lottieMock.js"
  },
  
  // Ignore node_modules except for specific dependencies that need transformation
  transformIgnorePatterns: [
    "/node_modules/(?!(@iconify|framer-motion)/)"
  ]
};

export default config;