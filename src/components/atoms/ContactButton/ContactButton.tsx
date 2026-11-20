import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';
import './ContactButton.css';

export interface ContactButtonProps {
  /** Email address */
  email: string;
  /** Button text */
  text?: string;
  /** Custom icon component (defaults to FaRocket) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Framer motion animation variants */
  variants?: Variants;
  /** Whether to animate the component */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContactButton component for email contact links with rocket icon.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.email - Email address
 * @param {string} [props.text='Contact Me'] - Button text
 * @param {Object} [props.icon] - Custom icon component (defaults to FaRocket)
 * @param {Object} [props.variants] - Framer motion animation variants
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} ContactButton component
 */
const ContactButton = ({ 
  email, 
  text = 'Contact Me', 
  icon: Icon = FaRocket, 
  variants,
  animate = true,
  className = ''
}: ContactButtonProps) => {
  return (
    <motion.a 
      href={`mailto:${email}`}
      className={`contact-button ${className}`}
      variants={animate ? variants : undefined}
      whileHover={animate ? { scale: 1.05 } : undefined}
      whileTap={animate ? { scale: 0.95 } : undefined}
    >
      <span className="contact-button__text">{text}</span>
      <Icon className="contact-button__icon" />
    </motion.a>
  );
};

export default ContactButton;