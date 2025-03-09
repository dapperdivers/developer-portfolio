import React, { FC, memo, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import './MatrixBackground.css';
import { useAnimation, MotionVariants } from '@context//AnimationContext';
// No longer need direct import for debugging - it's handled centrally in App.jsx

export interface MatrixBackgroundProps {
  /** The number of characters to display */
  characterCount?: number;
  /** Whether to use random positioning */
  randomPositioning?: boolean;
}

/**
 * MatrixBackground component that creates a digital rain effect
 * Used for decorative cyberpunk UI backgrounds
 * 
 * @component
 * @example
 * <MatrixBackground characterCount={50} />
 */
const MatrixBackground: FC<MatrixBackgroundProps & { __debug?: any }> = ({
  characterCount = 50,
  randomPositioning = true,
  __debug // Debug props can still be received if registered centrally
}) => {
  // Get animation context
  const { animationEnabled } = useAnimation();
  
  // Memoize the matrix characters to prevent unnecessary re-renders
  const matrixCharacters = useMemo(() => {
    return Array(characterCount).fill(null).map((_, i) => {
      const customProps = randomPositioning ? {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1
      } : {
        delay: i * 0.1,
        opacity: 0.3
      };
      
      return (
        <motion.div 
          key={`matrix-char-${i}`}
          className="matrix-char"
          variants={MotionVariants.item}
          initial="hidden"
          animate="visible"
          custom={customProps}
          style={{ 
            left: customProps.left, 
            top: customProps.top
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      );
    });
  }, [characterCount, randomPositioning]);
  
  return (
    <motion.div 
      className="matrix-background"
      variants={MotionVariants.container}
      initial="hidden"
      animate="visible"
    >
      {matrixCharacters}
    </motion.div>
  );
};

// Export the component directly - debugging is applied centrally
export default memo(MatrixBackground);