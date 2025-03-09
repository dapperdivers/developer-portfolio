import React, { memo, useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './GridBackground.css';

/**
 * GridBackground atomic component that creates a subtle grid pattern
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} GridBackground component
 */
interface GridBackgroundProps {
  /** Additional CSS class names */
  className?: string;
  /** Grid cell size in pixels (default: 30) */
  gridSize?: number;
  /** Grid line color (default: subtle gray) */
  gridColor?: string;
  /** Background color (default: transparent) */
  backgroundColor?: string;
  [key: string]: any;
}

const GridBackground = (props: GridBackgroundProps) => {
  const { 
    className = '', 
    gridSize = 30,
    gridColor = 'rgba(255, 255, 255, 0.1)',
    backgroundColor = 'rgba(0, 0, 0, 0.95)',
    ...rest 
  } = props;
  
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  const shouldAnimate = animationEnabled && !prefersReducedMotion;

  // Animation variants
  const variants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  }), []);
  
  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className={`
          fixed inset-0 w-full h-full -z-10 overflow-hidden
          pointer-events-none
          ${className}
        `}
        style={{
          backgroundColor,
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundPosition: 'center center'
        }}
        variants={variants}
        initial={shouldAnimate ? "initial" : "animate"}
        animate="animate"
        {...rest}
      />
    </LazyMotion>
  );
};

// Apply memoization for performance optimization
export default memo(GridBackground);
