import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import './ScrollDown.css';

/**
 * ScrollDown atomic component
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ScrollDown component
 */
interface ScrollDownProps {
  /** Click handler for the scroll down action */
  onClick?: () => void;
  /** Custom label (defaults to ">>_NEXT") */
  label?: string;
  /** Additional CSS class names */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

const ScrollDown = ({ 
  onClick, 
  label = '>>_NEXT', 
  className = '',
  animated = true 
}: ScrollDownProps) => {
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
  // Only animate if both component prop and global setting allow it
  const shouldAnimate = animated && animationEnabled;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 1.5, duration: 0.8 }
    }
  };
  
  const dataFlowVariants = {
    animate: {
      opacity: [0, 1, 0],
      y: [0, 48, 48],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
        times: [0, 0.5, 1]
      }
    }
  };
  
  const labelVariants = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }
    }
  };

  return (
    <motion.button
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? "visible" : false}
      variants={containerVariants}
      className={`scroll-down-container group ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <div className="flex flex-col items-center">
        {/* Main indicator */}
        <div className="relative h-16 flex items-center">
          {/* Central line with data points */}
          <div className="relative w-px h-full bg-theme-cyan/20">
            {/* Animated data points */}
            <motion.div
              animate={shouldAnimate ? dataFlowVariants.animate : false}
              className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="w-3 h-0.5 bg-theme-cyan data-point"></div>
              <div className="w-2 h-0.5 bg-theme-cyan/60 data-point"></div>
              <div className="w-1 h-0.5 bg-theme-cyan/30 data-point"></div>
            </motion.div>

            {/* Static base marker */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-theme-cyan"></div>
          </div>

          {/* Side interface elements */}
          <div className="absolute inset-y-0 -left-3 flex flex-col justify-between py-1">
            <div className="interface-dot"></div>
            <div className="interface-dot"></div>
            <div className="interface-dot"></div>
          </div>
          
          <div className="absolute inset-y-0 -right-3 flex flex-col justify-between py-1">
            <div className="interface-dot"></div>
            <div className="interface-dot"></div>
            <div className="interface-dot"></div>
          </div>
        </div>

        {/* Label */}
        <motion.div 
          className="mt-2 terminal-text"
          animate={shouldAnimate ? labelVariants.animate : false}
        >
          <span className="text-xs font-mono text-theme-cyan tracking-widest">
            {label}
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
};

// Apply memoization for performance optimization
export default memo(ScrollDown);
