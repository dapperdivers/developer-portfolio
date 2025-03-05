import React, { useMemo } from 'react';
import ProjectsCard from "../components/ProjectsCard";
import Section from "../components/layout/Section";
import useProjects from "../hooks/useProjects";
import useMemoValues from "../hooks/useMemoValues";
import { usePortfolio } from "../context/PortfolioContext";
import "../assets/css/projects-section.css";

/**
 * Projects section displaying a grid of project cards.
 * This component renders a collection of projects from the portfolio context.
 * Features include:
 * - Loading state with skeleton UI
 * - Integration with portfolio context
 * - Performance-optimized animations
 * - Proper error handling
 * 
 * @component
 * @returns {React.ReactElement} Projects component
 */
const Projects = () => {
  // Get portfolio data and derived memo values
  const portfolioData = usePortfolio();
  const { topProjects } = useMemoValues(portfolioData);
  
  // Get projects from the specialized hook with filter/sorting options
  const projects = useProjects({
    sortBy: 'recent'
  });
  
  // Determine which projects to display (use topProjects if specifically requested)
  const displayProjects = portfolioData?.projectsSection?.showTopProjectsOnly ? 
    topProjects : projects;
  
  // Loading state flag (use more sophisticated approach than just empty check)
  const isLoading = !portfolioData || !displayProjects;
  
  // Error state flag
  const hasError = displayProjects && displayProjects.length === 0;
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.projectsSection?.display === false) {
    return null;
  }
  
  // Customize title from context if available
  const sectionTitle = portfolioData?.projectsSection?.title || "Projects";
  const sectionSubtitle = portfolioData?.projectsSection?.subtitle;
  
  // Memoize animation config to prevent unnecessary re-renders
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

  // Render loading state if projects data is not available
  if (isLoading) {
    return (
      <Section
        id="projects"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:github"
        className="projects-section"
      >
        <div className="projects-grid projects-grid-loading">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="project-card-skeleton" aria-hidden="true">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-tags"></div>
                <div className="skeleton-actions"></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }
  
  // Render error state if no projects are available
  if (hasError) {
    return (
      <Section
        id="projects"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:github"
        className="projects-section"
      >
        <div className="projects-empty-state">
          <p>No projects are currently available.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon="simple-icons:github"
      animation={animation}
      className="projects-section"
    >
      <div className="projects-grid">
        {displayProjects.map((data, i) => (
          <ProjectsCard 
            key={`project-${data.name}-${i}`} 
            data={data} 
            index={i} 
          />
        ))}
      </div>
    </Section>
  );
};

export default React.memo(Projects);
