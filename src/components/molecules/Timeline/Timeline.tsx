import React, { FC, useCallback, memo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '@context/AnimationContext';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import { 
  TimelineNode,
  ConnectionHeader, 
  MatrixBackground, 
  TimelineDecorations
} from '@atoms/TimelineCore';
import { TimelineAnimations } from './TimelineAnimations';
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
  variant?: 'default' | 'security' | 'terminal';
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
 * Timeline component that displays a vertical timeline of entries
 * with cyberpunk-themed styling and animations
 * 
 * @component
 * @param {TimelineProps} props - Component props
 * @returns {React.ReactElement} Timeline component
 */
const Timeline: FC<TimelineProps> = ({
  items = [],
  entryComponent: EntryComponent,
  formatDate = (date: string) => date,
  variant = 'default',
  isLoading = false,
  hasError = false,
  className = '',
  errorMessage = 'Error loading timeline data',
  emptyMessage = 'No timeline entries found',
  skeletonCount = 3,
  connectionHeader,
  connectionFooter,
  showDecorations = true,
  showMatrixBg = true,
  showBinaryStreams = true
}) => {
  // Get animation context
  const { animationEnabled } = useAnimation();
  
  // Build classes
  const timelineClasses = [
    'experience-timeline',
    `experience-timeline--${variant}`,
    className
  ].filter(Boolean).join(' ');
  
  // Generate timeline items
  const renderTimelineItems = useCallback(() => {
    if (!items?.length) return null;
    
    return items.map((item, index) => (
      <motion.div
        key={item.id}
        className="timeline-item-wrapper"
        variants={TimelineAnimations.item}
        custom={{ index }}
      >
        <EntryComponent
          {...item}
          index={index}
          isLast={index === items.length - 1}
          variant={variant}
          formattedDate={formatDate(item.date)}
        />
      </motion.div>
    ));
  }, [items, EntryComponent, formatDate, variant]);
  
  // Render error state
  if (hasError) {
    return (
      <div className={`${timelineClasses} timeline-error`}>
        <div className="timeline-error-message">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Error</h3>
            <p>{errorMessage}</p>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Render loading state
  if (isLoading) {
    return (
      <div className={`${timelineClasses} timeline-loading`}>
        {/* Loading state implementation... */}
      </div>
    );
  }
  
  // Render empty state
  if (!items?.length) {
    return (
      <div className={`${timelineClasses} timeline-empty`}>
        <motion.div 
          className="timeline-empty-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>{emptyMessage}</p>
        </motion.div>
      </div>
    );
  }
  
  // Main render
  return (
    <div className={timelineClasses}>
      {/* Apply decorative elements if enabled */}
      {showDecorations && (
        <div className="timeline-decorations-wrapper">
          {showMatrixBg && <MatrixBackground characterCount={20} />}
          {variant === 'security' && showBinaryStreams && (
            <TimelineDecorations 
              variant="security" 
              showLeft 
              showRight 
            />
          )}
        </div>
      )}
      
      {/* Connection header */}
      {connectionHeader && (
        <div className="timeline-connection-header">
          {connectionHeader}
        </div>
      )}
      
      {/* Timeline content */}
      <motion.div 
        className="timeline-content"
        variants={TimelineAnimations.timeline}
        initial="hidden"
        animate="visible"
      >
        {/* Main timeline line with animated elements */}
        <motion.div 
          className="timeline-main-line" 
          variants={TimelineAnimations.mainline}
        >
          {/* Dynamic elements that will use the framer-motion variants */}
          {variant === 'security' && (
            <>
              {/* Security Data packet elements */}
              <motion.div 
                className="data-packet packet-1" 
                variants={TimelineAnimations.securityPacket}
                custom={{ delay: 0.5, duration: 2.5, initialDelay: 0 }}
              />
              <motion.div 
                className="data-packet packet-2" 
                variants={TimelineAnimations.securityPacket}
                custom={{ delay: 1, duration: 3, initialDelay: 0.7 }}
              />
              <motion.div 
                className="data-packet packet-3" 
                variants={TimelineAnimations.securityPacket}
                custom={{ delay: 1.5, duration: 2.8, initialDelay: 1.2 }}
              />
              
              {/* Security neural connectors */}
              <motion.div 
                className="neural-connector neural-connector-1" 
                variants={TimelineAnimations.neuralConnector}
              />
              <motion.div 
                className="neural-connector neural-connector-2" 
                variants={TimelineAnimations.neuralConnector}
              />
              <motion.div 
                className="neural-connector neural-connector-3" 
                variants={TimelineAnimations.neuralConnector}
              />
              <motion.div 
                className="neural-connector neural-connector-4" 
                variants={TimelineAnimations.neuralConnector}
              />
              
              {/* Security shields */}
              <motion.div 
                className="data-integrity-shield" 
                variants={TimelineAnimations.shieldPulse}
              >
                <motion.div 
                  className="shield-inner" 
                  variants={TimelineAnimations.shieldScan}
                />
              </motion.div>
            </>
          )}
          
          {variant !== 'security' && (
            <>
              {/* Default data packet elements */}
              <motion.div 
                className="data-packet packet-1" 
                variants={TimelineAnimations.dataPacket}
                custom={{ delay: 0.5, duration: 2, initialDelay: 0 }}
              />
              <motion.div 
                className="data-packet packet-2" 
                variants={TimelineAnimations.dataPacket}
                custom={{ delay: 1, duration: 2.2, initialDelay: 0.5 }}
              />
              <motion.div 
                className="data-packet packet-3" 
                variants={TimelineAnimations.dataPacket}
                custom={{ delay: 1.5, duration: 2.4, initialDelay: 1 }}
              />
            </>
          )}
        </motion.div>
        
        {/* Timeline items */}
        {renderTimelineItems()}
      </motion.div>
      
      {/* Connection footer */}
      {connectionFooter && (
        <div className="timeline-connection-footer">
          {connectionFooter}
        </div>
      )}
    </div>
  );
};

export default memo(Timeline);