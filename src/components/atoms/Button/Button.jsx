import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import './Button.css';

/**
 * Button component for user interactions.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The button content
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, success, danger, link)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.href] - URL to navigate to (renders as anchor when provided)
 * @param {string} [props.icon] - Iconify icon name (e.g. 'mdi:home')
 * @param {string} [props.iconPosition='left'] - Icon position (left, right)
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.ariaLabel] - Aria label for accessibility
 * @returns {ReactElement} The Button component
 * 
 * @example
 * <Button onClick={() => console.log('clicked')} variant="secondary" size="lg">
 *   Click Me
 * </Button>
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  ariaLabel,
  ...rest
}) => {
  // Determine size class
  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }[size];

  // Base classes
  const baseClasses = [
    'btn',
    `btn-${variant}`,
    sizeClass,
    className,
    icon && !children ? 'btn-icon' : '',
    disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  // Icon element
  const iconElement = icon && (
    <span className={`btn-icon-${iconPosition}`}>
      <Icon icon={icon} />
    </span>
  );

  // Common props
  const commonProps = {
    className: baseClasses,
    'aria-label': ariaLabel || (typeof children === 'string' ? children : undefined),
    'aria-disabled': disabled ? 'true' : undefined,
    ...rest
  };

  // Render as anchor if href is provided
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        {...commonProps}
      >
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...commonProps}
    >
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ariaLabel: PropTypes.string
};

export default Button;
