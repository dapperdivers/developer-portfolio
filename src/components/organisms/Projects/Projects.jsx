import React, { useMemo } from 'react';
import ProjectsCard from '@molecules/ProjectsCard';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import useProjects from "@hooks/useProjects";
import useMemoValues from "@hooks/useMemoValues";
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context/AnimationContext";
import { motion } from "framer-motion";
import './Projects.css';

/**
 * Projects section displaying a grid of project cards.
 * This component renders a collection of projects from the portfolio context.
 * Features include:
 * - Loading state with skeleton UI
 * - Integration with portfolio context
 * - Performance-optimized animations using framer-motion and AnimationContext
 * - Proper error handling
 * 
 * @component
 * @returns {React.ReactElement} Projects component
 */
const Projects = () => {
  // Get portfolio data and derived memo values
  const portfolioData = usePortfolio();
  const { topProjects } = useMemoValues(portfolioData);
  
  // Get animation context values
  const { animationEnabled, slideUpVariants, animationStaggerDelay } = useAnimation();
  
  // Get loading delay from context or use default (demonstrates skeleton loading)
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Get projects from the specialized hook with filter/sorting options and loading delay
  const projects = useProjects({
    sortBy: 'recent',
    delay: loadingDelay
  });
  
  // Determine which projects to display (use topProjects if specifically requested)
  const displayProjects = portfolioData?.projectsSection?.showTopProjectsOnly ? 
    topProjects : projects;
  
  // Loading state flag (use more sophisticated approach than just empty check)
  const isLoading = !portfolioData || !displayProjects;
  
  // Error state flag
  const hasError = displayProjects && displayProjects.length === 0;
  
  // Determine number of skeleton cards to show based on viewport size
  const skeletonCount = useMemo(() => {
    // Could be dynamic based on viewport, for now static
    return 3;
  }, []);
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.projectsSection?.display === false) {
    return null;
  }
  
  // Customize title from context if available
  const sectionTitle = portfolioData?.projectsSection?.title || "Projects";
  const sectionSubtitle = portfolioData?.projectsSection?.subtitle;
  
  // Memoize animation variants with custom transition options
  const projectsContainerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: animationStaggerDelay,
        delayChildren: 0.2
      }
    }
  }), [animationStaggerDelay]);

  // Render loading state if projects data is not available
  if (isLoading) {
    return (
      <Section
        id="projects"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        className="projects-section"
      >
        <motion.div 
          className="projects-grid projects-grid-loading skeleton-staggered"
          variants={projectsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard 
              key={i} 
              type="project" 
              index={i} 
            />
          ))}
        </motion.div>
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
        className="projects-section"
      >
        <motion.div 
          className="projects-empty-state"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-300">No projects are currently available.</p>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      className="projects-section"
    >
      <motion.div 
        className="projects-grid"
        variants={projectsContainerVariants}
        initial={animationEnabled ? "hidden" : "visible"}
        animate="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {displayProjects.map((data, i) => (
          <ProjectsCard 
            key={`project-${data.name}-${i}`} 
            data={data} 
            index={i} 
          />
        ))}
      </motion.div>
    </Section>
  );
};

export default React.memo(Projects);
