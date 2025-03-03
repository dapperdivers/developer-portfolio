# UI Components

This document provides a detailed overview of the core UI components available in the developer portfolio project.

## Button Component

The Button component is a versatile, accessible button that supports multiple variants and states.

### Import

```jsx
import { Button } from '../../components/ui/Button';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'primary'` | Button style variant (`'primary'`, `'secondary'`, `'outline'`, `'link'`) |
| `size` | string | `'md'` | Button size (`'sm'`, `'md'`, `'lg'`) |
| `disabled` | boolean | `false` | Disables the button when true |
| `fullWidth` | boolean | `false` | Makes the button take full width of container |
| `isLoading` | boolean | `false` | Shows a loading indicator |
| `icon` | string | `null` | Icon name (uses Iconify format) |
| `iconPosition` | string | `'left'` | Position of icon (`'left'`, `'right'`) |
| `href` | string | `null` | When provided, renders an anchor tag instead of button |
| `target` | string | `null` | Target attribute for anchor tag (e.g., `'_blank'`) |
| `onClick` | function | `null` | Click handler function |
| `className` | string | `''` | Additional CSS classes |
| `children` | node | required | Button content |

### Examples

```jsx
// Primary button
<Button>Click Me</Button>

// Secondary button with icon
<Button 
  variant="secondary" 
  icon="mdi:github"
>
  View on GitHub
</Button>

// Link button
<Button
  variant="link"
  href="https://example.com"
  target="_blank"
>
  External Link
</Button>

// Full width loading button
<Button
  fullWidth
  isLoading
  disabled
>
  Submitting...
</Button>
```

### Animation

The Button component includes hover and focus animations:
- Scale effect on hover
- Color transition
- Focus ring for keyboard navigation

## Card Component

The Card component provides a flexible container for displaying content with consistent styling.

### Import

```jsx
import { Card } from '../../components/ui/Card';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `null` | Card title |
| `subtitle` | string | `null` | Card subtitle |
| `hoverable` | boolean | `false` | Enables hover effects |
| `shadow` | boolean or string | `false` | Shadow depth (`true`, `'sm'`, `'md'`, `'lg'`) |
| `bordered` | boolean | `false` | Adds border to card |
| `padding` | string | `'md'` | Internal padding (`'none'`, `'sm'`, `'md'`, `'lg'`) |
| `className` | string | `''` | Additional CSS classes |
| `animation` | object | `null` | Animation properties for Framer Motion |
| `children` | node | required | Card content |

### Examples

```jsx
// Basic card
<Card title="Project Title">
  <p>Card content goes here</p>
</Card>

// Card with animation and hover effects
<Card
  title="Project Title"
  subtitle="Project Subtitle"
  hoverable
  shadow="md"
  animation={{ 
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  }}
>
  <p>Card content goes here</p>
  
  {/* With footer */}
  <div slot="footer">
    <Button>View Project</Button>
  </div>
</Card>
```

### Slots

The Card component supports content slots:
- Default slot for main content
- `footer` slot for card actions or footer content

## Section Component

The Section component is a layout container for page sections with consistent styling.

### Import

```jsx
import { Section } from '../../components/layout/Section';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | required | Section ID for navigation |
| `title` | string | `null` | Section title |
| `subtitle` | string | `null` | Section subtitle |
| `icon` | string | `null` | Section icon (Iconify format) |
| `background` | string | `'light'` | Background style (`'light'`, `'dark'`, `'primary'`, `'gradient'`) |
| `paddingTop` | string | `'md'` | Top padding (`'none'`, `'sm'`, `'md'`, `'lg'`) |
| `paddingBottom` | string | `'md'` | Bottom padding (`'none'`, `'sm'`, `'md'`, `'lg'`) |
| `className` | string | `''` | Additional CSS classes |
| `children` | node | required | Section content |

### Examples

```jsx
// Basic section
<Section
  id="about"
  title="About Me"
  subtitle="Learn more about my background"
  icon="mdi:account"
  background="light"
>
  <p>Section content goes here</p>
</Section>

// Dark section with gradient background
<Section
  id="skills"
  title="My Skills"
  background="gradient"
  paddingTop="lg"
  paddingBottom="lg"
>
  <SkillsContainer />
</Section>
```

## LazyImage Component

The LazyImage component provides optimized image loading with lazy loading and blur-up technique.

### Import

```jsx
import { LazyImage } from '../../components/ui/LazyImage';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Image source URL |
| `alt` | string | required | Alternative text for accessibility |
| `aspectRatio` | string | `null` | Aspect ratio (`'1:1'`, `'16:9'`, etc.) |
| `lowResSrc` | string | `null` | Low resolution placeholder image |
| `width` | number or string | `null` | Image width |
| `height` | number or string | `null` | Image height |
| `objectFit` | string | `'cover'` | CSS object-fit property |
| `className` | string | `''` | Additional CSS classes |
| `loading` | string | `'lazy'` | Image loading behavior (`'lazy'`, `'eager'`) |

### Examples

```jsx
// Basic usage
<LazyImage
  src="/path/to/image.jpg"
  alt="Description of image"
/>

// With aspect ratio and placeholder
<LazyImage
  src="/path/to/image.jpg"
  alt="Description of image"
  aspectRatio="16:9"
  lowResSrc="/path/to/thumbnail.jpg"
  objectFit="contain"
/>
```

## Skill Component

The Skill component displays a skill or technology with an icon and optional proficiency level.

### Import

```jsx
import { Skill } from '../../components/ui/Skill';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | required | Skill name |
| `icon` | string | `null` | Skill icon (Iconify format) |
| `iconColor` | string | `null` | Icon color (CSS color) |
| `level` | number | `null` | Proficiency level (0-100) |
| `showLevel` | boolean | `false` | Whether to display the proficiency level |
| `size` | string | `'md'` | Component size (`'sm'`, `'md'`, `'lg'`) |
| `className` | string | `''` | Additional CSS classes |

### Examples

```jsx
// Basic skill
<Skill
  name="React"
  icon="mdi:react"
  iconColor="#61DAFB"
/>

// Skill with proficiency level
<Skill
  name="JavaScript"
  icon="mdi:language-javascript"
  iconColor="#F7DF1E"
  level={90}
  showLevel
/>

// Small skill badge
<Skill
  name="HTML5"
  icon="mdi:html5"
  iconColor="#E34F26"
  size="sm"
/>
```

## Accessibility Features

All UI components include the following accessibility features:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader announcements for dynamic content
- Color contrast compliance
- Reduced motion support

## Customization

Components can be customized through:

1. Props for component-specific options
2. CSS custom properties (variables) for theming
3. CSS modules for more extensive styling customization

For theming options, see the design tokens documentation.

## Additional Resources

- [Component Testing Documentation](/docs/testing/component-testing-best-practices.md)
- [Accessibility Guidelines](/docs/guides/accessibility.md)
- [Design Tokens](/docs/architecture/design-tokens.md)