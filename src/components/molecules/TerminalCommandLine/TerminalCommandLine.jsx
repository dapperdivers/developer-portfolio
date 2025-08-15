import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TerminalPrompt from '@atoms/TerminalPrompt';
import TerminalCursor from '@atoms/TerminalCursor';
import './TerminalCommandLine.css';

/**
 * TerminalCommandLine molecule component for rendering terminal command lines
 * Combines TerminalPrompt, command text/input, and TerminalCursor
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.prompt='user@portfolio:~$'] - Command prompt text
 * @param {string} [props.command=''] - Command text (for display mode)
 * @param {string} [props.placeholder=''] - Placeholder text for input mode
 * @param {boolean} [props.interactive=false] - Whether to show interactive input
 * @param {function} [props.onCommand] - Callback when command is executed
 * @param {boolean} [props.showCursor=true] - Whether to show the blinking cursor
 * @param {string} [props.variant='default'] - Visual variant ('default', 'security', 'terminal', 'kitty')
 * @param {boolean} [props.isLoading=false] - Whether command is being processed
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalCommandLine component
 */
const TerminalCommandLine = ({ 
  prompt = 'user@portfolio:~$',
  command = '',
  placeholder = '',
  interactive = false,
  onCommand,
  showCursor = true,
  variant = 'default',
  isLoading = false,
  className = '',
  ...rest
}) => {
  // State management
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Build class names
  const classes = [
    'terminal-command-line',
    `terminal-command-line--${variant}`,
    interactive ? 'terminal-command-line--interactive' : '',
    isFocused ? 'terminal-command-line--focused' : '',
    isLoading ? 'terminal-command-line--loading' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press with loading state
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      try {
        if (onCommand) {
          await onCommand(inputValue.trim());
        }
        setInputValue('');
      } catch (error) {
        console.error('Command execution error:', error);
      }
    }
  };

  // Handle focus/blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Click handler to focus input
  const handleClick = () => {
    if (interactive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      <TerminalPrompt 
        text={prompt}
        variant={variant}
        mobile={isMobile}
      />
      
      {interactive ? (
        <div className="terminal-command-line__input-container">
          <TerminalCursor 
            show={showCursor}
            focused={isFocused}
            variant={variant}
            className="terminal-command-line__cursor--input"
          />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="terminal-command-line__input"
            aria-label={`Terminal input. ${placeholder}`}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      ) : (
        <>
          <span className="terminal-command-line__command">
            {command}
          </span>
          <TerminalCursor 
            show={showCursor}
            focused={false}
            variant={variant}
          />
        </>
      )}
    </div>
  );
};

TerminalCommandLine.propTypes = {
  prompt: PropTypes.string,
  command: PropTypes.string,
  placeholder: PropTypes.string,
  interactive: PropTypes.bool,
  onCommand: PropTypes.func,
  showCursor: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'security', 'terminal', 'kitty']),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default memo(TerminalCommandLine);