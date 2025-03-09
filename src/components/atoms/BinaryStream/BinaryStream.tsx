import React, { FC, memo, useMemo } from 'react';
import './BinaryStream.css';
// No longer need direct import for debugging - it's handled centrally in App.jsx

export interface BinaryStreamProps {
  /** The side to position the stream (left, right, top, bottom) */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** The number of binary digits to display */
  count?: number;
  /** Base animation delay in seconds */
  baseDelay?: number;
}

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
  // Memoize the binary digits to prevent unnecessary re-renders
  const binaryDigits = useMemo(() => {
    return Array(count).fill(null).map((_, i) => (
      <div 
        key={`binary-${position}-${i}`} 
        className="binary" 
        style={{ animationDelay: `${i * baseDelay}s` }}
      >
        {Math.random() > 0.5 ? '1' : '0'}
      </div>
    ));
  }, [count, position, baseDelay]);
  
  return (
    <div className={`binary-stream binary-stream--${position}`}>
      {binaryDigits}
    </div>
  );
};

// Export the component directly - debugging is applied centrally
export default memo(BinaryStream);