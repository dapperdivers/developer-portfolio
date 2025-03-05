# Jest Testing with ES Modules: Best Practices

This guide provides best practices for writing tests with Jest in an ES Modules environment, addressing common issues and providing recommended patterns.

## Setup Overview

Our testing environment has been configured to handle ES Modules properly:

1. **Babel Configuration**: Custom Babel settings in `babel.config.cjs` ensure proper transpilation.
2. **Jest Configuration**: The `jest.config.cjs` file includes settings for ESM compatibility.
3. **Test Setup**: Enhanced test setup in `setupTests.minimal.js` and `setupJest.js`.
4. **Mock Implementations**: Standardized mock implementations in `src/__mocks__/mockImplementation.js`.

## Common ESM Testing Issues

When testing ES Modules with Jest, several issues can arise:

1. **Dynamic Imports**: Jest struggles with dynamic imports (`import()`).
2. **Import.meta**: References to `import.meta` cause errors.
3. **External Variable References**: Mock functions referencing outside variables.
4. **Mocking Named Exports**: Incorrect mocking of ESM exports.

## Best Practices

### Mocking Modules

Always use the following pattern to mock modules:

```javascript
// CORRECT - Properly mocking an ES Module
jest.mock('module-name', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport1: jest.fn(),
  namedExport2: jest.fn()
}));

// WRONG - Will cause issues with ESM
jest.mock('module-name', () => {
  return {
    default: () => 'mocked value'
  };
});
```

### Avoid External Variable References

```javascript
// WRONG - References external variable
const myVar = 'test';
jest.mock('module-name', () => ({
  __esModule: true,
  default: () => myVar // This will cause errors
}));

// CORRECT - Self-contained mock
jest.mock('module-name', () => ({
  __esModule: true,
  default: () => 'test' // Direct value, no external reference
}));
```

### Use Provided Mock Implementations

For common libraries, use the standardized mock implementations in `src/__mocks__/mockImplementation.js`:

```javascript
import { createAxiosMock } from '../__mocks__/mockImplementation';

// In your test file
const mockAxios = createAxiosMock();
jest.mock('axios', () => mockAxios);
```

### Mocking Components with Children

When mocking components that render children:

```javascript
// CORRECT - Pass down children
jest.mock('../MyComponent', () => {
  return function MockComponent({ children, ...props }) {
    return <div data-testid="mock-component">{children}</div>;
  };
});
```

### Testing Asynchronous Functions

```javascript
// Use async/await for asynchronous tests
it('fetches data asynchronously', async () => {
  const data = await fetchData();
  expect(data).toEqual({ result: 'success' });
});
```

### Use waitFor for Async UI Updates

```javascript
import { waitFor } from '@testing-library/react';

it('shows data after loading', async () => {
  render(<MyComponent />);
  
  // Wait for async updates
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

## Troubleshooting Common Errors

### "The module factory of jest.mock() is not allowed to reference any out-of-scope variables"

**Solution**: Make your mock self-contained without referencing variables outside the mock function.

### "Cannot find module 'xyz' from 'node_modules/...'"

**Solution**: Add the problematic module to `transformIgnorePatterns` in `jest.config.cjs`.

### "SyntaxError: Cannot use import statement outside a module"

**Solution**: Ensure the file is properly transformed by Jest. Check the `transform` and `transformIgnorePatterns` settings.

### "TypeError: Cannot read property 'default' of undefined"

**Solution**: Add `__esModule: true` to your mock to properly simulate ES Module structure.

## Additional Resources

- [Jest Configuration Documentation](https://jestjs.io/docs/configuration)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Babel Jest Documentation](https://github.com/facebook/jest/tree/main/packages/babel-jest)

By following these guidelines, you'll avoid common pitfalls when testing ES Modules with Jest.