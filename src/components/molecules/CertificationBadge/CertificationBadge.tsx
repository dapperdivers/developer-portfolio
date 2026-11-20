import React from "react";
import { motion, Variants } from "framer-motion";
import { useMotionEnabled } from '@utils/motion';
import { FaMedal, FaIdCard } from 'react-icons/fa';
import './CertificationBadge.css';

export interface CertificationBadgeProps {
  /** Name of the certification */
  name: string;
  /** Organization that issued the certification */
  issuer?: string;
  /** Date of certification */
  date?: string;
  /** Credential ID if available */
  credentialId?: string;
  /** Icon name to override the default medal icon */
  iconName?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether hover motion is enabled */
  animated?: boolean;
}

/**
 * A component to display certification information.
 * Enhanced with framer-motion animations controlled by the `animated` prop.
 * 
 * @component
 */
const CertificationBadge = ({ 
  name, 
  issuer, 
  date, 
  credentialId,
  iconName,
  className = "",
  animated = true
}: CertificationBadgeProps) => {
  const animationEnabled = useMotionEnabled(animated);
  
  // We could use dynamic icon loading here if needed
  const CertIcon = iconName ? null : FaMedal;

  // Hover animation for the badge
  const hoverAnimation: Variants = {
    rest: { 
      y: 0, 
      x: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      } 
    },
    hover: { 
      y: -5, 
      x: 2, 
      transition: { 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      } 
    }
  };

  // Hover animation for the icon
  const iconAnimation: Variants = {
    rest: { 
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
    hover: { 
      scale: 1.1, 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <motion.div 
      className={`certification-badge ${className}`}
      initial="rest"
      whileHover={animationEnabled ? "hover" : "rest"}
      animate="rest"
      variants={hoverAnimation}
    >
      <motion.div 
        className="certification-icon"
        variants={iconAnimation}
      >
        {CertIcon && <CertIcon />}
      </motion.div>
      <div className="certification-details">
        <h5 className="certification-name">{name}</h5>
        {issuer && <p className="certification-issuer">{issuer}</p>}
        <div className="certification-meta">
          {date && <span className="certification-date">{date}</span>}
          {credentialId && (
            <span className="certification-id">
              <FaIdCard className="id-icon" />
              <span className="id-text">{credentialId}</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationBadge;
