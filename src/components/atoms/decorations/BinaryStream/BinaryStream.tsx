import React, { FC, memo, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import './BinaryStream.css';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
// No longer need direct import for debugging - it's handled centrally in App.jsx

export interface BinaryStreamProps {
  /** The side to position the stream (left, right, top, bottom) */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** The number of binary digits to display */
  count?: number;
  /** Base animation delay in seconds */
  baseDelay?: number;
}

// Motion variants for binary stream
const streamVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

/**
 * BinaryStream component for displaying animated binary digits
 * Used for decorative purposes in cyberpunk UI elements
 * 
 * @component
 * @example
 * <BinaryStream position="left" count={30} />
 */
const BinaryStream: FC<BinaryStreamProps & { __debug?: any }> = ({
  position = 'left',
  count = 30,
  baseDelay = 0.1,
  __debug // Debug props can still be received if registered centrally
}) => {
  // Get animation context
  const { animationEnabled } = useAnimation();
  
  // Select the appropriate variant based on position
  const getBinaryVariant = (): Variants => {
    switch(position) {
      case 'left': return MotionVariants.binaryLeft;
      case 'right': return MotionVariants.binaryRight;
      case 'top': return MotionVariants.binaryTop;
      case 'bottom': return MotionVariants.binaryBottom;
      default: return MotionVariants.binaryLeft;
    }
  };
  
  // Memoize the binary digits to prevent unnecessary re-renders
  const binaryDigits = useMemo(() => {
    return Array(count).fill(null).map((_, i) => (
      <motion.div 
        key={`binary-${position}-${i}`} 
        className="binary"
        variants={getBinaryVariant()}
        custom={i * baseDelay}
      >
        {Math.random() > 0.5 ? '1' : '0'}
      </motion.div>
    ));
  }, [count, position, baseDelay, getBinaryVariant]);
  
  return (
    <motion.div 
      className={`binary-stream binary-stream--${position}`}
      variants={streamVariants}
      initial="hidden"
      animate="visible"
    >
      {binaryDigits}
    </motion.div>
  );
};

// Export the component directly - debugging is applied centrally
export default memo(BinaryStream);