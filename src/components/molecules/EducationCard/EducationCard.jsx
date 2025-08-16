import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import { useAnimation } from '@context/AnimationContext';
import { usePortfolio } from '@context/PortfolioContext';
import './EducationCard.css';

/**
 * EducationCard - A clean, self-contained education card component
 * with cybersecurity theming and optimized animations.
 * 
 * Displays educational background information including institution,
 * degree, field of study, duration, and certifications in a modern,
 * aesthetically pleasing design.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.education - Education data object
 * @param {string} props.education.schoolName - Name of the educational institution
 * @param {string} props.education.degree - Degree or certification title
 * @param {string} props.education.major - Major field of study
 * @param {string} [props.education.minor] - Minor field of study (optional)
 * @param {string} props.education.duration - Time period of education
 * @param {Array} [props.education.certifications] - Array of certification objects
 * @param {string} [props.variant='default'] - Theme variant (default, secure, breach, critical)
 * @param {number} [props.index=0] - Index for staggered animations
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} EducationCard component
 */
const EducationCard = ({ 
  education, 
  variant = 'default', 
  index = 0, 
  className = '',
  ...props 
}) => {
  const { animationEnabled } = useAnimation();
  
  // Animation variants optimized for performance
  const cardVariants = {
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2 + (index * 0.1)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Get variant-specific styling
  const getVariantIcon = () => {
    switch (variant) {
      case 'secure':
        return { icon: FaUniversity, color: 'var(--color-green-400)' };
      case 'breach':
        return { icon: FaCertificate, color: 'var(--color-red-400)' };
      case 'critical':
        return { icon: FaGraduationCap, color: 'var(--color-yellow-400)' };
      default:
        return { icon: FaGraduationCap, color: 'var(--color-cyan)' };
    }
  };

  const { icon: IconComponent, color: iconColor } = getVariantIcon();
  const hasCertifications = education.certifications && education.certifications.length > 0;

  return (
    <motion.article
      className={`education-card education-card--${variant} ${className}`}
      data-testid="education-card"
      variants={animationEnabled ? cardVariants : {}}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      whileHover={animationEnabled ? {
        y: -2,
        boxShadow: '0 8px 25px rgba(100, 255, 218, 0.15)',
        transition: { duration: 0.2 }
      } : {}}
      {...props}
    >
      {/* Header Section */}
      <motion.header 
        className="education-card__header"
        variants={animationEnabled ? contentVariants : {}}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="education-card__icon"
          variants={animationEnabled ? itemVariants : {}}
        >
          <IconComponent 
            style={{ color: iconColor }}
            aria-hidden="true"
          />
        </motion.div>
        
        <div className="education-card__title-section">
          <motion.h3 
            className="education-card__school"
            variants={animationEnabled ? itemVariants : {}}
          >
            {education.schoolName}
          </motion.h3>
          
          <motion.div 
            className="education-card__duration"
            variants={animationEnabled ? itemVariants : {}}
          >
            <FaCalendarAlt className="education-card__duration-icon" aria-hidden="true" />
            <span>{education.duration}</span>
          </motion.div>
        </div>

        {hasCertifications && (
          <motion.div 
            className="education-card__cert-badge"
            variants={animationEnabled ? itemVariants : {}}
          >
            <FaCertificate aria-hidden="true" />
            <span>{education.certifications.length}</span>
          </motion.div>
        )}
      </motion.header>

      {/* Content Section */}
      <motion.div 
        className="education-card__content"
        variants={animationEnabled ? contentVariants : {}}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="education-card__academic-info"
          variants={animationEnabled ? itemVariants : {}}
        >
          <div className="education-card__degree">
            <span className="education-card__label">Degree</span>
            <span className="education-card__value">{education.degree}</span>
          </div>
          
          <div className="education-card__field">
            <span className="education-card__label">Major</span>
            <span className="education-card__value">{education.major}</span>
          </div>
          
          {education.minor && (
            <div className="education-card__field">
              <span className="education-card__label">Minor</span>
              <span className="education-card__value">{education.minor}</span>
            </div>
          )}
        </motion.div>

        {/* Certifications Section */}
        {hasCertifications && (
          <motion.div 
            className="education-card__certifications"
            variants={animationEnabled ? itemVariants : {}}
          >
            <h4 className="education-card__cert-title">Certifications</h4>
            <div className="education-card__cert-list">
              {education.certifications.map((cert, certIndex) => (
                <motion.div
                  key={`cert-${certIndex}`}
                  className="education-card__cert-item"
                  variants={animationEnabled ? {
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: certIndex * 0.1,
                        duration: 0.3 
                      }
                    }
                  } : {}}
                >
                  <div className="education-card__cert-name">{cert.name}</div>
                  <div className="education-card__cert-meta">
                    {cert.issuer && <span className="education-card__cert-issuer">{cert.issuer}</span>}
                    {cert.date && <span className="education-card__cert-date">{cert.date}</span>}
                    {cert.credentialId && <span className="education-card__cert-id">ID: {cert.credentialId}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="education-card__decoration" aria-hidden="true">
        <div className="education-card__grid-overlay"></div>
        <div className="education-card__accent-line"></div>
      </div>
    </motion.article>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    schoolName: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    minor: PropTypes.string,
    duration: PropTypes.string.isRequired,
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        issuer: PropTypes.string,
        date: PropTypes.string,
        credentialId: PropTypes.string
      })
    )
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  index: PropTypes.number,
  className: PropTypes.string
};

export default EducationCard;