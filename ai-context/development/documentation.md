# Documentation Guidelines

This document outlines the documentation guidelines and best practices for the Developer Portfolio project. Following these guidelines ensures comprehensive, consistent, and maintainable documentation.

## Documentation Types

The project includes several types of documentation:

1. **Code Documentation**: Comments and documentation within the codebase
2. **Component Documentation**: Documentation for UI components
3. **API Documentation**: Documentation for APIs and data structures
4. **Architecture Documentation**: Documentation for system architecture and design decisions
5. **User Documentation**: Documentation for end users
6. **Process Documentation**: Documentation for development processes and workflows

## Documentation Structure

### Project Documentation

Project documentation is organized in the `docs/` directory:

```
docs/
├── index.md                      # Documentation home page
├── architecture/                 # Architecture documentation
│   ├── project-structure.md      # Project structure overview
│   └── performance-optimization.md # Performance optimization strategies
├── components/                   # Component documentation
│   └── ui-components.md          # UI component overview
├── guides/                       # Developer guides
│   ├── accessibility.md          # Accessibility guidelines
│   └── component-css-guide.md    # CSS guidelines for components
└── testing/                      # Testing documentation
    └── component-testing-best-practices.md # Testing best practices
```

### AI Context Documentation

AI context documentation is organized in the `ai-context/` directory:

```
ai-context/
├── README.md                    # Overview and navigation
├── component/                   # Component guidelines
│   ├── organization.md          # Atomic Design structure
│   ├── naming.md                # Naming conventions
│   ├── implementation.md        # Component implementation guidelines
│   └── migration.md             # Migration patterns and strategies
├── design-system/               # Design system guidelines
│   ├── tokens.md                # Design token organization
│   ├── css.md                   # CSS methodology and patterns
│   └── accessibility.md         # Accessibility guidelines
├── testing/                     # Testing guidelines
│   ├── strategy.md              # Testing approach and types
│   ├── best-practices.md        # Testing best practices
│   └── automation.md            # Test automation guidelines
├── performance/                 # Performance guidelines
│   ├── optimization.md          # Performance optimization patterns
│   └── monitoring.md            # Performance monitoring guidelines
└── development/                 # Development guidelines
    ├── tools.md                 # Development tools and setup
    ├── practices.md             # Modern development practices
    └── documentation.md         # Documentation guidelines
```

## Code Documentation

### JSDoc Comments

Use JSDoc comments for functions, components, and complex logic:

```jsx
/**
 * Button component for user interactions.
 * 
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'tertiary'} [props.variant='primary'] - Button variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Button size
 * @param {boolean} [props.isDisabled=false] - Whether the button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Button component
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  children,
  onClick,
  className,
  ...restProps
}) => {
  // Component implementation
};
```

### TypeScript Types

Use TypeScript types and interfaces with descriptive comments:

```tsx
/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS classes */
  className?: string;
}
```

### File Headers

Include a header comment at the top of each file:

```jsx
/**
 * @file Button component for user interactions.
 * @module components/atoms/Button
 * @description A customizable button component with different variants and sizes.
 */
```

### Code Comments

Follow these guidelines for code comments:

- Use JSDoc comments for functions, components, and complex logic
- Include examples in JSDoc comments when helpful
- Use inline comments sparingly and only for non-obvious code
- Keep comments up-to-date with code changes
- Use `// TODO:` comments for planned improvements
- Use `// FIXME:` comments for known issues

## Component Documentation

### Storybook

Document components using Storybook:

```jsx
// Button.stories.jsx
import Button from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with different variants and sizes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'tertiary'] },
      description: 'Button variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    // Other argTypes...
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button'
};
Primary.parameters = {
  docs: {
    description: {
      story: 'Primary button for main actions.'
    }
  }
};

// Other stories...
```

### Component README

Include a README.md file for each component:

```markdown
# Button Component

A customizable button component with different variants and sizes.

## Usage

```jsx
import Button from '@atoms/Button';

const MyComponent = () => (
  <Button variant="primary" size="medium" onClick={handleClick}>
    Click me
  </Button>
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | Button variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| isDisabled | boolean | false | Whether the button is disabled |
| children | React.ReactNode | - | Button content |
| onClick | function | - | Click handler |
| className | string | - | Additional CSS classes |

## Examples

### Primary Button

```jsx
<Button variant="primary">Primary Button</Button>
```

### Secondary Button

```jsx
<Button variant="secondary">Secondary Button</Button>
```
```

## Architecture Documentation

### Architecture Overview

Document the overall architecture of the project:

```markdown
# System Architecture

This document provides an overview of the system architecture for the Developer Portfolio project.

## Architecture Diagram

```
+-------------------+     +-------------------+     +-------------------+
|                   |     |                   |     |                   |
|  User Interface   |     |  Business Logic   |     |     Data Layer    |
|                   |     |                   |     |                   |
+-------------------+     +-------------------+     +-------------------+
        |                         |                         |
        v                         v                         v
+-------------------+     +-------------------+     +-------------------+
|                   |     |                   |     |                   |
|  React Components |     |  Custom Hooks     |     |  Context API      |
|                   |     |                   |     |                   |
+-------------------+     +-------------------+     +-------------------+
```

## Components

The system is divided into the following components:

### User Interface

The user interface is built using React components following the Atomic Design methodology:

- **Atoms**: Basic building blocks (Button, Card, Input)
- **Molecules**: Groups of atoms (SearchForm, NavigationItem)
- **Organisms**: Complex UI components (Header, ProjectList)
- **Layout**: Structural components (Section, Container)

### Business Logic

Business logic is implemented using custom hooks:

- **useProjects**: Manages project data and operations
- **useExperience**: Manages experience data and operations
- **useSkills**: Manages skills data and operations

### Data Layer

Data is managed using the Context API:

- **PortfolioContext**: Provides portfolio data to components
- **ThemeContext**: Manages theme state
- **AnimationContext**: Manages animation preferences
```

### Decision Records

Document architectural decisions:

```markdown
# Architectural Decision Record: Atomic Design Implementation

## Context

We need a consistent and scalable approach to organizing UI components.

## Decision

We will implement the Atomic Design methodology for organizing UI components.

## Status

Accepted

## Consequences

### Positive

- Clear organization of components by complexity
- Improved reusability of components
- Better separation of concerns
- Easier onboarding for new developers

### Negative

- Learning curve for developers unfamiliar with Atomic Design
- Potential overhead for very simple components
- Need for clear guidelines on component categorization
```

## API Documentation

### API Endpoints

Document API endpoints:

```markdown
# API Documentation

## Projects API

### Get All Projects

Retrieves a list of all projects.

**Endpoint:** `GET /api/projects`

**Response:**

```json
[
  {
    "id": "1",
    "title": "Project 1",
    "description": "Project 1 description",
    "technologies": ["React", "Node.js"],
    "imageUrl": "/images/project1.jpg",
    "demoUrl": "https://example.com/demo",
    "repoUrl": "https://github.com/example/project1"
  },
  {
    "id": "2",
    "title": "Project 2",
    "description": "Project 2 description",
    "technologies": ["React", "TypeScript"],
    "imageUrl": "/images/project2.jpg",
    "demoUrl": "https://example.com/demo2",
    "repoUrl": "https://github.com/example/project2"
  }
]
```
```

### Data Models

Document data models:

```markdown
# Data Models

## Project

Represents a portfolio project.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Project title |
| description | string | Project description |
| technologies | string[] | List of technologies used |
| imageUrl | string | URL to project image |
| demoUrl | string | URL to live demo |
| repoUrl | string | URL to repository |
```

## Documentation Best Practices

### General Guidelines

1. **Keep Documentation Up-to-Date**: Update documentation when code changes
2. **Use Clear Language**: Write in simple, clear language
3. **Be Concise**: Keep documentation concise and to the point
4. **Use Examples**: Include examples to illustrate concepts
5. **Use Visuals**: Use diagrams, screenshots, and other visuals when helpful
6. **Follow Consistent Formatting**: Use consistent formatting and style
7. **Link Related Documentation**: Link to related documentation for context
8. **Consider the Audience**: Write for the intended audience (developers, users, etc.)

### Markdown Guidelines

1. **Use Proper Headings**: Use heading levels (# to ######) appropriately
2. **Use Lists**: Use bullet points and numbered lists for clarity
3. **Use Code Blocks**: Use code blocks with language specification
4. **Use Tables**: Use tables for structured data
5. **Use Links**: Use links to reference other documentation
6. **Use Images**: Include images with descriptive alt text
7. **Use Blockquotes**: Use blockquotes for important notes or quotes

### Documentation Review

1. **Peer Review**: Have documentation reviewed by peers
2. **Technical Accuracy**: Ensure technical accuracy of documentation
3. **Completeness**: Ensure documentation covers all necessary aspects
4. **Clarity**: Ensure documentation is clear and understandable
5. **Consistency**: Ensure documentation is consistent with other documentation

## Documentation Tools

### Docsify

Docsify is used for project documentation:

```bash
# Start documentation server
npm run docs

# Build documentation
npm run docs:build
```

### Storybook

Storybook is used for component documentation:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### JSDoc

JSDoc is used for code documentation:

```bash
# Generate JSDoc documentation
npm run docs:jsdoc
```

## Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [JSDoc Documentation](https://jsdoc.app/)
- [Storybook Documentation](https://storybook.js.org/docs/react/writing-docs/introduction)
- [Docsify Documentation](https://docsify.js.org/#/)
- [Technical Writing Best Practices](https://developers.google.com/tech-writing)
