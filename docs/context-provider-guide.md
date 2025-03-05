# Context Provider Guide

This guide explains how to use the context providers in the portfolio project. Context providers allow components to access shared data without prop drilling.

## Table of Contents

- [PortfolioContext](#portfoliocontext)
- [ThemeContext (Optional)](#themecontext-optional)
- [Creating Custom Contexts](#creating-custom-contexts)

## PortfolioContext

The `PortfolioContext` is the main data provider for the application. It centralizes all portfolio data and makes it available throughout the component tree.

### Provider Setup

The provider is already set up in `App.jsx`:

```jsx
// App.jsx
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      {/* App components */}
    </PortfolioProvider>
  );
}
```

### Usage in Components

Use the `usePortfolio` hook to access data in any component:

```jsx
import { usePortfolio } from '../context/PortfolioContext';

function ProjectsSection() {
  // Get projects data from context
  const { projects } = usePortfolio();
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Available Data

The context provides the following data:

- `greetings` - Introduction section data
- `skills` - Skills and technologies 
- `workExperiences` - Work history and roles
- `openSource` - Open source contributions
- `projects` - Portfolio projects
- `achievements` - Certifications and awards
- `blogs` - Blog posts
- `contactInfo` - Contact information
- `socialLinks` - Social media profiles

### Custom Hooks

For better organization, we've created custom hooks that build on top of the context:

```jsx
// Example: Projects hook
import { usePortfolio } from '../context/PortfolioContext';

export function useProjects() {
  const { projects } = usePortfolio();
  
  // Sort projects by date (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Filter for featured projects
  const featuredProjects = sortedProjects.filter(project => project.isFeatured);
  
  return {
    all: sortedProjects,
    featured: featuredProjects
  };
}
```

## ThemeContext (Optional)

If your portfolio supports theming, you can use the `ThemeContext`.

### Provider Setup

```jsx
// App.jsx
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* App components */}
    </ThemeProvider>
  );
}
```

### Usage

```jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Creating Custom Contexts

If you need to create additional contexts, follow this pattern:

1. Create the context file:

```jsx
// src/context/MyCustomContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const MyCustomContext = createContext();

// Create provider component
export function MyCustomProvider({ children }) {
  const [data, setData] = useState({
    // Initial state
  });
  
  // Values to expose
  const value = {
    data,
    updateData: (newData) => setData({ ...data, ...newData })
  };
  
  return (
    <MyCustomContext.Provider value={value}>
      {children}
    </MyCustomContext.Provider>
  );
}

// Custom hook for consuming context
export function useMyCustomContext() {
  const context = useContext(MyCustomContext);
  
  if (context === undefined) {
    throw new Error('useMyCustomContext must be used within a MyCustomProvider');
  }
  
  return context;
}
```

2. Add the provider to the app:

```jsx
// App.jsx
import { MyCustomProvider } from './context/MyCustomContext';

function App() {
  return (
    <MyCustomProvider>
      {/* Other components */}
    </MyCustomProvider>
  );
}
```

3. Use the context in components:

```jsx
import { useMyCustomContext } from '../context/MyCustomContext';

function MyComponent() {
  const { data, updateData } = useMyCustomContext();
  
  return (
    <div>
      <p>{data.someValue}</p>
      <button onClick={() => updateData({ someValue: 'new value' })}>
        Update
      </button>
    </div>
  );
}
```

## Best Practices

1. Use contexts for truly global state that many components need
2. Create specialized hooks for complex operations on context data
3. Keep context values serializable when possible
4. Split large contexts into smaller ones if they grow too big
5. Use memoization with `useMemo` for computed values from context
