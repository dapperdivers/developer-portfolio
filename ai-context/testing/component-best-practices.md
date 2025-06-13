# Component Testing Best Practices

## Testing Philosophy

Our testing approach prioritizes:
1. **Test behavior, not implementation** - Focus on user experience over internal details
2. **Critical user flows first** - Ensure essential interactions are well-tested
3. **Balance coverage and maintainability** - Meaningful coverage without fragile tests
4. **Isolation testing** - Components tested independently with mocked dependencies
5. **Accessibility inclusion** - Ensure components meet accessibility standards

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing focused on user behavior
- **Jest DOM**: DOM-specific assertions
- **Mock Service Worker**: API mocking for integration tests
- **Storybook Interaction Tests**: Visual testing and scenario validation

## Test Types & Examples

### 1. Unit Tests
Testing individual components in isolation:

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

test('Button renders as link when href provided', () => {
  render(<Button href="https://example.com">Visit site</Button>);
  const link = screen.getByRole('link', { name: /visit site/i });
  expect(link).toHaveAttribute('href', 'https://example.com');
});
```

### 2. Integration Tests
Testing component interactions:

```jsx
import { render, screen, within } from '@testing-library/react';
import { PortfolioProvider } from '@context/PortfolioContext';
import Projects from '../Projects';
import mockPortfolioData from '../../__mocks__/portfolio';

test('Projects section renders projects from context', () => {
  render(
    <PortfolioProvider value={mockPortfolioData}>
      <Projects />
    </PortfolioProvider>
  );
  
  const projectsSection = screen.getByRole('region', { name: /projects/i });
  expect(projectsSection).toBeInTheDocument();
  
  const projectCards = screen.getAllByTestId('project-card');
  expect(projectCards.length).toBe(mockPortfolioData.projects.length);
  
  const firstProject = mockPortfolioData.projects[0];
  const firstCard = projectCards[0];
  expect(within(firstCard).getByText(firstProject.name)).toBeInTheDocument();
});
```

### 3. Hook Tests
Testing custom hooks:

```jsx
import { renderHook } from '@testing-library/react-hooks';
import { PortfolioProvider } from '@context/PortfolioContext';
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

### 4. Accessibility Tests
Ensuring accessibility compliance:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Navigation from '../Navigation';

test('Navigation has no accessibility violations', async () => {
  const { container } = render(<Navigation />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Navigation menu is keyboard accessible', async () => {
  render(<Navigation />);
  
  // Tab to menu button
  await userEvent.tab();
  expect(screen.getByRole('button', { name: /menu/i })).toHaveFocus();
  
  // Activate menu
  await userEvent.keyboard('{Enter}');
  
  // First menu item should be focused
  expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
  
  // Navigate through menu
  await userEvent.tab();
  expect(screen.getByRole('link', { name: /projects/i })).toHaveFocus();
});
```

## Setup & Utilities

### Custom Render Function
Provide common providers and utilities:

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

### Mock Implementations
Mock external dependencies:

```jsx
// src/__mocks__/framerMotionMock.jsx
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => 
      <div data-testid="motion-div" {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

## Testing Patterns

### 1. Async Component Testing
Testing components with async operations:

```jsx
test('Loading state shown until data loads', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => 
    new Promise(resolve => setTimeout(() => 
      resolve({ json: () => Promise.resolve({ data: mockData }) }), 100)
    )
  );
  
  render(<DataComponent />);
  
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  
  await waitForElementToBeRemoved(() => 
    screen.queryByTestId('loading-indicator')
  );
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

### 2. Responsive Component Testing
Testing responsive behavior:

```jsx
test('Component adapts to mobile viewport', () => {
  window.innerWidth = 375;
  window.innerHeight = 667;
  window.dispatchEvent(new Event('resize'));
  
  render(<ResponsiveComponent />);
  
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  expect(screen.queryByTestId('desktop-menu')).not.toBeInTheDocument();
});
```

### 3. Animation Testing
Testing components with animations:

```jsx
test('Animation is triggered on initial render', () => {
  render(<AnimatedComponent />);
  
  const element = screen.getByTestId('animated-element');
  expect(element).toHaveAttribute('data-testid', 'motion-div');
  
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  
  // Verify animation completion
  expect(element).toHaveStyle('opacity: 1');
});
```

### 4. Form Testing
Testing form interactions:

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

## Common Test Scenarios

### Testing Click Handlers
```jsx
test('Click handler called with correct arguments', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} value="test">Click me</Button>);
  
  await userEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({
    target: expect.any(Object)
  }));
});
```

### Testing Loading States
```jsx
test('Loading state shows before data loads', async () => {
  render(<ProjectsSection />);
  
  expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  
  await waitForElementToBeRemoved(() => 
    screen.queryByTestId('skeleton-loader')
  );
  expect(screen.getByText('Project Title')).toBeInTheDocument();
});
```

### Testing Error States
```jsx
test('Error state displays when data fetch fails', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'));
  
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });
});
```

## Jest Configuration for ESM

Support ESM modules with proper Babel configuration:

```js
// babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
```

## Test Organization

### File Structure
- **Component Tests**: `__tests__` directory adjacent to components
- **Hook Tests**: `hooks/__tests__` directory
- **Utility Tests**: `utils/__tests__` directory
- **Integration Tests**: `src/__tests__/integration` directory

### Naming Conventions
- Component tests: `ComponentName.test.jsx`
- Hook tests: `useHookName.test.js`
- Utility tests: `utilityName.test.js`

### Test Documentation
Use clear, descriptive test organization:

```jsx
describe('Button component', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      // Test implementation
    });
    
    it('applies variant class correctly', () => {
      // Test implementation
    });
  });
  
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

Test component performance characteristics:

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
  
  // Same props should not re-render
  rerender(<MemoizedComponent value="test" />);
  expect(renderSpy).toHaveBeenCalledTimes(1);
  
  // Different props should re-render
  rerender(<MemoizedComponent value="different" />);
  expect(renderSpy).toHaveBeenCalledTimes(2);
});
```

## Continuous Integration

CI/CD pipeline should include:
1. Unit test execution
2. Integration test execution
3. Test coverage reporting
4. Accessibility testing
5. Storybook interaction tests

## Best Practices Summary

1. **Focus on user behavior** - Test what users see and do
2. **Use semantic queries** - Prefer getByRole, getByLabelText over getByTestId
3. **Test accessibility** - Include a11y tests in component suites
4. **Mock external dependencies** - Keep tests isolated and fast
5. **Test error states** - Don't just test the happy path
6. **Use descriptive test names** - Tests should read like specifications
7. **Organize tests logically** - Group related tests with describe blocks
8. **Keep tests simple** - One concept per test
9. **Use custom render functions** - Reduce boilerplate with common providers
10. **Test component integration** - Verify components work together correctly