import React, { FC } from 'react';
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
 * Displays a cyberpunk-style secure connection header
 */
const ConnectionHeader: FC<ConnectionHeaderProps> = ({
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

export default ConnectionHeader;