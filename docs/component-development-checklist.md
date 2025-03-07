# Component Development Checklist

This checklist serves as a guide for creating or updating components in the Developer Portfolio project. Following these steps ensures consistency, quality, and proper documentation across the component library.

## Development Principles

When developing components, adhere to these core principles:

1. **Single Responsibility**: Each component should have a single, well-defined purpose
2. **Composition Over Inheritance**: Build complex components by composing simpler ones
3. **Prop Driven**: Component behavior and appearance should be controllable via props
4. **Accessibility First**: Design with accessibility in mind from the beginning
5. **Performance Conscious**: Consider render performance and memoization needs
6. **Consistent API**: Follow established patterns for prop naming and behavior
7. **Documentation**: Include comprehensive JSDoc comments and Storybook stories

## New Component Creation Checklist

### 1. Planning & Design

- [ ] Identify the atomic design level (atom, molecule, organism, template)
- [ ] Define the component's purpose and responsibility
- [ ] List required props and their types
- [ ] Consider how the component will be used in different contexts
- [ ] Design with accessibility in mind
- [ ] Plan for responsive behavior

### 2. Component Implementation

- [ ] Create the component file with proper naming (PascalCase)
- [ ] Add comprehensive JSDoc comments
- [ ] Implement PropTypes with descriptions
- [ ] Define default props where appropriate
- [ ] Use design tokens for styling
- [ ] Implement proper accessibility attributes
- [ ] Add error handling and fallbacks
- [ ] Apply performance optimizations (memo, useCallback, etc.)
- [ ] Create component-specific CSS file if needed

### 3. Testing

- [ ] Write basic rendering tests
- [ ] Test prop variations
- [ ] Test user interactions
- [ ] Test accessibility
- [ ] Test responsiveness
- [ ] Test edge cases (empty states, errors, etc.)

### 4. Storybook Documentation

- [ ] Generate story file using the `generate-story.js` script
- [ ] Document basic usage
- [ ] Add stories for all variants and states
- [ ] Include examples for common use cases
- [ ] Document edge cases and limitations
- [ ] Add interaction tests using play functions
- [ ] Set up a11y testing rules
- [ ] Include responsive testing stories

### 5. Final Review

- [ ] Ensure consistent code style
- [ ] Verify all props are documented
- [ ] Check for any hard-coded values that should use design tokens
- [ ] Verify performance optimizations
- [ ] Ensure the component works in all required contexts
- [ ] Test integration with other components
- [ ] Run linting and typechecking

## Component Patterns

### Naming Conventions

- **Component Files**: PascalCase (e.g., `ButtonGroup.jsx`)
- **Component Functions**: PascalCase (e.g., `function ButtonGroup()`)
- **Props**: camelCase (e.g., `buttonSize`, `isDisabled`)
- **CSS Classes**: kebab-case (e.g., `button-group`)
- **CSS Modules**: camelCase for imports (e.g., `import styles from './ButtonGroup.module.css'`)
- **Test Files**: ComponentName.test.jsx

### Component Structure

```jsx
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Component description goes here.
 * Include purpose, usage, and any special considerations.
 *
 * @component
 * @example
 * ```jsx
 * <ComponentName
 *   requiredProp="value"
 *   optionalProp="value"
 * >
 *   Children content
 * </ComponentName>
 * ```
 */
function ComponentName({ requiredProp, optionalProp = 'default', children }) {
  // State hooks
  const [state, setState] = useState(initialState);
  
  // Memoized values
  const memoizedValue = useMemo(() => {
    // Calculation
    return calculatedValue;
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
    setState(newState);
  }, [dependencies]);
  
  // ClassNames
  const componentClasses = classNames(
    'base-class',
    optionalProp === 'value' && 'conditional-class',
    {
      'state-class': state,
      'another-class': someCondition
    }
  );
  
  // Conditional rendering
  if (condition) {
    return <div>Alternative render</div>;
  }
  
  // Default render
  return (
    <div className={componentClasses} onClick={handleEvent}>
      <div className="child-element">{requiredProp}</div>
      {children}
    </div>
  );
}

ComponentName.propTypes = {
  /** Description of requiredProp */
  requiredProp: PropTypes.string.isRequired,
  
  /** Description of optionalProp */
  optionalProp: PropTypes.oneOf(['value1', 'value2']),
  
  /** Children to render */
  children: PropTypes.node
};

ComponentName.defaultProps = {
  optionalProp: 'value1',
  children: null
};

export default React.memo(ComponentName);
```

### Performance Optimization

- Use `React.memo()` for components that render frequently with the same props
- Use `useCallback()` for function props to prevent unnecessary rerenders
- Use `useMemo()` for expensive calculations
- Consider implementing custom equality functions for `React.memo()` when needed:

```jsx
export default React.memo(
  ComponentName,
  (prevProps, nextProps) => {
    // Return true if props are equal (component should not update)
    // Return false if props are different (component should update)
    return prevProps.id === nextProps.id && 
           prevProps.name === nextProps.name;
  }
);
```

### Custom Hooks

When creating custom hooks, follow these patterns:

```jsx
/**
 * Hook description - what it does and when to use it
 * 
 * @param {type} param - Description of the parameter
 * @returns {Object} - Description of the return value
 */
function useCustomHook(param) {
  // State initialization
  const [state, setState] = useState(initialState);
  
  // Side effects
  useEffect(() => {
    // Effect logic
    
    return () => {
      // Cleanup logic
    };
  }, [dependencies]);
  
  // Helper functions
  const helperFunction = useCallback(() => {
    // Function logic
  }, [dependencies]);
  
  // Return values and functions
  return {
    state,
    helperFunction,
    derivedValue: computedValue
  };
}

// Example usage
function Component() {
  const { state, helperFunction } = useCustomHook('param');
  // Rest of component
}
```

Custom hooks should:
- Start with the word "use" (e.g., `useSkills`, `useImageColor`)
- Return a consistent object structure
- Handle their own loading and error states
- Include proper cleanup in `useEffect` hooks
- Be thoroughly tested

### State Management

For component state management:

1. **Local State**: Use `useState` for component-specific state
   ```jsx
   const [isOpen, setIsOpen] = useState(false);
   ```

2. **Complex State**: Use `useReducer` for state with complex transitions
   ```jsx
   const [state, dispatch] = useReducer(reducer, initialState);
   ```

3. **Shared State**: Use context for state shared between components
   ```jsx
   const { skills } = useContext(PortfolioContext);
   ```

4. **Derived State**: Use `useMemo` for values derived from state
   ```jsx
   const activeItems = useMemo(() => 
     items.filter(item => item.isActive), 
     [items]
   );
   ```

## Component Update Checklist

When updating an existing component, follow these steps:

### 1. Assessment

- [ ] Understand the current implementation
- [ ] Identify what needs to be changed and why
- [ ] Consider impact on other components
- [ ] Review existing tests and stories

### 2. Implementation

- [ ] Make required changes
- [ ] Update JSDoc comments if needed
- [ ] Update PropTypes if adding/changing props
- [ ] Maintain existing behavior unless explicitly changing it
- [ ] Ensure design token usage is consistent

### 3. Testing Updates

- [ ] Update existing tests for new behavior
- [ ] Add tests for new functionality
- [ ] Verify no regressions in existing functionality

### 4. Storybook Updates

- [ ] Update existing stories
- [ ] Add stories for new variants or features
- [ ] Update documentation for changed props or behavior
- [ ] Update interaction tests if behavior changed

### 5. Final Review

- [ ] Ensure changes are backward compatible (or document breaking changes)
- [ ] Verify all new functionality is tested
- [ ] Check for any new edge cases
- [ ] Run linting and typechecking

## Process for Updating Stories When Components Change

When components change, their Storybook stories should be updated to reflect these changes. Follow this process:

1. **Identify affected stories**: Determine which stories need to be updated based on the component changes.

2. **Update stories in parallel**: When making component changes, update the corresponding stories in the same PR.

3. **Test story changes**: Ensure that all stories still work and correctly demonstrate the component's behavior.

4. **Update documentation**: If the component's API or behavior has changed, update the documentation in the story file.

5. **Communicate changes**: Document significant changes in PR descriptions so other team members are aware.

## Using Storybook for Component Changes

Storybook is an excellent tool for developing and testing component changes:

1. **Develop in isolation**: Make changes to components in isolation using Storybook to see immediate feedback.

2. **Test variants**: Use Storybook controls to test different prop combinations and edge cases.

3. **Verify interactions**: Use play functions to verify that interactions work correctly.

4. **Check accessibility**: Use the a11y addon to ensure accessibility is maintained.

5. **Test responsiveness**: Use the viewport addon to test responsive behavior.

## Automation for Story Creation

The project includes automation for creating story files:

```bash
node scripts/generate-story.js --component=ComponentName --type=atom --interactions --context=portfolio --detailed
```

This script generates a comprehensive story file with:
- Basic component rendering
- Controls for props
- Interaction tests
- Documentation templates
- Context integration if needed

## Guidelines for Communicating Component Changes

When making significant changes to components, follow these guidelines to communicate them effectively:

1. **Document changes**: Clearly document what has changed in the component and why.

2. **Highlight breaking changes**: If a change breaks existing usage, make this very clear.

3. **Update examples**: Provide updated usage examples for changed components.

4. **Use visual diffs**: When possible, include before/after screenshots to illustrate changes.

5. **Demonstrate in Storybook**: Use Storybook stories to demonstrate new features or changes.

6. **Tag stakeholders**: Ensure relevant team members are aware of significant changes.

By following this checklist and associated processes, we can maintain high-quality components with excellent documentation that are easy to use and maintain.