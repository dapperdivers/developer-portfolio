import React, { FC, memo, useMemo } from 'react';
import './MatrixBackground.css';
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
  // Memoize the matrix characters to prevent unnecessary re-renders
  const matrixCharacters = useMemo(() => {
    return Array(characterCount).fill(null).map((_, i) => {
      const style = randomPositioning ? {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.1
      } : {
        animationDelay: `${i * 0.1}s`,
        opacity: 0.3
      };
      
      return (
        <div 
          key={`matrix-char-${i}`}
          className="matrix-char"
          style={style}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      );
    });
  }, [characterCount, randomPositioning]);
  
  return (
    <div className="matrix-background">
      {matrixCharacters}
    </div>
  );
};

// Export the component directly - debugging is applied centrally
export default memo(MatrixBackground);