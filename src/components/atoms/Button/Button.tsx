import React from 'react';
import { Icon } from '@iconify/react';
import { motion, MotionProps } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './Button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'cyberpunk';

// Extra props are spread onto either a motion.button or a motion.a, so the
// HTML attributes are typed against HTMLElement rather than one tag.
export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps | 'children' | 'onClick'>,
    Omit<MotionProps, 'children'> {
  /** The button content */
  children?: React.ReactNode;
  /** Click handler function */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** URL to navigate to (renders as anchor when provided) */
  href?: string;
  /** Link target, used with `href` */
  target?: React.HTMLAttributeAnchorTarget;
  /** Link relationship, used with `href` */
  rel?: string;
  /** Iconify icon name (e.g. 'mdi:home') */
  icon?: string;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Whether to animate the button */
  animated?: boolean;
  /** Animation variant */
  animationVariant?: 'default' | 'tap' | 'hover';
}

/**
 * Button component for user interactions.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The button content
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, ghost; status and legacy aliases map onto them)
 * @param {string} [props.size='md'] - Button size (sm, md; lg is an alias of md)
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
}: ButtonProps) => {
  const motionOn = useMotionEnabled(animated);

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

  // Icon slot
  const iconElement = icon && (
    <span className={`btn-icon-${iconPosition}`} aria-hidden="true">
      <Icon icon={icon} />
    </span>
  );

  // Define animation variants
  const getButtonAnimations = () => {
    if (!motionOn) {
      return {};
    }

    // Default tap animation
    const tapAnimation = {
      scale: 0.95,
      transition: { duration: 0.1 }
    };

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
          whileTap: tapAnimation
        };
    }
  };

  // Common props
  const commonProps = {
    className: baseClasses,
    'aria-label': ariaLabel || (typeof children === 'string' ? children : undefined),
    'aria-disabled': disabled ? ('true' as const) : undefined,
    ...getButtonAnimations(),
    ...rest
  };

  const content = (
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
        {content}
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
      {content}
    </motion.button>
  );
};

export default Button;
