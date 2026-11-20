import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import Card from '@atoms/Card';
import Button from '@atoms/Button';
import ResponsiveImage from '@atoms/ResponsiveImage';
import { useInView } from "framer-motion";
import { useMotionEnabled, slideUpVariants, STAGGER_DELAY } from "@utils/motion";

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
 * @param {boolean} [props.animated=true] - Whether to animate the card
 * @returns {React.ReactElement} ProjectsCard component
 */
const ProjectsCard = ({ data, index = 0, animated = true }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { 
      once: true,
      amount: 0.1,
      margin: "-50px 0px"
    });
    
    const motionOn = useMotionEnabled(animated);
    
    // Only use the image if it's explicitly provided
    const hasImage = !!data.image;
    
    // Extract tech stack from data or use defaults
    const techStack = data.stack || [];
    
    // Customize the slide up variants with index-based delay
    const cardVariants = useMemo(() => ({
      hidden: { ...slideUpVariants.hidden },
      visible: { 
        ...slideUpVariants.visible,
        transition: {
          ...slideUpVariants.visible.transition,
          delay: STAGGER_DELAY * (index % 4), 
        }
      }
    }), [index]);

    const shouldAnimate = motionOn && isInView;
  
    return (
      <div className="project-card" ref={ref}>
        <Card 
          className="h-100"
          variants={cardVariants}
          initial={motionOn ? "hidden" : "visible"}
          animate={!motionOn || shouldAnimate ? "visible" : "hidden"}
          hoverable
          shadow
          animated={animated}
        >
          {hasImage && (
            <div className="project-image-container">
              <ResponsiveImage 
                src={data.image} 
                alt={`${data.name} project screenshot`}
                className="project-image"
                lazy={true}
                animated={animated}
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
                  className="project-button"
                  href={data.github}
                  variant="primary"
                  size="sm"
                  animated={animated}
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
                  animated={animated}
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
  index: PropTypes.number,
  animated: PropTypes.bool
};

// Applying memoization for performance optimization
export default memo(ProjectsCard);
