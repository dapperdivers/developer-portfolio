---
layout: page
title: "State Management Strategy"
description: "Professional approach to state management using React Context and custom hooks"
permalink: /architecture/state-management/
---

# State Management Strategy

## Overview

This portfolio implements a sophisticated state management architecture using React Context API and custom hooks, demonstrating enterprise-level patterns for scalable applications without the overhead of external state libraries.

## Architecture Principles

### 1. Context Separation
State is organized into logical domains, each with its own context:

```javascript
// Separate contexts for different concerns
const AuthContext = createContext();
const SecurityContext = createContext();
const NotificationContext = createContext();
```

### 2. Provider Composition
Clean provider composition pattern for app-wide state:

```javascript
const AppProviders = ({ children }) => {
  return (
    <PortfolioProvider>
      <SecurityProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </SecurityProvider>
    </PortfolioProvider>
  );
};
```

## Implementation Patterns

### 1. Context with Reducer Pattern

For complex state logic with multiple actions:

```javascript
// Security context with reducer
const SecurityContext = createContext();

const securityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECURITY_LEVEL':
      return { ...state, level: action.payload };
    
    case 'ADD_VULNERABILITY':
      return {
        ...state,
        vulnerabilities: [...state.vulnerabilities, action.payload]
      };
    
    case 'PATCH_APPLIED':
      return {
        ...state,
        patches: state.patches.map(patch =>
          patch.id === action.payload.id
            ? { ...patch, applied: true }
            : patch
        )
      };
    
    case 'RESET_SECURITY':
      return initialSecurityState;
    
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const SecurityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(securityReducer, initialSecurityState);
  
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state]);
  
  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};
```

### 2. Custom Hook Pattern

Encapsulate context usage with custom hooks:

```javascript
// Custom hook for security context
export const useSecurity = () => {
  const context = useContext(SecurityContext);
  
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  
  const { state, dispatch } = context;
  
  // Provide convenient action creators
  const actions = useMemo(() => ({
    setSecurityLevel: (level) => 
      dispatch({ type: 'SET_SECURITY_LEVEL', payload: level }),
    
    addVulnerability: (vulnerability) =>
      dispatch({ type: 'ADD_VULNERABILITY', payload: vulnerability }),
    
    applyPatch: (patchId) =>
      dispatch({ type: 'PATCH_APPLIED', payload: { id: patchId } }),
    
    resetSecurity: () =>
      dispatch({ type: 'RESET_SECURITY' })
  }), [dispatch]);
  
  return {
    ...state,
    ...actions
  };
};
```

### 3. Optimistic Updates

Handle async operations with optimistic UI updates:

```javascript
const useOptimisticUpdate = () => {
  const { dispatch } = useContext(AppContext);
  
  const updateResource = useCallback(async (resourceId, updates) => {
    // Optimistic update
    dispatch({
      type: 'UPDATE_RESOURCE_OPTIMISTIC',
      payload: { id: resourceId, updates }
    });
    
    try {
      const result = await api.updateResource(resourceId, updates);
      
      // Confirm update with server response
      dispatch({
        type: 'UPDATE_RESOURCE_SUCCESS',
        payload: result
      });
    } catch (error) {
      // Revert on failure
      dispatch({
        type: 'UPDATE_RESOURCE_FAILURE',
        payload: { id: resourceId, error }
      });
      
      throw error;
    }
  }, [dispatch]);
  
  return { updateResource };
};
```

### 4. State Persistence

Automatic persistence with localStorage:

```javascript
const usePersistentState = (key, initialValue) => {
  // Initialize from localStorage
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  
  // Persist to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, state]);
  
  return [state, setState];
};
```

## Advanced Patterns

### 1. Context Selector Pattern

Prevent unnecessary re-renders with granular subscriptions:

```javascript
const createContextSelector = (context) => {
  return (selector) => {
    const value = useContext(context);
    const selectedRef = useRef(selector(value));
    const [, forceRender] = useReducer(x => x + 1, 0);
    
    useEffect(() => {
      const selected = selector(value);
      if (selected !== selectedRef.current) {
        selectedRef.current = selected;
        forceRender();
      }
    });
    
    return selectedRef.current;
  };
};

// Usage
const useSecurityLevel = () => {
  return createContextSelector(SecurityContext)(
    state => state.securityLevel
  );
};
```

### 2. Async State Management

Handle async operations elegantly:

```javascript
const useAsyncState = (asyncFunction) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });
  
  const execute = useCallback(async (...params) => {
    setState({ loading: true, error: null, data: null });
    
    try {
      const data = await asyncFunction(...params);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, [asyncFunction]);
  
  return { ...state, execute };
};

// Usage
const SecurityDashboard = () => {
  const { data, loading, error, execute } = useAsyncState(fetchSecurityMetrics);
  
  useEffect(() => {
    execute();
  }, [execute]);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <SecurityMetrics data={data} />;
};
```

### 3. State Synchronization

Keep multiple contexts in sync:

```javascript
const useSyncedState = (contexts) => {
  const states = contexts.map(context => useContext(context));
  
  useEffect(() => {
    // Sync logic when any context changes
    const syncStates = () => {
      // Custom synchronization logic
      contexts.forEach((context, index) => {
        const state = states[index];
        // Perform synchronization
      });
    };
    
    syncStates();
  }, states);
  
  return states;
};
```

## Performance Optimization

### 1. Context Value Memoization

Prevent unnecessary re-renders:

```javascript
const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Memoize the context value
  const value = useMemo(() => ({
    portfolioData,
    isLoading,
    error
  }), [portfolioData, isLoading, error]);
  
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
```

### 2. Lazy Initial State

Defer expensive computations:

```javascript
const useComplexState = () => {
  const [state, setState] = useState(() => {
    // Expensive initial state calculation
    return calculateInitialState();
  });
  
  return [state, setState];
};
```

### 3. Subscription Pattern

Fine-grained updates with subscription model:

```javascript
class StateStore {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  setState(updater) {
    this.state = typeof updater === 'function' 
      ? updater(this.state) 
      : updater;
    
    this.listeners.forEach(listener => listener(this.state));
  }
  
  getState() {
    return this.state;
  }
}

// Hook to use the store
const useStore = (store, selector = s => s) => {
  const [state, setState] = useState(() => selector(store.getState()));
  
  useEffect(() => {
    return store.subscribe((newState) => {
      const selected = selector(newState);
      setState(selected);
    });
  }, [store, selector]);
  
  return state;
};
```

## Testing State Management

### 1. Context Testing

Test contexts in isolation:

```javascript
describe('SecurityContext', () => {
  it('handles vulnerability additions', () => {
    const { result } = renderHook(() => useSecurity(), {
      wrapper: SecurityProvider
    });
    
    act(() => {
      result.current.addVulnerability({
        id: 'vuln-1',
        severity: 'high',
        description: 'SQL Injection vulnerability'
      });
    });
    
    expect(result.current.vulnerabilities).toHaveLength(1);
    expect(result.current.vulnerabilities[0].severity).toBe('high');
  });
});
```

### 2. Integration Testing

Test state interactions:

```javascript
describe('State Integration', () => {
  it('syncs auth state with security context', async () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );
    
    // Login action
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });
    
    // Verify both contexts updated
    expect(screen.getByText('Authenticated')).toBeInTheDocument();
    expect(screen.getByText('Security: High')).toBeInTheDocument();
  });
});
```

## Key Benefits

### Architecture Benefits
- **No External Dependencies** - Pure React solution
- **Type Safety** - Full TypeScript support
- **Tree Shaking** - Only include used contexts
- **DevTools Support** - Native React DevTools integration

### Performance Benefits
- **Granular Updates** - Only re-render affected components
- **Lazy Loading** - Split contexts by route
- **Memoization** - Prevent unnecessary calculations
- **Optimistic UI** - Instant user feedback

### Developer Experience
- **Clear Patterns** - Consistent usage across app
- **Testability** - Easy to test in isolation
- **Debugging** - Clear state flow
- **Scalability** - Grows with application complexity

---

*This state management architecture demonstrates professional React development patterns that scale from small to enterprise applications while maintaining performance and developer productivity.*