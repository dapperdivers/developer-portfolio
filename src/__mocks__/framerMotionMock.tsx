// Mock for framer-motion
import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode, RefObject } from 'react';
import { vi } from 'vitest';

// Framer Motion props the mock accepts and drops before rendering
interface MotionOnlyProps {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  whileFocus?: unknown;
  whileInView?: unknown;
  variants?: unknown;
  viewport?: unknown;
  drag?: unknown;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  onDragStart?: unknown;
  onDrag?: unknown;
  onDragEnd?: unknown;
  layout?: unknown;
  layoutId?: unknown;
}

type MockMotionProps<T extends 'div' | 'section' | 'button' | 'a' | 'p' | 'span'> =
  Omit<ComponentPropsWithoutRef<T>, keyof MotionOnlyProps> & MotionOnlyProps;

// Filter out framer-motion specific props to avoid React DOM warnings
const filterMotionProps = <P extends MotionOnlyProps>(props: P): Omit<P, keyof MotionOnlyProps> => {
  // These properties are destructured to filter them out, but aren't used
  // This is intentional to remove Framer Motion props before passing to DOM elements
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
    variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
    onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return filteredProps;
};

// Process children to ensure nested motion components are properly handled
const processChildren = (children: ReactNode) => {
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
  div: React.forwardRef<HTMLDivElement, MockMotionProps<'div'>>(({children, ...props}, ref) => (
    <div ref={ref} data-testid="motion-div" {...filterMotionProps(props)}>
      {processChildren(children)}
    </div>
  )),
  section: React.forwardRef<HTMLElement, MockMotionProps<'section'>>(({children, ...props}, ref) => (
    <section ref={ref} data-testid="motion-section" {...filterMotionProps(props)}>
      {processChildren(children)}
    </section>
  )),
  button: React.forwardRef<HTMLButtonElement, MockMotionProps<'button'>>(({children, ...props}, ref) => (
    <button ref={ref} data-testid="motion-button" {...filterMotionProps(props)}>
      {processChildren(children)}
    </button>
  )),
  a: React.forwardRef<HTMLAnchorElement, MockMotionProps<'a'>>(({children, ...props}, ref) => (
    <a ref={ref} data-testid="motion-a" {...filterMotionProps(props)}>
      {processChildren(children)}
    </a>
  )),
  p: React.forwardRef<HTMLParagraphElement, MockMotionProps<'p'>>(({children, ...props}, ref) => (
    <p ref={ref} data-testid="motion-p" {...filterMotionProps(props)}>
      {processChildren(children)}
    </p>
  )),
  span: React.forwardRef<HTMLSpanElement, MockMotionProps<'span'>>(({children, ...props}, ref) => (
    <span ref={ref} data-testid="motion-span" {...filterMotionProps(props)}>
      {processChildren(children)}
    </span>
  ))
};

// AnimatePresence mock
export const AnimatePresence = ({children}: { children?: ReactNode }) => (
  <div data-testid="animate-presence">
    {children}
  </div>
);

// Export any other Framer Motion utilities used in the app
export const useAnimation = () => ({
  start: vi.fn().mockResolvedValue(undefined),
  stop: vi.fn(),
  set: vi.fn(),
  mount: vi.fn(),
  unmount: vi.fn()
});

// Arguments are accepted for API compatibility and ignored
export const useInView = (_ref?: RefObject<Element | null>, _options?: unknown) => {
  return true; // Mock always returns true for inView
};

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: vi.fn() },
  scrollYProgress: { get: () => 0, onChange: vi.fn() }
});
