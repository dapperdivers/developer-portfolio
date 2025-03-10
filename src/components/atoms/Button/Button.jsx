import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
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
 * @param {boolean} [props.animated=true] - Whether to animate the button
 * @param {string} [props.animationVariant='default'] - Animation variant (default, tap, hover)
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
  animated = true,
  animationVariant = 'default',
  ...rest
}) => {
  // Get animation context
  const { animationEnabled, defaultButtonVariants } = useAnimation();

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
    disabled ? 'disabled' : '',
    variant === 'cyberpunk' ? 'group' : ''
  ].filter(Boolean).join(' ');

  // Icon element with potential pulse animation for cyberpunk variant
  const iconElement = icon && (
    <span className={`btn-icon-${iconPosition} ${variant === 'cyberpunk' ? 'group-hover:animate-pulse' : ''}`}>
      <Icon icon={icon} />
    </span>
  );

  // Define animation variants
  const getButtonAnimations = () => {
    // Animation enabled check
    if (!animated || !animationEnabled) {
      return {};
    }

    // Default tap animation
    const tapAnimation = {
      scale: 0.95,
      transition: { duration: 0.1 }
    };

    // Cyberpunk-specific animations
    if (variant === 'cyberpunk') {
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.4 }
        },
        whileHover: { 
          scale: 1.05,
          boxShadow: "0 0 8px rgba(5, 213, 250, 0.5)",
          transition: { duration: 0.2 }
        },
        whileTap: tapAnimation
      };
    }

    // Standard animation variants
    switch (animationVariant) {
      case 'hover':
        return {
          whileHover: { scale: 1.05, transition: { duration: 0.2 } },
          whileTap: tapAnimation
        };
      case 'tap':
        return {
          whileTap: tapAnimation
        };
      case 'default':
      default:
        return {
          whileTap: tapAnimation,
          ...defaultButtonVariants
        };
    }
  };

  // Cyberpunk glint effect
  const GlintEffect = variant === 'cyberpunk' && (
    <motion.span 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-cyan/10 to-transparent"
      initial={{ x: "-100%", opacity: 0 }}
      whileHover={{
        x: "100%",
        opacity: [0, 0.3, 0],
        transition: { duration: 1.5 }
      }}
      style={{ rotate: 45 }}
    />
  );

  // Common props
  const commonProps = {
    className: baseClasses,
    'aria-label': ariaLabel || (typeof children === 'string' ? children : undefined),
    'aria-disabled': disabled ? 'true' : undefined,
    ...getButtonAnimations(),
    ...rest
  };

  // Wrap children for cyberpunk variant
  const wrappedChildren = variant === 'cyberpunk' ? (
    <>
      <span className="relative font-mono text-base sm:text-lg tracking-widest whitespace-nowrap z-10 flex items-center justify-center gap-2">
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </span>
      {GlintEffect}
    </>
  ) : (
    <>
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </>
  );

  // Render as motion anchor if href is provided
  if (href) {
    return (
      <motion.a
        href={disabled ? undefined : href}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        {...commonProps}
      >
        {wrappedChildren}
      </motion.a>
    );
  }

  // Render as motion button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...commonProps}
    >
      {wrappedChildren}
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'success', 
    'danger', 
    'warning', 
    'info', 
    'light', 
    'dark', 
    'link', 
    'critical', 
    'high', 
    'medium', 
    'low',
    'cyberpunk'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ariaLabel: PropTypes.string,
  animated: PropTypes.bool,
  animationVariant: PropTypes.oneOf(['default', 'tap', 'hover'])
};

export default Button;
