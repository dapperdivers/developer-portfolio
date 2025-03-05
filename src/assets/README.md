# Assets Directory Organization

This directory contains all the static assets used in the portfolio project, organized according to atomic design principles and best practices.

## Directory Structure

```
assets/
├── css/                # Stylesheet files
│   ├── design-system/  # Design system tokens and base styles
│   ├── components/     # Component-specific styles
│   ├── utilities/      # Utility styles
│   └── vendor/         # Third-party CSS
├── fonts/              # Typography assets
├── images/             # Image assets
│   ├── logos/          # Company and project logos
│   ├── icons/          # UI and skill icons
│   ├── backgrounds/    # Background images
│   └── photos/         # Photographs
└── animations/         # Animation files
    └── lottie/         # Lottie JSON animations
```

## Standards and Conventions

### Naming Conventions
- All filenames use kebab-case (lowercase with hyphens)
- Files should have descriptive, purpose-oriented names
- Component-specific CSS files match their component names

### File Formats
- **Icons**: SVG preferred, fallback to optimized PNG
- **Logos**: SVG for vector logos, WebP with PNG fallback for raster
- **Photos**: WebP with JPEG fallback, properly optimized
- **Fonts**: Include multiple formats for cross-browser compatibility
- **CSS**: Component-specific CSS in separate files

### Organization Principles
- Assets are organized by type and purpose, not by project section
- Each asset type has its own standardized naming and organization
- Documentation is provided within each directory

See the README in each subdirectory for more specific guidelines.
