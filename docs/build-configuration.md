# Build Configuration System

This document explains the build configuration structure for the developer portfolio project.

## Overview

The build system uses a modular approach with configuration pieces organized in the `config/` directory. This structure provides better organization, maintainability, and extensibility compared to a single monolithic configuration file.

```
├── vite.config.js            # Main entry point (minimal - imports from config/)
└── config/                   # Directory containing all modular config pieces
    ├── index.js              # Composes all config parts together
    ├── env.js                # Environment variable handling
    ├── paths.js              # Path alias definitions
    ├── dev/                  # Development-specific configs
    │   └── server.js         # Dev server configuration
    ├── optimization/         # Build optimization configs
    │   └── splitting.js      # Code splitting strategies
    └── plugins/              # Plugin configurations
        ├── core.js           # Core plugins (React, etc.)
        └── pwa.js            # PWA and analysis plugins
```

## Key Components

### 1. Main Configuration Composer (`config/index.js`)

The main configuration file that imports and composes all modular pieces:

- Initializes environment variables
- Combines all plugins
- Sets up resolve aliases, CSS, and build options
- Configures development server settings
- Sets up test configuration

### 2. Path Aliases (`config/paths.js`) 

Centralizes all path aliases for the project:

- Defines directory structure
- Creates path aliases for imports
- Provides TypeScript-compatible aliases
- Configures test-specific aliases

### 3. Environment Management (`config/env.js`)

Handles loading and validating environment variables:

- Loads variables from `.env` files with proper priority
- Validates required environment variables
- Sanitizes variables for client-side use
- Provides environment-detection utilities

### 4. Plugin Management (`config/plugins/`)

Organizes Vite plugins in separate modules:

- `core.js`: Essential React plugins
- `pwa.js`: Progressive Web App features and bundle analysis

### 5. Build Optimization (`config/optimization/`)

Manages build output and code-splitting strategies:

- Defines entry points for builds
- Configures chunk splitting strategies
- Optimizes bundle organization
- Sets asset naming conventions

### 6. Development Tools (`config/dev/`)

Development-specific configuration:

- Configures development server
- Sets up Hot Module Replacement (HMR)
- Manages preview server for production builds

## Key Improvements

This modular structure provides several advantages:

1. **Maintainability**: Smaller, focused files are easier to understand and modify
2. **Extensibility**: New configuration aspects can be added with minimal changes
3. **Organization**: Related configuration options are grouped together
4. **Reusability**: Configuration components can be reused across projects
5. **Documentation**: Each file includes detailed comments about its purpose

## Usage

The main `vite.config.js` file is kept minimal, simply importing and exporting the composed configuration:

```javascript
import config from './config/index.js';
export default config;
```

This approach allows us to maintain a standard entry point while leveraging the modular organization internally.

## Development Workflow

When working with the build configuration:

1. **For simple changes**: Identify the appropriate module and make targeted edits
2. **For new features**: Add a new module in the relevant directory, then import it in `config/index.js`
3. **For environment variables**: Add them to the appropriate `.env` file and register in `config/env.js`

## React Context Considerations

To ensure React context works properly in production builds:

1. Context-related code is deliberately bundled with React in the `vendor-react` chunk
2. The global `React` object is explicitly preserved in `config/env.js`
3. React namespace imports are used instead of destructuring in context files

These precautions prevent tree-shaking from removing critical React functionality in production builds.
