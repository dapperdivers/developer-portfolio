import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './TerminalControls.css';

/**
 * TerminalControls atom component for rendering terminal window controls
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant='macos'] - Visual variant ('macos', 'windows', 'linux')
 * @param {boolean} [props.interactive=false] - Whether controls are clickable
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onCloseClick] - Callback for close button click
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMinimizeClick] - Callback for minimize button click
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMaximizeClick] - Callback for maximize button click
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalControls component
 */
const TerminalControls = ({ 
  variant = 'macos',
  interactive = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  className = '',
  ...rest
}) => {
  // Determine class names based on props
  const classes = [
    'terminal-controls',
    `terminal-controls-${variant}`,
    interactive ? 'terminal-controls-interactive' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle interactivity
  const handleClose = interactive && onCloseClick ? onCloseClick : undefined;
  const handleMinimize = interactive && onMinimizeClick ? onMinimizeClick : undefined;
  const handleMaximize = interactive && onMaximizeClick ? onMaximizeClick : undefined;

  return (
    <div 
      className={classes}
      aria-hidden={!interactive}
      {...rest}
    >
      <button 
        className="terminal-circle terminal-circle-close"
        onClick={handleClose}
        aria-label="Close window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
      />
      <button 
        className="terminal-circle terminal-circle-minimize"
        onClick={handleMinimize}
        aria-label="Minimize window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
      />
      <button 
        className="terminal-circle terminal-circle-maximize"
        onClick={handleMaximize}
        aria-label="Maximize window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
      />
    </div>
  );
};

TerminalControls.propTypes = {
  variant: PropTypes.oneOf(['macos', 'windows', 'linux']),
  interactive: PropTypes.bool,
  onCloseClick: PropTypes.func, /* React.MouseEventHandler<HTMLButtonElement> */
  onMinimizeClick: PropTypes.func, /* React.MouseEventHandler<HTMLButtonElement> */
  onMaximizeClick: PropTypes.func, /* React.MouseEventHandler<HTMLButtonElement> */
  className: PropTypes.string
};

export default memo(TerminalControls);
