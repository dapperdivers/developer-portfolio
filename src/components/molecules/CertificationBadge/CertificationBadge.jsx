import React from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useAnimation } from "@context/AnimationContext";
import { FaMedal, FaIdCard } from 'react-icons/fa';
import './CertificationBadge.css';

/**
 * A component to display certification information.
 * Enhanced with framer-motion animations controlled by AnimationContext.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the certification
 * @param {string} [props.issuer] - Organization that issued the certification
 * @param {string} [props.date] - Date of certification
 * @param {string} [props.credentialId] - Credential ID if available
 * @param {string} [props.iconName] - Icon name to override the default medal icon
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} CertificationBadge component
 */
const CertificationBadge = ({ 
  name, 
  issuer, 
  date, 
  credentialId,
  iconName,
  className = "" 
}) => {
  // Access animation context
  const { animationEnabled } = useAnimation();
  
  // We could use dynamic icon loading here if needed
  const CertIcon = iconName ? null : FaMedal;

  // Hover animation for the badge
  const hoverAnimation = {
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
  const iconAnimation = {
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
        <CertIcon />
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

CertificationBadge.propTypes = {
  name: PropTypes.string.isRequired,
  issuer: PropTypes.string,
  date: PropTypes.string,
  credentialId: PropTypes.string,
  iconName: PropTypes.string,
  className: PropTypes.string
};

export default CertificationBadge;
