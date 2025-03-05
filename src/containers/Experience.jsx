import React, { memo, useMemo } from 'react';
import ExperienceCard from "../components/ExperienceCard";
import SkeletonCard from "../components/SkeletonCard";
import Section from "../components/layout/Section";
import useExperience from "../hooks/useExperience";
import useMemoValues from "../hooks/useMemoValues";
import { usePortfolio } from "../context/PortfolioContext";
import "../assets/css/experience-section.css";

/**
 * Experience section component displaying work history.
 * Renders a grid of ExperienceCard components with work history data.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 * 
 * @example
 * // Usage in App.jsx or another container
 * import Experience from './containers/Experience';
 * 
 * const App = () => (
 *   <main>
 *     <Experience />
 *   </main>
 * );
 */
const Experience = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get loading delay from context or use default (demonstrates skeleton loading)
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
  const skeletonCount = useMemo(() => {
    // Could be dynamic based on viewport, for now static
    return 3;
  }, []);
  
  // Loading state flag
  const isLoading = !experience;
  
  // Error state flag
  const hasError = experience && experience.length === 0;
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Memoize animation configuration to prevent unnecessary recalculations
  const animation = useMemo(() => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { 
      duration: 0.5,
      // Optimize performance
      type: "tween",
      translateY: true
    }
  }), []);
  
  // Render loading state if experience data is not available
  if (isLoading) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:briefcase"
        className="experience-section"
      >
        <div className="experience-grid experience-grid-loading skeleton-staggered">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard 
              key={i} 
              type="experience" 
              index={i} 
            />
          ))}
        </div>
      </Section>
    );
  }
  
  // Render error state if no experience is available
  if (hasError) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:briefcase"
        className="experience-section"
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
      icon="simple-icons:briefcase"
      animation={animation}
      className="experience-section"
      aria-label="Work experience history"
    >
      <div 
        className="experience-grid" 
        aria-label={`${experience.length} work experiences`}
      >
        {experience.map((data, i) => (
          <ExperienceCard 
            key={`experience-${data.company}-${i}`} 
            data={data} 
            index={i} 
          />
        ))}
      </div>
    </Section>
  );
};

Experience.propTypes = {
  // This component doesn't accept any props directly,
  // but uses useExperience hook to access data
};

// Apply memoization for performance optimization
export default memo(Experience);
