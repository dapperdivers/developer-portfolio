# Build and Deployment Testing

This document outlines the test scripts available for verifying both development and production builds of the portfolio project.

## Issue Fixed

We recently addressed an issue with path resolution in the development environment. The problem was in `config/optimization/splitting.js` which was using `process.cwd()` for path resolution, which doesn't work reliably in all environments.

The fix involved using proper ESM path resolution with `fileURLToPath` and `path.dirname` to determine the project root reliably:

```javascript
// Fixed code sample
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// Now use projectRoot instead of process.cwd()
```

## Test Scripts

We've developed several scripts to help test and verify both development and production builds:

### 1. Development Testing

* `debug-vite.js` - A script to debug issues with the Vite development server
* `check-imports.js` - Tests individual module imports to identify configuration problems
* `run-dev-server.js` - Runs the development server with detailed logging

**Usage Example:**
```bash
node run-dev-server.js
```

### 2. Production Build Testing

* `test-production-build.js` - Tests the production build process and verifies output structure
* `test-production-server.js` - Tests serving the production build using Vite's preview server
* `verify-production.js` - Comprehensive test script that:
  - Cleans the previous build
  - Runs a production build
  - Analyzes build output
  - Tests serving the build
  - Verifies resources load correctly

**Usage Example:**
```bash
./verify-production.js
```

## When to Use These Scripts

1. **After configuration changes** - Run these scripts after making changes to the build configuration to ensure everything works correctly.

2. **Before deploying to production** - Run `verify-production.js` before deploying to production to catch any issues.

3. **When troubleshooting build issues** - Use these scripts to diagnose and fix build problems.

4. **As part of CI/CD pipelines** - These scripts can be incorporated into CI/CD workflows to automatically verify builds.

## Test Script Details

### verify-production.js

This is the most comprehensive test script that performs the following steps:

1. **Clean previous build** - Removes any existing build directory
2. **Run production build** - Builds the project for production
3. **Analyze build output** - Checks the build structure and calculates sizes
4. **Test serving** - Starts a preview server
5. **Test site access** - Attempts to load the site and key resources

The script provides detailed reports including:
- Build directory structure
- File sizes (total, JS, CSS, assets)
- HTML structure verification
- Resource loading verification

### test-production-build.js

Focuses specifically on the build process, verifying:
- Configuration loading
- Build completion
- Output directory structure
- Required files existence

### test-production-server.js

Focuses on serving the production build:
- Starts a preview server
- Tests loading the main HTML
- Tests loading JS and CSS assets
- Verifies resource availability

## Troubleshooting

If you encounter issues with the build process:

1. First run `check-imports.js` to verify all configuration modules load correctly
2. If that succeeds, run `test-production-build.js` to test just the build process
3. If the build works, run `test-production-server.js` to check if serving works
4. Finally, run the comprehensive `verify-production.js`

By examining the output of each script, you can identify at which step problems occur.
