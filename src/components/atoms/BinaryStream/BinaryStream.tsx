import React, { FC } from 'react';
import './BinaryStream.css';

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
const BinaryStream: FC<BinaryStreamProps> = ({
  position = 'left',
  count = 30,
  baseDelay = 0.1
}) => {
  return (
    <div className={`binary-stream binary-stream--${position}`}>
      {Array(count).fill(null).map((_, i) => (
        <div 
          key={`binary-${position}-${i}`} 
          className="binary" 
          style={{ animationDelay: `${i * baseDelay}s` }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      ))}
    </div>
  );
};

export default BinaryStream;