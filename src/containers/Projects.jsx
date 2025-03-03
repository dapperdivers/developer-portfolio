import React from 'react';
import { Icon } from '@iconify/react';
import ProjectsCard from "../components/ProjectsCard";
import Section from "../components/layout/Section";
import useProjects from "../hooks/useProjects";
import "../assets/css/projects-section.css";

/**
 * Projects section displaying a grid of project cards.
 * 
 * @component
 * @returns {React.ReactElement} Projects component
 */
const Projects = () => {
  const projects = useProjects();
  
  // Animation config for framer-motion
  const animation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  return (
    <Section
      id="projects"
      title="Projects"
      icon="simple-icons:github"
      animation={animation}
      className="projects-section"
    >
      <div className="projects-grid">
        {projects.map((data, i) => (
          <ProjectsCard key={i} data={data} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
