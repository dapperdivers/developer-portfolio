# TimelineNode

The TimelineNode component renders customizable timeline nodes for timeline visualizations.

## Features

- Multiple size options: small, medium, large (`sm`, `md`, `lg`)
- Visual variants: default, security, terminal
- Active state styling
- Animation effects
- Accessibility support for interactive timelines

## Usage

```jsx
import TimelineNode from '@components/atoms/TimelineCore/Node';

// Basic usage
<TimelineNode size="md" />

// With variants and states
<TimelineNode 
  size="md"
  variant="security"
  active={true}
  animated={true}
/>

// As interactive node
<TimelineNode 
  size="md"
  variant="terminal"
  interactive={true}
  id="node-1"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the node |
| variant | '' \| 'security' \| 'terminal' | '' | Visual variant |
| active | boolean | false | Whether the node is active |
| animated | boolean | false | Whether to show animation effects |
| interactive | boolean | false | Whether node is part of interactive timeline |
| id | string | undefined | Unique id for ARIA relationships |
| className | string | '' | Additional CSS classes |
| style | object | {} | Additional inline styles |

## Accessibility

When `interactive` is true:
- Receives button role
- Gets appropriate ARIA attributes 
- Becomes focusable with keyboard navigation 