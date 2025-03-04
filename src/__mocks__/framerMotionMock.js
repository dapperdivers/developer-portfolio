// Mock for framer-motion
import React from 'react';

// Filter out framer-motion specific props to avoid React DOM warnings
const filterMotionProps = (props) => {
  const {
    initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
    variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
    onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
  } = props;
  return filteredProps;
};

// Create proper React components for motion elements
export const motion = {
  div: ({children, ...props}) => (
    <div data-testid="motion-div" {...filterMotionProps(props)}>
      {children}
    </div>
  ),
  section: ({children, ...props}) => (
    <section data-testid="motion-section" {...filterMotionProps(props)}>
      {children}
    </section>
  ),
  button: ({children, ...props}) => (
    <button data-testid="motion-button" {...filterMotionProps(props)}>
      {children}
    </button>
  ),
  a: ({children, ...props}) => (
    <a data-testid="motion-a" {...filterMotionProps(props)}>
      {children}
    </a>
  ),
  p: ({children, ...props}) => (
    <p data-testid="motion-p" {...filterMotionProps(props)}>
      {children}
    </p>
  ),
  span: ({children, ...props}) => (
    <span data-testid="motion-span" {...filterMotionProps(props)}>
      {children}
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