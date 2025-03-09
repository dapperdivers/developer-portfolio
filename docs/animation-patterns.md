# Animation Patterns Guide

This document provides an overview of the animation patterns used throughout the portfolio project. These patterns ensure consistency, accessibility, and performance across all components.

## Core Animation Principles

1. **Accessibility First**
   - All animations respect the user's `prefers-reduced-motion` setting
   - Animations can be toggled off globally via the `AnimationContext`
   - Components accept `animated` prop to disable animations on a per-component basis

2. **Performance Optimization**
   - Animations are conditionally rendered based on viewport visibility
   - Heavy animations are optimized for low-power devices
   - GPU-accelerated properties used when possible (`transform`, `opacity`)

3. **Consistent API**
   - All animated components use the same API pattern
   - Standard animation variants are provided via `AnimationContext`
   - Animation durations and timings follow a consistent pattern

## Animation Types and Variants

### Standard Animation Variants

These variants are available from the `AnimationContext` and should be used for consistency:

#### Fade Animations
```jsx
// Fade In
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// Usage
<motion.div
  variants={fadeInVariants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

#### Slide Animations
```jsx
// Slide Up
const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Usage
<motion.div
  variants={slideUpVariants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

#### Scale Animations
```jsx
// Scale In
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Usage
<motion.div
  variants={scaleVariants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

#### Pulse Animation
```jsx
// Pulse
const pulseVariants = {
  hidden: { opacity: 0.6 },
  visible: { 
    opacity: [0.6, 1, 0.6], 
    transition: { 
      repeat: Infinity, 
      duration: 2, 
      ease: "easeInOut" 
    } 
  }
};

// Usage
<motion.div
  variants={pulseVariants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

### Interactive Animations

#### Hover Animations
```jsx
const hoverVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

// Usage
<motion.div
  whileHover="hover"
  variants={hoverVariants}
>
  Content
</motion.div>
```

#### Tap Animations
```jsx
const tapVariants = {
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Usage
<motion.div
  whileTap="tap"
  variants={tapVariants}
>
  Content
</motion.div>
```

### List Animations with Staggered Children

For lists and grids, use staggered animations for a more polished effect:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Usage
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

## Implementation Patterns

### Basic Component Pattern

```jsx
import React from "react";
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';

const ExampleComponent = ({ animated = true }) => {
  const { animationEnabled, fadeInVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

  return (
    <motion.div 
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? fadeInVariants : {}}
    >
      Content
    </motion.div>
  );
};

export default ExampleComponent;
```

### Conditional Animation Pattern

```jsx
import React from "react";
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import useIntersectionObserver from "@hooks/useIntersectionObserver";

const ExampleComponent = ({ animated = true }) => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

  return (
    <motion.div 
      ref={ref}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isInView && shouldAnimate ? "visible" : "hidden"}
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      Content
    </motion.div>
  );
};

export default ExampleComponent;
```

### Complex Animation Orchestration

For more complex animations that need to be orchestrated:

```jsx
import React, { useEffect } from "react";
import { motion, useAnimation as useFramerAnimation } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';

const ComplexComponent = ({ animated = true }) => {
  const controls = useFramerAnimation();
  const { animationEnabled } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

  useEffect(() => {
    if (shouldAnimate) {
      // Sequence of animations
      const sequence = async () => {
        await controls.start({ opacity: 1, transition: { duration: 0.5 } });
        await controls.start({ scale: 1.1, transition: { duration: 0.3 } });
        return controls.start({ scale: 1, transition: { duration: 0.2 } });
      };
      
      sequence();
    }
  }, [controls, shouldAnimate]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
    >
      Content
    </motion.div>
  );
};

export default ComplexComponent;
```

## Best Practices

1. **Always add the `animated` prop**
   - Allow components to have their animations toggled individually
   - Check both the `animated` prop and `animationEnabled` context value

2. **Respect Viewport Visibility**
   - Use `useIntersectionObserver` for components that should only animate when visible
   - Don't animate off-screen elements to save resources

3. **Maintain Consistency**
   - Use predefined variants from `AnimationContext` when possible
   - Keep animation durations consistent (typically 0.3s-0.5s)
   - Use similar easing functions for similar types of animations

4. **Optimize Performance**
   - Only animate properties that don't trigger layout changes (`transform`, `opacity`)
   - Use spring animations for natural movement when appropriate
   - Be cautious with infinite animations, only use when necessary

5. **Accessibility**
   - Ensure all animations can be disabled
   - Don't rely on animations for core functionality
   - Keep animations subtle and purposeful

## Animation Timing Guidelines

- **Very Fast (0.1s-0.2s)**: Micro-interactions, feedback (button press)
- **Fast (0.2s-0.3s)**: Hover effects, small UI changes
- **Medium (0.3s-0.5s)**: Content reveals, transitions between states
- **Slow (0.5s-0.8s)**: Major layout changes, entrance animations
- **Very Slow (0.8s+)**: Used sparingly for dramatic effect

## Debugging Animations

To debug animations, use the `__DEBUG_FLAGS` window object:

```javascript
// In browser console
window.__DEBUG_FLAGS = {
  disableAnimations: true,  // Turn off all animations
  debugScrolling: true,     // Log scroll-based animation triggers
  monitorLayout: true       // Track layout shifts during animations
}; 