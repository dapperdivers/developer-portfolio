# Component Development Rules

## [REQUIRED] Component Creation
ALWAYS use the component generator command:
```bash
yarn generate-component --name=ComponentName --type=[atom|molecule|organism|layout]
```
See `workflows.md` for detailed guidelines on component creation.

## Generated Files
Each component includes:
- TypeScript + proper types
- CSS module (Tailwind)
- Storybook documentation
- Vitest test suite
- Framer Motion animations
- AnimationContext integration

## Core Patterns
- Atomic Design methodology
- TypeScript for type safety
- Framer Motion for animations
- Tailwind for styling
- Context for state management
- Lazy loading where appropriate

## Component Structure
- atoms/      # Basic UI elements
- molecules/  # Composite components
- organisms/  # Complex sections
- layout/     # Layout components

## Development Process
1. ALWAYS use yarn generate command
2. Choose appropriate component type
3. Implement required interfaces
4. Add Storybook documentation
5. Write comprehensive tests
6. Add proper animations
7. Document usage patterns

## Performance Considerations
- Proper memoization
- Lazy loading for large components
- Image optimization
- Animation performance
- Bundle impact

## Testing Requirements
- Unit tests with Vitest
- Storybook documentation
- Accessibility testing
- Visual regression tests
- Performance benchmarks