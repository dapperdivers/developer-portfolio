import React, { memo, useState, useRef, useEffect } from 'react';
import TerminalPrompt from '@atoms/TerminalPrompt';
import TerminalCursor from '@atoms/TerminalCursor';
import './TerminalCommandLine.css';

export type TerminalCommandLineVariant = 'default' | 'security' | 'terminal' | 'kitty';

export interface TerminalCommandLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Command prompt text */
  prompt?: string;
  /** Command text (for display mode) */
  command?: string;
  /** Placeholder text for input mode */
  placeholder?: string;
  /** Shorter placeholder used at 480px and narrower */
  compactPlaceholder?: string;
  /** Whether to show interactive input */
  interactive?: boolean;
  /** Callback when command is executed; may be async */
  onCommand?: (command: string) => void | Promise<void>;
  /** Whether to show the blinking cursor */
  showCursor?: boolean;
  /** Visual variant */
  variant?: TerminalCommandLineVariant;
  /** Whether command is being processed */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether the cursor blinks */
  animated?: boolean;
}

/**
 * TerminalCommandLine molecule component for rendering terminal command lines
 * Combines TerminalPrompt, command text/input, and TerminalCursor
 * 
 * @component
 */
const TerminalCommandLine = ({ 
  prompt = 'user@portfolio:~$',
  command = '',
  placeholder = '',
  compactPlaceholder = '',
  interactive = false,
  onCommand,
  showCursor = true,
  variant = 'default',
  isLoading = false,
  className = '',
  animated = true,
  ...rest
}: TerminalCommandLineProps) => {
  // State management
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsNarrow(window.innerWidth <= 480);
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press with loading state
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            animated={animated}
          />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isNarrow && compactPlaceholder ? compactPlaceholder : placeholder}
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
            animated={animated}
          />
        </>
      )}
    </div>
  );
};

export default memo(TerminalCommandLine);