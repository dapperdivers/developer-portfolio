# Cursor Rules Guide

## Available Rules
- `components.md` - Component development guidelines
- `workflows.md` - Development processes and requirements
- `state.md` - State management patterns
- `testing.md` - Testing standards
- `tech.md` - Technical stack requirements
- `development.md` - Development environment setup

## How to Reference Rules
When working with the AI, reference relevant rules at the start of your conversation:

```
@.cursor/rules/workflows.md @.cursor/rules/components.md I need to create a new component...
```

## Rule Categories

### Component Development
Reference these files when working on components:
```
@.cursor/rules/workflows.md
@.cursor/rules/components.md
```

### State Management
Reference these files when working with state:
```
@.cursor/rules/state.md
@.cursor/rules/components.md
```

### Testing
Reference these files when writing tests:
```
@.cursor/rules/testing.md
@.cursor/rules/components.md
```

### Technical Implementation
Reference these files for technical details:
```
@.cursor/rules/tech.md
@.cursor/rules/development.md
```

## Best Practices
1. Always reference relevant rule files at the start of your conversation
2. Use multiple rule references when tasks span multiple concerns
3. Keep the rules directory organized and up to date
4. Reference the most specific rules for your current task