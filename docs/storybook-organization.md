# Storybook Organization

This document outlines the organization structure for our Storybook stories, following Atomic Design principles with additional functional grouping for better navigation.

## Structure

```
GitHub Profile
├── Atoms
│   ├── UI
│   │   └── ProfileAvatar
│   ├── Security
│   │   ├── SecurityBadge
│   │   └── SecurityFact
│   └── Contact
│       └── ContactButton
├── Molecules
│   └── Profile
│       ├── ProfileHeader
│       ├── ProfileLocation
│       ├── ProfileContent
│       ├── ProfileError
│       └── GithubProfileCard
└── Organisms
    └── GithubProfile
```

## Story Title Mapping

### Atoms

```javascript
// ProfileAvatar
title: 'GitHub Profile/Atoms/UI/ProfileAvatar'

// SecurityBadge
title: 'GitHub Profile/Atoms/Security/SecurityBadge'

// SecurityFact
title: 'GitHub Profile/Atoms/Security/SecurityFact'

// ContactButton
title: 'GitHub Profile/Atoms/Contact/ContactButton'
```

### Molecules

```javascript
// ProfileHeader
title: 'GitHub Profile/Molecules/Profile/ProfileHeader'

// ProfileLocation
title: 'GitHub Profile/Molecules/Profile/ProfileLocation'

// ProfileContent
title: 'GitHub Profile/Molecules/Profile/ProfileContent'

// ProfileError
title: 'GitHub Profile/Molecules/Profile/ProfileError'

// GithubProfileCard
title: 'GitHub Profile/Molecules/Profile/GithubProfileCard'
```

### Organisms

```javascript
// GithubProfile
title: 'GitHub Profile/Organisms/GithubProfile'
```

## Benefits

1. **Clear Hierarchy**: Components are organized following Atomic Design principles
2. **Functional Grouping**: Atoms are further grouped by their functional purpose (UI, Security, Contact)
3. **Feature Context**: All profile-related molecules are grouped together
4. **Easy Navigation**: The hierarchical structure makes it easy to find related components
5. **Scalability**: The structure can accommodate new components and features while maintaining organization

## Implementation Steps

1. Update each story file's title property to follow the new hierarchy
2. Add appropriate tags and parameters for better documentation
3. Ensure consistent styling of story decorators across component types
4. Add README.md files in each component directory explaining its role in the hierarchy

## Story Decorators

To maintain consistent styling and context across stories, we've created a set of decorators in `.storybook/utils/decorators/atomic.tsx`:

### Atomic Design Decorators

```javascript
// For atom components
import { withAtomLayout } from '@stories-utils';
export const Default = Template.bind({});
Default.decorators = [withAtomLayout, withAnimationContext];

// For molecule components
import { withMoleculeLayout } from '@stories-utils';
export const Default = Template.bind({});
Default.decorators = [withMoleculeLayout, withAnimationContext];

// For organism components
import { withOrganismLayout } from '@stories-utils';
export const Default = Template.bind({});
Default.decorators = [withOrganismLayout, withAnimationContext];
```

### Themed Decorators

```javascript
// For security-themed components
import { withSecurityTheme } from '@stories-utils';
export const SecurityVariant = Template.bind({});
SecurityVariant.decorators = [withSecurityTheme, withAnimationContext];

// For contact-themed components
import { withContactTheme } from '@stories-utils';
export const ContactVariant = Template.bind({});
ContactVariant.decorators = [withContactTheme, withAnimationContext];
```

These decorators provide consistent styling across all stories:

1. **withAtomLayout**: Simple centered layout with dark background for atomic components
2. **withMoleculeLayout**: Full-width layout with dark background and proper spacing for molecule components
3. **withOrganismLayout**: Full-page layout matching the production environment for organism components
4. **withSecurityTheme**: Security-themed background with grid pattern
5. **withContactTheme**: Contact-themed background with gradient

## Documentation Guidelines

Each story should include:

1. Component description and purpose
2. Usage examples
3. Props documentation
4. Notes about animations and interactions
5. Links to related components in the hierarchy

## Next Steps

1. Update each story file with the new title structure
2. Apply the appropriate decorators based on component type
3. Update documentation
4. Verify navigation in Storybook UI