import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import EducationCard from '@molecules/EducationCard';
import { useEducation, useFeedback } from '@context/PortfolioContext';
import Section from '../../layout/Section';
import './Education.css';

/**
 * Education section component displaying educational history
 * Professional cybersecurity theming with clean, subtle animations
 * Now includes professional testimonials in an unobtrusive way
 * 
 * @component
 */
const Education = () => {
  const educationData = useEducation();
  const feedbacksData = useFeedback();
  const { animationEnabled } = useAnimation();
  const containerRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });
  const testimonialsInView = useInView(testimonialsRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px"
  });
  
  // Clean animation variants with professional feel
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  // Testimonials animation variants
  const testimonialsVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const testimonialCardVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: (index) => ({ 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  };

  if (!educationData || educationData.length === 0) {
    return (
      <Section
        id="education"
        title="Education & Certifications"
        subtitle="Academic foundation and professional credentials for cybersecurity excellence"
        data-testid="education-section"
        className="education-section"
      >
        <motion.div
          className="education-empty-state"
          initial={animationEnabled ? { opacity: 0, y: 20 } : false}
          animate={animationEnabled ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="empty-state-title">No Education Data Available</h3>
            <p className="empty-state-description">
              Education and certification information will be displayed here when available.
            </p>
          </div>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section
      id="education"
      title="Education & Certifications"
      subtitle="Academic foundation and professional credentials for cybersecurity excellence"
      data-testid="education-section"
      className="education-section"
    >
      {/* Main content container */}
      <motion.div 
        ref={containerRef}
        className="education-content-wrapper"
        initial={animationEnabled ? "hidden" : false}
        animate={animationEnabled && isInView ? "visible" : false}
        variants={containerVariants}
      >
        {/* Security status indicator */}
        <motion.div 
          className="education-security-status"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="security-indicator">
            <div className="security-dot"></div>
            <span className="security-text">CREDENTIALS VERIFIED</span>
          </div>
        </motion.div>

        {/* Education cards grid */}
        <div className="education-cards-container">
          {educationData.map((education, index) => (
            <motion.div
              key={`education-${index}`}
              variants={cardVariants}
              custom={index}
              className="education-card-wrapper"
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              {/* Subtle card glow effect */}
              <motion.div 
                className="education-card-glow"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <EducationCard 
                education={education}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Professional Testimonials Section */}
        {feedbacksData && feedbacksData.length > 0 && (
          <motion.div 
            ref={testimonialsRef}
            className="education-testimonials-section"
            initial={animationEnabled ? "hidden" : false}
            animate={animationEnabled && testimonialsInView ? "visible" : false}
            variants={testimonialsVariants}
          >
            {/* Section divider */}
            <motion.div 
              className="testimonials-divider"
              initial={{ scaleX: 0 }}
              animate={testimonialsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Testimonials header */}
            <motion.div 
              className="testimonials-header"
              variants={testimonialCardVariants}
              custom={0}
            >
              <h3 className="testimonials-title">Professional Testimonials</h3>
              <p className="testimonials-subtitle">
                What colleagues say about working with me
              </p>
            </motion.div>

            {/* Compact testimonials grid */}
            <div className="testimonials-grid">
              {feedbacksData.slice(0, 3).map((feedback, index) => (
                <motion.div
                  key={`testimonial-${index}`}
                  className="testimonial-card-compact"
                  variants={testimonialCardVariants}
                  custom={index + 1}
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Testimonial content */}
                  <div className="testimonial-content">
                    {/* Rating stars */}
                    <div className="testimonial-rating">
                      {[...Array(feedback.rating || 5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="rating-star"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.5 + (index * 0.1) + (i * 0.05) 
                          }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    {/* Highlight quote */}
                    <blockquote className="testimonial-highlight">
                      "{feedback.highlight}"
                    </blockquote>

                    {/* Author info */}
                    <div className="testimonial-author">
                      <span className="author-name">{feedback.name}</span>
                      <span className="author-designation">{feedback.designation}</span>
                    </div>
                  </div>

                  {/* Subtle background effect */}
                  <motion.div 
                    className="testimonial-bg-effect"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
};

export default Education;