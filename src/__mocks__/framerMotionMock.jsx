// Mock for framer-motion
import React from 'react';
import { vi } from 'vitest';

// Filter out framer-motion specific props to avoid React DOM warnings
const filterMotionProps = (props) => {
  // These properties are destructured to filter them out, but aren't used
  // This is intentional to remove Framer Motion props before passing to DOM elements
   
  const {
    initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
    variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
    onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
  } = props;
   
  return filteredProps;
};

// Process children to ensure nested motion components are properly handled
const processChildren = (children) => {
  return React.Children.map(children, child => {
    // If this isn't a React element (like a string or number), return as is
    if (!React.isValidElement(child)) {
      return child;
    }
    return child;
  });
};

// Create proper React components for motion elements using forwardRef
export const motion = {
  div: React.forwardRef(({children, ...props}, ref) => (
    <div ref={ref} data-testid="motion-div" {...filterMotionProps(props)}>
      {processChildren(children)}
    </div>
  )),
  section: React.forwardRef(({children, ...props}, ref) => (
    <section ref={ref} data-testid="motion-section" {...filterMotionProps(props)}>
      {processChildren(children)}
    </section>
  )),
  button: React.forwardRef(({children, ...props}, ref) => (
    <button ref={ref} data-testid="motion-button" {...filterMotionProps(props)}>
      {processChildren(children)}
    </button>
  )),
  a: React.forwardRef(({children, ...props}, ref) => (
    <a ref={ref} data-testid="motion-a" {...filterMotionProps(props)}>
      {processChildren(children)}
    </a>
  )),
  p: React.forwardRef(({children, ...props}, ref) => (
    <p ref={ref} data-testid="motion-p" {...filterMotionProps(props)}>
      {processChildren(children)}
    </p>
  )),
  span: React.forwardRef(({children, ...props}, ref) => (
    <span ref={ref} data-testid="motion-span" {...filterMotionProps(props)}>
      {processChildren(children)}
    </span>
  ))
};

// AnimatePresence mock
export const AnimatePresence = ({children}) => (
  <div data-testid="animate-presence">
    {children}
  </div>
);

// Export any other Framer Motion utilities used in the app
export const useAnimation = () => ({
  start: vi.fn(),
  stop: vi.fn()
});

export const useInView = () => [true, { ref: React.createRef() }];

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: vi.fn() },
  scrollYProgress: { get: () => 0, onChange: vi.fn() }
});
