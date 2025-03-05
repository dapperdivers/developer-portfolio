# Assets Migration Guide

This document outlines the reorganization of the assets folder structure to follow atomic design principles and improve maintainability.

## Directory Structure Changes

The assets have been reorganized from a flat structure to a more organized hierarchy:

### CSS Organization
- **Design System**: Split into tokens (colors, typography, spacing, etc.)
- **Components**: Component-specific styles
- **Utilities**: Helper classes and fixes
- **Vendor**: Third-party libraries

### Images Organization
- **Logos**: Company and project logos
- **Icons**: UI, social, and skill icons
- **Backgrounds**: Background images
- **Photos**: Photographs

### Fonts Organization
- Fonts organized by family with metadata

### Animations Organization
- Lottie animations categorized by purpose

## Naming Conventions

- **All filenames**: Use kebab-case (lowercase with hyphens)
- **Images**: `[purpose]-[descriptor].[extension]`
  - Example: `logo-company.svg`, `icon-github.svg`
- **CSS**: Match component names when applicable
  - Example: For `Button.jsx` use `button.css`
- **Animations**: `[category]-[action].[extension]`
  - Example: `dev-coding.json`

## Main CSS Entry Points

- **Design System**: `src/assets/css/design-system/index.css`
- **Utilities**: `src/assets/css/utilities/index.css`
- **Main Entry Point**: `src/assets/css/index.css`

## Migration Process Overview

1. **Directory Structure Creation**
   - Created nested directory structure based on asset types and purposes
   - Added README files with guidelines for each asset type

2. **Design System Reorganization**
   - Split design-tokens.css into logical category files
   - Created base.css for foundational styles
   - Setup index.css with proper import order

3. **Asset Migration**
   - Renamed and moved assets to their appropriate directories
   - Applied consistent naming conventions to all files
   - Organized fonts with metadata

4. **CSS Organization**
   - Separated vendor files from custom styles
   - Created utilities for common functionality
   - Established main index.css for importing all styles

## Ongoing Work

The migration to this new asset structure is a multi-phase process:

1. **Phase 1 (Complete)**: Directory structure and organization
2. **Phase 2 (In Progress)**: Moving component-specific CSS from section files
3. **Phase 3 (Planned)**: Updating component imports to reference new file structure

## Usage Guidelines

When adding new assets:

1. Place assets in the appropriate directory based on type and purpose
2. Follow the established naming conventions
3. Add metadata for important assets (logos, icons)
4. For CSS, create component-specific files as components are migrated
5. Update imports in the main index.css file as needed
