# Production Dependency Issues

## Problem

When running the application in production mode, React Context was not working correctly, resulting in errors like:

```
Uncaught TypeError: React.createContext is not a function
```

After investigating, we discovered two key issues:

1. **Path resolution** - The code splitting configuration was using `process.cwd()` for path resolution, which doesn't work reliably in ESM environments.

2. **Missing production dependencies** - Several packages were incorrectly listed as `devDependencies` when they were actually needed for production builds.

## Dependencies Fix

We identified the following packages that should be in `dependencies` rather than `devDependencies`:

```json
"@vitejs/plugin-react": "^4.3.4",
"smoothscroll-polyfill": "^0.4.4",
"vite": "^6.2.1",
"vite-plugin-pwa": "^0.21.1",
"workbox-build": "^7.3.0",
"workbox-window": "^7.3.0"
```

### Why These Were Critical

1. **@vitejs/plugin-react** - Needed for React JSX transformation in the production build
2. **vite** - Required for the Vite build process
3. **vite-plugin-pwa** - Needed for PWA features in production
4. **workbox-build & workbox-window** - Required for service worker generation and functionality
5. **smoothscroll-polyfill** - Used in the application for smooth scrolling in all browsers

When these packages were in `devDependencies`, they might not be installed in a production environment (e.g., when someone runs `npm install --production`), causing the build to fail or the application to have missing functionality.

## Code Splitting Fix

We updated the code splitting configuration to use proper ESM path resolution:

```javascript
import { fileURLToPath } from 'url';
import path from 'path';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// Now use projectRoot instead of process.cwd()
```

## React Context Preservation

We also ensured React context APIs are preserved during tree-shaking by:

1. Bundling context-related code with React core
2. Explicitly preserving `React.createContext` in the entry file
3. Setting the `__REACT_FEATURES__` flag in the Vite config

## Testing the Fix

We created a set of testing tools:

1. `fix-react-context.js` - Automatically applies necessary fixes
2. `verify-production.js` - Tests the production build for issues
3. `context-test.html` - Directly tests React context functionality

## Lessons Learned

1. **Dependency Management** - Carefully review which packages are actually needed at runtime vs. only during development
2. **ESM Path Resolution** - When using ESM, always use `fileURLToPath` and `path.dirname` instead of `__dirname` or `process.cwd()`
3. **Tree-Shaking Awareness** - Be careful with tree-shaking optimizations that might remove critical APIs
4. **Testing Production Builds** - Always test production builds before deployment

## Verification Process

To verify the fix is working:

1. Run `node fix-react-context.js` to apply all fixes
2. Run a production build with `yarn build:prod`
3. Serve the production build with `npx serve -s build`
4. Confirm the application loads without errors
5. Test context functionality with the test HTML page
