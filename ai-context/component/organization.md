# Component Organization

This document outlines the component organization structure used in the Developer Portfolio project. The project follows Atomic Design principles with a clear hierarchy of components.

## Atomic Design Structure

The project organizes components according to the Atomic Design methodology:

```
src/components/
├── atoms/         # Basic building blocks
├── molecules/     # Groups of atoms
├── organisms/     # Complex UI components
└── layout/        # Structural components
```

### Atoms

Atoms are the basic building blocks of the interface:

- Located in `src/components/atoms/`
- Simple, focused components with a single responsibility
- Highly reusable across the application
- Examples: Button, Card, Input, Icon, Typography elements

### Molecules

Molecules are groups of atoms functioning together:

- Located in `src/components/molecules/`
- Combine multiple atoms to create more complex components
- SearchForm, NavigationItem, ProjectCard
