# Component Structure Migration Guide

## Overview

This document provides information about the component structure reorganization.

The project has been restructured to co-locate related component files (component implementation, stories, CSS, tests) in a single directory.

## New Structure

Each component now has its own directory with the following structure:

```
src/components/[type]/[ComponentName]/
├── [ComponentName].jsx       # Component implementation
├── [ComponentName].css       # Component styles
├── [ComponentName].stories.jsx # Storybook stories
├── [ComponentName].test.jsx  # Component tests
├── index.js                  # Re-exports the component
└── assets/                   # Component-specific assets
```

## Migrated Components

### Atoms

- `Button`
  - Previous locations:
    - Component: `src/components/atoms/Button.jsx`
    - Story: `src/stories/atoms/Button.stories.jsx`
    - Test: `src/components/atoms/__tests__/Button.test.jsx`
    - CSS: `src/assets/css/components/ui/button.css`
  - New location: `src/components/atoms/Button/`

- `Card`
  - Previous locations:
    - Component: `src/components/atoms/Card.jsx`
    - Story: `src/stories/atoms/Card.stories.jsx`
    - Test: `src/components/atoms/__tests__/Card.test.jsx`
    - CSS: `src/assets/css/components/ui/card.css`
  - New location: `src/components/atoms/Card/`

- `Head`
  - Previous locations:
    - Component: `src/components/atoms/Head.jsx`
    - Story: `src/stories/atoms/Head.stories.jsx`
  - New location: `src/components/atoms/Head/`

- `LazyImage`
  - Previous locations:
    - Component: `src/components/atoms/LazyImage.jsx`
    - Story: `src/stories/atoms/LazyImage.stories.jsx`
  - New location: `src/components/atoms/LazyImage/`

- `Loading`
  - Previous locations:
    - Component: `src/components/atoms/Loading.jsx`
    - Story: `src/stories/atoms/Loading.stories.jsx`
    - CSS: `src/assets/css/components/ui/loading.css`
  - New location: `src/components/atoms/Loading/`

- `Progress`
  - Previous locations:
    - Component: `src/components/atoms/Progress.jsx`
  - New location: `src/components/atoms/Progress/`

- `ResponsiveImage`
  - Previous locations:
    - Component: `src/components/atoms/ResponsiveImage.jsx`
    - Story: `src/stories/atoms/ResponsiveImage.stories.jsx`
  - New location: `src/components/atoms/ResponsiveImage/`

- `SkeletonCard`
  - Previous locations:
    - Component: `src/components/atoms/SkeletonCard.jsx`
  - New location: `src/components/atoms/SkeletonCard/`

- `Skill`
  - Previous locations:
    - Component: `src/components/atoms/Skill.jsx`
    - Story: `src/stories/atoms/Skill.stories.jsx`
    - Test: `src/components/atoms/__tests__/Skill.test.jsx`
  - New location: `src/components/atoms/Skill/`

- `SkipToContent`
  - Previous locations:
    - Component: `src/components/atoms/SkipToContent.jsx`
    - Story: `src/stories/atoms/SkipToContent.stories.jsx`
  - New location: `src/components/atoms/SkipToContent/`

### Molecules

- `DisplayLottie`
  - Previous locations:
    - Component: `src/components/molecules/DisplayLottie.jsx`
    - Story: `src/stories/molecules/DisplayLottie.stories.jsx`
    - CSS: `src/assets/css/components/ui/display-lottie.css`
  - New location: `src/components/molecules/DisplayLottie/`

- `EducationCard`
  - Previous locations:
    - Component: `src/components/molecules/EducationCard.jsx`
    - Story: `src/stories/molecules/EducationCard.stories.jsx`
    - Test: `src/components/molecules/__tests__/EducationCard.test.jsx`
    - CSS: `src/assets/css/components/ui/education-card.css`
  - New location: `src/components/molecules/EducationCard/`

- `ErrorBoundary`
  - Previous locations:
    - Component: `src/components/molecules/ErrorBoundary.jsx`
  - New location: `src/components/molecules/ErrorBoundary/`

- `ExperienceCard`
  - Previous locations:
    - Component: `src/components/molecules/ExperienceCard.jsx`
    - Story: `src/stories/molecules/ExperienceCard.stories.jsx`
    - Test: `src/components/molecules/__tests__/ExperienceCard.test.jsx`
    - CSS: `src/assets/css/components/ui/experience-card.css`
  - New location: `src/components/molecules/ExperienceCard/`

- `FeedbackCard`
  - Previous locations:
    - Component: `src/components/molecules/FeedbackCard.jsx`
    - Story: `src/stories/molecules/FeedbackCard.stories.jsx`
    - Test: `src/components/molecules/__tests__/FeedbackCard.test.jsx`
    - CSS: `src/assets/css/components/ui/feedback-card.css`
  - New location: `src/components/molecules/FeedbackCard/`

- `Footer`
  - Previous locations:
    - Component: `src/components/molecules/Footer.jsx`
    - Story: `src/stories/molecules/Footer.stories.jsx`
    - Test: `src/components/molecules/__tests__/Footer.test.jsx`
    - CSS: `src/assets/css/footer.css`
  - New location: `src/components/molecules/Footer/`

- `GithubProfileCard`
  - Previous locations:
    - Component: `src/components/molecules/GithubProfileCard.jsx`
    - Story: `src/stories/molecules/GithubProfileCard.stories.jsx`
    - Test: `src/components/molecules/__tests__/GithubProfileCard.test.jsx`
  - New location: `src/components/molecules/GithubProfileCard/`

- `Navigation`
  - Previous locations:
    - Component: `src/components/molecules/Navigation.jsx`
    - Story: `src/stories/molecules/Navigation.stories.jsx`
    - Test: `src/components/molecules/__tests__/Navigation.test.jsx`
    - CSS: `src/assets/css/components/layout/navigation.css`
  - New location: `src/components/molecules/Navigation/`

- `ProjectsCard`
  - Previous locations:
    - Component: `src/components/molecules/ProjectsCard.jsx`
    - Story: `src/stories/molecules/ProjectsCard.stories.jsx`
    - Test: `src/components/molecules/__tests__/ProjectsCard.test.jsx`
  - New location: `src/components/molecules/ProjectsCard/`

- `SocialLinks`
  - Previous locations:
    - Component: `src/components/molecules/SocialLinks.jsx`
    - Story: `src/stories/molecules/SocialLinks.stories.jsx`
    - CSS: `src/assets/css/components/ui/social-links.css`
  - New location: `src/components/molecules/SocialLinks/`

### Organisms

- `Education`
  - Previous locations:
    - Component: `src/components/organisms/Education.jsx`
    - Story: `src/stories/organisms/Education.stories.jsx`
    - Test: `src/components/organisms/__tests__/Education.test.jsx`
  - New location: `src/components/organisms/Education/`

- `Experience`
  - Previous locations:
    - Component: `src/components/organisms/Experience.jsx`
    - Story: `src/stories/organisms/Experience.stories.jsx`
    - Test: `src/components/organisms/__tests__/Experience.test.jsx`
  - New location: `src/components/organisms/Experience/`

- `Feedbacks`
  - Previous locations:
    - Component: `src/components/organisms/Feedbacks.jsx`
    - Story: `src/stories/organisms/Feedbacks.stories.jsx`
    - Test: `src/components/organisms/__tests__/Feedbacks.test.jsx`
  - New location: `src/components/organisms/Feedbacks/`

- `GithubProfile`
  - Previous locations:
    - Component: `src/components/organisms/GithubProfile.jsx`
    - Story: `src/stories/organisms/GithubProfile.stories.jsx`
    - Test: `src/components/organisms/__tests__/GithubProfile.test.jsx`
  - New location: `src/components/organisms/GithubProfile/`

- `Greetings`
  - Previous locations:
    - Component: `src/components/organisms/Greetings.jsx`
    - Story: `src/stories/organisms/Greetings.stories.jsx`
  - New location: `src/components/organisms/Greetings/`

- `Proficiency`
  - Previous locations:
    - Component: `src/components/organisms/Proficiency.jsx`
    - Story: `src/stories/organisms/Proficiency.stories.jsx`
  - New location: `src/components/organisms/Proficiency/`

- `Projects`
  - Previous locations:
    - Component: `src/components/organisms/Projects.jsx`
    - Story: `src/stories/organisms/Projects.stories.jsx`
    - Test: `src/components/organisms/__tests__/Projects.test.jsx`
  - New location: `src/components/organisms/Projects/`

- `Skills`
  - Previous locations:
    - Component: `src/components/organisms/Skills.jsx`
    - Story: `src/stories/organisms/Skills.stories.jsx`
    - Test: `src/components/organisms/__tests__/Skills.test.jsx`
  - New location: `src/components/organisms/Skills/`

### Layout

- `Section`
  - Previous locations:
    - Component: `src/components/layout/Section.jsx`
    - Story: `src/stories/templates/Section.stories.jsx`
    - Test: `src/components/layout/__tests__/Section.test.jsx`
    - CSS: `src/assets/css/components/layout/section.css`
  - New location: `src/components/layout/Section/`

## Import Update Guide

The old import paths will continue to work through alias mappings, but to maximize the benefits of the new structure, update your imports to use the new paths.

### Before

```jsx
import Button from '@atoms/Button';
import MyComponent from '@components/MyComponent';
```

### After

```jsx
import Button from '@atoms/Button';  // Still works, uses index.js re-export
// or for more explicit imports:
import Button from '@atoms/Button/Button';
```

## Benefits

- **Easier maintenance**: All related files are in one place
- **Improved developer experience**: Less context switching between different directories
- **Better encapsulation**: Component-specific assets and styles stay with the component
- **Simplified refactoring**: Moving or reusing components becomes simpler
