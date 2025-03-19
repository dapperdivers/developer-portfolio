# Component Migration Patterns

This document outlines the patterns and strategies for migrating existing components to follow the project's component organization and best practices.

## Migration Goals

The primary goals of component migration are:

1. Improve component reusability and maintainability
2. Implement consistent patterns across the codebase
3. Separate business logic from presentation
4. Enhance performance and accessibility
5. Improve test coverage and documentation

## Component Migration Process

### 1. Analysis Phase

Before migrating a component, analyze its current implementation:

- Identify common patterns and functionality
- Determine the appropriate atomic level (atom, molecule, organism)
- Identify business logic that can be extracted to custom hooks
- Note any performance issues or accessibility concerns
- Review existing tests and documentation

### 2. Component Extraction

Extract reusable patterns to base UI components:

- Create atomic components for repeated UI elements
- Move these components to the appropriate directory (`atoms`, `molecules`, etc.)
- Ensure each component has a single responsibility
- Implement consistent props API

Example:

```jsx
// Before: Monolithic component with repeated button patterns
const ProjectSection = () => (
  <section>
    <h2>Projects</h2>
    <div className="projects">
      {projects.map(project => (
        <div className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button className="btn btn-primary">View Project</button>
          <button className="btn btn-secondary">Source Code</button>
        </div>
      ))}
    </div>
  </section>
);

// After: Extracted Button component
// src/components/atoms/Button/Button.jsx
const Button = ({ variant, children, onClick }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);

// Updated ProjectSection using the Button component
const ProjectSection = () => (
  <section>
    <h2>Projects</h2>
    <div className="projects">
      {projects.map(project => (
        <div className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <Button variant="primary">View Project</Button>
          <Button variant="secondary">Source Code</Button>
        </div>
      ))}
    </div>
  </section>
);
```

### 3. Logic Extraction

Separate business logic from presentation using custom hooks:

- Create feature-specific custom hooks for data and operations
- Move state management and side effects to hooks
- Keep components focused on rendering and user interactions

Example:

```jsx
// Before: Component with mixed business logic and presentation
const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <section>
      <h2>Projects</h2>
      <div className="projects">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

// After: Custom hook for business logic
// src/hooks/useProjects.js
const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  return { projects, loading, error };
};

// Updated component using the custom hook
// src/containers/ProjectsContainer.jsx
const ProjectsContainer = () => {
  const { projects, loading, error } = useProjects();
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return (
    <Section title="Projects">
      <ProjectList projects={projects} />
    </Section>
  );
};
```

### 4. Component Hierarchy

Create an appropriate component hierarchy:

- Break down complex components into smaller, focused components
- Organize components according to atomic design principles
- Use composition to build complex UIs from simple components

Example:

```jsx
// Before: Monolithic component
const ProjectSection = () => {
  const { projects, loading, error } = useProjects();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <section>
      <h2>Projects</h2>
      <div className="projects">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              <a href={project.demoUrl}>View Demo</a>
              <a href={project.repoUrl}>Source Code</a>
            </div>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// After: Component hierarchy
// src/components/atoms/Tag/Tag.jsx
const Tag = ({ children }) => (
  <span className="tag">{children}</span>
);

// src/components/molecules/ProjectCard/ProjectCard.jsx
const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="project-links">
      <Button as="a" href={project.demoUrl} variant="primary">View Demo</Button>
      <Button as="a" href={project.repoUrl} variant="secondary">Source Code</Button>
    </div>
    <div className="project-tags">
      {project.tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  </div>
);

// src/components/organisms/ProjectList/ProjectList.jsx
const ProjectList = ({ projects }) => (
  <div className="projects">
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

// src/containers/ProjectsContainer.jsx
const ProjectsContainer = () => {
  const { projects, loading, error } = useProjects();
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return (
    <Section title="Projects">
      <ProjectList projects={projects} />
    </Section>
  );
};
```

### 5. Prop Validation and Documentation

Add comprehensive prop validation and documentation:

- Add PropTypes for all component props
- Include descriptions for each prop
- Add JSDoc comments with examples
- Document component purpose and usage

Example:

```jsx
/**
 * ProjectCard - Displays information about a project
 * 
 * @example
 * <ProjectCard 
 *   project={{
 *     id: '1',
 *     title: 'Project Title',
 *     description: 'Project description',
 *     demoUrl: 'https://example.com',
 *     repoUrl: 'https://github.com/example',
 *     tags: ['React', 'JavaScript']
 *   }}
 * />
 */
const ProjectCard = ({ project }) => (
  // Component implementation
);

ProjectCard.propTypes = {
  /** Project data object */
  project: PropTypes.shape({
    /** Unique identifier for the project */
    id: PropTypes.string.isRequired,
    /** Project title */
    title: PropTypes.string.isRequired,
    /** Project description */
    description: PropTypes.string.isRequired,
    /** URL to the live demo */
    demoUrl: PropTypes.string.isRequired,
    /** URL to the source code repository */
    repoUrl: PropTypes.string.isRequired,
    /** Array of technology tags */
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
```

### 6. Performance Optimization

Apply performance optimizations:

- Use React.memo for pure components
- Implement useCallback for event handlers
- Use useMemo for expensive calculations
- Add proper key props for list items

Example:

```jsx
// Before: Unoptimized component
const ProjectCard = ({ project, onSelect }) => (
  <div className="project-card" onClick={() => onSelect(project.id)}>
    {/* Component content */}
  </div>
);

// After: Optimized component
const ProjectCard = React.memo(({ project, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(project.id);
  }, [project.id, onSelect]);
  
  return (
    <div className="project-card" onClick={handleClick}>
      {/* Component content */}
    </div>
  );
});
```

### 7. CSS Updates

Update CSS to use design tokens:

- Replace hardcoded values with design tokens
- Follow BEM naming convention
- Create component-specific CSS files

Example:

```css
/* Before: Hardcoded values */
.project-card {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 24px;
}

/* After: Using design tokens */
.project-card {
  background-color: var(--color-background);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-medium);
  margin-bottom: var(--spacing-large);
}
```

### 8. Testing

Add necessary tests:

- Test component rendering
- Test user interactions
- Test edge cases
- Test accessibility

Example:

```jsx
// src/components/molecules/ProjectCard/ProjectCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'Test description',
  demoUrl: 'https://example.com',
  repoUrl: 'https://github.com/example',
  tags: ['React', 'JavaScript'],
};

describe('ProjectCard component', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
  
  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    render(<ProjectCard project={mockProject} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Test Project'));
    expect(handleSelect).toHaveBeenCalledWith('1');
  });
});
```

## Migration Checklist

Use this checklist when migrating components:

- [ ] Analyze the component and identify reusable patterns
- [ ] Extract atomic components to appropriate directories
- [ ] Separate business logic into custom hooks
- [ ] Create a proper component hierarchy
- [ ] Add comprehensive PropTypes and documentation
- [ ] Apply performance optimizations
- [ ] Update CSS to use design tokens
- [ ] Add necessary tests
- [ ] Update imports in all files using the component

## Incremental Migration Strategy

Follow this incremental approach to migrate components:

1. Start with the most frequently used components
2. Focus on one section at a time
3. Begin with atoms, then molecules, then organisms
4. Update container components last
5. Test thoroughly after each migration
6. Document changes and update related components

## Example Migration Path

Here's a recommended migration path for the portfolio project:

1. Common UI components (Button, Card, etc.)
2. Projects section
3. Experience section
4. Skills section
5. Education section
6. Feedbacks section
7. Contact/GitHub section
8. Navigation and Footer components