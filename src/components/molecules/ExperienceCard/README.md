# ExperienceCard Component

## Overview

The ExperienceCard is a molecule component built using atomic design principles to display professional experience information with a cybersecurity/terminal theme. This component has been refactored from a monolithic structure into composable atomic components to eliminate styling conflicts and improve maintainability.

## Architecture

### Atomic Composition

The ExperienceCard is composed of the following atomic components:

```
ExperienceCard (Molecule)
├── CyberpunkEffects (Atom) - Visual effects layer
├── SecurityClassification (Atom) - Security banner
├── ExperienceHeader (Atom) - Logo, role, company, date
├── ExperienceToggle (Atom) - Expand/collapse button
├── ExperienceContent (Atom) - Description and bullets
└── TerminalFooter (Atom) - Terminal-style footer
```

### Component Responsibilities

| Component | Responsibility | Styling Scope |
|-----------|---------------|---------------|
| **ExperienceCard** | Layout composition, state management | Container layout, spacing |
| **CyberpunkEffects** | Glow effects, corners, scan lines, data streams | Visual effects only |
| **SecurityClassification** | Security banner with animated bars | Banner styling only |
| **ExperienceHeader** | Company info, logo, role display | Header layout and typography |
| **ExperienceToggle** | Expand/collapse interaction | Button styling and animations |
| **ExperienceContent** | Description text and bullet points | Content typography and layout |
| **TerminalFooter** | Terminal prompt and cursor | Terminal styling only |

## Usage

### Basic Usage

```jsx
import ExperienceCard from '@molecules/ExperienceCard';

const experienceData = {
  company: 'CyberSec Solutions',
  role: 'Senior Security Engineer', 
  date: 'January 2022 – Present',
  desc: 'Leading cybersecurity initiatives and threat analysis.',
  descBullets: [
    'Implemented advanced threat detection systems',
    'Led incident response for critical security breaches',
    'Developed security protocols for cloud infrastructure'
  ],
  companylogo: '/assets/company-logo.png',
  url: 'https://cybersec-solutions.com'
};

<ExperienceCard 
  data={experienceData}
  variant="cyberpunk"
  shadow={true}
  isExpanded={false}
  onToggle={() => handleToggle()}
  index={0}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Object` | Required | Experience data object |
| `variant` | `String` | `'cyberpunk'` | Theme variant (`cyberpunk`, `security`, `terminal`) |
| `shadow` | `Boolean` | `false` | Enable shadow effects |
| `isExpanded` | `Boolean` | `false` | Controlled expansion state |
| `onToggle` | `Function` | `undefined` | Toggle callback (controlled mode) |
| `index` | `Number` | `0` | Animation delay index |

### Data Object Structure

```jsx
const data = {
  company: 'String',      // Required - Company name
  role: 'String',         // Required - Job role/title
  date: 'String',         // Required - Employment dates
  desc: 'String',         // Optional - Description text
  descBullets: ['Array'], // Optional - Achievement bullets
  companylogo: 'String',  // Optional - Logo image URL
  url: 'String'          // Optional - Company website URL
};
```

## Variants

### Cyberpunk (Default)
- Cyan glow effects with terminal aesthetics
- Animated scan lines and data streams
- Holographic corner brackets

### Security
- Green security theme (rgba(34, 197, 94))
- Enhanced security classification banners
- Military-style terminal effects

### Terminal
- Classic terminal styling
- Monospace fonts throughout
- Simplified effects for performance

## Styling Architecture

### CSS Isolation Strategy

Each atomic component maintains its own isolated CSS file:

```
molecules/ExperienceCard/
├── ExperienceCard.jsx          # Composition logic
├── ExperienceCard.css          # Layout and container styles only
├── ExperienceCard.stories.jsx  # Storybook documentation
├── README.md                   # This file
└── index.js                    # Export
```

### Atomic Components CSS

```
atoms/CyberpunkEffects/CyberpunkEffects.css     # Visual effects only
atoms/SecurityClassification/SecurityClassification.css  # Banner styles only
atoms/ExperienceHeader/ExperienceHeader.css     # Header layout only
atoms/ExperienceToggle/ExperienceToggle.css     # Button styles only  
atoms/ExperienceContent/ExperienceContent.css   # Content typography only
atoms/TerminalFooter/TerminalFooter.css         # Terminal styles only
```

## Animation System

### Performance Optimizations

- **Staggered Animations**: Each atomic component has optimized animation variants
- **Viewport Optimization**: `viewport={{ once: true }}` for scroll animations
- **GPU Acceleration**: `will-change` properties where needed
- **Layout Containment**: CSS `contain` properties for performance

### Animation Flow

1. **Card Entry**: Staggered animation on mount
2. **Hover Effects**: Glow and transform effects
3. **Expansion**: Content reveal with opacity and height transitions
4. **Interactive**: Button rotations and glow responses

## State Management

### Controlled vs Uncontrolled

```jsx
// Controlled (recommended for timeline usage)
<ExperienceCard 
  isExpanded={expandedState}
  onToggle={handleToggle}
  // ...other props
/>

// Uncontrolled (standalone usage)
<ExperienceCard 
  // No isExpanded or onToggle props
  // ...other props
/>
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support for toggle interaction
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus states and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

## Browser Support

- **Modern Browsers**: Full feature support (Chrome 80+, Firefox 75+, Safari 13+)
- **Mobile Responsive**: Optimized for touch interactions
- **Progressive Enhancement**: Graceful degradation for older browsers

## Performance Considerations

- **CSS Bundle**: Atomic styles only load when components are used
- **Tree Shaking**: Unused atoms can be eliminated from production bundles
- **Animation Performance**: Optimized transforms and opacity changes
- **Memory Usage**: Efficient cleanup of animation resources

## Development Notes

### Debugging

Each atomic component can be debugged independently:

```jsx
// Debug individual atoms
import CyberpunkEffects from '@atoms/CyberpunkEffects';

<CyberpunkEffects variant="security" className="debug-effects" />
```

### Testing Strategy

- **Unit Tests**: Test each atom independently
- **Integration Tests**: Test ExperienceCard composition
- **Visual Tests**: Storybook visual regression testing
- **Accessibility Tests**: ARIA and keyboard interaction testing

## Migration Guide

### From Previous Version

The refactored ExperienceCard maintains the same public API, so existing usage should work without changes:

```jsx
// This still works exactly the same
<ExperienceCard data={experienceData} variant="cyberpunk" />
```

### Breaking Changes

- None - public API is maintained for backward compatibility

## Contributing

When modifying this component:

1. **Keep styling isolated** - Each atom should only contain its own styles
2. **Maintain atomic boundaries** - Don't mix responsibilities between atoms
3. **Update stories** - Add new variants to Storybook documentation
4. **Test composition** - Ensure atoms work together without conflicts
5. **Performance check** - Verify animations remain optimized

## Related Components

- **Timeline** - Uses ExperienceCard in timeline layout
- **Experience** - Organism that manages multiple ExperienceCards
- **ConsoleHeader** - Shares similar cybersecurity theming