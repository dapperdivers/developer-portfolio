import React, { FC, useMemo } from 'react';
import MatrixBackground from './MatrixBackground';
import BinaryStream from './BinaryStream';
import './TimelineDecorations.css';

export interface TimelineDecorationsProps {
  /** Visual variant/theme */
  variant?: 'default' | 'security' | 'terminal';
  /** Whether to show the left side decorations */
  showLeft?: boolean;
  /** Whether to show the right side decorations */
  showRight?: boolean;
  /** Whether to show top binary stream (security variant) */
  showTop?: boolean;
  /** Whether to show bottom binary stream (security variant) */
  showBottom?: boolean;
  /** Number of binary stream characters */
  binaryStreamCount?: number;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TimelineDecorations component
 * Unified decorations component supporting multiple themes:
 * - security: Binary code streams with cybersecurity aesthetic
 * - terminal: Terminal/console-themed decorations
 * 
 * @component
 * @example
 * <TimelineDecorations variant="security" showLeft showRight />
 */
const TimelineDecorations: FC<TimelineDecorationsProps> = ({
  variant = 'security',
  showLeft = true,
  showRight = true,
  showTop = false,
  showBottom = false,
  binaryStreamCount = 40,
  className = ''
}) => {
  // Classes based on variant
  const decorationClasses = [
    'timeline-decorations',
    `timeline-decorations--${variant}`,
    className
  ].filter(Boolean).join(' ');
  
  // Default to security variant
  if (variant === 'security' || variant === 'default') {
    return (
      <div className={decorationClasses}>
        {showLeft && <BinaryStream position="left" count={binaryStreamCount} />}
        {showRight && <BinaryStream position="right" count={binaryStreamCount} baseDelay={0.2} />}
        {showTop && <BinaryStream position="top" count={binaryStreamCount} baseDelay={0.15} />}
        {showBottom && <BinaryStream position="bottom" count={binaryStreamCount} baseDelay={0.25} />}
      </div>
    );
  }
  
  // Terminal variant
  if (variant === 'terminal') {
    return (
      <div className={decorationClasses}>
        {showLeft && <BinaryStream position="left" count={binaryStreamCount} baseDelay={0.1} />}
        {showRight && <BinaryStream position="right" count={binaryStreamCount} baseDelay={0.15} />}
      </div>
    );
  }

  // Default fallback
  return (
    <div className={decorationClasses}>
      {showLeft && <BinaryStream position="left" count={binaryStreamCount} />}
      {showRight && <BinaryStream position="right" count={binaryStreamCount} baseDelay={0.2} />}
    </div>
  );
};

export default TimelineDecorations;