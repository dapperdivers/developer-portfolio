# Testing Best Practices

This document outlines the best practices for testing in the Developer Portfolio project. Following these guidelines ensures consistent, maintainable, and effective tests.

## General Testing Principles

### 1. Test Behavior, Not Implementation

Focus on testing what the code does, not how it does it. This makes tests more resilient to refactoring and better represents user expectations.

```jsx
// Good: Testing behavior
test('displays error message when email is invalid', () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'invalid-email' }
  });
  fireEvent.blur(screen.getByLabelText('Email'));
  
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// Bad: Testing implementation details
test('sets emailError state when email is invalid', () => {
  const wrapper = shallow(<ContactForm />);
  const instance = wrapper.instance();
  
  instance.validateEmail('invalid-email');
  
  expect(wrapper.state('emailError')).toBe('Please enter a valid email address');
});
```

### 2. Write Readable Tests

Tests should be easy to understand and maintain. Use descriptive test names and follow a clear structure.

### 3. Follow the AAA Pattern

Structure tests using the Arrange-Act-Assert pattern:

- **Arrange**: Set up the test environment and initial state
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

```jsx
test('increments counter when button is clicked', () => {
  // Arrange
  render(<Counter initialCount={0} />);
  
  // Act
  fireEvent.click(screen.getByText('Increment'));
  
  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4. Keep Tests Independent

Each test should be independent of others. Tests should not rely on the state from previous tests.

### 5. Test Edge Cases

Don't just test the happy path. Include tests for edge cases, error conditions, and boundary values.

## Component Testing Best Practices

### 1. Test Rendering

Verify that components render correctly with different props and in different states.

```jsx
describe('Button component', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('button--primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('button--secondary');
  });
  
  test('renders in disabled state', () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

### 2. Test User Interactions

Test how components respond to user interactions like clicks, input changes, and form submissions.

### 3. Test Accessibility

Ensure components meet accessibility standards by testing keyboard navigation, ARIA attributes, and screen reader compatibility.

### 4. Use Testing Library Queries Appropriately

Follow the Testing Library's guiding principle: "The more your tests resemble the way your software is used, the more confidence they can give you."

Query priority (from best to worst):
1. Accessible queries: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. Test ID: `getByTestId` (use when other queries aren't suitable)

### 5. Mock External Dependencies

Mock external dependencies to isolate component behavior and make tests more reliable.

```jsx
// Mocking API calls
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, title: 'Project 1' },
      { id: 2, title: 'Project 2' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays projects from API', async () => {
  render(<ProjectList />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  expect(await screen.findByText('Project 1')).toBeInTheDocument();
  expect(screen.getByText('Project 2')).toBeInTheDocument();
});
```

## Hook Testing Best Practices

### 1. Use renderHook

Use the `renderHook` function from `@testing-library/react-hooks` to test custom hooks.

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### 2. Test Hook Parameters

Test how hooks behave with different parameters.

### 3. Test Hook Updates

Test how hooks respond to updates and re-renders.

### 4. Test Side Effects

Test side effects like API calls, localStorage updates, etc.

## Context Testing Best Practices

### 1. Test Provider with Consumers

Test that context providers correctly provide values to consumers.

### 2. Test Context Updates

Test that context values update correctly when actions are dispatched.

## Utility Function Testing Best Practices

### 1. Test Input/Output Pairs

For pure functions, test various input/output pairs.

### 2. Test Edge Cases

Test edge cases and boundary conditions.

## Integration Testing Best Practices

### 1. Focus on Component Interactions

Test how components work together rather than in isolation.

### 2. Use Real Dependencies When Possible

Use real dependencies for integration tests when feasible, mocking only external services.

### 3. Test User Flows

Test complete user flows that span multiple components.

## End-to-End Testing Best Practices

### 1. Test Critical Paths

Focus E2E tests on critical user journeys and business-critical functionality.

### 2. Keep Tests Focused

Even in E2E tests, keep each test focused on a specific flow or feature.

### 3. Use Stable Selectors

Use data attributes or other stable selectors that won't change with UI updates.

```jsx
// Component with test selectors
const LoginForm = () => (
  <form data-testid="login-form">
    <input data-testid="username-input" type="text" />
    <input data-testid="password-input" type="password" />
    <button data-testid="login-button">Login</button>
  </form>
);

// E2E test
test('user can log in', async () => {
  await page.goto('/login');
  
  await page.fill('[data-testid="username-input"]', 'testuser');
  await page.fill('[data-testid="password-input"]', 'password');
  await page.click('[data-testid="login-button"]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

## Performance Testing Best Practices

### 1. Measure Render Times

Use performance measurement APIs to track component render times.

### 2. Test with Realistic Data Volumes

Test performance with realistic data volumes to identify potential issues.

### 3. Profile Memory Usage

Monitor memory usage to detect memory leaks and excessive allocations.

## Test Documentation

### 1. Document Test Purpose

Include comments explaining the purpose and scope of test suites and complex tests.

### 2. Document Test Setup

Document any complex test setup or fixtures.

### 3. Document Test Maintenance

Include information about how to maintain and update tests when the codebase changes.

## Continuous Integration

### 1. Run Tests on Every PR

Configure CI to run tests on every pull request.

### 2. Maintain Fast Test Suites

Keep test suites fast to provide quick feedback.

### 3. Track Test Coverage

Monitor test coverage to identify areas that need more testing.

## Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
