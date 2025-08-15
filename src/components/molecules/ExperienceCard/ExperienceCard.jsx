import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import ExperienceHeader from '@atoms/ExperienceHeader';
import ExperienceToggle from '@atoms/ExperienceToggle';
import ExperienceContent from '@atoms/ExperienceContent';
import SecurityClassification from '@atoms/SecurityClassification';
import TerminalFooter from '@atoms/TerminalFooter';
import CyberpunkEffects from '@atoms/CyberpunkEffects';
import './ExperienceCard.css';

const ExperienceCard = ({ 
  data, 
  index = 0, 
  colorOverride, 
  shadow = false, 
  variant = 'cyberpunk',
  isExpanded = false,
  onToggle
}) => {
  // Get animation context with fallbacks
  const animationContext = useAnimation();
  const { 
    animationEnabled = true
  } = animationContext || {};
  
  // Internal state for animation
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use controlled or uncontrolled state
  const expanded = onToggle ? isExpanded : internalExpanded;
  const toggleExpanded = onToggle || (() => setInternalExpanded(!internalExpanded));

  // Early return if no data
  if (!data) {
    console.warn('ExperienceCard: No data provided');
    return null;
  }

  const handleCardClick = (e) => {
    // If clicking on the main card (not details), toggle expansion
    if (e.target === e.currentTarget || e.target.closest('.experience-card__header')) {
      e.preventDefault();
      toggleExpanded();
    }
  };
  
  const handleLinkClick = (e) => {
    e.stopPropagation();
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  const cardClasses = [
    'experience-card',
    !expanded && 'experience-card--collapsed',
    shadow && 'experience-card--shadow',
    variant && `experience-card--${variant}`,
    expanded && 'experience-card--expanded',
    isHovered && 'experience-card--hovered'
  ].filter(Boolean).join(' ');

  // Enhanced animation variants for dramatic effect
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };
  
  const expandedVariants = {
    collapsed: { 
      height: 'auto',
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    expanded: { 
      height: 'auto',
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  // Map variant to security variants for atomic components
  const getSecurityVariant = () => {
    switch (variant) {
      case 'security':
        return 'secure';
      case 'cyberpunk':
      case 'terminal':
      default:
        return 'default';
    }
  };

  const securityVariant = getSecurityVariant();

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial={animationEnabled ? "hidden" : false}
      animate={animationEnabled ? "visible" : false}
      whileHover={animationEnabled ? { 
        y: -8, 
        scale: 1.02,
        rotateX: 2,
        transition: { duration: 0.3 }
      } : {}}
      onClick={handleCardClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-testid="experience-card"
      style={{ 
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Cyberpunk Effects */}
      <CyberpunkEffects
        expanded={expanded}
        isHovered={isHovered}
        variant={securityVariant}
      />

      {/* Main card content */}
      <motion.div 
        className="experience-card__content"
        variants={expandedVariants}
        animate={expanded ? "expanded" : "collapsed"}
      >
        {/* Header Section */}
        <div className="experience-card__header">
          <ExperienceHeader
            logo={data.companylogo}
            role={data.role}
            company={data.company}
            date={data.date}
            url={data.url}
            variant={securityVariant}
            expanded={expanded}
            onLinkClick={handleLinkClick}
          />
          
          <ExperienceToggle
            expanded={expanded}
            onClick={toggleExpanded}
            variant={securityVariant}
          />
        </div>
        
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div 
              className="experience-card__details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Security classification banner */}
              <SecurityClassification
                label="DECLASSIFIED"
                variant={securityVariant}
                expanded={expanded}
              />

              {/* Main content */}
              <ExperienceContent
                description={data.desc}
                bullets={data.descBullets}
                variant={securityVariant}
                expanded={expanded}
              />

              {/* Terminal-style footer */}
              <TerminalFooter
                prompt="user@portfolio:~$"
                variant={securityVariant}
                expanded={expanded}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

ExperienceCard.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string,
    companylogo: PropTypes.string,
    descBullets: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string
  }).isRequired,
  index: PropTypes.number,
  colorOverride: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number
  }),
  shadow: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'terminal', 'cyberpunk', 'security']),
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func
};

export default ExperienceCard;