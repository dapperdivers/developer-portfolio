# Framer Motion & Animation Context Implementation Checklist

This document provides a systematic checklist for verifying that all components properly implement framer-motion animations and use the centralized AnimationContext correctly.

## Priority Conversion Order

1. **High Priority (Convert First)**
   - Layout components (`Background`, `Section`)
   - Animation-heavy atomic components (`MatrixBackground`, `BinaryStream`)
   - Components visible on initial page load

2. **Medium Priority**
   - Common UI components (`Card`, `Button`, etc.)
   - Interactive components (`SkillCard`, `TimelineEntry`)
   - Components that appear on scroll

3. **Low Priority (Convert Last)**
   - Rarely used components
   - Components with minimal animations
   - Internal/admin components

## General Requirements

- [x] Component imports framer-motion properly: `import { motion, ... } from 'framer-motion'`
- [x] Component uses the AnimationContext: `import { useAnimation, MotionVariants } from '@context/AnimationContext'`
- [x] CSS files do not contain animation keyframes (animations should be in framer-motion)
- [x] CSS files do not use `animation-*` properties except for fallbacks
- [x] Animations respect `prefers-reduced-motion` settings
- [x] Animation logic is moved from CSS to component files

## Key Framer-Motion Features to Use

### 1. AnimatePresence
Use for components that need to animate out before unmounting:

```tsx
import { AnimatePresence, motion } from 'framer-motion';

// In component:
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### 2. useInView for Scroll Animations
Use to trigger animations when elements come into view:

```tsx
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// In component:
const ref = useRef(null);
const isInView = useInView(ref, { 
  once: true,  // Only trigger once
  amount: 0.3  // Trigger when 30% visible
});

return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
  >
    Content
  </motion.div>
);
```

### 3. Layout Animations
Use for smooth size/position changes:

```tsx
<motion.div
  layout
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  {/* Content that changes size */}
</motion.div>
```

### 4. Staggered Children
For animating lists of items with staggered timing:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// In component:
<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

## CSS to Framer-Motion Conversion Guide

For each CSS animation keyframe, follow this pattern:

1. **Original CSS**:
   ```css
   @keyframes fadeIn {
     0% { opacity: 0; }
     100% { opacity: 1; }
   }
   
   .element {
     animation: fadeIn 0.5s ease forwards;
   }
   ```

2. **Framer-Motion Equivalent**:
   ```tsx
   const fadeInVariants = {
     hidden: { opacity: 0 },
     visible: { 
       opacity: 1,
       transition: { duration: 0.5, ease: "easeOut" }
     }
   };
   
   return (
     <motion.div
       variants={fadeInVariants}
       initial="hidden"
       animate="visible"
     >
       Content
     </motion.div>
   );
   ```

3. **Using Predefined Variants**:
   ```tsx
   import { useAnimation, MotionVariants } from '@context/AnimationContext';
   
   // Inside component:
   return (
     <motion.div
       variants={MotionVariants.fadeIn}
       initial="hidden"
       animate="visible"
     >
       Content
     </motion.div>
   );
   ```

## Component Type Checklist

### Atomic Components

| Component | Animation Imports | Using AnimationContext | Removed CSS Animations | Uses motion.* | Priority |
|-----------|------------------|------------------------|-------------------------|--------------|----------|
| BinaryStream | ✅ | ✅ | ✅ | ✅ | High |
| Button | ✅ | ✅ | ✅ | ✅ | Medium |
| Card | ✅ | ✅ | ✅ | ✅ | Medium |
| CodeSnippet | ✅ | ✅ | ✅ | ✅ | Low |
| ConnectionHeader | ✅ | ✅ | ✅ | ✅ | Medium |
| ConsoleHeader | ✅ | ✅ | ✅ | ✅ | Low |
| DateBubble | ✅ | ✅ | ✅ | ✅ | Medium |
| DateChip | ✅ | ✅ | ✅ | ✅ | Low |
| DegreeInfo | ✅ | ✅ | ✅ | ✅ | Low |
| EducationIcon | ✅ | ✅ | ✅ | ✅ | Low |
| FieldsOfStudy | ✅ | ✅ | ✅ | ✅ | Low |
| Head | N/A | N/A | N/A | N/A | Low |
| HeaderName | ✅ | ✅ | ✅ | ✅ | Low |
| LazyImage | ✅ | ✅ | ✅ | ✅ | Low |
| Loading | ✅ | ✅ | ✅ | ✅ | High |
| MatrixBackground | ✅ | ✅ | ✅ | ✅ | High |
| Progress | ✅ | ✅ | ✅ | ✅ | Low |
| RatingStars | ✅ | ✅ | ✅ | ✅ | Low |
| ResponsiveImage | ✅ | ✅ | ✅ | ✅ | Low |
| SchoolHeader | ✅ | ✅ | ✅ | ✅ | Low |
| ScrollDown | ✅ | ✅ | ✅ | ✅ | Medium |
| ScrollToTop | ✅ | ✅ | ✅ | ✅ | Medium |
| SecurityBadge | ✅ | ✅ | ✅ | ✅ | Medium |
| Skill | ✅ | ✅ | ✅ | ✅ | Medium |
| SkeletonCard | ✅ | ✅ | ✅ | ✅ | Low |
| SkipToContent | ✅ | ✅ | ✅ | ✅ | Low |
| TechBadge | ✅ | ✅ | ✅ | ✅ | Medium |
| TerminalControls | ✅ | ✅ | ✅ | ✅ | Low |
| TimelineDecorations | ✅ | ✅ | ✅ | ✅ | Medium |
| TimelineNode | ✅ | ✅ | ✅ | ✅ | High |

### Molecular Components

| Component | Animation Imports | Using AnimationContext | Removed CSS Animations | Uses motion.* | Priority |
|-----------|------------------|------------------------|-------------------------|--------------|----------|
| AcademicDetails | ✅ | ✅ | ✅ | ✅ | Low |
| CertificationBadge | ✅ | ✅ | ✅ | ✅ | Low |
| CertificationList | ✅ | ✅ | ✅ | ✅ | Low |
| CollegeInfo | ✅ | ✅ | ✅ | ✅ | Low |
| DisplayLottie | ✅ | ✅ | ✅ | ✅ | Medium |
| EducationCard | ✅ | ✅ | ✅ | ✅ | Medium |
| EducationDetails | ✅ | ✅ | ✅ | ✅ | Medium |
| ErrorBoundary | ✅ | ✅ | ✅ | ✅ | Low |
| ExperienceCard | ✅ | ✅ | ✅ | ✅ | Medium |
| ExperienceTimeline | ✅ | ✅ | ✅ | ✅ | Medium |
| FeedbackAuthor | ✅ | ✅ | ✅ | ✅ | Low |
| FeedbackCard | ✅ | ✅ | ✅ | ✅ | Low |
| FeedbackHighlight | ✅ | ✅ | ✅ | ✅ | Low |
| FeedbackQuote | ✅ | ✅ | ✅ | ✅ | Low |
| Footer | ✅ | ✅ | ✅ | ✅ | Medium |
| GithubProfileCard | ✅ | ✅ | ✅ | ✅ | Medium |
| MapComponent | ✅ | ✅ | ✅ | ✅ | Medium |
| Navigation | ✅ | ✅ | ✅ | ✅ | High |
| ProjectsCard | ✅ | ✅ | ✅ | ✅ | Medium |
| SkillCard | ✅ | ✅ | ✅ | ✅ | Medium |
| SkillCardExpanded | ✅ | ✅ | ✅ | ✅ | Medium |
| SocialLinks | ✅ | ✅ | ✅ | ✅ | Low |
| Timeline | ✅ | ✅ | ✅ | ✅ | High |
| TimelineEntry | ✅ | ✅ | ✅ | ✅ | High |

### Organism Components

| Component | Animation Imports | Using AnimationContext | Removed CSS Animations | Uses motion.* | Priority |
|-----------|------------------|------------------------|-------------------------|--------------|----------|
| Education | ✅ | ✅ | ✅ | ✅ | Medium |
| Experience | ✅ | ✅ | ✅ | ✅ | Medium |
| Feedbacks | ✅ | ✅ | ✅ | ✅ | Medium |
| GithubProfile | ✅ | ✅ | ✅ | ✅ | Medium |
| Greetings | ✅ | ✅ | ✅ | ✅ | High |
| Proficiency | ✅ | ✅ | ✅ | ✅ | Medium |
| Projects | ✅ | ✅ | ✅ | ✅ | Medium |
| Skills | ✅ | ✅ | ✅ | ✅ | Medium |

### Layout Components

| Component | Animation Imports | Using AnimationContext | Removed CSS Animations | Uses motion.* | Priority |
|-----------|------------------|------------------------|-------------------------|--------------|----------|
| Background | ✅ | ✅ | ✅ | ✅ | High |
| Section | ✅ | ✅ | ✅ | ✅ | High |

## Detailed Component Review Tasks

For each component, complete the following detailed checks:

### 1. Import Statement Review
- [x] Check if component imports framer-motion or uses it via AnimationContext
- [x] Verify proper imports for specific needs (e.g., `AnimatePresence`, `useAnimation`, etc.)
- [x] Ensure component doesn't have unused animation imports

### 2. AnimationContext Usage
- [x] Verify the component uses `useAnimation()` hook if animations are present
- [x] Check if component uses standard variants from the context (`fadeInVariants`, etc.)
- [x] Ensure component reacts to `animationEnabled` flag from context
- [x] Check if the component respects the `inView` state from the context

### 3. CSS Animation Replacement
- [x] All `@keyframes` declarations have been removed from component CSS
- [x] `animation-*` CSS properties have been removed (or kept only as fallbacks)
- [x] Transitions that should be animated are now handled by framer-motion
- [x] If using CSS transition fallbacks, check they only apply when JS is disabled

### 4. Motion Component Implementation
- [x] Regular DOM elements (`div`, `span`, etc.) replaced with motion equivalents
- [x] Proper `variants` are defined or imported from AnimationContext
- [x] Appropriate `initial`, `animate`, and `exit` props are defined
- [x] Complex animations use `AnimatePresence` for proper mounting/unmounting

### 5. Accessibility & Performance
- [x] Component respects `prefers-reduced-motion` setting
- [x] Animations are conditionally rendered based on device capabilities
- [x] Appropriate will-change CSS properties used for performance
- [x] Animations have reasonable durations (<0.5s when possible)
- [x] No layout shifts during animations (use `layout` prop carefully)

## Best Practices for Framer Motion

1. **Performance Optimization**
   - Use `AnimatePresence` only for components that need exit animations
   - Prefer variants over inline animation objects
   - Use `will-change` CSS property sparingly
   - Use `layout` prop only when needed (can be expensive)
   - Disable animations for users who prefer reduced motion

2. **Animation Design**
   - Keep animations subtle and purposeful
   - Stick to durations under 500ms for UI feedback
   - Use spring animations for natural movement
   - Implement staggered animations for groups of elements
   - Use consistent timing across similar elements

3. **Code Organization**
   - Define reusable variants in AnimationContext
   - Compose complex animations from simpler ones
   - Use constants for animation parameters
   - Document animation intent with comments
   - Test animations with different screen sizes and devices

4. **Accessibility**
   - Always respect prefers-reduced-motion
   - Avoid animations that could trigger vestibular disorders
   - Ensure interactive elements work without animations
   - Provide alternative content for critical animated information
   - Test with screen readers and keyboard navigation

## Key Files to Review

### Animation Context Files
- [x] `src/context/AnimationContext.tsx` 
  - Verify proper framer-motion exports
  - Check variant definitions are comprehensive
  - Ensure all common animations have predefined variants

### Key CSS Files
- [x] `src/assets/css/global.css`
  - Remove any global animation keyframes 
- [x] `src/assets/css/utilities/animations.css`
  - Ensure this is properly migrated to framer-motion
- [x] `src/assets/css/browser-fixes.css`
  - Keep necessary animations but document why they're needed

### Component CSS Files with Most Animations (High Priority)
- [x] `src/components/molecules/Timeline/styles/*.css`
- [x] `src/components/molecules/TimelineEntry/TimelineEntry.css`
- [x] `src/components/molecules/MapComponent/MapComponent.css`
- [x] `src/components/organisms/Greetings/Greetings.css`
- [x] `src/components/atoms/TimelineNode/TimelineNode.css`

## Animation Testing

- [x] Ensure animations work in all major browsers
- [x] Verify animations don't cause layout shifts
- [x] Test animations with reduced motion preference
- [x] Verify animations don't run when not visible in viewport
- [x] Check that animations don't run on low-power devices
- [x] Test performance with Chrome DevTools Performance tab

## Commands to Find Animation-Related Code

Use these commands to find remaining animation code that might need to be migrated:

```bash
# Find CSS animation declarations
grep -r "@keyframes" --include="*.css" src/

# Find animation properties
grep -r "animation:" --include="*.css" src/

# Find animation shorthand
grep -r "animation-" --include="*.css" src/

# Find transition properties that might benefit from framer-motion
grep -r "transition:" --include="*.css" src/
```

## Conversion Progress Tracking

| Component Type | Converted | Total Components | Percent Complete |
|----------------|-----------|------------------|------------------|
| Atoms | 30/30 | 100% | ✅✅✅✅✅✅✅✅✅✅ |
| Molecules | 24/24 | 100% | ✅✅✅✅✅✅✅✅✅✅ |
| Organisms | 8/8 | 100% | ✅✅✅✅✅✅✅✅✅✅ |
| Layout | 2/2 | 100% | ✅✅✅✅✅✅✅✅✅✅ |
| **Total** | **64/64** | **100%** | ✅✅✅✅✅✅✅✅✅✅ |

## Next Steps after Review

1. ✅ Convert high-priority components first
2. ✅ Then convert medium-priority components
3. ✅ Finally convert low-priority components
4. ✅ Document animation patterns for team reference
5. ✅ Set up performance monitoring for animations
6. ✅ Create animation system documentation
7. ✅ Review and optimize animation performance

## Additional Notes

- Ensure shared animations are added to the `MotionVariants` export in AnimationContext
- Consider creating specialized variants for complex components
- Keep motion configuration minimal to avoid performance issues
- Use the `controls` from AnimationContext for orchestrated animations
- For very complex animations, consider using `useReducer` to manage state