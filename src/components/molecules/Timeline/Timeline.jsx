import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import TimelineConnector from '@atoms/TimelineConnector';
import TimelineExperienceCard from '@molecules/TimelineExperienceCard';
import './Timeline.css';

/**
 * Timeline molecule component - redesigned to support multiple layouts including
 * a hybrid timeline-cyberpunk layout that combines traditional timeline structure 
 * with enhanced cyberpunk card effects
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of timeline items to display
 * @param {function} [props.renderItem] - Function to render each item
 * @param {string} [props.layout] - Layout type: 'floating', 'traditional', 'timeline-cyberpunk'
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} Timeline component
 */
const Timeline = ({ 
  items = [], 
  renderItem,
  layout = 'timeline-cyberpunk',
  className = '' 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  };

  // NEW: Timeline-Cyberpunk layout - the hybrid solution
  if (layout === 'timeline-cyberpunk') {
    return (
      <motion.div 
        className={`timeline-cyberpunk ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          width: '100%'
        }}
      >
        {/* Central timeline backbone */}
        <motion.div 
          className="timeline-cyberpunk__backbone"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Animated data flow particles */}
          <motion.div 
            className="timeline-cyberpunk__data-flow"
            animate={{ 
              y: ['-10px', '100vh'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />
          <motion.div 
            className="timeline-cyberpunk__data-flow timeline-cyberpunk__data-flow--delayed"
            animate={{ 
              y: ['-10px', '100vh'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
              delay: 3
            }}
          />
        </motion.div>

        {/* Cybersecurity background effects */}
        <div className="timeline-cyberpunk__effects">
          <motion.div 
            className="timeline-cyberpunk__security-scan"
            animate={{ 
              x: ['-100vw', '100vw'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 4
            }}
          />
          
          <motion.div 
            className="timeline-cyberpunk__grid-overlay"
            animate={{ 
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Timeline entries with alternating positioning */}
        <div className="timeline-cyberpunk__entries">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isActive = item.isActive || false;
            
            return (
              <motion.div 
                key={item.id || index}
                className={`timeline-cyberpunk__entry ${isLeft ? 'timeline-cyberpunk__entry--left' : 'timeline-cyberpunk__entry--right'}`}
                variants={cardVariants}
                custom={index}
                style={{ 
                  width: '100%'
                }}
              >
                {/* Timeline connector using atomic component */}
                <div className="timeline-cyberpunk__connector">
                  <TimelineConnector
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                    isActive={isActive}
                    variant={isActive ? 'secure' : 'default'}
                    pulsing={isActive}
                  />
                </div>

                {/* Unified Timeline Experience Card - eliminates layering conflicts */}
                <div className="timeline-cyberpunk__content">
                  {renderItem ? renderItem(item, index, { isLeft, isActive, variant: isActive ? 'secure' : 'cyberpunk' }) : (
                    <TimelineExperienceCard
                      data={{
                        company: item.company,
                        role: item.title,
                        date: item.date,
                        desc: item.description,
                        url: item.url,
                        companylogo: item.logo
                      }}
                      index={index}
                      isLeft={isLeft}
                      isActive={isActive}
                      variant={isActive ? 'secure' : 'cyberpunk'}
                      isExpanded={item.isExpanded || false}
                      className="timeline-cyberpunk__item-wrapper"
                    />
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Network connection overlay */}
        <motion.svg 
          className="timeline-cyberpunk__connections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(100, 255, 218, 0.8)" />
              <stop offset="50%" stopColor="rgba(100, 255, 218, 0.4)" />
              <stop offset="100%" stopColor="rgba(100, 255, 218, 0.8)" />
            </linearGradient>
          </defs>
          {items.map((_, index) => {
            if (index === items.length - 1) return null;
            const startY = (index + 1) * 180;
            const endY = (index + 2) * 180;
            const isLeft = index % 2 === 0;
            const nextIsLeft = (index + 1) % 2 === 0;
            
            return (
              <motion.path
                key={`connection-${index}`}
                d={`M ${isLeft ? 200 : window.innerWidth - 200} ${startY} Q ${window.innerWidth/2} ${startY + 90} ${nextIsLeft ? 200 : window.innerWidth - 200} ${endY}`}
                stroke="url(#timelineGradient)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              />
            );
          })}
        </motion.svg>
      </motion.div>
    );
  }

  // Floating layout - modern card grid with cybersecurity effects
  if (layout === 'floating') {
    return (
      <motion.div 
        className={`timeline-floating ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cybersecurity background effects */}
        <div className="timeline-floating__effects">
          <motion.div 
            className="security-scan-line"
            animate={{ 
              x: ['-100vw', '100vw'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3
            }}
          />
          
          <motion.div 
            className="data-grid"
            animate={{ 
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating cards container */}
        <div className="timeline-floating__cards">
          {items.map((item, index) => (
            <motion.div 
              key={item.id || index}
              className={`timeline-floating__card-wrapper ${item.isActive ? 'timeline-floating__card-wrapper--active' : ''}`}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Card glow effect */}
              <motion.div 
                className="timeline-floating__card-glow"
                animate={item.isActive ? {
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Security badge for active cards */}
              {item.isActive && (
                <motion.div 
                  className="timeline-floating__security-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="security-badge__icon">🔐</span>
                  <span className="security-badge__text">ACTIVE</span>
                </motion.div>
              )}
              
              {/* Card content */}
              <div className="timeline-floating__card-content">
                {renderItem ? renderItem(item, index) : (
                  <div className="timeline-floating__default-content">
                    <h3 className="timeline-floating__title">{item.title}</h3>
                    <p className="timeline-floating__description">{item.description}</p>
                    {item.date && (
                      <span className="timeline-floating__date">{item.date}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Holographic border effect */}
              <div className="timeline-floating__holo-border"></div>
            </motion.div>
          ))}
        </div>

        {/* Terminal connection lines */}
        <motion.svg 
          className="timeline-floating__connections"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(100, 255, 218, 0.8)" />
              <stop offset="50%" stopColor="rgba(100, 255, 218, 0.4)" />
              <stop offset="100%" stopColor="rgba(100, 255, 218, 0.8)" />
            </linearGradient>
          </defs>
          {items.map((_, index) => {
            if (index === items.length - 1) return null;
            const startY = (index + 1) * 200;
            const endY = (index + 2) * 200;
            return (
              <motion.path
                key={`connection-${index}`}
                d={`M 50 ${startY} Q 200 ${startY + 50} 50 ${endY}`}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            );
          })}
        </motion.svg>
      </motion.div>
    );
  }

  // Traditional timeline layout (fallback)
  return (
    <motion.div 
      className={`timeline-container timeline-container--${layout} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Central timeline line */}
      <motion.div 
        className="timeline-line"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Animated data flow particles */}
      <motion.div 
        className="timeline-particle"
        animate={{ 
          y: [0, "100vh"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="timeline-items">
        {items.map((item, index) => (
          <motion.div 
            key={item.id || index}
            className="timeline-entry"
            variants={cardVariants}
            custom={index}
          >
            <div className="timeline-item">
              {renderItem ? renderItem(item, index) : (
                <div className="timeline-default-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                  {item.date && (
                    <span className="timeline-date">{item.date}</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

Timeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    isActive: PropTypes.bool
  })).isRequired,
  renderItem: PropTypes.func,
  layout: PropTypes.oneOf(['floating', 'traditional', 'timeline-cyberpunk']),
  className: PropTypes.string
};

export default Timeline;