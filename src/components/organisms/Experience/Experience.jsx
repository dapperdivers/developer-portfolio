import React, { memo, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context//AnimationContext";
import { experience as experienceData } from '../../../portfolio';
import './Experience.css';

/**
 * Experience section component displaying professional work history in a grid layout.
 * Enhanced with framer-motion animations that respect user preferences.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 */
const Experience = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
  // Reference for scroll animation
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });
  
  // Get loading delay from context or use default
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Use the directly imported experience data from portfolio.js
  // Fallback to context data only if needed
  const experience = experienceData || portfolioData?.experience || [];
  
  // Determine section title and subtitle from context if available
  const sectionTitle = portfolioData?.experienceSection?.title || "Professional Experience";
  const sectionSubtitle = portfolioData?.experienceSection?.subtitle || "My career journey and professional highlights";
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => 3, []);
  
  // Loading and error state flags
  const isLoading = !experience || experience.length === 0;
  const hasError = false; // We'll always use portfolio.js data as fallback
  
  // Animation variants for framer-motion
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Render loading state if experience data is not available
  if (isLoading) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        className="experience-section"
        data-testid="experience-section-loading"
      >
        <motion.div 
          className="experience-loading skeleton-staggered"
          ref={sectionRef}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled && isInView ? "visible" : false}
          variants={sectionVariants}
        >
          <AnimatePresence>
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <motion.div 
                key={`skeleton-${i}`}
                variants={cardVariants}
                custom={i}
              >
                <SkeletonCard 
                  type="experience" 
                  index={i} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    );
  }
  
  // Render empty state if no experience data
  if (hasError) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        className="experience-section"
        data-testid="experience-section-empty"
      >
        <motion.div 
          className="experience-empty-state"
          initial={animationEnabled ? { opacity: 0, y: 10 } : false}
          animate={animationEnabled ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.4 }}
        >
          <p>No work experience is currently available.</p>
        </motion.div>
      </Section>
    );
  }
  
  return (
    <Section
      id="experience"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      className="experience-section"
      aria-label="Work experience history"
      data-testid="experience-section"
    >
      <motion.div
        ref={sectionRef}
        initial={animationEnabled ? "hidden" : false}
        animate={animationEnabled && isInView ? "visible" : false}
        variants={sectionVariants}
        className="experience-grid"
      >
        <motion.div variants={headerVariants}>
          <ConsoleHeader
            prompt="root@security:~$"
            command="view --secure professional_experience.json"
            variant="security"
            className="experience-header"
          />
        </motion.div>
        
        <div className="experience-cards">
          {experience.map((item, index) => (
            <motion.div
              key={`experience-${index}`}
              variants={cardVariants}
              custom={index}
              className="experience-card"
            >
              <h3>{item.title}</h3>
              <h4>{item.company}</h4>
              <p className="date">{item.date}</p>
              <p className="description">{item.description}</p>
              {item.technologies && (
                <div className="technologies">
                  {item.technologies.map((tech, i) => (
                    <span key={`tech-${i}`} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

Experience.propTypes = {
  /* No props for this component as it uses hooks for data */
};

// Apply memoization for performance optimization
export default memo(Experience);
