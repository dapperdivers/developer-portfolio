# Cursor Rules Guide

## Available Rules
- `001_components.mdc` - Standards for component creation and development
- `002_workflows.mdc` - Development workflow standards and processes
- `003_state.mdc` - State management patterns and context usage
- `004_tech.mdc` - Technical stack requirements and configuration
- `005_testing.mdc` - Testing standards and requirements
- `006_development.mdc` - Development environment setup

## How to Reference Rules
When working with the AI, reference relevant rules at the start of your conversation:

```
@.cursor/rules/001_components.mdc @.cursor/rules/002_workflows.mdc I need to create a new component...
```

## Rule Categories

### Component Development
Reference these files when working on components:
```
@.cursor/rules/001_components.mdc
@.cursor/rules/002_workflows.mdc
```

### State Management
Reference these files when working with state:
```
@.cursor/rules/003_state.mdc
@.cursor/rules/001_components.mdc
```

### Testing
Reference these files when writing tests:
```
@.cursor/rules/005_testing.mdc
@.cursor/rules/001_components.mdc
```

### Technical Implementation
Reference these files for technical details:
```
@.cursor/rules/004_tech.mdc
@.cursor/rules/006_development.mdc
```

## Best Practices
1. Always reference relevant rule files at the start of your conversation
2. Use multiple rule references when tasks span multiple concerns
3. Keep the rules directory organized and up to date
4. Reference the most specific rules for your current task