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
import './TimelineExperienceCard.css';

/**
 * Unified Timeline Experience Card component
 * Combines the positioning logic of TimelineItem with the content logic of ExperienceCard
 * Eliminates layering conflicts and simplifies the component architecture
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Experience data
 * @param {number} [props.index=0] - Card index for animations
 * @param {boolean} [props.isLeft=false] - Whether content should align to the left
 * @param {boolean} [props.isActive=false] - Whether this item is active/highlighted
 * @param {string} [props.variant='cyberpunk'] - Visual variant
 * @param {boolean} [props.isExpanded=false] - Whether the card is expanded
 * @param {function} [props.onToggle] - Toggle expansion callback
 * @param {boolean} [props.shadow=false] - Whether to show shadow
 * @param {Object} [props.colorOverride] - Color override object
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TimelineExperienceCard component
 */
const TimelineExperienceCard = ({ 
  data, 
  index = 0,
  isLeft = false, 
  isActive = false,
  variant = 'cyberpunk',
  isExpanded = false,
  onToggle,
  shadow = false, 
  colorOverride,
  className = '' 
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
    console.warn('TimelineExperienceCard: No data provided');
    return null;
  }

  // Variant styles for timeline positioning
  const getVariantStyles = () => {
    const variants = {
      default: {
        border: isActive ? 'border-theme-cyan/30' : 'border-gray-700',
        glow: 'shadow-theme-cyan/20',
        accent: 'theme-cyan'
      },
      secure: {
        border: isActive ? 'border-green-400/30' : 'border-green-800',
        glow: 'shadow-green-400/20',
        accent: 'green-400'
      },
      cyberpunk: {
        border: isActive ? 'border-cyan-400/30' : 'border-cyan-800',
        glow: 'shadow-cyan-400/20',
        accent: 'cyan-400'
      }
    };
    return variants[variant] || variants.default;
  };

  const styles = getVariantStyles();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

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

  const handleCardClick = (e) => {
    // If clicking on the main card (not details), toggle expansion
    if (e.target === e.currentTarget || e.target.closest('.timeline-experience-card__header')) {
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

  // Map variant to security variants for atomic components
  const getSecurityVariant = () => {
    switch (variant) {
      case 'secure':
        return 'secure';
      case 'cyberpunk':
      case 'terminal':
      default:
        return 'default';
    }
  };

  const securityVariant = getSecurityVariant();

  const cardClasses = [
    'timeline-experience-card',
    `timeline-experience-card--${isLeft ? 'left' : 'right'}`,
    isActive && 'timeline-experience-card--active',
    expanded && 'timeline-experience-card--expanded',
    isHovered && 'timeline-experience-card--hovered',
    shadow && 'timeline-experience-card--shadow',
    variant && `timeline-experience-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div 
      className={cardClasses}
      variants={containerVariants}
      initial={animationEnabled ? "hidden" : false}
      whileInView={animationEnabled ? "visible" : false}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={animationEnabled ? { 
        y: -4, 
        scale: 1.01,
        rotateX: 1,
        transition: { duration: 0.3 }
      } : {}}
      onClick={handleCardClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-testid="timeline-experience-card"
      style={{ 
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Timeline positioning wrapper */}
      <motion.div 
        className={`timeline-experience-card__content ${isLeft ? 'timeline-experience-card__content--left' : 'timeline-experience-card__content--right'}`}
        variants={contentVariants}
      >
        {/* Cyberpunk Effects */}
        <CyberpunkEffects
          expanded={expanded}
          isHovered={isHovered}
          variant={securityVariant}
        />

        {/* Main card content with proper containment */}
        <motion.div 
          className="timeline-experience-card__inner"
          variants={cardVariants}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
        >
          {/* Bordered container - contains all visual elements within bounds */}
          <div className="timeline-experience-card__bordered-container">
            {/* Security border effect */}
            <motion.div 
              className={`timeline-experience-card__border absolute inset-0 rounded-lg border-2 ${styles.border} ${isActive ? `shadow-lg ${styles.glow}` : ''} pointer-events-none`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: isActive ? [0.5, 1, 0.5] : 0.7,
                scale: isActive ? [0.98, 1.02, 0.98] : 1
              }}
              transition={{ 
                duration: isActive ? 2 : 0.3,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            />

            {/* Security classification badge - now contained within borders */}
            {isActive && (
              <motion.div 
                className="timeline-experience-card__security-badge"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="security-badge__icon">🔐</span>
                <span className="security-badge__text">ACTIVE</span>
              </motion.div>
            )}
          {/* Cyberpunk glow effect */}
          <motion.div 
            className="timeline-experience-card__glow"
            animate={isActive ? {
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.02, 1]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          
          {/* Card content container */}
          <motion.div 
            className="timeline-experience-card__experience-content"
            variants={expandedVariants}
            animate={expanded ? "expanded" : "collapsed"}
          >
            {/* Header Section */}
            <div className="timeline-experience-card__header">
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
                  className="timeline-experience-card__details"
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
          
          {/* Holographic border effect */}
          <div className="timeline-experience-card__holo-border"></div>
          
          {/* Data stream particles for expanded cards */}
          {isActive && (
            <motion.div 
              className="timeline-experience-card__data-stream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`data-particle data-particle--${i + 1}`}
                  animate={{
                    y: ['-10px', '110%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>
          )}
          </div> {/* Close timeline-experience-card__bordered-container */}
        </motion.div>
      </motion.div>

      {/* Connection beam to center timeline */}
      {isActive && (
        <motion.div 
          className={`timeline-experience-card__beam ${isLeft ? 'timeline-experience-card__beam--left' : 'timeline-experience-card__beam--right'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

TimelineExperienceCard.propTypes = {
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
  isLeft: PropTypes.bool,
  isActive: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'terminal', 'cyberpunk', 'security', 'secure']),
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
  shadow: PropTypes.bool,
  colorOverride: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number
  }),
  className: PropTypes.string
};

export default TimelineExperienceCard;