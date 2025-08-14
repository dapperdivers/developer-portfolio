import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './ExperienceCard.css';

const ExperienceCard = ({ 
  data, 
  index = 0, 
  colorOverride, 
  shadow = false, 
  variant = 'terminal',
  isExpanded = false,
  onToggle
}) => {
  // Get animation context with fallbacks
  const animationContext = useAnimation();
  const { 
    slideUpVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }, 
    fadeInVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    animationEnabled = true
  } = animationContext || {};
  
  // Internal state for animation
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);
  
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
    shadow && 'experience-card--shadow',
    variant && `experience-card--${variant}`,
    expanded && 'experience-card--expanded'
  ].filter(Boolean).join(' ');

  // Enhanced animation variants using design system
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };
  
  const expandedVariants = {
    collapsed: { 
      height: 'auto',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    expanded: { 
      height: 'auto',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const contentVariants = {
    collapsed: { 
      opacity: 0, 
      height: 0, 
      marginTop: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    expanded: { 
      opacity: 1, 
      height: 'auto',
      marginTop: 16,
      transition: { duration: 0.3, delay: 0.1, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial={animationEnabled ? "hidden" : false}
      animate={animationEnabled ? "visible" : false}
      whileHover={animationEnabled ? { y: -4, scale: expanded ? 1 : 1.02 } : {}}
      onClick={handleCardClick}
      data-testid="experience-card"
      style={{ cursor: 'pointer' }}
    >
      <div className="experience-card__content">
        <div className="experience-card__header">
          {data.companylogo && (
            <div className="experience-card__logo-container">
              <img
                src={data.companylogo}
                alt={`${data.company} logo`}
                className="experience-card__logo"
                loading="lazy"
                width="80"
                height="80"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.warn(`Failed to load company logo: ${data.companylogo}`);
                }}
              />
            </div>
          )}
          
          <div className="experience-card__header-info">
            <h3 className="experience-card__role">{data.role}</h3>
            <h4 className="experience-card__company">
              {data.url ? (
                <button 
                  className="experience-card__company-link"
                  onClick={handleLinkClick}
                  aria-label={`Visit ${data.company} website`}
                >
                  {data.company} ↗
                </button>
              ) : (
                data.company
              )}
            </h4>
            <p className="experience-card__date">{data.date}</p>
          </div>
          
          <div className="experience-card__toggle">
            <motion.div
              className="experience-card__toggle-icon"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </div>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div 
              className="experience-card__details"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              {data.desc && (
                <motion.p 
                  className="experience-card__description"
                  variants={fadeInVariants}
                >
                  {data.desc}
                </motion.p>
              )}
              
              {data.descBullets && data.descBullets.length > 0 && (
                <motion.ul 
                  className="experience-card__bullets"
                  variants={{
                    expanded: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="collapsed"
                  animate="expanded"
                >
                  {data.descBullets.map((bullet, i) => (
                    <motion.li 
                      key={i} 
                      className="experience-card__bullet-item"
                      variants={slideUpVariants}
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
  variant: PropTypes.string,
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func
};

export default ExperienceCard;