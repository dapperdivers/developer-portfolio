# System Architecture

This document outlines the system architecture and design patterns used in the Developer Portfolio project. It provides a comprehensive overview of the architectural decisions, component organization, and coding patterns.

## Architectural Overview

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
  />
  ```

- **Card**: Base component for card-based layouts with support for header, body, and footer
  ```jsx
  <Card 
    title="Project Title"
    footer={<Button>View Project</Button>}
    className="custom-class"
  >
    <p>Card content goes here</p>
  </Card>
  ```

- **Section**: Layout wrapper that provides consistent section styling
  ```jsx
  <Section 
    id="skills"
    title="My Skills" 
    icon="mdi:code-tags"
  >
    <SkillsContent />
  </Section>
  ```

### Composite Components (molecules)

- **ExperienceCard**: Displays professional experience information
- **ProjectsCard**: Showcases portfolio projects
- **EducationCard**: Shows educational background
- **FeedbackCard**: Displays testimonials and feedback
- **DisplayLottie**: Wrapper for Lottie animations with performance optimizations
- **SocialLinks**: Collection of social media links

### Section Components (organisms)

- **Skills**: Complete skills section with filtering and grouping
- **Experience**: Timeline of professional experience
- **Education**: Educational background section
- **Projects**: Portfolio projects showcase with filtering
- **Feedbacks**: Testimonials section 
- **GithubProfile**: Contact section with GitHub integration

## State Management

### Context API

The project uses React Context API for state management through the `PortfolioContext`. This provides:

1. **Centralized State**: All portfolio data is managed in a single location
2. **Consistent Access**: Components access data through consistent hooks
3. **Reduced Prop-Drilling**: No need to pass data through multiple component layers

Example of context usage:

```jsx
// Context definition
export const PortfolioContext = React.createContext();

// Provider implementation
export const PortfolioProvider = ({ children }) => {
  const portfolioData = {
    greeting: {...},
    skills: [...],
    experience: [...],
    // Other data sections
  };
  
  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Consuming context in a component
function Skills() {
  const { skills } = useContext(PortfolioContext);
  return (
    <div>
      {skills.map(skill => <Skill key={skill.id} data={skill} />)}
    </div>
  );
}
```

### Custom Hooks

Custom hooks encapsulate related logic and state management:

1. **Feature-Specific Hooks**: `useSkills`, `useExperience`, `useProjects`, etc.
2. **Utility Hooks**: `useIntersectionObserver`, `useImageColor`, etc.
3. **Performance Hooks**: `useMemoValues`, `useCallbackHandlers`, etc.

Example of a custom hook:

```jsx
function useSkills() {
  const { skills } = useContext(PortfolioContext);
  
  // Derived state - group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped = {};
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(skill);
    });
    return grouped;
  }, [skills]);
  
  // Return processed data and helper functions
  return {
    skills,
    skillsByCategory,
    hasSkills: skills.length > 0,
    categories: Object.keys(skillsByCategory)
  };
}
```

## Performance Optimization

### Component Memoization

Selective memoization is used to prevent unnecessary re-renders:

```jsx
// Memoized component example
const ProjectCard = React.memo(function ProjectCard({ project, onClick }) {
  return (
    <Card title={project.name} onClick={() => onClick(project.id)}>
      <ProjectDetails project={project} />
    </Card>
  );
});

// In the parent component
function Projects() {
  // Stable callback reference with useCallback
  const handleProjectClick = useCallback((id) => {
    console.log(`Project ${id} clicked`);
  }, []);
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={handleProjectClick}
        />
      ))}
    </div>
  );
}
```

### Code Splitting

React.lazy and Suspense are used for code splitting:

```jsx
// Lazy load components
const Projects = React.lazy(() => import('./containers/Projects'));
const Experience = React.lazy(() => import('./containers/Experience'));

// In App.jsx
function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<Loading />}>
        <Projects />
        <Experience />
      </Suspense>
      <Footer />
    </div>
  );
}
```

### Image and Asset Optimization

1. **LazyImage Component**: Loads images only when they enter the viewport
2. **WebP Format**: Uses modern image formats with fallbacks
3. **Responsive Images**: Serves different image sizes based on viewport

```jsx
<LazyImage 
  src="/path/to/image.jpg"
  alt="Description"
  width={600}
  height={400}
  placeholderColor="#f3f4f6"
/>
```

## Animation Strategy

The project uses a combination of CSS and JavaScript animations:

1. **CSS Transitions**: For simple state changes and hover effects
2. **Framer Motion**: For more complex animations and transitions
3. **Lottie**: For interactive vector animations

Animation patterns:

```jsx
// Simple transition with CSS
<div className="transition-all duration-300 hover:scale-105">
  Content
</div>

// Framer Motion for complex animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

## Styling Approach

The project uses a hybrid styling approach:

1. **Tailwind CSS**: Utility-first CSS framework for rapid development
2. **CSS Variables**: Design tokens for consistent theming
3. **CSS Modules**: Component-specific styles when needed

Example:

```jsx
// Tailwind example
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col gap-4">
  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Content</p>
</div>

// Design tokens usage
:root {
  --color-primary: #3563E9;
  --color-secondary: #6B7280;
  --spacing-base: 1rem;
  --font-family-heading: 'Poppins', sans-serif;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-base);
  font-family: var(--font-family-heading);
}
```

## Security Considerations

The project implements several security best practices:

1. **Content Security Policy**: Controls which resources can load
2. **Input Sanitization**: Prevents XSS in user-generated content
3. **Environment Variables**: Keeps sensitive data out of the codebase
4. **HTTPS Enforcement**: Redirects HTTP to HTTPS
5. **Helmet Integration**: Sets security headers

Example:

```jsx
// Server-side security with helmet middleware
app.use(helmet());

// Client-side sanitization
export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};
```

## Testing Strategy

The project uses a comprehensive testing approach:

1. **Unit Tests**: For individual components and functions
2. **Integration Tests**: For component interactions
3. **Accessibility Tests**: For ARIA compliance and keyboard navigation
4. **Visual Tests**: For responsive layouts and animations

Example test structure:

```jsx
describe('Button Component', () => {
  // Basic rendering
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  // Interaction testing
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Accessibility testing
  it('has proper accessibility attributes', () => {
    render(<Button ariaLabel="Custom Label">Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom Label');
  });
});
```

## Development Process

The project follows a structured development process:

1. **Component Planning**: Identify purpose, props, and behavior
2. **Implementation**: Code the component following best practices
3. **Testing**: Write comprehensive tests
4. **Documentation**: Add JSDoc comments and Storybook stories
5. **Review**: Ensure adherence to project patterns

See the [Component Development Checklist](../component-development-checklist.md) for a detailed guide on creating components.