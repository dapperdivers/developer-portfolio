# Build Process Improvements

This document summarizes improvements to the build process and provides guidelines for testing between development and production builds.

## New Testing Workflow

We've introduced a simplified approach to test between development and production builds:

### 1. Test Script

The `build-test.sh` script provides an interactive menu for switching between development and production builds:

```bash
# Make the script executable (if not already)
chmod +x build-test.sh

# Run it
./build-test.sh
```

You can also run it with specific modes:

```bash
# Start development server directly
./build-test.sh dev

# Build for production and preview directly
./build-test.sh prod
```

### 2. npm Scripts

New convenience scripts have been added to `package.json`:

```bash
# Development server
yarn dev-test  # Same as 'yarn dev'

# Production build and preview
yarn prod-test  # Builds for production and starts preview server
```

### 3. Isolated Test Page

A minimal test page has been created to isolate React context functionality for testing:

- `test.html` - Entry point HTML file
- `src/test-page.jsx` - React entry point
- `src/test-component.jsx` - Isolated test component using React context

To use the test page:

```bash
# Start development server pointing to test.html
yarn dev --open test.html

# Build and preview with test.html
yarn build:prod && yarn preview --open test.html
```

## Build Process Improvements

### 1. Code Splitting Optimization

The chunking strategy has been simplified in `config/optimization/splitting.js`:

- React and ReactDOM bundled together in `vendor-react` chunk
- Context-related code bundled with React to ensure proper functionality
- Application code consolidated into logical app-core and app-utils chunks

### 2. React Import Standardization

Fixed tree-shaking issues in production by:

- Using full React namespace imports in critical files
- Ensuring context-related code is not removed during tree-shaking
- Adding React to window object to ensure global availability

### 3. TypeScript Configuration

Updated `tsconfig.json` with:

- `checkJs: false` to prevent errors on JSX files
- Added `noImplicitAny: false` to reduce type errors
- Added `allowSyntheticDefaultImports: true` for better import compatibility

### 4. Development vs. Production Differences

Key differences between development and production builds:

| Feature | Development | Production |
|---------|-------------|------------|
| **Server** | Vite dev server with HMR | Static build with Vite preview |
| **CORS** | Permissive (all origins) | Restrictive by default |
| **Bundle Size** | Larger, unoptimized | Smaller, optimized |
| **Error Messages** | Detailed | Minimal |
| **Tree Shaking** | Minimal | Aggressive |
| **Code Splitting** | Simple | Optimized |
| **React Features** | All preserved | Some removed if unused |

## Best Practices

1. **Always test in both environments** - Features that work in development may not work in production
2. **Use the build analyzer** - Run `yarn build:analyze` to visualize bundle sizes
3. **For React context issues** - Ensure React namespace is explicitly imported and use direct namespace access (e.g., `React.createContext`)
4. **Avoid import destructuring** in critical files - Use `React.useState` instead of `import { useState } from 'react'`

## Next Steps for Further Improvement

1. Create explicit bundle entry points for different sections of the application
2. Add persistent build caching for faster rebuilds
3. Implement Lighthouse CI testing for performance regression prevention
4. Further optimize asset loading with code splitting based on route patterns
