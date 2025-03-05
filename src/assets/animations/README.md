# Animations Directory

This directory contains all animation assets used in the portfolio project.

## Directory Structure

```
animations/
└── lottie/             # Lottie JSON animations
    ├── development/    # Development-related animations
    └── interactions/   # Interactive UI animations
```

## Animation Standards

### Naming Conventions
- Animation files use kebab-case (lowercase with hyphens)
- Files should have descriptive names indicating their content and purpose
  - Format: `[category]-[action].[extension]`
  - Example: `dev-coding.json`, `ui-loading.json`

### File Format Guidelines
- **Lottie**: Optimized JSON files
- Include information about animation duration and loop settings in comments

### Animation Optimization Requirements
- Simplify complex vectors where possible
- Remove unnecessary properties and layers
- Optimize for performance by reducing complexity
- Keep file sizes under 100KB when possible
- Set appropriate framerate (typically 24fps is sufficient)

### Implementation Guidelines
- Use the DisplayLottie component for consistent implementation
- Ensure animations have appropriate fallback content
- Consider adding controls for animations when appropriate
- Keep animation duration short for UI elements (< 2 seconds)
- Longer animations should be used sparingly and with purpose
