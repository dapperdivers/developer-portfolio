# Component Implementation Guidelines

This document outlines the best practices and patterns for implementing components in the Developer Portfolio project.

## Component Structure

### Functional Components

- Use functional components with hooks instead of class components
- Structure components in a consistent way:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

/**
 * ComponentName - Description of the component's purpose
 * 
 * @example
 * <ComponentName variant="primary" size="medium">Content</ComponentName>
 */
const ComponentName = ({
  variant = 'default',
  size = 'medium',
  children,
  className,
  ...restProps
}) => {
  // Component logic and hooks
  
  // Render
  return (
    <div 
      className={`component-name component-name--${variant} component-name--${size} ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  /** Description of the variant prop */
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /** Description of the size prop */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Description of the children prop */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

ComponentName.defaultProps = {
  variant: 'default',
  size: 'medium',
  children: null,
  className: '',
};

export default ComponentName;
```

## Separation of Concerns

### Business Logic vs. Presentation

- Separate business logic from presentation using custom hooks
- Create feature-specific custom hooks for data and operations
- Keep components focused on rendering and user interactions

Example:

```jsx
// Custom hook for business logic
const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch projects logic
  }, []);
  
  return { projects, loading, error };
};

// Component focused on presentation
const ProjectList = () => {
  const { projects, loading, error } = useProjects();
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

## Props and PropTypes

### Comprehensive PropTypes

- Include PropTypes for all component props with descriptions
- Use the most specific PropType possible
- Document prop usage with JSDoc comments

```jsx
ComponentName.propTypes = {
  /** Primary content of the component */
  children: PropTypes.node.isRequired,
  /** Visual style variant of the component */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /** Size of the component */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Whether the component is disabled */
  isDisabled: PropTypes.bool,
  /** Function called when the component is clicked */
  onClick: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};
```

### Default Props

- Provide default props for optional props
- Make sure default values are sensible and documented

```jsx
ComponentName.defaultProps = {
  variant: 'primary',
  size: 'medium',
  isDisabled: false,
  onClick: () => {},
  className: '',
};
```

## Performance Optimization

### Memoization

- Apply React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for event handlers passed as props

```jsx
// Memoized component
const MemoizedComponent = React.memo(({ data }) => {
  // Render using data
});

// Inside a component
const ExpensiveComponent = ({ items }) => {
  // Memoized calculation
  const processedItems = useMemo(() => {
    return items.map(item => expensiveProcess(item));
  }, [items]);
  
  // Memoized callback
  const handleClick = useCallback(() => {
    // Handle click logic
  }, [/* dependencies */]);
  
  return (
    <div onClick={handleClick}>
      {processedItems.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
};
```

## Component Composition

### Compound Components

- Implement compound components for related subcomponents
- Use React.createContext for internal state sharing
- Export subcomponents as properties of the main component

```jsx
const TabsContext = React.createContext();

const Tabs = ({ children, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, onChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => {
  return <div className="tabs__list">{children}</div>;
};

const Tab = ({ children, value }) => {
  const { activeTab, setActiveTab, onChange } = useContext(TabsContext);
  
  const handleClick = () => {
    setActiveTab(value);
    if (onChange) onChange(value);
  };
  
  return (
    <button 
      className={`tabs__tab ${activeTab === value ? 'tabs__tab--active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ children, value }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div className="tabs__panel">{children}</div>;
};

// Attach subcomponents
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
```

## State Management

### Local State

- Keep component state local when possible
- Use useState for simple state
- Use useReducer for complex state logic

```jsx
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state
const initialState = { count: 0, status: 'idle', error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'loading':
      return { ...state, status: 'loading' };
    case 'success':
      return { ...state, status: 'success' };
    case 'error':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

### Context for Cross-Component State

- Use context for state that needs to be accessed by multiple components
- Create feature-specific contexts
- Provide a custom hook to access the context

```jsx
// Context definition
const ThemeContext = React.createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage in a component
const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={`button button--${theme}`}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};
```

## Accessibility

### ARIA Attributes

- Add appropriate ARIA attributes to components
- Use semantic HTML elements when possible
- Ensure keyboard navigation works correctly

```jsx
const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const id = useId();
  const headingId = `${id}-heading`;
  const contentId = `${id}-content`;
  
  return (
    <div className="accordion">
      <h3 id={headingId}>
        <button
          className="accordion__toggle"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {title}
          <span className="accordion__icon" aria-hidden="true">
            {isExpanded ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        className="accordion__content"
        aria-labelledby={headingId}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
};
```

## Documentation

### JSDoc Comments

- Use JSDoc comments with examples for component documentation
- Document component purpose, props, and usage
- Include examples of different variations

```jsx
/**
 * Button component for user interactions.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * @example
 * // Secondary button with icon
 * <Button variant="secondary" icon={<Icon name="arrow" />}>Next</Button>
 * 
 * @example
 * // Disabled button
 * <Button isDisabled>Cannot click</Button>
 */
const Button = ({ variant, children, isDisabled, icon, onClick }) => {
  // Component implementation
};
```

## Error Handling

- Implement error boundaries for component trees
- Handle loading and error states gracefully
- Provide meaningful error messages

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Usage
const App = () => (
  <ErrorBoundary fallback={<ErrorPage />}>
    <MyComponent />
  </ErrorBoundary>
);
```

## Testing Considerations

- Design components with testability in mind
- Expose test IDs when necessary
- Keep components pure when possible

```jsx
const Button = ({ children, onClick, testId }) => (
  <button 
    onClick={onClick}
    data-testid={testId}
    className="button"
  >
    {children}
  </button>
);

// In tests
const { getByTestId } = render(<Button testId="submit-button">Submit</Button>);
const button = getByTestId('submit-button');
fireEvent.click(button);