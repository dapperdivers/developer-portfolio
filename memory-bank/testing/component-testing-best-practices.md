# Component Testing Best Practices

This document outlines the testing strategies and best practices for the Developer Portfolio project. It provides guidelines for testing components, hooks, and utilities to ensure a consistent and effective testing approach.

## Testing Philosophy

Our testing approach follows these key principles:
1. **Test behavior, not implementation**: Focus on what users will experience rather than internal implementation details
2. **Prioritize critical user flows**: Ensure essential interactions are well-tested
3. **Balance coverage and maintainability**: Aim for meaningful test coverage without creating fragile tests
4. **Test in isolation**: Components should be tested independently, mocking dependencies as needed
5. **Accessibility testing**: Ensure components meet accessibility standards

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing focused on user behavior
- **Jest DOM**: DOM-specific assertions
- **Mock Service Worker (optional)**: API mocking for integration tests
- **Storybook Interaction Tests**: Visual testing and scenario validation

## Test Types

### 1. Unit Tests
For testing individual functions, hooks, and small components in isolation.

**Example: Button component test**
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

test('Button renders correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('Button handles click events', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await userEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Button renders as a link when href is provided', () => {
  render(<Button href="https://example.com">Visit site</Button>);
  const link = screen.getByRole('link', { name: /visit site/i });
  expect(link).toHaveAttribute('href', 'https://example.com');
});
```

### 2. Integration Tests
For testing component interactions and how components work together.

**Example: Projects section test**
```jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PortfolioProvider } from '../../context/PortfolioContext';
import Projects from '../Projects';
import mockPortfolioData from '../../__mocks__/portfolio';

test('Projects section renders projects from context', () => {
  render(
    <PortfolioProvider value={mockPortfolioData}>
      <Projects />
    </PortfolioProvider>
  );
  
  // Check if section renders
  const projectsSection = screen.getByRole('region', { name: /projects/i });
  expect(projectsSection).toBeInTheDocument();
  
  // Check if project cards are rendered
  const projectCards = screen.getAllByTestId('project-card');
  expect(projectCards.length).toBe(mockPortfolioData.projects.length);
  
  // Check content of first project
  const firstProject = mockPortfolioData.projects[0];
  const firstCard = projectCards[0];
  expect(within(firstCard).getByText(firstProject.name)).toBeInTheDocument();
});
```

### 3. Hook Tests
For testing custom hooks.

**Example: useProjects hook test**
```jsx
import { renderHook } from '@testing-library/react-hooks';
import { PortfolioProvider } from '../../context/PortfolioContext';
import { useProjects } from '../useProjects';
import mockPortfolioData from '../../__mocks__/portfolio';

test('useProjects returns projects data and derived values', () => {
  const wrapper = ({ children }) => (
    <PortfolioProvider value={mockPortfolioData}>
      {children}
    </PortfolioProvider>
  );
  
  const { result } = renderHook(() => useProjects(), { wrapper });
  
  expect(result.current.projects).toEqual(mockPortfolioData.projects);
  expect(result.current.featuredProjects.length).toBeGreaterThan(0);
  expect(result.current.projectCount).toBe(mockPortfolioData.projects.length);
});
```

### 4. Utility Tests
For testing utility functions.

**Example: Image optimizer utility test**
```jsx
import { optimizeImageUrl } from '../imageOptimizer';

test('optimizeImageUrl adds correct parameters for responsive images', () => {
  const url = 'https://example.com/image.jpg';
  const width = 800;
  
  const optimized = optimizeImageUrl(url, { width });
  
  expect(optimized).toContain(url);
  expect(optimized).toContain(`width=${width}`);
});
```

### 5. Accessibility Tests
For ensuring accessibility compliance.

**Example: Testing focus management**
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';

test('Navigation menu is keyboard accessible', async () => {
  render(<Navigation />);
  
  // Tab to the menu button
  await userEvent.tab();
  expect(screen.getByRole('button', { name: /menu/i })).toHaveFocus();
  
  // Activate the menu
  await userEvent.keyboard('{Enter}');
  
  // First menu item should be focused
  expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
  
  // Can navigate through menu items
  await userEvent.tab();
  expect(screen.getByRole('link', { name: /projects/i })).toHaveFocus();
});
```

## Setup & Mocking

### Custom Render Function
Create a custom render function to provide common providers and utilities:

```jsx
// src/test-utils.js
import { render } from '@testing-library/react';
import { PortfolioProvider } from './context/PortfolioContext';
import mockPortfolioData from './__mocks__/portfolio';

const customRender = (ui, options = {}) => {
  const {
    portfolioData = mockPortfolioData,
    ...renderOptions
  } = options;
  
  return render(
    <PortfolioProvider value={portfolioData}>
      {ui}
    </PortfolioProvider>,
    renderOptions
  );
};

export * from '@testing-library/react';
export { customRender as render };
```

### Mock Implementation
Create mock implementations for external dependencies:

```jsx
// src/__mocks__/framerMotionMock.jsx
// Mock implementation for Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>,
    // Add more motion components as needed
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

## Testing Patterns

### 1. Component Mount/Unmount
Testing that components handle mounting and unmounting correctly:

```jsx
test('Component cleans up resources on unmount', () => {
  const observerSpy = jest.spyOn(global, 'IntersectionObserver');
  const { unmount } = render(<LazyImage src="test.jpg" alt="Test" />);
  
  expect(observerSpy).toHaveBeenCalled();
  unmount();
  // Verify any cleanup was performed correctly
});
```

### 2. Async Component Testing
Testing components with async operations:

```jsx
test('Loading state is shown until data is loaded', async () => {
  // Mock slow API response
  jest.spyOn(global, 'fetch').mockImplementation(() => 
    new Promise(resolve => setTimeout(() => 
      resolve({ 
        json: () => Promise.resolve({ data: mockData }) 
      }), 100)
    )
  );
  
  render(<DataComponent />);
  
  // Initially shows loading state
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  
  // After data loads, content is shown
  await waitForElementToBeRemoved(() => screen.queryByTestId('loading-indicator'));
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

### 3. Context Provider Testing
Testing context providers:

```jsx
test('PortfolioProvider provides expected values', () => {
  render(
    <PortfolioProvider>
      <ContextConsumer />
    </PortfolioProvider>
  );
  
  // ContextConsumer displays values from context
  expect(screen.getByTestId('context-value')).toHaveTextContent('expected-value');
});
```

### 4. Responsive Component Testing
Testing responsive behavior:

```jsx
test('Component adapts to mobile viewport', () => {
  // Set viewport to mobile size
  window.innerWidth = 375;
  window.innerHeight = 667;
  window.dispatchEvent(new Event('resize'));
  
  render(<ResponsiveComponent />);
  
  // Check for mobile-specific UI elements
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  expect(screen.queryByTestId('desktop-menu')).not.toBeInTheDocument();
});
```

## Common Test Scenarios

### 1. Testing Click Handlers
```jsx
test('Click handler is called with correct arguments', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} value="test">Click me</Button>);
  
  await userEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({
    target: expect.any(Object),
    value: 'test'
  }));
});
```

### 2. Testing Form Submissions
```jsx
test('Form submission triggers correct action', async () => {
  const handleSubmit = jest.fn(e => e.preventDefault());
  render(<ContactForm onSubmit={handleSubmit} />);
  
  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByLabelText(/message/i), 'Hello world');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### 3. Testing Animation Presence
```jsx
test('Animation is triggered on initial render', () => {
  render(<AnimatedComponent />);
  
  const element = screen.getByTestId('animated-element');
  expect(element).toHaveAttribute('data-testid', 'motion-div');
  expect(element).toHaveStyle('opacity: 0');
  
  // Wait for animation to complete
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  
  expect(element).toHaveStyle('opacity: 1');
});
```

### 4. Testing Loading States
```jsx
test('Loading state shows before data loads', async () => {
  render(<ProjectsSection />);
  
  // Initially shows loading skeleton
  expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  
  // After data loads, content appears
  await waitForElementToBeRemoved(() => screen.queryByTestId('skeleton-loader'));
  expect(screen.getByText('Project Title')).toBeInTheDocument();
});
```

## Jest Configuration for ESM

To properly support ESM modules in tests, use this Babel configuration:

```js
// babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    // Add any necessary plugins here
  ]
};
```

## Test Organization

Follow these patterns to organize tests:

1. **Component Tests**:
   - Place in `__tests__` directory adjacent to components
   - Name as `ComponentName.test.jsx`

2. **Hook Tests**:
   - Place in `hooks/__tests__` directory
   - Name as `useHookName.test.js`

3. **Utility Tests**:
   - Place in `utils/__tests__` directory
   - Name as `utilityName.test.js`

4. **Integration Tests**:
   - Place in `src/__tests__/integration` directory
   - Organize by feature

## Test Documentation

Document test cases with clear descriptions:

```jsx
describe('Button component', () => {
  // Group related tests
  describe('rendering', () => {
    // Basic rendering tests
    it('renders with children', () => {
      // Test implementation
    });
    
    it('applies variant class correctly', () => {
      // Test implementation
    });
  });
  
  // Another group for behavior
  describe('behavior', () => {
    it('handles click events', () => {
      // Test implementation
    });
    
    it('handles disabled state', () => {
      // Test implementation
    });
  });
});
```

## Performance Testing

For components with possible performance issues:

```jsx
test('Component does not re-render unnecessarily', () => {
  const renderSpy = jest.fn();
  function TestComponent({ value }) {
    renderSpy();
    return <div>{value}</div>;
  }
  
  const MemoizedComponent = React.memo(TestComponent);
  const { rerender } = render(<MemoizedComponent value="test" />);
  
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  // Rerender with same props
  rerender(<MemoizedComponent value="test" />);
  
  // Should not re-render
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  // Rerender with different props
  rerender(<MemoizedComponent value="different" />);
  
  // Should re-render
  expect(renderSpy).toHaveBeenCalledTimes(2);
});
```

## Snapshot Testing (Use Sparingly)

Snapshot tests can be useful but should be used judiciously:

```jsx
test('Component matches snapshot', () => {
  const { container } = render(<Button variant="primary">Click me</Button>);
  expect(container).toMatchSnapshot();
});
```

## Accessibility Testing

Use axe for automated accessibility testing:

```jsx
import { axe } from 'jest-axe';

test('Component has no accessibility violations', async () => {
  const { container } = render(<Form />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Continuous Integration

Set up CI/CD to run tests on each commit:

1. Run unit tests
2. Run integration tests
3. Check test coverage
4. Run accessibility tests
5. Run Storybook interaction tests

## Additional Resources

- [React Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Storybook Interaction Testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
