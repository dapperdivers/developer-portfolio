# Developer Portfolio Scripts

This directory contains utility scripts for maintaining, optimizing, and improving the developer portfolio project.

## Script Overview

### Build Process Improvements

- **standardize-react-imports.js**: Standardizes React imports across the codebase to fix production build issues
  ```bash
  # Run via npm/yarn script
  yarn standardize:imports
  
  # Or directly
  node scripts/standardize-react-imports.js
  ```
  
  This script:
  - Converts all React imports to the `import * as React from 'react'` pattern
  - Handles both JSX and TypeScript files appropriately
  - Updates destructured imports (e.g., `useState`, `useEffect`) to use the React namespace
  - Adds proper React imports to files with JSX/TSX or React namespace references
  - Provides a detailed report of changes made

### Asset Optimization

- **optimize-images.js**: Optimizes image assets for better performance
  ```bash
  yarn optimize:images
  ```

- **optimize-svgs.js**: Optimizes SVG assets
  ```bash
  yarn optimize:svgs
  ```

- **optimize-all**: Runs both image and SVG optimization
  ```bash
  yarn optimize
  ```

- **generate-asset-metadata.js**: Generates metadata for assets
  ```bash
  yarn generate:metadata
  ```

### Component Generation

- **generate-component.js**: Scaffolds new component files with proper structure
  ```bash
  yarn generate-component
  ```

- **generate-story.js**: Creates Storybook stories for components
  ```bash
  yarn generate-story
  ```

### Refactoring & Cleanup

- **cleanup-duplicate-stories.js**: Removes duplicate Storybook stories
- **cleanup-package-scripts.js**: Cleans up package.json scripts
- **cleanup-test-directories.js**: Organizes test directories
- **cleanup-unused-scripts.js**: Removes unused scripts
- **finalize-package-cleanup.js**: Finalizes package cleanup process
- **reorganize-component-structure.js**: Updates component structure
- **update-component-generator.js**: Updates the component generator

### Other Utilities

- **d3-component-template.js**: Template for D3.js components

## Running Scripts

Most scripts can be run using the corresponding npm/yarn script:

```bash
yarn <script-name>
```

For scripts without a specific package.json entry, run them directly:

```bash
node scripts/<script-name>.js
```

## Contributing

When adding new scripts:

1. Use descriptive naming that indicates the script's purpose
2. Add appropriate documentation at the top of the script file
3. Update this README.md to include the new script
4. Add an entry to package.json scripts if appropriate
