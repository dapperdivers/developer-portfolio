import { Meta } from '@storybook/blocks';

const meta = {
  title: 'Introduction/Getting Started',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      source: {
        code: null,
      },
      description: {
        component: `
# Developer Portfolio Component Library

Welcome to the Developer Portfolio component library. This Storybook contains the UI components used in the portfolio project, organized according to atomic design principles.

## Atomic Design Structure

Our components are organized following atomic design methodology:

### 1. Atoms
The basic building blocks of the application - buttons, inputs, cards, and other UI elements that can't be broken down further.

- \`Button\`: Multi-variant button component with different sizes and styles
- \`Card\`: Content container with various display options
- \`Skill\`: Icon-based skill representation with tooltips

### 2. Molecules
Combinations of atoms that form relatively simple UI components with specific functionality.

- \`ExperienceCard\`: Display professional experience with company logo and details
- \`ProjectCard\`: Showcase projects with images and technologies used
- \`EducationCard\`: Display educational background

### 3. Organisms
More complex UI components composed of molecules and atoms that form a distinct section of the interface.

- \`Navigation\`: Site navigation including links and mobile menu
- \`Footer\`: Site footer with links and social icons
- \`Skills\`: Grid display of multiple skill icons

### 4. Templates
Page-level objects that place components into a layout and articulate the design's underlying content structure.

- \`Section\`: Standardized page section component with title and content areas

## Component Features

The component library includes these key features:

- **Design Token System**: Components use CSS variables for consistent styling
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Responsive Design**: Components adapt to different screen sizes
- **Performance Optimization**: Components use React.memo and optimization hooks
- **Animation**: Framer Motion integration for smooth animations
- **Documentation**: Comprehensive props documentation and examples

## Using These Components

### Basic Usage

\`\`\`jsx
import { Button, Card } from '../components/ui';

function MyComponent() {
  return (
    <Card title="Sample Card" shadow hoverable>
      <p>This is a sample card with a button.</p>
      <Button variant="primary" icon="mdi:arrow-right" iconPosition="right">
        Learn More
      </Button>
    </Card>
  );
}
\`\`\`

### Responsive Components

Many components have built-in responsiveness:

\`\`\`jsx
<Card 
  title="Responsive Card"
  className="my-responsive-card" // Custom styling if needed
>
  <ResponsiveImage 
    src="/path/to/image.jpg"
    alt="Description"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Card>
\`\`\`

### Animation Integration

Components with animation support:

\`\`\`jsx
<Card
  title="Animated Card"
  animation={{
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }}
>
  This card animates when it appears.
</Card>
\`\`\`

## Contributing New Components

When creating new components for the portfolio:

1. Follow the atomic design pattern
2. Use existing design tokens from \`design-tokens.css\`
3. Include comprehensive PropTypes
4. Add JSDoc documentation
5. Create Storybook stories to showcase the component
6. Implement proper accessibility features
7. Test on different screen sizes

## Getting Started

Explore the component library by navigating through the sidebar. Each component includes:

- Interactive examples
- Props documentation
- Usage guidelines

Start with the basic atoms, then explore how they combine into more complex components.
        `,
      }
    }
  },
};

export default meta;

export const Introduction = {
  name: 'Introduction',
};