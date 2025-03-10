import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from '@atoms/Card';
import { useAnimation } from '@context/AnimationContext';
import useImageColor from '@hooks/useImageColor';
import useCallbackHandlers from '@hooks/useCallbackHandlers';

const ExperienceCard = ({ data, index, colorOverride, shadow = false, variant = 'default' }) => {
  const { animationEnabled, getAnimationDelay, slideUpVariants } = useAnimation();
  const { color, getColorFromImage, rgbToString } = useImageColor();
  const { handleExternalLink } = useCallbackHandlers();

  const cardVariants = useMemo(() => ({
    hidden: { ...slideUpVariants.hidden },
    visible: {
      ...slideUpVariants.visible,
      transition: {
        ...slideUpVariants.visible.transition,
        ...getAnimationDelay(index)
      }
    }
  }), [index, getAnimationDelay, slideUpVariants]);

  const handleImageLoad = (e) => {
    if (e.target.src) {
      getColorFromImage(e.target.src);
    }
  };

  const handleClick = () => {
    if (data.url) {
      handleExternalLink(data.url);
    }
  };

  const cardStyle = useMemo(() => {
    const accentColor = colorOverride || color;
    if (!accentColor) return {};

    const rgbString = colorOverride ? `${accentColor.r}, ${accentColor.g}, ${accentColor.b}` : rgbToString();
    return {
      '--card-accent-color': `rgb(${rgbString})`,
      '--card-accent-color-rgb': rgbString
    };
  }, [color, colorOverride, rgbToString]);

  const cardClasses = [
    'experience-card',
    shadow && 'experience-card--shadow',
    variant && `experience-card--${variant}`
  ].filter(Boolean).join(' ');

  return (
    <Card
      as={motion.div}
      data-testid="experience-card"
      className={cardClasses}
      style={cardStyle}
      variants={animationEnabled ? cardVariants : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onClick={handleClick}
      data-variant={variant}
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
              onLoad={handleImageLoad}
            />
          </div>
        )}
        <div className="experience-card__details">
          <h3>{data.role}</h3>
          <h4>{data.company}</h4>
          <p className="date">{data.date}</p>
          <p className="description">{data.desc}</p>
          {data.descBullets && (
            <ul className="experience-card__bullets">
              {data.descBullets.map((bullet, i) => (
                <li key={i} className="experience-card__bullet-item">{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

ExperienceCard.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    companylogo: PropTypes.string,
    descBullets: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  colorOverride: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number
  }),
  shadow: PropTypes.bool,
  variant: PropTypes.string
};

export default ExperienceCard;