import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './CodeSnippet.css';

/**
 * CodeSnippet atom component for displaying code snippets
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.code - Code snippet text
 * @param {string} [props.language=''] - Programming language for syntax highlighting
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.theme='dark'] - Color theme ('dark', 'light')
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {boolean} [props.isDecorative=false] - Whether this is a decorative element
 * @param {string} [props.ariaDescription] - Accessible description
 * @returns {React.ReactElement} CodeSnippet component
 */
const CodeSnippet = ({ 
  code,
  language = '',
  variant = '',
  theme = 'dark',
  className = '',
  style = {},
  isDecorative = false,
  ariaDescription,
  ...rest
}) => {
  const codeRef = useRef(null);

  // Apply basic syntax highlighting
  useEffect(() => {
    if (!codeRef.current || !language) return;
    
    // Very simple syntax highlighting for JavaScript/TypeScript
    if (language === 'javascript' || language === 'typescript') {
      let content = code;
      
      // Highlight keywords
      const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'import', 'export', 'from', 'true', 'false', 'null', 'undefined'];
      keywords.forEach(keyword => {
        // Use word boundary to match whole words only
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        content = content.replace(regex, `<span class="token-keyword">${keyword}</span>`);
      });
      
      // Highlight strings
      content = content.replace(/(["'])(.*?)\1/g, '<span class="token-string">$&</span>');
      
      // Highlight comments (line and block)
      content = content.replace(/\/\/.*$/gm, '<span class="token-comment">$&</span>');
      content = content.replace(/\/\*[\s\S]*?\*\//g, '<span class="token-comment">$&</span>');
      
      // Highlight function names
      content = content.replace(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, 'function <span class="token-function">$1</span>');
      
      // Set the highlighted content
      codeRef.current.innerHTML = content;
    } else {
      // For other languages, just use the original content
      codeRef.current.textContent = code;
    }
  }, [code, language]);

  // Determine class names based on props
  const classes = [
    'code-snippet',
    `code-snippet-${theme}`,
    language ? `language-${language}` : '',
    variant ? `code-snippet-${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  // Define accessibility attributes
  const a11yProps = isDecorative 
    ? { 'aria-hidden': true } 
    : { 
        'aria-label': ariaDescription || `Code snippet in ${language || 'unknown'} language` 
      };

  return (
    <div 
      className={classes}
      style={style}
      data-testid="code-snippet"
      {...a11yProps}
      {...rest}
    >
      <pre>
        <code 
          className={language ? `language-${language}` : ''}
          ref={codeRef}
        >
          {/* Content will be set by useEffect for syntax highlighting */}
          {code}
        </code>
      </pre>
    </div>
  );
};

CodeSnippet.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  theme: PropTypes.oneOf(['dark', 'light']),
  className: PropTypes.string,
  style: PropTypes.object,
  isDecorative: PropTypes.bool,
  ariaDescription: PropTypes.string
};

export default memo(CodeSnippet);
