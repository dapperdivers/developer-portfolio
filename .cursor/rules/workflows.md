# Development Workflows

## Component Creation [REQUIRED]
ALWAYS use the component generator for new components:
```bash
yarn generate --name=ComponentName --type=[atom|molecule|organism|layout]
```

DO NOT:
❌ Create components manually
❌ Copy/paste existing components
❌ Skip the generator workflow

The generator ensures:
- Consistent file structure
- Required TypeScript types
- Proper test setup
- Storybook documentation
- Animation integration
- CSS module setup

## Component Type Selection
Choose the appropriate type based on complexity:

### Atoms
- Basic UI elements
- Single responsibility
- No business logic
- Examples: Button, Input, Icon

### Molecules
- Composite components
- Multiple atoms
- Simple interactions
- Examples: Card, SearchBar, Navigation

### Organisms
- Complex sections
- Business logic
- Multiple molecules
- Examples: ProjectList, ExperienceTimeline

### Layout
- Structure components
- Page organization
- Container elements
- Examples: Section, Grid, Flex

## Examples

✅ Creating a new button:
```bash
yarn generate --name=Button --type=atom
```

✅ Creating a project card:
```bash
yarn generate --name=ProjectCard --type=molecule
```

✅ Creating a projects section:
```bash
yarn generate --name=ProjectsSection --type=organism
```

✅ Creating a layout container:
```bash
yarn generate --name=Container --type=layout
```