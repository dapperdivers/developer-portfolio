import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useAnimation } from '@context/AnimationContext';

import './Modal.css';

/**
 * Modal atom component that renders a full-screen modal using React portals.
 * Completely escapes parent container constraints by rendering at document.body level.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler to close the modal
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.contentProps - Props to pass to the modal content
 * @param {boolean} props.closeOnBackdropClick - Whether to close on backdrop click (default: true)
 * @param {boolean} props.closeOnEscape - Whether to close on escape key (default: true)
 * @param {boolean} props.showCloseButton - Whether to show close button (default: true)
 * @param {string} props.size - Modal size: 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @returns {React.ReactElement|null} Modal component or null if not open
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  contentProps = {},
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  size = 'md'
}) => {
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
  // Ref for the modal content
  const modalRef = useRef(null);
  
  // Animation variants for backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  // Animation variants for modal content
  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal for accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle close button click
  const handleCloseClick = () => {
    onClose();
  };
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // Size classes
  const sizeClasses = {
    sm: 'modal-content--sm',
    md: 'modal-content--md', 
    lg: 'modal-content--lg',
    xl: 'modal-content--xl'
  };
  
  // Render modal using portal to escape parent constraints
  return createPortal(
    <AnimatePresence>
      <div className="modal-portal-root">
        {/* Backdrop */}
        <motion.div
          className="modal-backdrop"
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
          exit={animationEnabled ? "exit" : false}
          variants={backdropVariants}
          onClick={handleBackdropClick}
          transition={{ duration: 0.2 }}
        />
        
        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          className={`modal-content ${sizeClasses[size]} ${className}`}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
          exit={animationEnabled ? "exit" : false}
          variants={contentVariants}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...contentProps}
        >
          {/* Close Button */}
          {showCloseButton && (
            <motion.button 
              className="modal-close-button"
              onClick={handleCloseClick}
              aria-label="Close modal"
              whileHover={animationEnabled ? { scale: 1.1 } : false}
              whileTap={animationEnabled ? { scale: 0.95 } : false}
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </motion.button>
          )}
          
          {/* Modal Content */}
          <div className="modal-inner-content">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

Modal.propTypes = {
  /** Whether the modal is open */
  isOpen: PropTypes.bool.isRequired,
  /** Handler to close the modal */
  onClose: PropTypes.func.isRequired,
  /** Modal content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Props to pass to the modal content */
  contentProps: PropTypes.object,
  /** Whether to close on backdrop click */
  closeOnBackdropClick: PropTypes.bool,
  /** Whether to close on escape key */
  closeOnEscape: PropTypes.bool,
  /** Whether to show close button */
  showCloseButton: PropTypes.bool,
  /** Modal size */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
};

export default Modal;