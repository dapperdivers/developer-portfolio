import React, { FC, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import TimelineEntry from '@molecules/TimelineEntry/TimelineEntry';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import TimelineNode from '@atoms/TimelineNode/TimelineNode';
// SkeletonLoader removed as it doesn't exist - using custom skeleton implementation
import { AnimationProvider } from '@context/AnimationContext';
import './ExperienceTimeline.css';

export interface ExperienceTimelineProps {
  /** Experience data array */
  experience: Array<{
    company: string;
    role: string;
    date: string;
    desc: string;
    companylogo: string;
    descBullets?: string[];
  }>;
  /** Extract year from date string function */
  extractDateYear: (date: string) => string;
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Whether experience data is loading */
  isLoading?: boolean;
  /** Whether there was an error loading experience data */
  hasError?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * ExperienceTimeline component for displaying a sequence of work experience entries
 * 
 * @component
 * @param {ExperienceTimelineProps} props - Component props
 * @returns {React.ReactElement} ExperienceTimeline component
 */
const ExperienceTimeline: FC<ExperienceTimelineProps> = ({
  experience = [],
  extractDateYear,
  variant = 'security',
  isLoading = false,
  hasError = false,
  className = ''
}) => {
  // Generate skeleton loading items for loading state
  const renderSkeletons = useCallback(() => {
    return Array(3).fill(null).map((_, i) => (
      <div key={`skeleton-${i}`} className="timeline-skeleton">
        <div className="timeline-skeleton__connector">
          <div className="timeline-skeleton__dot"></div>
          <div className="timeline-skeleton__line"></div>
        </div>
        <div className="timeline-skeleton__date"></div>
        <div className="timeline-skeleton__card">
          <div className="timeline-skeleton__header"></div>
          <div className="timeline-skeleton__content">
            <div className="timeline-skeleton__text-line"></div>
            <div className="timeline-skeleton__text-line"></div>
            <div className="timeline-skeleton__text-line"></div>
          </div>
        </div>
      </div>
    ));
  }, []);
  
  // Generate CSS classes
  const timelineClasses = [
    'experience-timeline',
    `experience-timeline--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <AnimationProvider>
      <div 
        className={timelineClasses}
        data-testid="experience-timeline"
      >
        {/* Timeline content */}
        <div className="timeline-content">
          {/* Show loading state */}
          {isLoading && (
            <div className="timeline-loading">
              {renderSkeletons()}
            </div>
          )}
          
          {/* Show error state */}
          {hasError && !isLoading && (
            <div className="timeline-error">
              <p className="timeline-error__message">
                <span className="timeline-error__icon">⚠️</span>
                Error loading the experience data. Please try again later.
              </p>
              <TimelineNode
                variant={variant as '' | 'security' | 'terminal'}
                animated={false}
                active={false}
                size="lg"
              />
            </div>
          )}
          
          {/* Show empty state */}
          {!isLoading && !hasError && experience.length === 0 && (
            <div className="timeline-empty">
              <p className="timeline-empty__message">
                No experience entries found.
              </p>
              <TimelineNode
                variant={variant as '' | 'security' | 'terminal'}
                animated={false}
                active={false}
                size="lg"
              />
            </div>
          )}
          
          {/* Render timeline entries */}
          {!isLoading && !hasError && experience.length > 0 && (
            <div className="timeline-entries">
              <div className="timeline-container">
                {/* Connection line that runs through all entries */}
                <div className="timeline-main-line"></div>
                
                <motion.div 
                  className="secure-connection-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  data-testid="connection-start"
                >
                  <div className="secure-label">SECURE CONNECTION ESTABLISHED</div>
                </motion.div>
                
                {experience.map((exp, index) => (
                  <TimelineEntry
                    key={`timeline-entry-${index}`}
                    data={exp}
                    index={index}
                    extractDateYear={extractDateYear}
                    variant={variant as '' | 'security' | 'terminal'}
                    id={`timeline-entry-${index}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Decorative elements for security theme */}
          {variant === 'security' && (
            <div className="security-decorations">
              <div className="binary-stream binary-stream--left">
                {Array(30).fill(null).map((_, i) => (
                  <div 
                    key={`binary-left-${i}`} 
                    className="binary" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
              
              <div className="binary-stream binary-stream--right">
                {Array(30).fill(null).map((_, i) => (
                  <div 
                    key={`binary-right-${i}`} 
                    className="binary" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimationProvider>
  );
};

export default memo(ExperienceTimeline);
