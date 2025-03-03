# Project Information

## Jest Configuration

The project uses Jest with the following configuration:

### Basic Jest Commands
- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:coverage`

### Jest Configuration Structure

The Jest configuration is designed to handle an ESM-based React project with several key features:

1. **Component Tests**: Tests for UI components in src/components
2. **Basic Tests**: Simple tests for utility functions in src/__tests__
3. **Enhanced Tests**: More complex tests with detailed mocking

### Key Testing Files

- **jest.config.js**: Main configuration file for Jest 
- **setupTests.minimal.js**: Minimal setup for testing environment
- **src/__mocks__/**: Mock implementations for external libraries

### Mock Implementation

The project mocks several key libraries to make testing easier:

1. **Framer Motion**: Mocked as regular DOM elements with data-testid attributes
2. **Iconify**: Mocked with simple div elements for icons
3. **Lottie**: Mocked with simple placeholder elements

### Known Limitations

1. **Container Tests**: Some container-level tests are excluded as they need deeper ESM/CommonJS compatibility fixes
2. **Warning Messages**: Tests show React warnings about unrecognized props like 'whileHover' which are normal in mocked environment
3. **Animation Tests**: Limited testing of animation features due to complexity

### Future Improvements

- Fix container tests by refactoring mock implementation approach
- Reduce console warnings by improving mock fidelity
- Add test coverage reporting for CI/CD integration
- Extend test suite to cover more components

### Testing Best Practices

1. Use mocks sparingly and prefer real DOM rendering when possible
2. Use data-testid attributes for reliable test selection
3. Break tests into small, focused units that test one thing
4. Keep mock implementations as simple as possible while maintaining fidelity