# Debugging Utilities

This directory contains utilities for debugging React components in the portfolio application. The debugging system provides tools for performance monitoring, render tracking, and visually inspecting component behavior.

## Key Features

- Centralized debug configuration in a single place (App.jsx)
- Component registration without modifying component files
- Performance profiling and render tracking
- Adaptive optimization based on device capabilities
- Visual debugging tools for layout and render performance

## How to Use

### Enabling Debug Mode

Debug mode can be enabled/disabled in two ways:

1. Using localStorage (persists between sessions):
```javascript
// Enable debug mode
localStorage.setItem('debug_tools_enabled', 'true');

// Disable debug mode
localStorage.setItem('debug_tools_enabled', 'false');
```

2. Using keyboard shortcuts:
   - `Ctrl+Shift+D`: Toggle debug mode
   - `Ctrl+Shift+B`: Toggle background effects
   - `Ctrl+Shift+A`: Toggle animations
   - `Ctrl+Shift+P`: Toggle profiling
   - `Ctrl+Shift+F`: Toggle FPS display

### Debugging Components

#### Centralized Registration (Recommended)

The simplest way to debug components is to register them in `App.jsx`:

```jsx
// In App.jsx
const componentsToDebug = {
  // Add components to debug here
  MyComponent: lazy(() => import("@components/MyComponent")),
  AnotherComponent
};

// Then in the render tree
<DebugProvider initialConfig={initialDebugConfig}>
  <ComponentRegistrar components={componentsToDebug} />
  {/* Rest of your app */}
</DebugProvider>
```

#### Configuration

Debug settings are configured in `App.jsx`:

```jsx
const initialDebugConfig = {
  enabled: localStorage.getItem('debug_tools_enabled') === 'true',
  components: {
    // Components to debug by default (true = enabled, false = disabled)
    Background: true,
    MatrixBackground: true,
    // ... more components
  },
  features: {
    // Features to enable
    profiling: true,
    backgroundEffects: true,
    animations: true,
    scrollDebugging: false,
    layoutMonitoring: false,
    renderVisualizer: false,
    showFPS: true
  }
};
```

### Debug Props

Components registered for debugging will automatically receive a `__debug` prop containing debugging information. You can use this in your components if needed:

```jsx
const MyComponent = ({ __debug, ...props }) => {
  // __debug will be available if component is registered for debugging
  console.log('Debug info:', __debug);
  
  return <div>My Component</div>;
};
```

## Architecture

The debugging system consists of several parts:

1. **DebugProvider**: Provides context for debugging capabilities
2. **ComponentRegistrar**: Registers components for debugging
3. **Debug Hooks**: Custom hooks for monitoring component performance
4. **Debug Panel**: UI for controlling debug settings

## Adding New Debug Features

To add new debug features:

1. Add a new feature flag in the `DebugConfig` interface in `DebugManager.tsx`
2. Add the feature to the default config
3. Implement the feature using the existing debug context
4. Add UI controls in the debug panel

## Performance Impact

The debugging system is designed to have minimal performance impact when disabled. When enabled, it adds instrumentation to the selected components for monitoring purposes.

For production builds, the debug code is automatically disabled and many of the utilities are tree-shaken out of the build. 