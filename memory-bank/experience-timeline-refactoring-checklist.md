# Experience Timeline Refactoring Checklist

## Phase 1: Create Missing Atom Components

1. Create TimelineNode atom
   - [ ] Define proper TypeScript interface
   - [ ] Implement as standalone component
   - [ ] Add size/color/variant props
   - [ ] Include proper accessibility attributes

2. Create ConsoleHeader atom
   - [ ] Move from ExperienceTimeline to atoms directory
   - [ ] Leverage Card component with terminal variant
   - [ ] Define proper props interface

3. Create DateBubble atom
   - [ ] Extract from TimelineEntry
   - [ ] Support variants and animations
   - [ ] Proper accessibility attributes

4. Create CodeSnippet atom
   - [ ] Extract decorative code elements
   - [ ] Support theme variants

## Phase 2: Fix Molecule Components

5. Refactor ExperienceCard
   - [ ] Remove internal animation logic
   - [ ] Accept animations as props
   - [ ] Fix variant prop implementation
   - [ ] Remove direct style manipulations
   - [ ] Fix TypeScript errors

6. Refactor TimelineEntry
   - [ ] Compose from atoms rather than direct DOM manipulation
   - [ ] Remove duplicate animation logic
   - [ ] Define component boundaries clearly
   - [ ] Fix variant prop propagation
   - [ ] Use Card component's terminal variant

## Phase 3: Fix Organism Component

7. Refactor ExperienceTimeline
   - [ ] Orchestrate animations from parent
   - [ ] Implement proper composition
   - [ ] Remove direct DOM manipulation
   - [ ] Remove inline styling
   - [ ] Centralize state management
   - [ ] Fix TypeScript interfaces

## Phase 4: Fix CSS Implementation

8. CSS Structure
   - [ ] Separate structural and thematic styling
   - [ ] Use CSS variables consistently
   - [ ] Eliminate redundant CSS
   - [ ] Fix responsive design issues
   - [ ] Ensure proper reduced motion support

9. CSS Relationships
   - [ ] Fix CSS bleeding between components
   - [ ] Establish clear component boundaries
   - [ ] Leverage design system tokens

## Phase 5: Implement Proper Data Flow

10. Fix Props Propagation
    - [ ] Define clear interfaces between components
    - [ ] Move utility functions to proper location
    - [ ] Fix prop drilling issues
    - [ ] Consistent naming conventions

11. Animation Coordination
    - [ ] Centralize animation timing
    - [ ] Define animation sequence from parent
    - [ ] Ensure proper reduced motion support

## Phase 6: Testing and Documentation

12. Testing
    - [ ] Add component tests
    - [ ] Test accessibility
    - [ ] Test responsive behavior
    - [ ] Test reduced motion

13. Documentation
    - [ ] Update component documentation
    - [ ] Add usage examples
    - [ ] Document animation behavior
    - [ ] Document accessibility features

## Critical Atomic Design Issues to Address

1. **Card Component Misuse**: Card atom has security/terminal variants explicitly designed for this use case, yet these variants are bypassed throughout the Experience components
   
2. **Variant Props Not Propagated**: Props get swallowed between components instead of being passed through consistently

3. **ResponsiveImage Inconsistency**: Used in ExperienceCard but styling overrides its atomic properties

4. **No Reusable Dot/Node Atom**: Timeline nodes implemented as raw divs with duplicated styling

5. **TimelineEntry Coupling**: Directly imports and uses ExperienceCard, creating tight coupling

6. **Redundant Animation Logic**: Each molecule manages its own animation state

7. **CSS Bleeding**: Molecules create CSS that impacts children rather than controlling their own boundaries

8. **Direct DOM Manipulation**: Excessive inline styling with absolute positioning, should be done through composition

9. **Missing Component Boundaries**: Timeline contains raw decorative elements that should be proper atom components

10. **Prop Drilling**: extractDateYear function passed down through components instead of using a utility

11. **Missing TypeScript Interface**: Components defined without proper TypeScript interfaces, leading to numerous type errors
