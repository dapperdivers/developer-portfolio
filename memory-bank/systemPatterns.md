# System Patterns

## System Architecture
The Developer Portfolio is built with a modern React architecture focusing on component reusability, state management via context, and performance optimization.

### Core Architecture Patterns
1. **Component-Based UI**: Atomic design pattern with reusable base components that combine to form more complex UI elements
2. **Context API for State**: Centralized data access through React Context instead of prop drilling
3. **Custom Hooks**: Encapsulated reusable logic and stateful behavior 
4. **Container/Presentational Pattern**: Separation of data fetching/business logic from presentation components
5. **Code Splitting**: Dynamic imports via React.lazy for performance optimization
6. **Design Token System**: Comprehensive design system implemented through CSS variables
7. **Component Memoization**: Optimized rendering through strategic use of React.memo
8. **Feature-Based Organization**: Code organized by feature for better maintainability

## Component Hierarchy

```
App
├── PortfolioProvider (Context)
├── Navigation
├── Main Content
│   ├── Greetings (Hero Section)
│   ├── Skills
│   │   └── Skill (repeated)
│   ├── Proficiency
│   ├── Education
│   │   └── EducationCard (repeated)
│   ├── Experience
│   │   └── ExperienceCard (repeated)
│   ├── Feedbacks
│   │   └── FeedbackCard (repeated)
│   ├── Projects
│   │   └── ProjectsCard (repeated)
│   └── GithubProfile (Contact)
└── Footer
```

## Base Component System

### UI Components (atomic)
- **Button**: Multi-variant button that handles different sizes, styles, and can render as a link
  ```jsx
  <Button 
    variant="primary" 
    size="medium" 
    icon={<FaGithub />}
    href="https://github.com/user"
    isExternal
    ariaLabel="View GitHub profile"
  >
    GitHub
  </Button>
  ```

- **Card**: Container with optional animation, styling variants and structured content areas
  ```jsx
  <Card 
    className="custom-card" 
    index={0} 
    hasAnimation={true}
  >
    <div className="card-content">
      Card content goes here
    </div>
  </Card>
  ```

- **ResponsiveImage**: Optimized image component with lazy loading and responsive sizing
  ```jsx
  <ResponsiveImage 
    src="path/to/image.jpg" 
    alt="Description" 
    sizes="(max-width: 768px) 100vw, 50vw" 
    loading="lazy"
  />
  ```

- **LazyImage**: Image that only loads when scrolled into view
  ```jsx
  <LazyImage 
    src="path/to/image.jpg" 
    alt="Description" 
  />
  ```

- **Section**: Page section wrapper with consistent styling, animations, and title handling
  ```jsx
  <Section 
    id="section-id" 
    title="Section Title"
    titleIcon={<Icon icon="icon-name" />}
    className="custom-section"
  >
    Section content goes here
  </Section>
  ```

- **Skill**: Visualization component for displaying skill proficiency

### Layout Components
- **Section**: Standardized page section with animations, title, and content areas

### Hook-Based Logic
Custom hooks separate reusable logic from UI components:
- **useIntersectionObserver**: Scroll-based visibility detection
  ```jsx
  const [ref, isVisible] = useIntersectionObserver({ 
    rootMargin: '100px', 
    once: true 
  });
  ```

- **usePortfolio**: Access to portfolio data context
  ```jsx
  const { projects, greetings, skillsSection } = usePortfolio();
  ```

- **useProjects/useExperience/etc**: Feature-specific data and operations
  ```jsx
  const { projects, featuredProjects, projectCount } = useProjects();
  ```

- **useCallbackHandlers**: Optimized event handlers
  ```jsx
  const { handleClick, handleScroll } = useCallbackHandlers();
  ```

- **useMemoValues**: Memoized computed values
  ```jsx
  const { filteredItems } = useMemoValues(items, filter);
  ```

## Key Technical Decisions

### 1. State Management Approach
- **Context API** for global state over Redux
  - Rationale: Appropriate complexity level for portfolio needs without additional dependencies

### 2. Component Design System
- **Atomic Design Methodology** for components
  - Rationale: Maximizes reusability and maintainability while providing consistent UI

### 3. CSS Architecture
- **CSS Variables (Custom Properties)** for design tokens
  - Rationale: Runtime theming capability, standardized design values, native browser support

### 4. Performance Strategy
- **Component Memoization** (React.memo) for expensive renders
- **Lazy Loading** for components and images
- **Code Splitting** for route-based chunking
  - Rationale: Optimized initial load time and reduced unnecessary renders

### 5. Build & Bundling
- **Vite** for development and production builds
  - Rationale: Fast HMR, efficient production builds, modern defaults

## Component Migration Patterns

### 1. Extracting Base Components

Components like Button, Card, and Section have been extracted from existing implementation patterns to create reusable atomic components.

**Key Migration Pattern**: Extract common UI patterns into reusable components with consistent APIs.

### 2. Adding Prop Validation

All components now have comprehensive PropTypes validation:

```jsx
Button.propTypes = {
  /** Button content */
  children: PropTypes.node,
  /** Button style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'info', 'link']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Optional icon to display */
  icon: PropTypes.node,
  /** If provided, button renders as an anchor tag */
  href: PropTypes.string,
  /** Click handler function */
  onClick: PropTypes.func,
  /** If true, adds target="_blank" and rel attributes for external links */
  isExternal: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Accessible label for the button (important for icon-only buttons) */
  ariaLabel: PropTypes.string,
};
```

### 3. Component Documentation

Components now use JSDoc for comprehensive documentation:

```jsx
/**
 * Button component for user interactions.
 * 
 * @component
 * @example
 * // Basic button
 * <Button onClick={handleClick}>Click Me</Button>
 * 
 * // Link button
 * <Button href="https://example.com" isExternal>Visit Website</Button>
 * 
 * // Button with icon
 * <Button icon={<FaDownload />}>Download</Button>
 */
```

### 4. Performance Optimization

Components are strategically memoized to prevent unnecessary re-renders:

```jsx
// Only re-render if props change
export default memo(ProjectsCard);

// With custom comparison function for more control
export default memo(ExpensiveComponent, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
```

## Design Patterns Used

### 1. Provider Pattern
Used with React Context to provide portfolio data to components without prop drilling.

```jsx
// Context creation
const PortfolioContext = createContext();

// Provider component
export const PortfolioProvider = ({ children }) => {
  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Consumer usage via hook
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
```

### 2. Custom Hook Pattern
Extracting reusable stateful logic into focused hooks.

```jsx
// Example: Intersection Observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    // Implementation details
  }, [options]);
  
  return [elementRef, isIntersecting];
};
```

### 3. Compound Components Pattern
Used for components with related subcomponents that share implicit state.

```jsx
// Card with subcomponents
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### 4. Render Props Pattern
Used for components that need to control what is rendered while delegating how it's rendered.

```jsx
// InView component example
<InView>
  {({ isVisible }) => (
    <div className={isVisible ? 'animate-in' : 'hidden'}>
      Content appears when visible
    </div>
  )}
</InView>
```

### 5. Memoization Pattern
Used to prevent unnecessary re-renders of expensive components.

```jsx
// Memoized component
const ExpensiveComponent = memo(({ data }) => {
  // Component logic
});

// Memoized value
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Memoized callback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 6. Feature-Specific Hooks Pattern
Custom hooks that encapsulate all data and operations related to a specific feature:

```jsx
export const useProjects = () => {
  const { projects } = usePortfolio();
  
  // Feature-specific derived data
  const featuredProjects = useMemo(() => 
    projects.filter(project => project.featured), 
    [projects]
  );
  
  const projectsByCategory = useMemo(() => {
    // Categorization logic...
    return categorized;
  }, [projects]);
  
  return {
    projects,
    featuredProjects,
    projectsByCategory,
    projectCount: projects.length
  };
};
```

## Component Relationships

### Data Flow
1. **Portfolio Data Source**: Central data defined in context
2. **Section Containers**: Consume relevant slices of data via hooks
3. **Card Components**: Receive specific data items as props
4. **UI Components**: Receive primarily presentation props

### Component Communication
1. **Parent to Child**: Via props (primary flow)
2. **Child to Parent**: Via callback props when needed
3. **Cross-Component**: Via context when appropriate
4. **Sibling Components**: Through common parent or context

## Design System Architecture

The design system is implemented using CSS custom properties (variables) in the `design-tokens.css` file. This provides a single source of truth for all design values used throughout the application.

### Design Token Categories
1. **Colors**: Primary, secondary, accent, semantic, and neutral colors
2. **Typography**: Font families, sizes, weights, and line heights
3. **Spacing**: Consistent spacing scale and semantic spacing variables
4. **Borders & Radius**: Border widths and radius values
5. **Shadows**: Box shadow values for different elevations
6. **Transitions**: Standard transition values for animations
7. **Breakpoints**: Responsive breakpoints for consistent media queries
8. **Z-index**: Standardized stacking context values

### Design Token Usage Pattern
```css
/* Design token definition */
:root {
  --color-primary: #0062cc;
  --spacing-4: 1rem;
  --font-size-base: 1rem;
}

/* Design token usage */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}
```

## System Evolution Considerations

1. **Extending the Component Library**:
   - New components should follow the established patterns
   - UI components belong in the ui/ directory
   - Layout components belong in the layout/ directory
   - Include comprehensive PropTypes and JSDoc documentation
   - Follow the atomic design principles (atoms, molecules, organisms)

2. **Adding New Sections**:
   - Create a container component in containers/
   - Use the Section component as a wrapper
   - Add corresponding data to the portfolio context
   - Create a feature-specific hook for data and operations

3. **Style Modifications**:
   - Update design tokens in design-tokens.css for system-wide changes
   - Component-specific styles should be in their own CSS files
   - Use CSS variables for all variable values (colors, spacing, etc.)

4. **Performance Enhancements**:
   - Apply memoization to components with expensive renders
   - Consider lazy loading for below-the-fold components
   - Use appropriate hooks for optimizing calculations and callbacks
   - Apply the useIntersectionObserver hook for visibility-based rendering

## Front-End Best Practices

This section documents comprehensive best practices for front-end development, focusing on reusability, organization, maintainability, consistency, and performance.

### Strategies for Creating Highly Reusable Components

#### Atomic Design Methodology
- **Atoms**: Basic UI elements (Button, Input, Icon)
- **Molecules**: Groups of atoms (SearchBar = Input + Button)
- **Organisms**: Groups of molecules (Header = Navigation + SearchBar + Logo)
- **Templates**: Page layouts
- **Pages**: Specific instances of templates

#### Composition Over Inheritance
```jsx
// Instead of this:
<PrimaryButton>Click Me</PrimaryButton>
<SecondaryButton>Click Me</SecondaryButton>

// Do this:
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Click Me</Button>
```

#### Flexible Prop APIs
```jsx
// Comprehensive props with sensible defaults
Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isFullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string, // Allow style customization
};
```

#### Compound Components Pattern
```jsx
<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Body>Main content</Card.Body>
  <Card.Footer>Action buttons</Card.Footer>
</Card>
```

#### Render Props for Flexible Rendering
```jsx
<List 
  items={data}
  renderItem={(item) => (
    <CustomListItem {...item} />
  )}
/>
```

#### Custom Hooks for Reusable Logic
```jsx
// Extract behavior from components
function useFormField(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  
  return {
    value,
    onChange: e => setValue(e.target.value),
    onBlur: () => setTouched(true),
    touched
  };
}

// Usage
function MyForm() {
  const email = useFormField('');
  const password = useFormField('');
  
  return (
    <form>
      <input {...email} type="email" />
      <input {...password} type="password" />
    </form>
  );
}
```

### Best Practices for Code Organization and Architecture

#### Feature-Based Organization
Structure by feature rather than technology type:

```
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── index.js (public API)
│   ├── projects/
│   └── user-profile/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── context/
└── App.jsx
```

#### State Management Tiers
Choose the right approach based on complexity:

1. **Component State**: For component-specific state
2. **Context API**: For shared state within a feature
3. **State Management Library**: For complex global state (Redux, Zustand, Jotai, Recoil)

#### Separation of Concerns
```jsx
// Container Component (Logic)
function UserProfileContainer() {
  const { user, loading } = useUserData();
  const { handleSave } = useUserActions();
  
  return (
    <UserProfile 
      user={user} 
      loading={loading} 
      onSave={handleSave} 
    />
  );
}

// Presentational Component (UI)
function UserProfile({ user, loading, onSave }) {
  if (loading) return <Spinner />;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={onSave}>Save</button>
    </div>
  );
}
```

#### Module Boundaries
Create clear "public APIs" for features using barrel files:

```js
// features/authentication/index.js
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
export { AuthProvider } from './context/AuthContext';
// Don't export implementation details
```

### Techniques for Improving Code Maintainability

#### Documentation Practices
```jsx
/**
 * Button component for user interactions
 * 
 * @component
 * @example
 * <Button variant="primary" size="medium">Click Me</Button>
 * 
 * @example
 * // As a link
 * <Button href="/dashboard" isExternal>Go to Dashboard</Button>
 */
```

#### Predictable Naming Conventions
- **Components**: PascalCase (Button, UserProfile)
- **Hooks**: camelCase with 'use' prefix (useState, useFormField)
- **Context**: PascalCase with 'Context' suffix (UserContext)
- **Helper Functions**: camelCase, verb-first (formatDate, calculateTotal)
- **Constants**: UPPER_SNAKE_CASE (API_ENDPOINT, DEFAULT_SETTINGS)

#### Testing Strategy
- **Unit Tests**: For individual functions and hooks
- **Component Tests**: For component rendering and interactions
- **Integration Tests**: For component interactions
- **End-to-End Tests**: For critical user flows

```jsx
// Component test example
test('Button renders correctly with primary variant', () => {
  render(<Button variant="primary">Click Me</Button>);
  const button = screen.getByText('Click Me');
  expect(button).toHaveClass('button--primary');
});

test('Button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  userEvent.click(screen.getByText('Click Me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Code Consistency with ESLint and Prettier
Enforcing consistent style through automation rather than documentation.

### Methods for Ensuring Consistency Across Projects

#### Design System Implementation
```css
:root {
  /* Colors */
  --color-primary: #0062cc;
  --color-primary-light: #4d8fe6;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  
  /* Typography */
  --font-family-base: 'Inter', sans-serif;
  --font-size-base: 1rem;
}

.button {
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-primary);
  font-family: var(--font-family-base);
}
```

#### Component Library Development
Creating an internal component library enforces consistency:

```jsx
// Import base components from your library
import { Button, Card, Section } from '@your-org/components';

// Use consistently across projects
function ProjectPage() {
  return (
    <Section title="Projects">
      <Card>
        <h2>Project Title</h2>
        <Button>View Details</Button>
      </Card>
    </Section>
  );
}
```

#### Consistent Project Structure Template
Create a standard project structure that all new projects follow.

#### Style Guide Documentation
Document not just the API, but the philosophy and principles behind component usage.

#### Monorepo Approach
Consider tools like Nx, Turborepo, or Lerna for sharing code across multiple applications:

```
myorg/
├── apps/
│   ├── web/
│   └── mobile/
├── packages/
│   ├── ui-components/
│   ├── hooks/
│   └── utils/
```

### Approaches to Optimize Performance

#### Component Optimization
```jsx
// Prevent unnecessary re-renders
const MemoizedComponent = React.memo(ExpensiveComponent);

// Optimize event handlers
const handleClick = useCallback(() => {
  doSomething(prop1, prop2);
}, [prop1, prop2]);

// Optimize computed values
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

#### Code Splitting and Lazy Loading
```jsx
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Feature-based code splitting
const AdvancedChart = lazy(() => import('./components/AdvancedChart'));

// Usage
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

#### Intersection Observer for Visibility-Based Rendering
```jsx
function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef}>
      {isVisible ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
```

#### Virtualization for Long Lists
```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

#### Image Optimization
```jsx
<img
  src="image-small.jpg"
  srcSet="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  loading="lazy"
  decoding="async"
  alt="Description"
/>
```

### Common Pitfalls to Avoid

#### Anti-Pattern: Premature Abstraction
Creating overly generic components before understanding all use cases leads to complex, hard-to-maintain code.

#### Anti-Pattern: Prop Drilling
Passing props through multiple levels of components creates tight coupling. Use context or composition instead.

#### Anti-Pattern: Monolithic Components
Large components that do too many things are hard to test and maintain. Break them down into focused components.

#### Anti-Pattern: Direct DOM Manipulation
Avoid using document.querySelector or jQuery in React components. Use refs instead.

#### Anti-Pattern: Inconsistent Styling Approaches
Mixing CSS modules, styled-components, and global CSS creates confusion. Pick one approach and stick with it.

### Implementation Challenges and Solutions

#### Challenge: Component API Design
**Solution**: Start with minimal APIs and expand as needed. Gather feedback from other developers.

#### Challenge: Balancing Flexibility vs. Complexity
**Solution**: Design for 90% of use cases, provide escape hatches for edge cases.

#### Challenge: Performance vs. Developer Experience
**Solution**: Focus on performance for critical paths, optimize developer experience for frequently changed code.

#### Challenge: Maintaining Consistency As Teams Grow
**Solution**: Automate as much as possible with linting, testing, and documentation.
