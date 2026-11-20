import { useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

/**
 * Shared motion primitives for building blocks.
 *
 * Atoms and molecules import from here instead of reading the animation
 * context, so they render with no provider around them. Everything in this
 * file is either a constant or relies only on Framer Motion.
 */

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
} satisfies Variants;

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} satisfies Variants;

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
} satisfies Variants;

/** Seconds between successive items in a staggered list. */
export const STAGGER_DELAY = 0.15;

/** CSS delay for the item at `index` in a staggered list, e.g. "0.3s". */
export const staggerDelay = (index: number) => `${index * STAGGER_DELAY}s`;

/**
 * Whether a block should animate: its `animated` prop is on and the visitor
 * has not asked the system for reduced motion.
 *
 * @param {boolean} [animated=true] - The block's own `animated` prop
 * @returns {boolean}
 */
export const useMotionEnabled = (animated: boolean = true): boolean => {
  const prefersReducedMotion = useReducedMotion();
  return Boolean(animated) && !prefersReducedMotion;
};
