import React, { memo, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import useExperience from "@hooks/useExperience";
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context//AnimationContext";
// Updated import path to use the new molecule component
import ExperienceTimeline from '@molecules/ExperienceTimeline';
import { experience as experienceData } from '../../../portfolio';
// Updated import path to use modular CSS
import './styles/index.css';

/**
 * Experience section component displaying professional work history in a visually appealing timeline.
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
  
  const skeletonVariants = {
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
  
  // Extract year from date string (e.g., "Jan 2019 - Present" => "2019")
  const extractDateYear = (dateString) => {
    if (!dateString) return '';
    const matches = dateString.match(/\b(19|20)\d{2}\b/);
    return matches ? matches[0] : '';
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
                variants={skeletonVariants}
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
      >
        <motion.div variants={headerVariants}>
          <ConsoleHeader
            prompt="root@security:~$"
            command="view --secure --timeline professional_experience.json"
            variant="security"
            className="timeline-header"
          />
        </motion.div>
        
        <ExperienceTimeline 
          experience={experience} 
          extractDateYear={extractDateYear}
          variant="security"
        />
      </motion.div>
    </Section>
  );
};

Experience.propTypes = {
  /* No props for this component as it uses hooks for data */
};

// Apply memoization for performance optimization
export default memo(Experience);
