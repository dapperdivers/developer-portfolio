// Mock for framer-motion
import React from 'react';

// Filter out framer-motion specific props to avoid React DOM warnings
const filterMotionProps = (props) => {
  // These properties are destructured to filter them out, but aren't used
  // This is intentional to remove Framer Motion props before passing to DOM elements
  /* eslint-disable no-unused-vars */
  const {
    initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
    variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
    onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
  } = props;
  /* eslint-enable no-unused-vars */
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

// Create proper React components for motion elements
export const motion = {
  div: ({children, ...props}) => (
    <div data-testid="motion-div" {...filterMotionProps(props)}>
      {processChildren(children)}
    </div>
  ),
  section: ({children, ...props}) => (
    <section data-testid="motion-section" {...filterMotionProps(props)}>
      {processChildren(children)}
    </section>
  ),
  button: ({children, ...props}) => (
    <button data-testid="motion-button" {...filterMotionProps(props)}>
      {processChildren(children)}
    </button>
  ),
  a: ({children, ...props}) => (
    <a data-testid="motion-a" {...filterMotionProps(props)}>
      {processChildren(children)}
    </a>
  ),
  p: ({children, ...props}) => (
    <p data-testid="motion-p" {...filterMotionProps(props)}>
      {processChildren(children)}
    </p>
  ),
  span: ({children, ...props}) => (
    <span data-testid="motion-span" {...filterMotionProps(props)}>
      {processChildren(children)}
    </span>
  )
};

// AnimatePresence mock
export const AnimatePresence = ({children}) => (
  <div data-testid="animate-presence">
    {children}
  </div>
);

// Export any other Framer Motion utilities used in the app
export const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn()
});

export const useInView = () => [true, { ref: React.createRef() }];

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: jest.fn() },
  scrollYProgress: { get: () => 0, onChange: jest.fn() }
});