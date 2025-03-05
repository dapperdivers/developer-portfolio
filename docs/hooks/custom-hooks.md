# Custom Hooks

This document details the custom React hooks available in the developer portfolio project. These hooks encapsulate reusable logic to keep components clean and focused.

## Table of Contents

- [Data Hooks](#data-hooks)
  - [useEducation](#useeducation)
  - [useExperience](#useexperience)
  - [useProjects](#useprojects)
  - [useSkills](#useskills)
  - [useFeedback](#usefeedback)
- [UI Hooks](#ui-hooks)
  - [useIntersectionObserver](#useintersectionobserver)
  - [useImageColor](#useimagecolor)
- [Utility Hooks](#utility-hooks)
  - [useCallbackHandlers](#usecallbackhandlers)
  - [useMemoValues](#usememoValues)

## Data Hooks

Data hooks connect to the PortfolioContext to provide formatted data for specific sections.

### useEducation

Provides structured education data for the Education section.

```jsx
// Import
import { useEducation } from '../hooks/useEducation';

// Usage
function EducationSection() {
  const { education, isLoading } = useEducation();
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div>
      {education.map(item => (
        <EducationCard key={item.id} education={item} />
      ))}
    </div>
  );
}
```

**Returns:**
- `education`: Array of education entries sorted by date (most recent first)
- `isLoading`: Boolean indicating if data is loading

### useExperience

Provides structured work experience data for the Experience section.

```jsx
// Import
import { useExperience } from '../hooks/useExperience';

// Usage
function ExperienceSection() {
  const { experiences, totalYears, companies } = useExperience();
  
  return (
    <div>
      <p>Experience: {totalYears} years</p>
      {experiences.map(experience => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
```

**Returns:**
- `experiences`: Array of work experiences sorted by date
- `totalYears`: Number representing total years of experience
- `companies`: Array of unique company names
- `isLoading`: Boolean indicating if data is loading

### useProjects

Provides structured project data for the Projects section.

```jsx
// Import
import { useProjects } from '../hooks/useProjects';

// Usage
function ProjectsSection() {
  const { all, featured, filterByTechnology } = useProjects();
  
  // Filter projects that use React
  const reactProjects = filterByTechnology('React');
  
  return (
    <div>
      <h3>Featured Projects</h3>
      {featured.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

**Returns:**
- `all`: Array of all projects sorted by date
- `featured`: Array of featured projects only
- `filterByTechnology(tech)`: Function to filter projects by technology
- `isLoading`: Boolean indicating if data is loading

### useSkills

Provides structured skills data for the Skills section.

```jsx
// Import
import { useSkills } from '../hooks/useSkills';

// Usage
function SkillsSection() {
  const { skillsByCategory, topSkills, allSkills } = useSkills();
  
  return (
    <div>
      <h3>Top Skills</h3>
      {topSkills.map(skill => (
        <Skill key={skill.name} {...skill} />
      ))}
      
      <h3>Frontend</h3>
      {skillsByCategory['frontend'].map(skill => (
        <Skill key={skill.name} {...skill} />
      ))}
    </div>
  );
}
```

**Returns:**
- `allSkills`: Array of all skills
- `topSkills`: Array of skills marked as top skills
- `skillsByCategory`: Object with skills grouped by category
- `isLoading`: Boolean indicating if data is loading

### useFeedback

Provides testimonial and feedback data for the Feedback section.

```jsx
// Import
import { useFeedback } from '../hooks/useFeedback';

// Usage
function FeedbackSection() {
  const { testimonials, featuredTestimonials } = useFeedback();
  
  return (
    <div>
      {featuredTestimonials.map(testimonial => (
        <FeedbackCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
```

**Returns:**
- `testimonials`: Array of all testimonials
- `featuredTestimonials`: Array of featured testimonials only
- `isLoading`: Boolean indicating if data is loading

## UI Hooks

UI hooks handle common UI patterns and behaviors.

### useIntersectionObserver

Detects when an element enters the viewport using the IntersectionObserver API.

```jsx
// Import
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Usage
function AnimatedSection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <div 
      ref={ref}
      className={isVisible ? 'animate-in' : ''}
    >
      This content will animate when visible
    </div>
  );
}
```

**Parameters:**
- `options`: (Optional) IntersectionObserver options
  - `root`: Element that is used as the viewport (default: browser viewport)
  - `rootMargin`: Margin around the root (default: '0px')
  - `threshold`: Percentage of target's visibility (0-1) triggering callback (default: 0)
  - `triggerOnce`: Boolean to trigger only once (default: false)

**Returns:**
- Array containing:
  - `ref`: Reference to attach to the observed element
  - `isVisible`: Boolean indicating if the element is visible

### useImageColor

Extracts dominant color from an image for dynamic theming.

```jsx
// Import
import { useImageColor } from '../hooks/useImageColor';

// Usage
function ProjectCard({ image }) {
  const [colorRef, dominantColor] = useImageColor();
  
  return (
    <div style={{ backgroundColor: dominantColor }}>
      <img 
        ref={colorRef}
        src={image} 
        alt="Project screenshot" 
      />
    </div>
  );
}
```

**Parameters:**
- None

**Returns:**
- Array containing:
  - `ref`: Reference to attach to an image element
  - `dominantColor`: String with CSS color value of dominant color

## Utility Hooks

Utility hooks provide common functionality for performance optimizations.

### useCallbackHandlers

Creates memoized callbacks for common event handling patterns.

```jsx
// Import
import { useCallbackHandlers } from '../hooks/useCallbackHandlers';

// Usage
function Form() {
  const [formState, setFormState] = useState({
    name: '',
    email: ''
  });
  
  const { handleInputChange, handleSubmit } = useCallbackHandlers({
    onInputChange: (name, value) => {
      setFormState(prev => ({ ...prev, [name]: value }));
    },
    onSubmit: (e) => {
      e.preventDefault();
      submitForm(formState);
    }
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formState.name}
        onChange={handleInputChange}
      />
      <input
        name="email"
        value={formState.email}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Parameters:**
- `handlers`: Object containing handler functions
  - `onInputChange`: Function to handle input changes
  - `onSubmit`: Function to handle form submission
  - `onClick`: Function to handle click events
  - `onToggle`: Function to handle toggle events

**Returns:**
- Object containing memoized handlers:
  - `handleInputChange`: Memoized input change handler
  - `handleSubmit`: Memoized submit handler
  - `handleClick`: Memoized click handler
  - `handleToggle`: Memoized toggle handler

### useMemoValues

Memoizes multiple values in one hook to reduce boilerplate.

```jsx
// Import
import { useMemoValues } from '../hooks/useMemoValues';

// Usage
function ExpensiveComponent({ data, filters }) {
  const memoized = useMemoValues({
    filteredData: () => filterData(data, filters),
    stats: () => calculateStats(data),
    groupedData: () => groupDataByCategory(data)
  }, [data, filters]);
  
  return (
    <div>
      <DataTable data={memoized.filteredData} />
      <Stats stats={memoized.stats} />
      <GroupedView groups={memoized.groupedData} />
    </div>
  );
}
```

**Parameters:**
- `valueFactories`: Object where each key is a function that returns a value to be memoized
- `dependencies`: Array of dependencies that should trigger recalculation

**Returns:**
- Object with the same keys as the input, but with memoized values

## Best Practices

1. **Call Hooks at the Top Level**
   - Always call hooks at the top level of your component, not inside loops, conditions, or nested functions.

2. **Use Naming Conventions**
   - Name custom hooks starting with "use" to follow React conventions.

3. **Keep Hooks Focused**
   - Each hook should serve a single purpose.

4. **Managing Dependencies**
   - Be careful with dependency arrays in useEffect, useMemo, and useCallback.
   - Avoid adding unnecessary dependencies.

5. **Error Handling**
   - Implement proper error handling in hooks that perform data fetching or operations that might fail.

## Creating New Hooks

When creating new hooks:

1. Follow the naming convention (use prefix)
2. Place them in the src/hooks directory
3. Focus on a single responsibility
4. Include proper TypeScript typing
5. Write tests for the hook
6. Document the hook's purpose, parameters, and return values