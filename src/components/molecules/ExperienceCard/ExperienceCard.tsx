import React, { memo, useRef, FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAnimation } from '../../../context/AnimationContext';
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
        ease: [0.43, 0.13, 0.23, 0.96]
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
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      data-testid="experience-card"
      data-variant={variant || 'default'}
    >
      <div className="experience-card__content">
        {/* Company logo */}
        {data.companylogo && (
          <div className="experience-card__logo-container">
            <img
              className="experience-card__logo"
              src={data.companylogo}
              alt={`${data.company} logo`}
              loading="lazy"
              width={80}
              height={80}
            />
          </div>
        )}
        
        {/* Main content area */}
        <div className="experience-card__details">
          {/* Description */}
          <p className="experience-card__description">{data.desc}</p>
          
          {/* Description bullets if available */}
          {data.descBullets && data.descBullets.length > 0 && (
            <ul className="experience-card__bullets">
              {data.descBullets.map((item, i) => (
                <li key={`bullet-${i}`} className="experience-card__bullet-item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ExperienceCard);
