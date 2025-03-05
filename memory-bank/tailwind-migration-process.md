# Bootstrap to Tailwind Migration Process

## Migration Strategy

Our approach to migrating from Bootstrap to Tailwind CSS focuses on incremental, component-by-component migration while maintaining the existing design system. This document outlines our process, tools, and learnings.

## Tools and Scripts

### 1. bootstrap-analysis.js

This script analyzes the codebase to identify:
- Bootstrap/reactstrap component usage
- Bootstrap CSS class patterns
- CSS rules that need migration

Usage:
```bash
node scripts/analyze-bootstrap-usage.js
```

Output:
- `bootstrap-analysis.json`: Detailed analysis of Bootstrap usage
- `tailwind-migration-guide.md`: General guidance for component replacements

### 2. migrate-component.js

This script handles the migration of individual components:
- Replaces reactstrap component imports with native HTML elements
- Converts Bootstrap classes to Tailwind equivalents
- Handles responsive utility classes
- Removes CSS imports for migrated components

Usage:
```bash
# Migrate a specific component
node scripts/migrate-component.js src/components/Component.jsx

# Dry run to see changes without applying them
node scripts/migrate-component.js src/components/Component.jsx --dry-run

# Migrate only a specific reactstrap component
node scripts/migrate-component.js src/components/Component.jsx --component=Container
```

### 3. migrate-to-tailwind.js

A higher-level script that uses the bootstrap analysis to migrate multiple files at once:
```bash
# Migrate all components
node scripts/migrate-to-tailwind.js

# Dry run
node scripts/migrate-to-tailwind.js --dry-run
```

## Component Migration Process

1. **Analysis**: Examine the component's CSS and reactstrap usage
2. **Style Transfer**: Add component styles to tailwind.css using @apply
3. **Script Enhancement**: Update migration script for any new patterns
4. **Migration**: Run the script on the component
5. **Fixes**: Address any issues and rerun if needed
6. **Testing**: Verify the component works correctly
7. **Documentation**: Update the checklist with progress

## Key Challenges and Solutions

### 1. Class Name Conflicts

**Problem**: Components with class names that are part of other class names (e.g., "card" in "education-card")

**Solution**: Implemented a more careful regex pattern matching approach:
- Created a "dangerousClassNames" list for frequently used class names
- Used context-aware regex patterns to only match full class names

### 2. Responsive Utilities

**Problem**: Bootstrap responsive utilities (e.g., mb-lg-0, text-md-center)

**Solution**: Added a specialized regex and mapping system that:
- Detects responsive utility patterns
- Maps breakpoints (sm, md, lg, xl) to Tailwind equivalents
- Converts utility values to Tailwind format

### 3. Component-Specific CSS

**Problem**: Components with their own CSS files need specialized styles

**Solution**: 
- Created component sections in tailwind.css using @apply
- Implemented a CSS import detection and removal system
- Added responsive component styles using Tailwind's screen directives

## Design System Integration

The Tailwind configuration (`tailwind.config.js`) extends Tailwind's default theme with our design tokens, allowing us to:

1. Keep using the same design values
2. Maintain visual consistency during migration
3. Reference design tokens in components with Tailwind's utility classes

## Next Steps and Best Practices

1. When migrating a new component type:
   - Add component styles to tailwind.css first
   - Enhance the migration script for new patterns
   - Run migration and fix any issues

2. For components with unique behaviors:
   - Migrate the basic structure first
   - Handle specialized functionality separately
   - Test thoroughly after migration

3. For layout components:
   - Convert to Tailwind's flex and grid system
   - Pay special attention to responsive behavior
   - Test at all breakpoints