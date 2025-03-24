# GithubProfileCard Component

The `GithubProfileCard` component displays GitHub profile information with a security-themed design. It has been refactored to follow atomic design principles, improving maintainability and reusability.

## Component Structure

The component has been broken down into the following atomic components:

```
GithubProfileCard
├── ProfileAvatar (atom)
├── ProfileHeader (molecule)
│   └── SecurityBadge (atom)
├── ProfileLocation (molecule)
│   └── MapComponent (molecule)
├── ProfileContent (molecule)
│   ├── SecurityFact (atom)
│   ├── SocialLinks (molecule)
│   └── ContactButton (atom)
└── ProfileError (molecule)
    └── Button (atom)
```

## Usage

```jsx
import GithubProfileCard from '@molecules/GithubProfileCard';

// With profile data
<GithubProfileCard 
  prof={githubProfileData} 
  error={null} 
  onRetry={() => fetchGithubProfile()} 
/>

// With error state
<GithubProfileCard 
  prof={null} 
  error="Unable to load GitHub profile data" 
  onRetry={() => fetchGithubProfile()} 
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `prof` | `Object` | GitHub profile data object |
| `error` | `string` | Error message if API call failed |
| `onRetry` | `Function` | Callback function to retry API call |

## Features

- Displays user avatar with security clearance badge
- Shows user location with map visualization
- Displays security-themed header and description
- Shows random security fact
- Provides social links and contact button
- Handles error states with retry functionality
- Fully animated with framer-motion
- Responsive design for all screen sizes

## Atomic Components

### ProfileAvatar

Displays the user's avatar with a security clearance overlay.

### ProfileHeader

Combines a SecurityBadge with a title for the profile section.

### ProfileLocation

Wraps the MapComponent to display the user's location.

### ProfileContent

Displays the profile description, a security fact, and contact information.

### ProfileError

Displays an error message with a retry button when the API call fails.

## Styling

Each component has its own CSS file following BEM naming convention and using design tokens for consistent styling.

## Animations

Animations are handled through the AnimationContext and framer-motion, with configurable animation variants and staggered animations for child elements.

## Accessibility

The component includes proper ARIA attributes and follows accessibility best practices:
- Proper alt text for images
- Semantic HTML structure
- Keyboard navigable interactive elements
- Sufficient color contrast

## Testing

Unit tests are available in the `__tests__` directory, covering:
- Rendering with profile data
- Error state handling
- Retry functionality
- Conditional rendering based on available data