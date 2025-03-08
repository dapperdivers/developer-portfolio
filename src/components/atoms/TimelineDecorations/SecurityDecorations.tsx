import React, { FC } from 'react';
import BinaryStream from './BinaryStream';

export interface SecurityDecorationsProps {
  /** Whether to show the left binary stream */
  showLeft?: boolean;
  /** Whether to show the right binary stream */
  showRight?: boolean;
  /** Whether to show the top binary stream */
  showTop?: boolean;
  /** Whether to show the bottom binary stream */
  showBottom?: boolean;
}

/**
 * SecurityDecorations component that adds cyberpunk binary streams to UI
 * Typically used to create cybersecurity-themed decorative elements
 * 
 * @component
 * @example
 * <SecurityDecorations showLeft={true} showRight={true} />
 */
const SecurityDecorations: FC<SecurityDecorationsProps> = ({
  showLeft = true,
  showRight = true,
  showTop = false,
  showBottom = false
}) => {
  return (
    <div className="security-decorations">
      {showLeft && <BinaryStream position="left" />}
      {showRight && <BinaryStream position="right" baseDelay={0.2} />}
      {showTop && <BinaryStream position="top" baseDelay={0.15} />}
      {showBottom && <BinaryStream position="bottom" baseDelay={0.25} />}
    </div>
  );
};

export default SecurityDecorations;