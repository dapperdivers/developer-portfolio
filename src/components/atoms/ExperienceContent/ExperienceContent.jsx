import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './ExperienceContent.css';

const ExperienceContent = ({ 
  description,
  bullets = [],
  variant = 'default',
  expanded = false,
  className = '',
  ...props
}) => {
  const { animationEnabled, fadeInVariants, slideUpVariants } = useAnimation();

  const contentClasses = [
    'experience-content',
    `experience-content--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const bulletsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (!expanded) return null;

  return (
    <motion.div 
      className={contentClasses}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInVariants}
      transition={{ duration: 0.4, delay: 0.1 }}
      {...props}
    >
      {description && (
        <motion.p 
          className="experience-content__description"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
      
      {bullets && bullets.length > 0 && (
        <motion.div 
          className="experience-content__bullets-container"
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="experience-content__bullets-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="experience-content__bullets-icon">⚡</span>
            <span className="experience-content__bullets-text">Key Achievements</span>
          </motion.div>
          
          <motion.ul 
            className="experience-content__bullets"
            variants={bulletsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {bullets.map((bullet, i) => (
              <motion.li 
                key={i} 
                className="experience-content__bullet-item"
                variants={bulletVariants}
                whileHover={animationEnabled ? { x: 4 } : {}}
                transition={{ duration: 0.2 }}
              >
                <span className="experience-content__bullet-icon">▸</span>
                <span className="experience-content__bullet-text">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
};

ExperienceContent.propTypes = {
  description: PropTypes.string,
  bullets: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default ExperienceContent;