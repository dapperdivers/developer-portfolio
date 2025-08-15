import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TerminalControls from '@atoms/TerminalControls';
import './TerminalTitleBar.css';

/**
 * TerminalTitleBar molecule component for rendering terminal window title bars
 * Combines TerminalControls with a title display
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title='kitty'] - Title text to display
 * @param {string} [props.variant='kitty'] - Visual variant ('kitty', 'security', 'hacker')
 * @param {boolean} [props.interactive=false] - Whether controls are interactive
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onCloseClick] - Callback for close button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMinimizeClick] - Callback for minimize button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMaximizeClick] - Callback for maximize button
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalTitleBar component
 */
const TerminalTitleBar = ({ 
  title,
  variant = 'kitty',
  interactive = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  className = '',
  ...rest
}) => {
  // Determine title based on variant
  const displayTitle = title || (
    variant === 'security' ? 'Alacritty' : 
    variant === 'hacker' ? 'H4CK3R-T3RM1N4L' : 
    'kitty'
  );
  
  // Build class names
  const classes = [
    'terminal-title-bar',
    `terminal-title-bar--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <TerminalControls 
        variant={variant}
        interactive={interactive}
        onCloseClick={onCloseClick}
        onMinimizeClick={onMinimizeClick}
        onMaximizeClick={onMaximizeClick}
      />
      <span className="terminal-title-bar__title">
        {displayTitle}
      </span>
    </div>
  );
};

TerminalTitleBar.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.oneOf(['kitty', 'security', 'hacker']),
  interactive: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onMinimizeClick: PropTypes.func,
  onMaximizeClick: PropTypes.func,
  className: PropTypes.string,
};

export default memo(TerminalTitleBar);