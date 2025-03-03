module.exports = {
  // The root directory that Jest should scan for tests and modules
  rootDir: ".",
  
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  
  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],
  
  // The path to a module that runs before each test
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  
  // Transform files with babel-jest
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "setupTests.js"],
  
  // Module name mapper for CSS/SCSS modules and static assets
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: ".jest-cache",
  
  // Prevents tests from printing messages through the console
  silent: false
};
