import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import useExperience from "@hooks/useExperience";
import { usePortfolio } from "@context/PortfolioContext";
import ExperienceTimeline from './ExperienceTimeline';
import './Experience.css';

/**
 * Experience section component displaying professional work history in a visually appealing timeline.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 */
const Experience = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get loading delay from context or use default
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Get experience data with options
  const experience = useExperience({
    sortBy: 'recent',
    delay: loadingDelay
  });
  
  // Determine section title and subtitle from context if available
  const sectionTitle = portfolioData?.experienceSection?.title || "Experience";
  const sectionSubtitle = portfolioData?.experienceSection?.subtitle;
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => 3, []);
  
  // Loading and error state flags
  const isLoading = !experience;
  const hasError = experience && experience.length === 0;
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Animation config for framer-motion
  const animation = useMemo(() => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { 
      duration: 0.5,
      type: "tween",
      ease: "easeOut"
    }
  }), []);
  
  // Extract year from date string (e.g., "Jan 2019 - Present" => "2019")
  const extractDateYear = (dateString) => {
    if (!dateString) return '';
    const matches = dateString.match(/\b(19|20)\d{2}\b/);
    return matches ? matches[0] : '';
  };
  
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
        <div className="experience-loading skeleton-staggered">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard 
              key={`skeleton-${i}`} 
              type="experience" 
              index={i} 
            />
          ))}
        </div>
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
        <div className="experience-empty-state">
          <p>No work experience is currently available.</p>
        </div>
      </Section>
    );
  }
  
  return (
    <Section
      id="experience"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      animation={animation}
      className="experience-section"
      aria-label="Work experience history"
      data-testid="experience-section"
    >
      <ExperienceTimeline 
        experience={experience} 
        extractDateYear={extractDateYear}
      />
    </Section>
  );
};

Experience.propTypes = {
  /* No props for this component as it uses hooks for data */
};

// Apply memoization for performance optimization
export default memo(Experience);
