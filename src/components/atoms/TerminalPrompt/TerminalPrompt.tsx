import React, { memo } from 'react';
import './TerminalPrompt.css';

export interface TerminalPromptProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Prompt text to display */
  text?: string;
  /** Visual variant */
  variant?: 'default' | 'security' | 'terminal' | 'kitty';
  /** Whether to use mobile-optimized version */
  mobile?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TerminalPrompt atom component for rendering terminal command prompts
 * 
 * @component
 */
const TerminalPrompt = ({ 
  text = 'user@portfolio:~$',
  variant = 'default',
  mobile = false,
  className = '',
  ...rest
}: TerminalPromptProps) => {
  // Use shorter prompt on mobile
  const displayText = mobile ? text.replace(/.*@(.*)/, '$1').replace(/^.*:/, 'user:') : text;
  
  // Build class names
  const classes = [
    'terminal-prompt',
    `terminal-prompt--${variant}`,
    mobile ? 'terminal-prompt--mobile' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={classes}
      aria-hidden="true"
      {...rest}
    >
      {displayText}
    </span>
  );
};

export default memo(TerminalPrompt);