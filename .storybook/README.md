# Storybook Documentation for Developer Portfolio

This documentation covers the Storybook setup, usage guidelines, and best practices for the Developer Portfolio project.

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [Running Storybook](#running-storybook)
3. [Folder Structure](#folder-structure)
4. [Creating New Stories](#creating-new-stories)
5. [Atomic Design Structure](#atomic-design-structure)
6. [Using Context in Stories](#using-context-in-stories)
7. [Testing with Play Functions](#testing-with-play-functions)
8. [Accessibility Testing](#accessibility-testing)
9. [Responsive Design Testing](#responsive-design-testing)
10. [Documentation Best Practices](#documentation-best-practices)

## Setup and Installation

Storybook is already set up in this project with the following addons:

- **@storybook/addon-essentials**: Core UI elements for building stories
- **@storybook/addon-a11y**: Accessibility testing
- **@storybook/addon-links**: Create links between stories
- **@storybook/experimental-addon-test**: Component testing
- **@chromatic-com/storybook**: Visual testing integration

If you need to install Storybook from scratch:

```bash
npx storybook@latest init
```

## Running Storybook

To start the Storybook development server:

```bash
npm run storybook
```

This will open Storybook in your browser at http://localhost:6006 by default.

To build Storybook for production:

```bash
npm run build-storybook
```

## Folder Structure

Stories are organized following atomic design principles:

```
src/stories/
├── atoms/           # Basic UI components (Button, Card, etc.)
├── molecules/       # Combinations of atoms (Navigation, Cards, etc.)
├── organisms/       # Complex components composed of molecules (Sections)
├── templates/       # Page layouts
├── design-system/   # Design tokens and guidelines
└── utils/           # Helpers, decorators, and mock data
```

## Creating New Stories

We have a utility script for generating new stories:

```bash
node scripts/generate-story.js --component=ComponentName --type=[atom|molecule|organism|template] [--interactions] [--context=portfolio] [--detailed]
```

Options:
- `--component`: Name of the component (required)
- `--type`: Atomic design type (required)
- `--interactions`: Include interaction test templates
- `--context`: Add context support
- `--detailed`: Add detailed documentation templates

Example:
```bash
node scripts/generate-story.js --component=Button --type=atom --interactions --detailed
```

## Atomic Design Structure

Our components follow atomic design methodology:

1. **Atoms**: Basic building blocks (Button, Card, Skill, etc.)
2. **Molecules**: Combinations of atoms (EducationCard, ProjectsCard, etc.)
3. **Organisms**: Sections composed of molecules (Skills, Experience, etc.)
4. **Templates**: Page layouts and structure
5. **Pages**: Complete views with real content

## Using Context in Stories

Many components need access to the PortfolioContext. Use the `withPortfolioContext` decorator:

```jsx
import { withPortfolioContext } from '../utils/decorators';

export default {
  title: 'Organisms/Skills',
  component: Skills,
  decorators: [withPortfolioContext],
};
```

For specific context data, create a custom decorator:

```jsx
const createContextWithCustomData = (customData) => {
  const context = { ...mockPortfolioData, ...customData };
  return (Story) => (
    <PortfolioContext.Provider value={context}>
      <Story />
    </PortfolioContext.Provider>
  );
};
```

## Testing with Play Functions

Play functions allow you to test component interactions:

```jsx
export const WithInteraction = Template.bind({});
WithInteraction.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    await expect(canvas.getByText('Hello')).toBeInTheDocument();
  });
  
  await step('Button click', async () => {
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(canvas.getByText('Clicked')).toBeInTheDocument();
  });
};
```

Key concepts:
- Use `step()` to organize tests into logical segments
- Use `within()` to scope queries to the story's canvas
- Use `await` with all asynchronous operations
- Use `expect()` for assertions

## Accessibility Testing

We use @storybook/addon-a11y for accessibility testing:

```jsx
export default {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true }
        ],
      },
    },
  },
};
```

Common rules to check:
- color-contrast
- aria-roles
- button-name
- image-alt
- heading-order
- label-content-name-mismatch

## Responsive Design Testing

Test component responsiveness with the `withViewport` decorator:

```jsx
import { withViewport } from '../utils/decorators';

export const Mobile = Template.bind({});
Mobile.decorators = [withViewport('mobile')];
```

Available viewports:
- `mobile1`: 320×568
- `tablet`: 768×1024
- `desktop`: 1920×1080

## Documentation Best Practices

1. **Component descriptions**:
   ```jsx
   parameters: {
     docs: {
       description: {
         component: 'Detailed component description',
       },
     },
   }
   ```

2. **Story descriptions**:
   ```jsx
   MyStory.parameters = {
     docs: {
       description: {
         story: 'Explanation of this specific variant'
       }
     }
   };
   ```

3. **Document props**:
   ```jsx
   argTypes: {
     variant: {
       control: 'select',
       options: ['primary', 'secondary'],
       description: 'The button style variant',
     },
   }
   ```

4. **Include code examples**:
   ```jsx
   /**
    * ```jsx
    * import { Button } from 'components/ui';
    * 
    * function Example() {
    *   return <Button>Click me</Button>;
    * }
    * ```
    */
   ```

5. **Document edge cases and limitations**:
   ```jsx
   /**
    * ## Edge Cases
    * 
    * - Long text is truncated with ellipsis
    * - Fails gracefully when image can't be loaded
    */
   ```