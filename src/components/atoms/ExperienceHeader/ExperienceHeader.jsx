import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './ExperienceHeader.css';

const ExperienceHeader = ({ 
  logo, 
  role, 
  company, 
  date, 
  url, 
  variant = 'default',
  onHeaderClick,
  onLinkClick,
  expanded = false,
  className = '',
  ...props
}) => {
  const { animationEnabled } = useAnimation();

  const headerClasses = [
    'experience-header',
    `experience-header--${variant}`,
    expanded && 'experience-header--expanded',
    className
  ].filter(Boolean).join(' ');

  // Optimized animation variants using single values instead of arrays
  const roleVariants = {
    collapsed: { 
      textShadow: "0 0 15px rgba(var(--color-cyan-rgb), 0.4)"
    },
    expanded: { 
      textShadow: "0 0 25px rgba(var(--color-cyan-rgb), 0.8)",
      transition: { 
        duration: 0.6, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    if (onLinkClick) {
      onLinkClick(e);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      className={headerClasses}
      onClick={onHeaderClick}
      whileHover={animationEnabled ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {logo && (
        <motion.div 
          className="experience-header__logo-container"
          whileHover={animationEnabled ? { scale: 1.1, rotate: 5 } : {}}
          transition={{ duration: 0.2 }}
        >
          <img
            src={logo}
            alt={`${company} logo`}
            className="experience-header__logo"
            loading="lazy"
            width="50"
            height="50"
            onError={(e) => {
              e.target.style.display = 'none';
              console.warn(`Failed to load company logo: ${logo}`);
            }}
          />
          <div className="experience-header__logo-glow"></div>
        </motion.div>
      )}
      
      <div className="experience-header__info">
        <motion.h3 
          className="experience-header__role"
          variants={roleVariants}
          animate={expanded && animationEnabled ? "expanded" : "collapsed"}
        >
          {role}
        </motion.h3>
        
        <h4 className="experience-header__company">
          {url ? (
            <motion.button 
              className="experience-header__company-link"
              onClick={handleLinkClick}
              aria-label={`Visit ${company} website`}
              whileHover={animationEnabled ? { scale: 1.05 } : {}}
              whileTap={animationEnabled ? { scale: 0.95 } : {}}
            >
              {company} 
              <motion.span 
                className="experience-header__link-icon"
                animate={animationEnabled ? { 
                  x: [0, 2, 0] 
                } : {}}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ↗
              </motion.span>
            </motion.button>
          ) : (
            company
          )}
        </h4>
        
        <p className="experience-header__date">
          <span className="experience-header__date-prefix">◦ </span>
          {date}
        </p>
      </div>
    </motion.div>
  );
};

ExperienceHeader.propTypes = {
  logo: PropTypes.string,
  role: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  onHeaderClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default ExperienceHeader;