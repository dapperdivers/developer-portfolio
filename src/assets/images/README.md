# Images Directory

This directory contains all image assets used in the portfolio project, organized by purpose and type.

## Directory Structure

```
images/
├── logos/              # Logo images
│   ├── company/        # Company/employer logos
│   └── project/        # Project logos
├── icons/              # UI and symbolic icons
│   ├── navigation/     # Navigation-related icons
│   ├── social/         # Social media icons
│   └── skills/         # Skill/technology icons
├── backgrounds/        # Background images
└── photos/             # Photographs
```

## Image Standards

### Naming Conventions
- All image files use kebab-case (lowercase with hyphens)
- Include purpose and dimensions in the filename when relevant
  - Format: `[purpose]-[descriptor]-[dimensions].[extension]`
  - Example: `logo-github-32x32.svg`, `icon-arrow-down.svg`

### File Format Guidelines
- **Icons**: Prefer SVG format for scalability; use optimized PNG with transparency as fallback
- **Logos**: Use SVG for vector logos; WebP with PNG fallback for raster logos
- **Photos**: WebP with JPEG fallback, properly optimized for web
- **Backgrounds**: Optimize for performance based on usage (SVG for patterns, WebP/JPEG for photos)

### Image Optimization Requirements
- All raster images should be compressed appropriately
- SVGs should be optimized (minimized) to reduce file size
- Include responsive image sizes for key photos when needed
- Avoid oversized images (dimensions should match intended display size)

### Implementation Guidelines
- Use appropriate alt text when implementing images in components
- Consider implementing lazy loading for below-the-fold images
- Provide appropriate width/height attributes to prevent layout shifts
- Use the ResponsiveImage or LazyImage components for optimal performance
