# Debug & Performance Utilities

Simple yet powerful tools to debug and profile your React application.

## Quick Start

### 1. Wrap your app with the DebugProvider

In your main App component:

```jsx
import { DebugProvider } from '@utils/debug';

function App() {
  return (
    <DebugProvider>
      <YourApp />
    </DebugProvider>
  );
}
```

### 2. Enable debugging tools

Press `Ctrl+Shift+D` to toggle the debug panel.

### 3. Track component performance (choose one approach)

#### Option A: Using a Hook

```jsx
import { useDebug } from '@utils/debug';

function MyComponent() {
  // Track this component's performance
  useDebug('MyComponent');
  
  return <div>Your component content</div>;
}
```

#### Option B: Using an HOC

```jsx
import { withDebug } from '@utils/debug';

function MyComponent() {
  return <div>Your component content</div>;
}

// Export with debug wrapper
export default withDebug(MyComponent, 'MyComponent');
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+D` | Toggle debug panel |
| `Ctrl+Shift+P` | Toggle performance monitor |
| `Alt+P` | Expand/collapse performance monitor |

## Performance Monitoring

The performance monitor provides real-time information about:

- FPS (frames per second)
- Memory usage
- Long tasks (operations that block the main thread)
- Component render counts and timings
- Network activity
- DOM mutations

```jsx
import { PerformanceMonitor } from '@utils/debug';

// Add anywhere in your app
<PerformanceMonitor enabled={true} />
```

## Advanced Usage

### Registering Multiple Components

You can register multiple components for debugging in one place:

```jsx
import { RegisterDebugComponents } from '@utils/debug';

// In your App component
const componentsToDebug = {
  Header,
  Footer,
  Sidebar,
  ProductCard
};

// Then in your render tree
<RegisterDebugComponents components={componentsToDebug} />
```

### Configuring Debug Options

You can customize the debug provider with initial configuration:

```jsx
<DebugProvider initialConfig={{
  enabled: true,
  features: {
    profiling: true,
    showFPS: true,
    // See DebugManager.tsx for all options
  }
}}>
  <YourApp />
</DebugProvider>
```

### Debugging Specific Components

To debug only certain components:

```jsx
<DebugProvider initialConfig={{
  components: {
    // Only these components will be debugged
    Sidebar: true,
    ProductCard: true
  }
}}>
  <YourApp />
</DebugProvider>
```

## Available Tools

- **Performance Monitor**: Real-time performance metrics
- **Component Profiler**: Track render counts and timing
- **Render Visualizer**: Highlight components when they render
- **Debug Panel**: Configure debug settings

## For Development/Production

These tools automatically disable themselves in production builds. In development:

- Use localStorage to persist settings between reloads
- Debug tools add minimal overhead when disabled
- All debugging code is tree-shaken in production builds 