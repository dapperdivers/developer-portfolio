import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useMotionEnabled } from '@utils/motion';

import './Modal.css';

// Framer Motion takes `false` for these props at runtime (it also blocks an inherited
// variant label), but its types only allow labels and targets.
const MOTION_OFF = false as unknown as undefined;

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Handler to close the modal */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Props to pass to the modal content */
  contentProps?: HTMLMotionProps<'div'>;
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to animate the modal */
  animated?: boolean;
}

/**
 * Modal atom component that renders a full-screen modal using React portals.
 * Completely escapes parent container constraints by rendering at document.body level.
 * 
 * @component
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
  size = 'md',
  animated = true
}: ModalProps) => {
  const motionOn = useMotionEnabled(animated);
  
  // Ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Animation variants for backdrop
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  // Animation variants for modal content
  const contentVariants: Variants = {
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
    
    const handleEscape = (e: KeyboardEvent) => {
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
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
          initial={motionOn ? "hidden" : false}
          animate={motionOn ? "visible" : false}
          exit={motionOn ? "exit" : MOTION_OFF}
          variants={backdropVariants}
          onClick={handleBackdropClick}
          transition={{ duration: 0.2 }}
        />
        
        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          className={`modal-content ${sizeClasses[size]} ${className}`}
          initial={motionOn ? "hidden" : false}
          animate={motionOn ? "visible" : false}
          exit={motionOn ? "exit" : MOTION_OFF}
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
              whileHover={motionOn ? { scale: 1.1 } : MOTION_OFF}
              whileTap={motionOn ? { scale: 0.95 } : MOTION_OFF}
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

export default Modal;