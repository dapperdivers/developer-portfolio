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
