import React, { memo, useMemo } from "react";
import Card from '@atoms/Card';
import Button from '@atoms/Button';
import ResponsiveImage from '@atoms/ResponsiveImage';
import { useInView, Variants } from "framer-motion";
import { useMotionEnabled, slideUpVariants, STAGGER_DELAY } from "@utils/motion";
import type { Project } from '@/types/portfolio';

export interface ProjectsCardProps {
  /** Project data object */
  data: Project;
  /** Index number for staggered animations */
  index?: number;
  /** Whether to animate the card */
  animated?: boolean;
}

/**
 * Project card component for displaying individual project information.
 * 
 * @component
 */
const ProjectsCard = ({ data, index = 0, animated = true }: ProjectsCardProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
      once: true,
      amount: 0.1,
      margin: "-50px 0px"
    });
    
    const motionOn = useMotionEnabled(animated);
    
    // Extract tech stack from data or use defaults
    const techStack = data.stack || [];
    
    // Customize the slide up variants with index-based delay
    const cardVariants = useMemo<Variants>(() => ({
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
          {data.image && (
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
            <h3 className="project-title" tabIndex={0}>{data.name}</h3>
            <p className="project-description" tabIndex={0}>{data.desc}</p>
            
            {techStack.length > 0 && (
              <div className="tech-stack" aria-label="Technologies used">
                {techStack.map((tech, i) => (
                  <span key={i} className="tech-tag" tabIndex={0}>{tech}</span>
                ))}
              </div>
            )}
            
            {(data.github || data.link) && (
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
            )}
          </div>
        </Card>
      </div>
    );
};

// Applying memoization for performance optimization
export default memo(ProjectsCard);
