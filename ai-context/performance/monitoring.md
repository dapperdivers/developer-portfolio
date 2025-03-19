# Performance Monitoring Guidelines

This document outlines the performance monitoring guidelines and best practices for the Developer Portfolio project. Effective performance monitoring helps identify issues, track improvements, and ensure a consistently fast user experience.

## Performance Metrics

### Core Web Vitals

Core Web Vitals are a set of specific factors that Google considers important for user experience:

1. **Largest Contentful Paint (LCP)**: Measures loading performance
   - Good: ≤ 2.5 seconds
   - Needs Improvement: 2.5 - 4.0 seconds
   - Poor: > 4.0 seconds

2. **First Input Delay (FID)**: Measures interactivity
   - Good: ≤ 100 milliseconds
   - Needs Improvement: 100 - 300 milliseconds
   - Poor: > 300 milliseconds

3. **Cumulative Layout Shift (CLS)**: Measures visual stability
   - Good: ≤ 0.1
   - Needs Improvement: 0.1 - 0.25
   - Poor: > 0.25

### Additional Metrics

Beyond Core Web Vitals, we track these additional metrics:

1. **Time to First Byte (TTFB)**: Time until the first byte of content is received
   - Target: < 600 milliseconds

2. **First Contentful Paint (FCP)**: Time until the first content is painted
   - Target: < 1.8 seconds

3. **Time to Interactive (TTI)**: Time until the page is fully interactive
   - Target: < 3.8 seconds

4. **Total Blocking Time (TBT)**: Sum of all time periods between FCP and TTI
   - Target: < 300 milliseconds

5. **Speed Index**: How quickly content is visually displayed
   - Target: < 3.4 seconds

## Monitoring Tools

### Development Tools

#### 1. Lighthouse

Lighthouse is an automated tool for improving web page quality. It's integrated into Chrome DevTools.

**How to use:**
1. Open Chrome DevTools (F12)
2. Navigate to the "Lighthouse" tab
3. Select the categories to audit (Performance, Accessibility, etc.)
4. Click "Generate report"

**Key metrics to focus on:**
- Performance score (aim for 90+)
- Core Web Vitals measurements
- Opportunities for improvement
- Diagnostics

#### 2. Chrome DevTools Performance Panel

The Performance panel records and analyzes runtime performance.

**How to use:**
1. Open Chrome DevTools (F12)
2. Navigate to the "Performance" tab
3. Click the record button and interact with the page
4. Stop recording and analyze the results

**Key areas to analyze:**
- Main thread activity
- JavaScript execution time
- Rendering and painting time
- Network requests

#### 3. React DevTools Profiler

The React Profiler helps identify performance bottlenecks in React components.

**How to use:**
1. Install React DevTools browser extension
2. Open DevTools and navigate to the "Profiler" tab
3. Click "Record" and interact with the application
4. Analyze component render times

**Key metrics to focus on:**
- Component render times
- Commit frequency
- Component re-render counts

### Production Monitoring

#### 1. Web Vitals Library

The `web-vitals` library is integrated into the application to collect real user metrics.

**Implementation:**

```jsx
// In src/utils/performanceMonitor.js
import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
    getFCP(onPerfEntry);
  }
};

export default reportWebVitals;

// In src/index.jsx
import reportWebVitals from './utils/performanceMonitor';

// Send metrics to analytics
reportWebVitals((metric) => {
  // Analytics code here
  console.log(metric);
});
```

#### 2. Custom Performance Monitoring

Custom performance monitoring is implemented for specific user interactions and application-specific metrics.

**Implementation:**

```jsx
// In src/utils/performanceMonitor.js
export const measureInteraction = (interactionName, callback) => {
  const startTime = performance.now();
  
  const done = () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Log or send to analytics
    console.log(`${interactionName}: ${duration}ms`);
    
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'performance', {
        'event_category': 'interaction',
        'event_label': interactionName,
        'value': Math.round(duration)
      });
    }
  };
  
  return callback(done);
};

// Usage in a component
import { measureInteraction } from '../utils/performanceMonitor';

const handleLoadProjects = () => {
  measureInteraction('load_projects', async (done) => {
    try {
      const projects = await fetchProjects();
      setProjects(projects);
    } finally {
      done();
    }
  });
};
```

#### 3. Performance Observer

The Performance Observer API is used to monitor long tasks and layout shifts.

**Implementation:**

```jsx
// In src/utils/performanceMonitor.js
export const initPerformanceObserver = () => {
  // Monitor long tasks
  const longTaskObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log('Long task detected:', entry.duration, entry);
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'performance', {
          'event_category': 'long_task',
          'event_label': entry.name,
          'value': Math.round(entry.duration)
        });
      }
    });
  });
  
  longTaskObserver.observe({ entryTypes: ['longtask'] });
  
  // Monitor layout shifts
  const layoutShiftObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        console.log('Layout shift detected:', entry.value, entry);
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'performance', {
            'event_category': 'layout_shift',
            'event_label': entry.sources ? entry.sources.map(s => s.node?.nodeName).join(',') : 'unknown',
            'value': Math.round(entry.value * 1000) / 1000
          });
        }
      }
    });
  });
  
  layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  
  return () => {
    longTaskObserver.disconnect();
    layoutShiftObserver.disconnect();
  };
};
```

#### 4. Analytics Integration

Performance metrics are sent to analytics platforms for aggregation and analysis.

**Implementation:**

```jsx
// In src/utils/performanceMonitor.js
export const sendToAnalytics = (metric) => {
  const { name, value, id } = metric;
  
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      'event_category': 'Web Vitals',
      'event_label': id,
      'event_name': name,
      'value': Math.round(name === 'CLS' ? value * 1000 : value)
    });
  }
  
  // Send to custom analytics endpoint
  fetch('/api/metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metric)
  }).catch(err => console.error('Error sending metrics:', err));
};
```

## Performance Budgets

Performance budgets set quantifiable thresholds for performance metrics. Exceeding these budgets triggers alerts and requires optimization.

### Bundle Size Budgets

- **Total JavaScript**: < 300 KB (gzipped)
- **Total CSS**: < 50 KB (gzipped)
- **Total Images**: < 500 KB
- **Total Fonts**: < 100 KB

### Timing Budgets

- **Time to Interactive**: < 3.8 seconds on 4G
- **First Contentful Paint**: < 1.8 seconds on 4G
- **Largest Contentful Paint**: < 2.5 seconds on 4G

### Implementation

Performance budgets are enforced through build tools and CI/CD pipelines:

```js
// In vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // ...
    },
    // Performance budgets
    chunkSizeWarningLimit: 300, // in KB
  },
  // ...
});
```

## Continuous Monitoring

### CI/CD Integration

Performance testing is integrated into the CI/CD pipeline to catch regressions before deployment.

**Implementation:**

```yaml
# In .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://staging-url.example.com/
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

### Automated Alerts

Automated alerts are set up to notify the team when performance metrics exceed budgets.

**Implementation:**

```js
// In monitoring service
const checkPerformanceMetrics = async () => {
  const metrics = await fetchLatestMetrics();
  
  // Check against budgets
  if (metrics.lcp > 2500) {
    await sendAlert({
      title: 'LCP exceeding budget',
      message: `LCP is ${metrics.lcp}ms, which exceeds the 2500ms budget`,
      level: 'warning'
    });
  }
  
  // More checks...
};
```

## Performance Testing Workflow

### 1. Local Development Testing

During local development:

1. Use Lighthouse in DevTools to check performance
2. Use React DevTools Profiler to identify component bottlenecks
3. Run `npm run analyze` to analyze bundle size

### 2. Pre-Deployment Testing

Before deploying to staging:

1. Run `npm run test:performance` to execute automated performance tests
2. Check bundle size with `npm run analyze`
3. Verify that all performance budgets are met

### 3. Production Monitoring

After deployment to production:

1. Monitor real user metrics through analytics
2. Set up alerts for performance regressions
3. Regularly review performance dashboards

## Performance Improvement Process

### 1. Identify Issues

Use monitoring tools to identify performance issues:

- Review Core Web Vitals reports
- Analyze user-reported performance issues
- Check performance monitoring dashboards

### 2. Diagnose Root Causes

Diagnose the root causes of performance issues:

- Use Chrome DevTools to profile the application
- Analyze component render times with React DevTools
- Review network requests and resource loading

### 3. Implement Optimizations

Implement optimizations based on the diagnosis:

- Apply appropriate optimization patterns
- Follow the performance optimization guidelines
- Test optimizations locally

### 4. Verify Improvements

Verify that optimizations have improved performance:

- Compare before/after metrics
- Run performance tests
- Check against performance budgets

### 5. Monitor Continuously

Continue monitoring performance after optimizations:

- Track metrics over time
- Watch for regressions
- Iterate on optimizations as needed

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Chrome DevTools Performance Analysis](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)
- [React DevTools Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
- [Performance Budget Calculator](https://www.performancebudget.io/)