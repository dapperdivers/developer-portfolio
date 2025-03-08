import React, { FC, memo } from 'react';
import { motion } from 'framer-motion';

export interface ConnectionHeaderProps {
  /** The title to display */
  title?: string;
  /** The status code to display */
  statusCode?: string;
  /** Whether to animate the header */
  animate?: boolean;
  /** The variant of the header */
  variant?: '' | 'security' | 'terminal' | 'cyberpunk';
}

/**
 * Connection header component for timelines
 */
export const ConnectionHeader: FC<ConnectionHeaderProps> = ({
  title = 'SECURE CONNECTION ESTABLISHED',
  statusCode = '[0xFF2941] VERIFIED',
  animate = true,
  variant = 'security'
}) => {
  const component = (
    <div className="secure-connection-start">
      <div className="secure-connection-status">
        <span className="connection-pulse"></span>
        <div className="secure-label">
          <div className="scanner-line"></div>
          {title}
          <div className="status-code">{statusCode}</div>
        </div>
        <div className="secure-connection-shield">
          <div className="shield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // If animation is enabled, wrap in motion.div
  return animate ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      data-testid="connection-start"
    >
      {component}
    </motion.div>
  ) : component;
};

export interface BinaryStreamProps {
  /** The side to position the stream (left, right, top, bottom) */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** The number of binary digits to display */
  count?: number;
  /** Base animation delay in seconds */
  baseDelay?: number;
}

/**
 * Binary stream decorative component
 */
export const BinaryStream: FC<BinaryStreamProps> = ({
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

export interface MatrixBackgroundProps {
  /** The number of characters to display */
  characterCount?: number;
}

/**
 * Matrix-style digital rain background
 */
export const MatrixBackground: FC<MatrixBackgroundProps> = ({
  characterCount = 50
}) => {
  return (
    <div className="matrix-background">
      {Array(characterCount).fill(null).map((_, i) => (
        <div 
          key={`matrix-char-${i}`}
          className="matrix-char"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.1
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      ))}
    </div>
  );
};

/**
 * Container for security theme decorations
 */
export const SecurityDecorations: FC<{showLeft?: boolean; showRight?: boolean}> = ({
  showLeft = true,
  showRight = true
}) => {
  return (
    <div className="security-decorations">
      {showLeft && <BinaryStream position="left" />}
      {showRight && <BinaryStream position="right" baseDelay={0.2} />}
    </div>
  );
};

export default {
  ConnectionHeader,
  BinaryStream,
  MatrixBackground,
  SecurityDecorations
};