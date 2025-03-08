import React, { FC } from 'react';

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
const MatrixBackground: FC<MatrixBackgroundProps> = ({
  characterCount = 50,
  randomPositioning = true
}) => {
  return (
    <div className="matrix-background">
      {Array(characterCount).fill(null).map((_, i) => (
        <div 
          key={`matrix-char-${i}`}
          className="matrix-char"
          style={randomPositioning ? {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.1
          } : {
            animationDelay: `${i * 0.1}s`,
            opacity: 0.3
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      ))}
    </div>
  );
};

export default MatrixBackground;