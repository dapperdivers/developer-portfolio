import React, { FC, useCallback, memo, ReactNode } from 'react';
import TimelineNode from '@atoms/TimelineNode/TimelineNode';
import { AnimationProvider } from '@context/AnimationContext';
import { 
  ConnectionHeader, 
  MatrixBackground, 
  SecurityDecorations 
} from './TimelineDecorations';
// Use the modular CSS structure for better maintainability
import './styles/index.css';

// Define the generic data structure for timeline entries
export interface TimelineItem {
  id: string;
  date: string;
  content: any; // Can be any data structure needed by the entry component
}

export interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Component to render each timeline entry */
  entryComponent: React.ComponentType<any>;
  /** Function to extract display date from date string */
  formatDate?: (date: string) => string;
  /** Visual variant */
  variant?: '' | 'security' | 'terminal' | 'cyberpunk';
  /** Whether timeline data is loading */
  isLoading?: boolean;
  /** Whether there was an error loading timeline data */
  hasError?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Error message to display when hasError is true */
  errorMessage?: string;
  /** Empty state message to display when items array is empty */
  emptyMessage?: string;
  /** Number of skeleton items to show when loading */
  skeletonCount?: number;
  /** Connection start header */
  connectionHeader?: ReactNode;
  /** Connection end footer */
  connectionFooter?: ReactNode;
  /** Whether to show decorative elements */
  showDecorations?: boolean;
  /** Whether to show matrix background */
  showMatrixBg?: boolean;
  /** Whether to show binary streams for security theme */
  showBinaryStreams?: boolean;
}

/**
 * Generic Timeline component for displaying a sequence of items in a timeline format
 * with a cyberpunk hacker aesthetic
 * 
 * @component
 * @param {TimelineProps} props - Component props
 * @returns {React.ReactElement} Timeline component
 */
const Timeline: FC<TimelineProps> = ({
  items = [],
  entryComponent: EntryComponent,
  formatDate = (date) => date,
  variant = 'security',
  isLoading = false,
  hasError = false,
  className = '',
  errorMessage = 'Error loading the timeline data. Please try again later.',
  emptyMessage = 'No timeline entries found.',
  skeletonCount = 3,
  connectionHeader,
  connectionFooter,
  showDecorations = true,
  showMatrixBg = true,
  showBinaryStreams = true,
}) => {
  // Generate skeleton loading items for loading state
  const renderSkeletons = useCallback(() => {
    return Array(skeletonCount).fill(null).map((_, i) => (
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
  }, [skeletonCount]);
  
  // Generate CSS classes
  const timelineClasses = [
    'experience-timeline', // Keeping this class for backward compatibility
    `experience-timeline--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <AnimationProvider>
      <div 
        className={timelineClasses}
        data-testid="timeline"
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
                {errorMessage}
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
          {!isLoading && !hasError && items.length === 0 && (
            <div className="timeline-empty">
              <p className="timeline-empty__message">
                {emptyMessage}
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
          {!isLoading && !hasError && items.length > 0 && (
            <div className="timeline-entries">
              <div className="timeline-container">
                {/* Connection line that runs through all entries */}
                <div className="timeline-main-line">
                  <div className="data-packet packet-1"></div>
                  <div className="data-packet packet-2"></div>
                  <div className="data-packet packet-3"></div>
                  
                  {/* Neural network connection points */}
                  <div className="neural-connector neural-connector-1"></div>
                  <div className="neural-connector neural-connector-2"></div>
                  <div className="neural-connector neural-connector-3"></div>
                  <div className="neural-connector neural-connector-4"></div>
                  
                  {/* Data integrity shield */}
                  <div className="data-integrity-shield">
                    <div className="shield-inner"></div>
                  </div>
                </div>
                
                {/* Matrix background - optional */}
                {showMatrixBg && <MatrixBackground characterCount={50} />}
                
                {/* Connection start - custom or default */}
                {connectionHeader ? (
                  connectionHeader
                ) : (
                  showDecorations && (
                    <ConnectionHeader 
                      title="SECURE CONNECTION ESTABLISHED"
                      statusCode="[0xFF2941] VERIFIED"
                      animate={true}
                      variant={variant}
                    />
                  )
                )}
                
                {/* Map over items and render the provided entry component */}
                {items.map((item, index) => (
                  <EntryComponent
                    key={item.id || `timeline-entry-${index}`}
                    data={item.content}
                    date={item.date}
                    index={index}
                    formatDate={formatDate}
                    variant={variant as '' | 'security' | 'terminal'}
                    id={item.id || `timeline-entry-${index}`}
                  />
                ))}
                
                {/* Connection end - custom footer if provided */}
                {connectionFooter && connectionFooter}
                
              </div>
            </div>
          )}
          
          {/* Decorative elements for security theme */}
          {variant === 'security' && showBinaryStreams && showDecorations && (
            <SecurityDecorations showLeft={true} showRight={true} />
          )}
        </div>
      </div>
    </AnimationProvider>
  );
};

export default memo(Timeline);