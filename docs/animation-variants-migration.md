# Animation Variants Migration Checklist

This document tracks the migration of components to use animation variants from the AnimationContext instead of direct imports.

## Migration Steps for Each Component

1. Remove direct import of animation variants from `@utils/animations`
2. Update `useAnimation` hook to include the needed variants
3. Update tests to use `renderWithProviders` instead of custom render functions
4. Ensure all tests pass with the new implementation

## Components to Update

### Molecules
- [x] SkillCard
- [x] ProjectsCard
- [x] FeedbackCard
- [x] ExperienceCard

### Layout
- [x] Navigation

### Organisms
- [x] Greetings
- [x] Education
- [x] Experience
- [ ] Feedbacks
- [ ] GithubProfile
- [ ] Projects
- [ ] Skills
- [ ] Proficiency

## Notes
- Keep the import in `src/test/setup.ts` unchanged as it serves as the source of truth for the animation context
- All tests should use `renderWithProviders` from `src/test/setup.ts`
- Verify that animations work correctly after each migration

## Completed Components
- SkillCard (all tests passing)
- ProjectsCard (all tests passing)
- FeedbackCard (all tests passing)
- ExperienceCard (all tests passing)
- Navigation (all tests passing)
- Greetings (all tests passing)
- Education (all tests passing)
- Experience (all tests passing)