import React, { memo, useMemo, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '../../layout/Section';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import ExperienceCard from '@molecules/ExperienceCard';
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context/AnimationContext";
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
  
  // Check if in Storybook environment and prioritize context data
  const experience = portfolioData?.experience || experienceData || [];
  
  // Get animation settings from context with robust fallback
  const animationContext = useAnimation();
  const animationEnabled = animationContext?.animationEnabled ?? true;
  const prefersReducedMotion = animationContext?.prefersReducedMotion ?? false;
  
  // State to manage which cards are expanded (first one open by default)
  const [expandedCards, setExpandedCards] = useState(new Set([0]));
  
  // Reference for scroll animation
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });
  
  // Handle card toggle
  const handleCardToggle = useCallback((index) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);
  
  // Determine section title and subtitle from context if available
  const sectionTitle = portfolioData?.experienceSection?.title || "Professional Experience";
  const sectionSubtitle = portfolioData?.experienceSection?.subtitle || "My career journey and professional highlights";
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => 3, []);
  
  // Loading and error state flags
  const isLoading = false; // We always have data from portfolio.js
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
                data-testid="skeleton-experience-mock"
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
        animate="visible"
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
        
        <motion.div 
          className="experience-cards"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {experience.map((item, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              data={{
                role: item.role,
                company: item.company,
                date: item.date,
                desc: item.desc,
                descBullets: item.descBullets,
                companylogo: item.companylogo,
                url: item.url
              }}
              index={index}
              shadow={true}
              variant="terminal"
              isExpanded={expandedCards.has(index)}
              onToggle={() => handleCardToggle(index)}
              data-testid="experience-card-mock"
            />
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
};

Experience.propTypes = {
  /* No props for this component as it uses hooks for data */
};

// Apply memoization for performance optimization
export default memo(Experience);