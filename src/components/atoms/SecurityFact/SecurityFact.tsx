import React from 'react';
import { FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { slideUpVariants, useMotionEnabled } from '@utils/motion';
import './SecurityFact.css';

export interface SecurityFactProps {
  /** Fact text content */
  text: string;
  /** Custom icon component (defaults to FaTerminal) */
  icon?: React.ElementType;
  /** Whether to animate the component */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SecurityFact component for displaying security-themed facts with terminal icon.
 * 
 * @component
 */
const SecurityFact = ({ 
  text, 
  icon: Icon = FaTerminal, 
  animate = true,
  className = ''
}: SecurityFactProps) => {
  const shouldAnimate = useMotionEnabled(animate);

  return (
    <motion.div 
      className={`security-fact ${className}`}
      variants={shouldAnimate ? slideUpVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? "visible" : "visible"}
      viewport={{ once: true }}
    >
      <Icon className="security-fact__icon" />
      <p className="security-fact__text">{text}</p>
    </motion.div>
  );
};

export default SecurityFact;