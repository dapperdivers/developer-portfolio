# React Context Migration Plan

This document outlines a practical, step-by-step approach to implement the React context safety patterns across your codebase.

## Phase 1: Analysis & Assessment (1-2 days)

1. **Run the analysis tool** to identify high-risk components:
   ```bash
   node analyze-react-deps.js > reports/react-usage-report.txt
   ```

2. **Review the report** and categorize components:
   - Critical (using createContext, Component, memo)
   - Medium risk (using hooks like useContext)
   - Low risk (standard hook usage)

3. **Identify priority components** that:
   - Are frequently used
   - Implement core functionality 
   - Are rendered on critical paths

4. **Create a spreadsheet** to track progress:
   ```
   | Component | Risk Level | Uses Context | Uses Class | Status | Assignee |
   |-----------|------------|--------------|------------|--------|----------|
   | ... | ... | ... | ... | ... | ... |
   ```

## Phase 2: Fix Critical Context Providers (2-3 days)

1. **Update all context implementations** to use contextUtils.ts:

   ```bash
   # Find all context files
   grep -r "createContext" --include="*.js*" --include="*.ts*" src/
   ```

2. **Migrate each context** using this pattern:

   ```typescript
   // BEFORE:
   import { createContext, useContext } from 'react';
   
   const MyContext = createContext(defaultValue);
   
   // AFTER:
   import { createTypedContext, createContextHook } from '@utils/contextUtils';
   
   const MyContext = createTypedContext(defaultValue);
   export const useMyContext = createContextHook(MyContext, 'useMyContext');
   ```

3. **Update context consumers** to use the new hooks

4. **Run production build tests** after each critical context update:
   ```bash
   NODE_ENV=production yarn build
   yarn test:build
   ```

## Phase 3: Update Component Patterns (3-5 days)

1. **Fix all class components** to use direct React namespace:

   ```typescript
   // BEFORE:
   import { Component } from 'react';
   
   class MyComponent extends Component {
     // ...
   }
   
   // AFTER:
   import React from 'react';
   
   class MyComponent extends React.Component {
     // ...
   }
   ```

2. **Update memo usage**:

   ```typescript
   // BEFORE:
   import { memo } from 'react';
   
   const MyComponent = memo((props) => {
     // ...
   });
   
   // AFTER:
   import React from 'react';
   
   const MyComponent = React.memo((props) => {
     // ...
   });
   ```

3. **Consider component bundling** for any components that must use React APIs:
   ```javascript
   // In config/optimization/splitting.js, add to components list:
   // (or adopt the optimized version for smart analysis)
   if (id.includes('/path/to/critical/component')) {
     return 'vendor-react';
   }
   ```

## Phase 4: Set Up Prevention Tools (1-2 days)

1. **Install ESLint plugin**:

   ```bash
   # Add the plugin to the project
   mkdir -p .eslintplugins
   cp eslint-plugin-react-context-safety.js .eslintplugins/
   ```

2. **Update ESLint configuration**:

   ```javascript
   // In .eslintrc.js or equivalent:
   module.exports = {
     // ... existing config
     plugins: [
       // ... existing plugins
       'react-context-safety',
     ],
     extends: [
       // ... existing extends
       'plugin:react-context-safety/recommended',
     ],
     // Optionally customize rules
     rules: {
       // ... existing rules
       'react-context-safety/no-destructured-react-import': 'error',
       'react-context-safety/use-react-namespace': 'warn',
       'react-context-safety/use-context-utils': 'warn',
     },
   }
   ```

3. **Set up pre-commit hook** to run the React dependency analyzer

4. **Add to CI checks**:
   ```yaml
   # In your CI config:
   - name: Check React dependencies
     run: node analyze-react-deps.js
   ```

## Phase 5: Team Education & Documentation (1 day)

1. **Schedule a team presentation** to explain:
   - The issue and its impact
   - The solution approach
   - New tools and patterns

2. **Add to onboarding documentation** for new developers

3. **Create a short video demonstration** of the issue and fix

4. **Add eslint-plugin to code editor configurations** for all developers

## Success Criteria

1. ✅ All context providers use contextUtils.ts helpers
2. ✅ Zero destructured imports of critical React APIs
3. ✅ All class components use React namespace access
4. ✅ ESLint plugin integrated and enforcing patterns
5. ✅ Production build runs without React-related errors
6. ✅ Dependency analysis shows zero high-risk components

## Timeline

- **Week 1**: Phases 1-2 (Analysis and Context Fixes)
- **Week 2**: Phases 3-5 (Component Updates, Prevention, Education)
- **Ongoing**: Regular dependency scans to prevent regression

## Tips for Smooth Migration

1. **Use find & replace wisely**: `import { ... } from 'react'` → `import React from 'react'`
2. **Start with most-used components** to get the biggest impact quickly
3. **Commit after each major component** is fixed to maintain stable checkpoints
4. **Gradually phase in ESLint rules** to prevent overwhelming developers
5. **Document exceptions** if certain patterns must remain

## Performance Monitoring

After implementing these changes, monitor bundle sizes and loading performance:

```bash
# Analyze bundle sizes
yarn build --analyze

# Check chunk composition
grep -r "Generated an empty chunk" build-log.txt
```

This will help ensure our fixes don't negatively impact performance.
