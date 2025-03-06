import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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
 * @param {Object} [props.animation] - Animation properties for Framer Motion
 * @param {string} [props.ariaLabel] - Aria label for accessibility
 * @returns {React.ReactElement} The Card component
 *
 * @example
 * <Card
 *   header={<h3>Card Title</h3>}
 *   footer={<Button>Learn More</Button>}
 *   variant="security"
 *   hoverable
 *   shadow
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
  animation,
  ariaLabel,
  ...rest
}) => {
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

  // Handle animation with Framer Motion
  if (animation) {
    return (
      <motion.div
        className={baseClasses}
        aria-label={ariaLabel}
        {...animation}
        {...rest}
      >
        {headerElement}
        <div className="card-body">
          {children}
        </div>
        {footerElement}
      </motion.div>
    );
  }

  // Render regular card without animation
  return (
    <div
      className={baseClasses}
      aria-label={ariaLabel}
      {...rest}
    >
      {headerElement}
      <div className="card-body">
        {children}
      </div>
      {footerElement}
    </div>
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
  ariaLabel: PropTypes.string
};

export default Card;
