# Storybook Utils

This directory contains utilities and helpers for Storybook, organized by responsibility.

## Organization

- **index.ts** - Central export point for all utils with TypeScript types
- **mocks/** - Mock data and context providers
  - `data.js` - Mock data objects for testing
  - `helmetProvider.tsx` - Mock provider for Helmet context
  - `portfolioContext.tsx` - Mock provider for Portfolio context
  - `animationContext.tsx` - Mock provider for Animation context
- **decorators/** - Storybook decorators
  - `ui.tsx` - UI decorators (dark background, viewport) with TypeScript support
  - `atomic.tsx` - Atomic Design decorators for atoms, molecules, and organisms

## Usage

Import everything through the central index:

```tsx
import { 
  // Context providers
  withPortfolioContext,
  withHelmetProvider,
  withAnimationContext,

  // UI decorators
  withDarkBackground,
  withViewport,
  
  // Atomic Design decorators
  withAtomLayout,
  withMoleculeLayout,
  withOrganismLayout,
  withSecurityTheme,
  withContactTheme,

  // Mock data
  mockPortfolioData,
  mockAnimationData
} from '@stories-utils';
```

> **Note:** All story files in the project now use this centralized import pattern.

### TypeScript Support

The decorators are fully typed, allowing for better IDE integration and type checking:

```tsx
import { Decorator, ViewportDecorator } from '@stories-utils';

// Create your own typed decorator
const myCustomDecorator: Decorator = (Story) => (
  <div className="custom-wrapper">
    <Story />
  </div>
);
```

### Composing Decorators

Storybook has built-in support for using multiple decorators together. There's no need for special "combined" decorators:

```tsx
export const DarkModeStoryWithContext = Template.bind({});
DarkModeStoryWithContext.decorators = [
  withPortfolioContext,
  withAnimationContext,
  withDarkBackground
];
```

### Atomic Design Decorators

The Atomic Design decorators provide consistent styling for different component types:

```tsx
// For atomic components
export const Default = Template.bind({});
Default.decorators = [withAtomLayout, withAnimationContext];

// For security-themed components
export const SecurityVariant = Template.bind({});
SecurityVariant.decorators = [withSecurityTheme, withAnimationContext];

// For contact-themed components
export const ContactVariant = Template.bind({});
ContactVariant.decorators = [withContactTheme, withAnimationContext];

// For molecule components
export const MoleculeExample = Template.bind({});
MoleculeExample.decorators = [withMoleculeLayout, withAnimationContext];

// For organism components
export const OrganismExample = Template.bind({});
OrganismExample.decorators = [withOrganismLayout, withAnimationContext];
```

## Design Principles

1. **Separation of Concerns** - Each file has a single responsibility
2. **Composability** - Decorators are designed to be composable using Storybook's native mechanisms
3. **Centralized Exports** - All exports are available through the index
4. **Mock Data Separation** - Mock data is separate from the components that use it
5. **Type Safety** - TypeScript is used to ensure type safety and better IDE integration
6. **Atomic Design** - Decorators follow Atomic Design principles for consistent styling