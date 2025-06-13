import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './ExperienceCard.css';

const ExperienceCard = ({ data, index = 0, colorOverride, shadow = false, variant = 'default' }) => {
  // Debug log to check if props are received correctly
  console.log('ExperienceCard Debug - Props:', {
    dataReceived: !!data,
    dataKeys: data ? Object.keys(data) : [],
    data: data,
    index,
    colorOverride,
    shadow,
    variant
  });

  // Early return if no data
  if (!data) {
    console.warn('ExperienceCard: No data provided');
    return null;
  }

  const handleClick = () => {
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  const cardClasses = [
    'experience-card',
    shadow && 'experience-card--shadow',
    variant && `experience-card--${variant}`
  ].filter(Boolean).join(' ');

  // Simple animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      onClick={handleClick}
      data-testid="experience-card"
      style={{ cursor: data.url ? 'pointer' : 'default' }}
    >
      <div className="experience-card__content">
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
        
        <div className="experience-card__details">
          <h3 className="experience-card__role">{data.role}</h3>
          <h4 className="experience-card__company">{data.company}</h4>
          <p className="experience-card__date">{data.date}</p>
          
          {data.desc && (
            <p className="experience-card__description">{data.desc}</p>
          )}
          
          {data.descBullets && data.descBullets.length > 0 && (
            <ul className="experience-card__bullets">
              {data.descBullets.map((bullet, i) => (
                <li key={i} className="experience-card__bullet-item">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
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
  variant: PropTypes.string
};

export default ExperienceCard;