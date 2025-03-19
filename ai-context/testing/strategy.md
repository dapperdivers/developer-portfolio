# Testing Strategy

This document outlines the testing strategy for the Developer Portfolio project. It covers the different types of tests, testing tools, and best practices for ensuring code quality and reliability.

## Testing Pyramid

The project follows the Testing Pyramid approach, which suggests having:

- Many unit tests (testing individual components and functions)
- Fewer integration tests (testing interactions between components)
- Even fewer end-to-end tests (testing complete user flows)

```
    /\
   /  \
  /E2E \
 /------\
/        \
/Integration\
/------------\
/    Unit     \
----------------
```

This approach provides a balance between test coverage, execution speed, and maintenance cost.

## Types of Tests

### Unit Tests

Unit tests focus on testing individual components, functions, or modules in isolation.

**Characteristics:**
- Fast execution
- Test a single unit of code
- Mock external dependencies
- Located in `__tests__` directories adjacent to the code being tested
- Use `.test.jsx` or `.test.tsx` file extension

**Example:**

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct class when variant is primary', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('button--primary');
  });
});
```

### Integration Tests

Integration tests verify that different parts of the application work together correctly.

**Characteristics:**
- Test interactions between components
- May involve real dependencies (or realistic mocks)
- Located in `__tests__` directories with a descriptive name
- Use `.test.jsx` or `.test.tsx` file extension

**Example:**

```jsx
// ProjectList.integration.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { PortfolioProvider } from '../../context/PortfolioContext';
import ProjectList from './ProjectList';
import mockPortfolioData from '../../__mocks__/portfolio';

describe('ProjectList integration', () => {
  it('renders projects from context', async () => {
    render(
      <PortfolioProvider value={mockPortfolioData}>
        <ProjectList />
      </PortfolioProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPortfolioData.projects[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockPortfolioData.projects[1].title)).toBeInTheDocument();
    });
  });

  it('filters projects when search is applied', async () => {
    const { projects } = mockPortfolioData;
    
    render(
      <PortfolioProvider value={mockPortfolioData}>
        <ProjectList initialSearchTerm={projects[0].title} />
      </PortfolioProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(projects[0].title)).toBeInTheDocument();
      expect(screen.queryByText(projects[1].title)).not.toBeInTheDocument();
    });
  });
});
```

### Enhanced Tests

Enhanced tests focus on animations, accessibility, and other advanced features.

**Characteristics:**
- Test animations, transitions, and complex interactions
- Test accessibility features
- Use `.enhanced.test.jsx` or `.enhanced.test.tsx` file extension
- May require special test configurations

**Example:**

```jsx
// Button.enhanced.test.jsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

describe('Button enhanced tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('shows ripple effect when clicked', async () => {
    render(<Button hasRipple>Ripple Button</Button>);
    const button = screen.getByText('Ripple Button');
    
    fireEvent.click(button);
    
    // Check for ripple element
    expect(button.querySelector('.ripple')).toBeInTheDocument();
    
    // Wait for animation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    
    // Check that ripple is removed after animation
    expect(button.querySelector('.ripple')).not.toBeInTheDocument();
  });
});
```

### End-to-End (E2E) Tests

E2E tests verify complete user flows and interactions with the application.

**Characteristics:**
- Test the application as a whole
- Simulate real user interactions
- Located in the `e2e/` directory
- Use `.spec.js` or `.spec.ts` file extension
- Run in a real browser environment

**Example:**

```js
// e2e/projects.spec.js
describe('Projects Section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="projects-section"]').scrollIntoView();
  });

  it('displays project cards', () => {
    cy.get('[data-testid="project-card"]').should('have.length.at.least', 3);
  });

  it('filters projects when search is used', () => {
    const searchTerm = 'React';
    cy.get('[data-testid="project-search"]').type(searchTerm);
    cy.get('[data-testid="project-card"]').each(($card) => {
      cy.wrap($card).should('contain.text', searchTerm);
    });
  });

  it('navigates to project details when card is clicked', () => {
    cy.get('[data-testid="project-card"]').first().click();
    cy.url().should('include', '/projects/');
    cy.get('[data-testid="project-details"]').should('be.visible');
  });
});
```

### Visual Regression Tests

Visual regression tests capture screenshots of components and compare them to baseline images to detect visual changes.

**Characteristics:**
- Detect unintended visual changes
- Capture screenshots in different viewport sizes
- Run as part of the CI/CD pipeline
- Located in a dedicated directory (e.g., `visual-tests/`)

**Example:**

```js
// visual-tests/Button.visual.js
describe('Button', () => {
  it('renders correctly in different variants', async () => {
    // Primary button
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    await expect(page).toMatchSnapshot('button-primary.png');

    // Secondary button
    await page.goto('http://localhost:6006/iframe.html?id=components-button--secondary');
    await expect(page).toMatchSnapshot('button-secondary.png');

    // Disabled button
    await page.goto('http://localhost:6006/iframe.html?id=components-button--disabled');
    await expect(page).toMatchSnapshot('button-disabled.png');
  });

  it('renders correctly in different viewport sizes', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    
    // Mobile
    await page.setViewport({ width: 375, height: 667 });
    await expect(page).toMatchSnapshot('button-primary-mobile.png');
    
    // Tablet
    await page.setViewport({ width: 768, height: 1024 });
    await expect(page).toMatchSnapshot('button-primary-tablet.png');
    
    // Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await expect(page).toMatchSnapshot('button-primary-desktop.png');
  });
});
```

## Testing Tools

### Unit and Integration Testing

- **Jest**: Test runner and assertion library
- **React Testing Library**: Testing utilities for React components
- **jest-axe**: Accessibility testing with Jest
- **jest-dom**: Custom DOM element matchers for Jest

### End-to-End Testing

- **Playwright**: Browser automation for E2E testing
- **Cypress**: E2E testing framework (alternative)

### Visual Regression Testing

- **Storybook**: Component development environment
- **Chromatic**: Visual testing platform integrated with Storybook
- **Percy**: Visual testing and review platform

### Mocking

- **Mock Service Worker (MSW)**: API mocking library
- **jest.mock**: Jest's built-in mocking functionality
- **Custom mock implementations**: Located in `src/__mocks__/`

## Test Organization

### Directory Structure

```
src/
├── components/
│   └── [type]/
│       └── [ComponentName]/
│           ├── [ComponentName].jsx
│           ├── [ComponentName].test.jsx
│           └── [ComponentName].enhanced.test.jsx
├── hooks/
│   ├── useCustomHook.js
│   └── __tests__/
│       └── useCustomHook.test.js
├── utils/
│   ├── utilFunction.js
│   └── __tests__/
│       └── utilFunction.test.js
├── __mocks__/
│   ├── fileMock.jsx
│   ├── framerMotionMock.jsx
│   └── portfolio.jsx
└── __tests__/
    └── integration/
        └── featureIntegration.test.jsx
e2e/
├── setup.ts
└── feature.spec.js
```

### Naming Conventions

- **Unit tests**: `[ComponentName].test.jsx`
- **Integration tests**: `[FeatureName].integration.test.jsx`
- **Enhanced tests**: `[ComponentName].enhanced.test.jsx`
- **E2E tests**: `[FeatureName].spec.js`
- **Visual tests**: `[ComponentName].visual.js`

## Test Coverage

The project aims for high test coverage, with specific targets:

- **Unit tests**: 80%+ coverage
- **Integration tests**: Cover all critical user flows
- **E2E tests**: Cover main user journeys
- **Visual tests**: Cover all UI components

Coverage reports are generated as part of the CI/CD pipeline and can be viewed locally using:

```bash
npm run test:coverage
```

## Testing Best Practices

### General Best Practices

- Write tests before or alongside code (TDD/BDD approach)
- Keep tests simple and focused
- Test behavior, not implementation details
- Use descriptive test names
- Arrange-Act-Assert pattern
- Don't test third-party libraries
- Avoid test interdependence

### Component Testing Best Practices

- Test rendering with different props
- Test user interactions
- Test edge cases and error states
- Test accessibility
- Mock external dependencies
- Use data-testid attributes for test selectors

```jsx
// Good: Testing component behavior
it('shows error message when form submission fails', async () => {
  server.use(
    rest.post('/api/contact', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Test message' }
  });
  
  fireEvent.click(screen.getByText('Submit'));
  
  expect(await screen.findByText('Failed to send message')).toBeInTheDocument();
});

// Bad: Testing implementation details
it('sets error state when API call fails', async () => {
  const wrapper = shallow(<ContactForm />);
  const instance = wrapper.instance();
  
  await instance.handleSubmit({ preventDefault: jest.fn() });
  
  expect(wrapper.state('error')).toBe('Failed to send message');
});
```

### Hook Testing Best Practices

- Use `renderHook` from `@testing-library/react-hooks`
- Test the hook's behavior, not implementation
- Test with different parameters
- Test side effects

```jsx
// Hook testing example
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(-1);
  });
  
  it('should reset counter to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

### E2E Testing Best Practices

- Focus on critical user flows
- Use realistic test data
- Test in multiple browsers
- Keep tests independent
- Clean up after tests

```js
// E2E test example
describe('Contact Form', () => {
  beforeEach(() => {
    // Set up test data and navigate to contact page
    cy.visit('/contact');
  });
  
  afterEach(() => {
    // Clean up any test data
  });
  
  it('submits the form successfully', () => {
    // Intercept API call
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('contactSubmit');
    
    // Fill out the form
    cy.get('[data-testid="contact-name"]').type('Test User');
    cy.get('[data-testid="contact-email"]').type('test@example.com');
    cy.get('[data-testid="contact-message"]').type('This is a test message');
    
    // Submit the form
    cy.get('[data-testid="contact-submit"]').click();
    
    // Wait for API call
    cy.wait('@contactSubmit');
    
    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## Continuous Integration

Tests are run as part of the CI/CD pipeline to ensure code quality:

- Unit and integration tests run on every pull request
- E2E tests run on main branch merges
- Visual regression tests run on main branch merges
- Coverage reports are generated and published

## Test Documentation

Each test file should include:

- A clear description of what is being tested
- Any special setup or considerations
- Examples of how to run the tests locally

Example test documentation:

```jsx
/**
 * Tests for the Button component
 * 
 * These tests verify:
 * - Rendering with different props
 * - User interactions
 * - Accessibility
 * 
 * To run these tests:
 * npm test -- Button
 * 
 * To run with coverage:
 * npm test -- Button --coverage
 */
describe('Button component', () => {
  // Tests go here
});
```

## Test Maintenance

To keep tests maintainable:

- Refactor tests when refactoring code
- Use test helpers and utilities for common operations
- Keep test setup simple
- Use descriptive error messages
- Review and update tests regularly