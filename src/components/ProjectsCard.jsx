import React, { memo } from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Card from "./ui/Card";
import Button from "./ui/Button";
import ResponsiveImage from "./ui/ResponsiveImage";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

/**
 * Project card component for displaying individual project information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Project data object
 * @param {string} props.data.name - Project name
 * @param {string} props.data.desc - Project description
 * @param {string} [props.data.image] - Project image URL
 * @param {string} [props.data.github] - GitHub repository URL
 * @param {string} [props.data.link] - Live demo URL
 * @param {Array} [props.data.stack] - Array of technologies used
 * @param {number} [props.index=0] - Index number for staggered animations
 * @returns {React.ReactElement} ProjectsCard component
 */
const ProjectsCard = ({ data, index = 0 }) => {
    const [ref, isInView] = useIntersectionObserver({ 
      threshold: 0.1,
      rootMargin: "-50px 0px" 
    });
    
    // Default image if none is provided
    const projectImage = data.image || "https://picsum.photos/600/300?grayscale&blur=2";
    
    // Extract tech stack from data or use defaults
    const techStack = data.stack || [];
    
    // Animation for the card
    const animation = {
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { 
        duration: 0.5, 
        delay: 0.1 * (index % 3), 
        ease: "easeOut" 
      }
    };
  
    return (
      <div className="project-card" ref={ref}>
        <Card 
          className="h-100"
          animation={animation}
          hoverable
          shadow
        >
          {projectImage && (
            <div className="project-image-container">
              <ResponsiveImage 
                src={projectImage} 
                alt={`${data.name} project screenshot`}
                className="project-image"
                lazy={true}
              />
              <div className="project-image-overlay"></div>
            </div>
          )}
          
          <div className="card-body">
            <h3 className="project-title" tabIndex="0">{data.name}</h3>
            <p className="project-description" tabIndex="0">{data.desc}</p>
            
            {techStack.length > 0 && (
              <div className="tech-stack" aria-label="Technologies used">
                {techStack.map((tech, i) => (
                  <span key={i} className="tech-tag" tabIndex="0">{tech}</span>
                ))}
              </div>
            )}
            
            <div className="project-links mt-auto">
              {data.github && (
                <Button
                  className="project-button github-button"
                  href={data.github}
                  variant="light"
                  size="sm"
                  icon="simple-icons:github"
                  ariaLabel={`View ${data.name} source code on GitHub`}
                >
                  Code
                </Button>
              )}
              {data.link && (
                <Button
                  className="project-button demo-button"
                  href={data.link}
                  variant="primary"
                  size="sm"
                  icon="fa:external-link"
                  ariaLabel={`View ${data.name} live demo`}
                >
                  Demo
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
};

ProjectsCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string,
    github: PropTypes.string,
    link: PropTypes.string,
    stack: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number
};

// Applying memoization for performance optimization
export default memo(ProjectsCard);
