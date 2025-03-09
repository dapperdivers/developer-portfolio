import React, { memo, useRef, FC } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import type { ExperienceCardProps } from '../../../types/components';
import './ExperienceCard.css';

/**
 * ExperienceCard component that displays detailed information about an experience entry
 * 
 * @component
 * @param {ExperienceCardProps} props - Component props
 * @returns {React.ReactElement} ExperienceCard component
 */
const ExperienceCard: FC<ExperienceCardProps> = ({ 
  data, 
  index = 0, 
  variant = '', 
  colorOverride = null,
  showHeader = true,
  shadow = true,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: true,
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  });
  
  // Use the animation context
  const { animationEnabled, getAnimationDelay } = useAnimation();
  
  // Calculate animation delay based on index
  const animationDelay = getAnimationDelay(index);
  
  // Animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Logo animation variants
  const logoVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Description and bullet point animation variants
  const contentVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Apply custom color if provided
  const customStyle: React.CSSProperties = colorOverride ? {
    '--card-accent-color': `rgb(${colorOverride.r}, ${colorOverride.g}, ${colorOverride.b})`,
    '--card-accent-color-rgb': `${colorOverride.r}, ${colorOverride.g}, ${colorOverride.b}`
  } as React.CSSProperties : {};

  // Dynamically generate CSS classes based on props
  const cardClasses = [
    'experience-card',
    variant ? `experience-card--${variant}` : '',
    shadow ? 'experience-card--shadow' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      ref={cardRef}
      className={cardClasses}
      style={{
        ...customStyle,
        transitionDelay: animationDelay
      }}
      initial={animationEnabled ? "hidden" : false}
      animate={animationEnabled && isInView ? "visible" : false}
      variants={cardVariants}
      data-testid="experience-card"
      data-variant={variant || 'default'}
    >
      <div className="experience-card__content">
        {/* Company logo */}
        {data.companylogo && (
          <motion.div 
            className="experience-card__logo-container"
            variants={logoVariants}
            whileHover={animationEnabled ? "hover" : undefined}
          >
            <img
              className="experience-card__logo"
              src={data.companylogo}
              alt={`${data.company} logo`}
              loading="lazy"
              width={80}
              height={80}
            />
          </motion.div>
        )}
        
        {/* Main content area */}
        <div className="experience-card__details">
          {/* Description */}
          <motion.p 
            className="experience-card__description"
            variants={contentVariants}
          >
            {data.desc}
          </motion.p>
          
          {/* Description bullets if available */}
          {data.descBullets && data.descBullets.length > 0 && (
            <motion.ul className="experience-card__bullets">
              {data.descBullets.map((item, i) => (
                <motion.li 
                  key={`bullet-${i}`} 
                  className="experience-card__bullet-item"
                  variants={contentVariants}
                  custom={i}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ExperienceCard);
