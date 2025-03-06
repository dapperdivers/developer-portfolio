import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import Card from '@atoms/Card';
import Button from '@atoms/Button';
import ResponsiveImage from '@atoms/ResponsiveImage';
import useIntersectionObserver from "@hooks/useIntersectionObserver";


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
    
    // Only use the image if it's explicitly provided
    const hasImage = !!data.image;
    
    // Extract tech stack from data or use defaults
    const techStack = data.stack || [];
    
    // Memoize animation configuration to prevent unnecessary re-renders
    const animation = useMemo(() => ({
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { 
        duration: 0.5, 
        delay: 0.1 * (index % 3), 
        ease: "easeOut",
        // Optimize performance by using hardware acceleration
        type: "tween",
        // Use only transforms for better performance
        translateY: true
      }
    }), [isInView, index]);
  
    return (
      <div className="project-card" ref={ref}>
        <Card 
          className="h-100"
          animation={animation}
          hoverable
          shadow
        >
          {hasImage && (
            <div className="project-image-container">
              <ResponsiveImage 
                src={data.image} 
                alt={`${data.name} project screenshot`}
                className="project-image"
                lazy={true}
                width={800}
                height={450}
                sizes="(max-width: 768px) 100vw, 400px"
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
            
            <div className="project-links">
              {data.github && (
                <Button
                  className="project-button github-button"
                  href={data.github}
                  variant="light"
                  size="sm"
                  icon="simple-icons:github"
                  ariaLabel={`View ${data.name} source code on GitHub`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
