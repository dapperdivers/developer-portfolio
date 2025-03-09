import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation, MotionVariants } from '@context//AnimationContext';
import './Card.css';

/**
 * Card component for displaying content in a contained box.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} [props.children] - The card content
 * @param {React.ReactNode} [props.header] - The card header content
 * @param {React.ReactNode} [props.footer] - The card footer content
 * @param {React.ReactNode} [props.title] - The card title
 * @param {React.ReactNode} [props.subtitle] - The card subtitle
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.hoverable=false] - Whether the card has hover effects
 * @param {boolean} [props.bordered=true] - Whether the card has a border
 * @param {boolean} [props.shadow=false] - Whether the card has a shadow
 * @param {string} [props.variant=''] - Card variant ('', 'security', 'terminal')
 * @param {Object} [props.animation] - Custom animation overrides for Framer Motion
 * @param {string} [props.ariaLabel] - Aria label for accessibility
 * @param {boolean} [props.animated=true] - Whether the card should animate
 * @param {string} [props.animationVariant='default'] - Type of animation to use ('default', 'scale', 'slide')
 * @returns {React.ReactElement} The Card component
 *
 * @example
 * <Card
 *   header={<h3>Card Title</h3>}
 *   footer={<Button>Learn More</Button>}
 *   variant="security"
 *   hoverable
 *   shadow
 *   animationVariant="scale"
 * >
 *   <p>Card content goes here</p>
 * </Card>
 */
const Card = ({
  children,
  header,
  footer,
  title,
  subtitle,
  className = '',
  hoverable = false,
  bordered = true,
  shadow = false,
  variant = '',
  animation, // Keep for backward compatibility
  ariaLabel,
  animated = true,
  animationVariant = 'default',
  ...rest
}) => {
  // Get animation context
  const { animationEnabled, fadeInVariants, scaleVariants, slideUpVariants } = useAnimation();
  
  // Base classes
  const baseClasses = [
    'card',
    variant ? `card-${variant}` : '',
    hoverable ? 'card-hoverable' : '',
    bordered ? 'card-bordered' : '',
    shadow ? 'card-shadow' : '',
    className
  ].filter(Boolean).join(' ');

  // Header element
  const headerElement = header || (title || subtitle) ? (
    <div className="card-header">
      {header || (
        <>
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </>
      )}
    </div>
  ) : null;

  // Footer element
  const footerElement = footer && (
    <div className="card-footer">
      {footer}
    </div>
  );
  
  // Choose animation variant based on prop
  const getAnimationVariant = () => {
    if (!animationEnabled || !animated) return {};
    
    // Custom animation takes precedence if provided
    if (animation) return animation;
    
    // Otherwise choose from predefined animations
    switch (animationVariant) {
      case 'scale':
        return scaleVariants;
      case 'slide':
        return slideUpVariants;
      case 'default':
      default:
        return fadeInVariants;
    }
  };

  // Always return motion component for consistent behavior
  return (
    <motion.div
      className={baseClasses}
      aria-label={ariaLabel}
      initial={animated && animationEnabled ? "hidden" : false}
      animate={animated && animationEnabled ? "visible" : false}
      variants={getAnimationVariant()}
      transition={{ duration: 0.5 }}
      {...rest}
    >
      {headerElement}
      <div className="card-body">
        {children}
      </div>
      {footerElement}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
  shadow: PropTypes.bool,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  animation: PropTypes.object,
  ariaLabel: PropTypes.string,
  animated: PropTypes.bool,
  animationVariant: PropTypes.oneOf(['default', 'scale', 'slide'])
};

export default Card;
