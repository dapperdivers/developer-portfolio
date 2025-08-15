import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './TerminalPrompt.css';

/**
 * TerminalPrompt atom component for rendering terminal command prompts
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.text='user@portfolio:~$'] - Prompt text to display
 * @param {string} [props.variant='default'] - Visual variant ('default', 'security', 'terminal')
 * @param {boolean} [props.mobile=false] - Whether to use mobile-optimized version
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalPrompt component
 */
const TerminalPrompt = ({ 
  text = 'user@portfolio:~$',
  variant = 'default',
  mobile = false,
  className = '',
  ...rest
}) => {
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

TerminalPrompt.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'security', 'terminal']),
  mobile: PropTypes.bool,
  className: PropTypes.string,
};

export default memo(TerminalPrompt);