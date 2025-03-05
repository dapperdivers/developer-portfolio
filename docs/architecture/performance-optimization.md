# Performance Optimization

This document outlines the performance optimization strategies implemented in the developer portfolio project.

## Table of Contents

- [Core Web Vitals](#core-web-vitals)
- [Asset Optimization](#asset-optimization)
- [Code Optimization](#code-optimization)
- [Rendering Optimization](#rendering-optimization)
- [Lazy Loading](#lazy-loading)
- [Caching Strategy](#caching-strategy)
- [Measuring Performance](#measuring-performance)

## Core Web Vitals

The portfolio is optimized for Google's Core Web Vitals metrics:

### Largest Contentful Paint (LCP)

Strategies to improve LCP:
- Preload critical assets
- Optimize hero section images
- Use responsive images
- Minimize critical CSS

Implementation:

```html
<!-- Preload critical assets in index.html -->
<link rel="preload" href="/assets/css/critical.css" as="style">
<link rel="preload" href="/assets/fonts/font-subset.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/img/hero-image.webp" as="image" type="image/webp">
```

### First Input Delay (FID)

Strategies to improve FID:
- Code splitting
- Defer non-critical JavaScript
- Optimize event handlers
- Avoid heavy JavaScript operations during load

Implementation:

```jsx
// Code splitting with React.lazy
const Projects = React.lazy(() => import('./containers/Projects'));
const Experience = React.lazy(() => import('./containers/Experience'));

// Wrap in Suspense
<Suspense fallback={<Loading />}>
  <Projects />
  <Experience />
</Suspense>
```

### Cumulative Layout Shift (CLS)

Strategies to prevent CLS:
- Reserve space for images and dynamic content
- Use aspect ratio boxes for media
- Avoid inserting content above existing content
- Set width and height attributes on images

Implementation:

```jsx
// LazyImage component with aspect ratio container
function LazyImage({ src, alt, aspectRatio, ...props }) {
  const [loaded, setLoaded] = useState(false);
  
  // Extract aspect ratio values (e.g., "16:9" -> 16/9)
  const ratio = aspectRatio ? 
    aspectRatio.split(':').reduce((a, b) => a / b) : 
    null;
  
  return (
    <div 
      className="image-container"
      style={ratio ? { paddingBottom: `${(1 / ratio) * 100}%` } : undefined}
    >
      <img
        src={src}
        alt={alt}
        className={`lazy-image ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
```

## Asset Optimization

### Image Optimization

Images are optimized using a multi-pronged approach:

1. **Format Selection**
   - WebP for primary format with JPEG/PNG fallbacks
   - SVG for icons and simple graphics
   - Efficient animated formats (MP4 instead of GIF)

2. **Responsive Images**
   - Multiple image sizes for different viewports
   - `srcset` and `sizes` attributes
   - Art direction with `<picture>` when needed

3. **Image Compression**
   - Automated process with scripts/optimize-images.js
   - Different compression levels based on image type
   - Quality settings balancing file size and visual fidelity

Implementation:

```jsx
// ResponsiveImage component
function ResponsiveImage({ src, alt, sizes, ...props }) {
  const basePath = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`
          ${basePath}-small.webp 400w,
          ${basePath}-medium.webp 800w,
          ${basePath}-large.webp 1200w
        `}
        sizes={sizes || '(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px'}
      />
      <source
        type={extension === '.png' ? 'image/png' : 'image/jpeg'}
        srcSet={`
          ${basePath}-small${extension} 400w,
          ${basePath}-medium${extension} 800w,
          ${basePath}-large${extension} 1200w
        `}
        sizes={sizes || '(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px'}
      />
      <img
        src={`${basePath}-medium${extension}`}
        alt={alt}
        {...props}
      />
    </picture>
  );
}

// Usage
<ResponsiveImage
  src="/assets/img/project-screenshot.jpg"
  alt="Project screenshot"
  sizes="(max-width: 768px) 90vw, 50vw"
/>
```

### Font Optimization

Fonts are optimized to prevent render blocking and minimize file size:

1. **Font Loading Strategy**
   - Load critical fonts with high priority
   - Use system font fallback during loading
   - Prevent layout shifts with `font-display: swap`

2. **Font Subsetting**
   - Include only necessary characters
   - Create separate files for different weights
   - Optimize using WOFF2 format

3. **Self-hosting**
   - Fonts are self-hosted to avoid third-party requests
   - Preload critical fonts

Implementation:

```css
/* Font loading in design-tokens.css */
@font-face {
  font-family: 'Roboto';
  src: url('/assets/fonts/roboto-regular-subset.woff2') format('woff2'),
       url('/assets/fonts/roboto-regular-subset.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Font variables */
:root {
  --font-family-base: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  /* Other font variables */
}
```

### CSS Optimization

CSS is optimized to minimize file size and improve render performance:

1. **Critical CSS**
   - Inline critical CSS for above-the-fold content
   - Defer non-critical CSS

2. **CSS Minification**
   - Remove comments, whitespace, and unused rules
   - Optimize selectors and properties

3. **CSS Organization**
   - Modular CSS with component-specific files
   - Design tokens to prevent duplication

Implementation:

```jsx
// Critical CSS extraction using scripts during build
// Simplified approach in index.html
<style>
  /* Inlined critical CSS */
  /* This includes styles needed for the first viewport */
</style>

<link 
  rel="preload" 
  href="/assets/css/main.min.css" 
  as="style" 
  onload="this.onload=null;this.rel='stylesheet'"
>
<noscript>
  <link rel="stylesheet" href="/assets/css/main.min.css">
</noscript>
```

## Code Optimization

### Bundle Size Reduction

Techniques used to minimize JavaScript bundle size:

1. **Code Splitting**
   - Split code by route/section
   - Dynamic imports for large components
   - Separate vendor bundles

2. **Tree Shaking**
   - Remove unused code
   - Import only what's needed

3. **Dependency Management**
   - Evaluate and optimize dependencies
   - Use lightweight alternatives when possible

Implementation:

```jsx
// Code splitting with React.lazy and dynamic imports
const Projects = React.lazy(() => import('./containers/Projects'));
const Experience = React.lazy(() => import('./containers/Experience'));
const Contact = React.lazy(() => import('./containers/Contact'));

// Selective imports to enable tree shaking
import { Button, Card } from 'ui-library'; // Good
// import * from 'ui-library'; // Bad
```

### React Performance Optimizations

Strategies used to optimize React component performance:

1. **Memoization**
   - `React.memo()` for pure components
   - `useMemo()` for expensive calculations
   - `useCallback()` for event handlers

2. **State Management**
   - Local state for UI-specific state
   - Context API for shared state
   - State colocation

3. **React.Fragment**
   - Avoid unnecessary DOM nodes

Implementation:

```jsx
// Memoized component
const ProjectCard = React.memo(function ProjectCard({ project }) {
  return (
    <Card title={project.name}>
      {/* Card content */}
    </Card>
  );
});

// useMemo for expensive calculations
function ProjectsSection({ projects }) {
  // Only recalculate when projects change
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [projects]);
  
  // Stable callback reference
  const handleProjectClick = useCallback((id) => {
    console.log(`Project ${id} clicked`);
  }, []);
  
  return (
    <div>
      {sortedProjects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={() => handleProjectClick(project.id)}
        />
      ))}
    </div>
  );
}
```

## Rendering Optimization

### Critical Rendering Path

Optimizations for the critical rendering path:

1. **Resource Prioritization**
   - Preload critical resources
   - Defer non-critical resources
   - Prefetch resources for future navigation

2. **Minimize Render-Blocking Resources**
   - Defer non-critical JavaScript
   - Asynchronous script loading
   - Inline critical CSS

Implementation:

```html
<!-- Resource hints in index.html -->
<link rel="preload" href="/assets/css/critical.css" as="style">
<link rel="preload" href="/assets/fonts/font-subset.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Defer non-critical JavaScript -->
<script src="/assets/js/analytics.js" defer></script>
<script src="/assets/js/non-critical.js" async></script>
```

### Server-Side Rendering (SSR)

The portfolio can be configured for server-side rendering to improve initial load performance:

1. **Benefits**
   - Faster First Contentful Paint
   - Better SEO
   - Improved performance on low-powered devices

2. **Implementation**
   - Pre-rendering critical components
   - Hydration on client

Implementation using a simple Node.js server:

```javascript
// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App').default;

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // Read the HTML template
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index file:', err);
      return res.status(500).send('Server error');
    }
    
    // Render the app to string
    const appString = ReactDOMServer.renderToString(<App />);
    
    // Inject the rendered app into the HTML template
    const renderedHtml = data.replace(
      '<div id="root"></div>',
      `<div id="root">${appString}</div>`
    );
    
    // Send the response
    res.send(renderedHtml);
  });
});

// Serve static files
app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Lazy Loading

### Component Lazy Loading

Implementation of lazy loading for components:

1. **React.lazy**
   - Load components only when needed
   - Show fallback during loading

2. **Suspense**
   - Handle loading states
   - Manage error boundaries

Implementation:

```jsx
// App.jsx
import React, { Suspense, lazy } from 'react';
import Loading from './components/Loading';

// Lazy load components
const Projects = lazy(() => import('./containers/Projects'));
const Experience = lazy(() => import('./containers/Experience'));
const Skills = lazy(() => import('./containers/Skills'));

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Greeting /> {/* This is loaded immediately */}
        
        <Suspense fallback={<Loading />}>
          <Skills />
          <Experience />
          <Projects />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

### Intersection Observer

Using Intersection Observer for lazy loading:

1. **Resources**
   - Load images, videos, and other resources only when needed
   - Trigger animations when elements come into view

2. **Implementation**
   - Custom hook for reusability
   - Simplified component API

```jsx
// useIntersectionObserver hook
function useIntersectionObserver(options = {}) {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      
      // Unobserve if triggerOnce is true and element is visible
      if (options.triggerOnce && entry.isIntersecting) {
        observer.unobserve(ref);
      }
    }, options);
    
    observer.observe(ref);
    
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options.root, options.rootMargin, options.threshold, options.triggerOnce]);
  
  return [setRef, isVisible];
}

// Using the hook for lazy loading images
function LazyImage({ src, alt, ...props }) {
  const [ref, isVisible] = useIntersectionObserver({
    triggerOnce: true,
    rootMargin: '200px 0px' // Load images 200px before they enter viewport
  });
  
  return (
    <div ref={ref}>
      {isVisible ? (
        <img src={src} alt={alt} {...props} />
      ) : (
        <div className="placeholder" style={{ height: props.height || '300px' }} />
      )}
    </div>
  );
}
```

## Caching Strategy

### Browser Caching

Optimal caching configurations for different asset types:

1. **Static Assets**
   - Long cache times for versioned assets
   - Shorter cache times for frequently updated content

2. **Cache-Control Headers**
   - Appropriate directives for different resource types
   - Versioning strategy for cache busting

Implementation:

```javascript
// Example server-side caching headers
const setHeaders = (res, path) => {
  // JavaScript and CSS files with hash in filename
  if (path.match(/\.(js|css)\?[a-z0-9]+$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } 
  // HTML files
  else if (path.match(/\.html$/)) {
    res.setHeader('Cache-Control', 'no-cache');
  }
  // Images and other static assets
  else if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=604800');
  }
  // Default
  else {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
};

// In Express server
app.use(express.static('public', { setHeaders }));
```

### Client-Side Data Caching

Strategies for caching API data:

1. **React Query / SWR**
   - Automatic data caching
   - Background refreshing
   - Cache invalidation

2. **Local Storage**
   - Persist user preferences
   - Cache non-sensitive data

Implementation:

```jsx
// Using React Query for data fetching and caching
import { useQuery } from 'react-query';

// In a component
function Projects() {
  const { data, isLoading, error } = useQuery(
    'projects', 
    fetchProjects,
    {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
      refetchOnWindowFocus: false // Don't refetch on window focus
    }
  );
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {data.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

## Measuring Performance

### Performance Metrics

Key metrics tracked for the portfolio:

1. **Core Web Vitals**
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **Other Metrics**
   - First Contentful Paint (FCP)
   - Time to Interactive (TTI)
   - Total Blocking Time (TBT)
   - Speed Index

### Monitoring Tools

Tools used for performance monitoring:

1. **Lighthouse**
   - Integrated into CI/CD pipeline
   - Regular audits for performance, accessibility, SEO, and best practices

2. **Web Vitals**
   - Real user monitoring
   - Field data collection

3. **Custom Performance Measurements**
   - User Timing API
   - Performance marks and measures

Implementation:

```javascript
// Performance measurement utility
const PerformanceUtil = {
  // Start timing a custom operation
  startMeasure: (label) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-start`);
    }
  },
  
  // End timing and log results
  endMeasure: (label) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-end`);
      performance.measure(
        label,
        `${label}-start`,
        `${label}-end`
      );
      
      // Get all measurements
      const measurements = performance.getEntriesByName(label);
      const lastMeasurement = measurements[measurements.length - 1];
      
      console.log(`${label}: ${lastMeasurement.duration.toFixed(2)}ms`);
      
      // Clean up
      performance.clearMarks(`${label}-start`);
      performance.clearMarks(`${label}-end`);
      performance.clearMeasures(label);
      
      return lastMeasurement.duration;
    }
    return null;
  },
  
  // Report Web Vitals
  reportWebVitals: (metric) => {
    console.log(metric);
    
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

// Usage
PerformanceUtil.startMeasure('render-projects');
// Render projects
PerformanceUtil.endMeasure('render-projects');
```

### CI/CD Integration

Performance testing is integrated into the CI/CD pipeline:

1. **Automated Tests**
   - Lighthouse CI
   - Bundle size analysis
   - Performance budgets

2. **Performance Budgets**
   - Maximum bundle size
   - Timing thresholds
   - Web Vitals scores

Implementation in GitHub Actions:

```yaml
# .github/workflows/performance.yml
name: Performance Testing

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v8
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
          configPath: './.github/workflows/lighthouserc.json'

  bundle-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Build with bundle analysis
        run: npm run build:analyze
      - name: Check bundle size
        run: node ./scripts/check-bundle-size.js
```