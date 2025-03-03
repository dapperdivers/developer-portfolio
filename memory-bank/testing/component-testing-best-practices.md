# Component Testing Best Practices

This document outlines best practices and patterns for testing components in the developer portfolio project. These guidelines are implemented in our enhanced test files and should be followed for all future component testing.

## Testing Levels

### 1. Unit Tests
- Test individual components in isolation
- Mock all dependencies and external services
- Focus on component logic, rendering, and state management

### 2. Integration Tests
- Test interactions between components
- Verify components work together as expected
- Test dataflow between parent and child components

### 3. Visual Tests
- Use mock implementation of animation libraries to verify visual states
- Test responsive behavior where applicable
- Ensure proper styling is applied

## Testing Patterns

### Component Mocking

When testing components that use external libraries like Framer Motion, implement advanced mocks that allow testing animation states:

```jsx
jest.mock('framer-motion', () => {
  // Create a state tracker for animations
  const animationState = {
    current: {},
    setVariant: (element, variant) => {
      animationState.current[element] = variant;
    },
    getVariant: (element) => animationState.current[element] || null
  };

  // Expose for tests
  window.__framerAnimationState = animationState;

  return {
    motion: {
      div: ({ children, whileHover, variants, animate, initial, ...props }) => (
        <div
          data-testid="mock-motion-div"
          data-framer-initial={initial}
          data-framer-animate={animate}
          {...props}
          onMouseEnter={() => variants && animationState.setVariant('div', 'hover')}
          onMouseLeave={() => variants && animationState.setVariant('div', 'visible')}
        >
          {children}
        </div>
      ),
      // Additional motion components...
    }
  };
});
```

### Accessibility Testing

Always include tests for accessibility attributes:

```jsx
it('applies proper accessibility attributes', () => {
  render(<Component />);
  
  // Check for ARIA labels
  const element = screen.getByRole('img');
  expect(element).toHaveAttribute('aria-label', 'Description');
  
  // Check for keyboard accessibility
  const interactive = screen.getByRole('button');
  expect(interactive).toHaveAttribute('tabIndex', '0');
  
  // Check that decorative elements are hidden from screen readers
  const decorative = screen.getByTestId('decorative-element');
  expect(decorative).toHaveAttribute('aria-hidden', 'true');
});
```

### Animation Testing

Test different animation states:

```jsx
it('simulates hover interaction with animations', () => {
  render(<Component />);
  
  const element = screen.getByTestId('mock-motion-div');
  
  // Simulate mouse enter
  fireEvent.mouseEnter(element);
  
  // Check if animation state was updated
  expect(window.__framerAnimationState.getVariant('div')).toBe('hover');
  
  // Simulate mouse leave
  fireEvent.mouseLeave(element);
  
  // Check if animation state was reset
  expect(window.__framerAnimationState.getVariant('div')).toBe('visible');
});
```

### Responsive Layout Testing

Test components in different viewport sizes:

```jsx
it('uses the correct layout in a responsive grid', () => {
  render(<Component />);
  
  // Check for column layout
  const firstCol = screen.getByTestId('first-column').closest('.col-lg-6');
  const secondCol = screen.getByTestId('second-column').closest('.col-lg-6');
  
  expect(firstCol).toBeInTheDocument();
  expect(secondCol).toBeInTheDocument();
  
  // Both should be children of the same row
  expect(firstCol.parentElement).toBe(secondCol.parentElement);
  expect(firstCol.parentElement.classList.contains('row')).toBe(true);
});
```

## Testing Hook Integration

For components that use custom hooks:

```jsx
// Mock the hook
jest.mock('../../hooks/useCustomHook');

// In your test
useCustomHook.mockReturnValue({
  data: mockData,
  loading: false,
  error: null
});

it('renders data from hook correctly', () => {
  render(<Component />);
  
  // Verify data is displayed
  expect(screen.getByText(mockData.title)).toBeInTheDocument();
});

it('shows loading state when data is loading', () => {
  // Change the mock return value
  useCustomHook.mockReturnValue({
    data: null,
    loading: true,
    error: null
  });
  
  render(<Component />);
  
  // Verify loading indicator is shown
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
});
```

## Test Coverage Goals

Aim for:
- 100% component code coverage
- Every prop and prop combination tested
- All conditional rendering paths tested
- All user interactions tested
- All accessibility features verified

## Example Test Structure

```jsx
describe('Component Name', () => {
  // Setup and mocks
  beforeEach(() => {
    // Reset mocks, setup test data
  });
  
  // Rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {});
    it('renders correctly with custom props', () => {});
    it('handles empty/null props gracefully', () => {});
  });
  
  // Interaction tests
  describe('Interactions', () => {
    it('responds to user clicks correctly', () => {});
    it('handles keyboard navigation', () => {});
    it('shows/hides elements on hover', () => {});
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    it('includes proper ARIA attributes', () => {});
    it('supports keyboard navigation', () => {});
    it('has sufficient color contrast', () => {});
  });
  
  // Animation tests
  describe('Animations', () => {
    it('animates in on mount', () => {});
    it('animates on hover/focus', () => {});
    it('respects reduced motion settings', () => {});
  });
});
```

## Implementation Examples

See the enhanced test implementations:
- `src/components/ui/__tests__/Skill.enhanced.test.jsx` 
- `src/containers/__tests__/Skills.enhanced.test.jsx`

These tests showcase the patterns described in this document and serve as reference implementations.
