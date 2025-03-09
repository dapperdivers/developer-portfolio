import React, { memo, useMemo, FC, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ExperienceCard from '@molecules/ExperienceCard';
import Card from '@atoms/Card';
import { TimelineNode } from '@atoms/TimelineCore';
import DateBubble from '@atoms/DateBubble/DateBubble';
import CodeSnippet from '@atoms/CodeSnippet/CodeSnippet';
import SecurityBadge from '@atoms/SecurityBadge/SecurityBadge';
import TerminalControls from '@atoms/TerminalControls/TerminalControls';
import TechBadge from '@atoms/TechBadge/TechBadge';
import useTimelineAnimation from '@hooks/useTimelineAnimation';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import './TimelineEntry.css';

export interface TimelineEntryProps {
  /** Experience data object */
  data: {
    company: string;
    role: string;
    date: string;
    desc: string;
    companylogo: string;
    descBullets?: string[];
  };
  /** Index of the entry for animation sequencing */
  index: number;
  /** Function to extract year from date string */
  extractDateYear: (date: string) => string;
  /** Ref for the entry for intersection observer */
  entryRef?: React.RefObject<HTMLDivElement>;
  /** Animation delay for the entry */
  animationDelay?: string;
  /** Visual variant ('', 'security', 'terminal') */
  variant?: '' | 'security' | 'terminal';
  /** Unique identifier for the entry */
  id?: string;
}

/**
 * TimelineEntry component that renders an experience card within a cybersecurity themed timeline
 * Default display is compact, expanding when interacted with
 * 
 * @component
 * @param {TimelineEntryProps} props - Component props
 * @returns {React.ReactElement} TimelineEntry component
 */
const TimelineEntry: FC<TimelineEntryProps> = ({ 
  data, 
  index, 
  extractDateYear,
  variant = '',
  id
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const componentRef = useRef(null);
  const isInView = useInView(componentRef, { once: true, amount: 0.2 });
  
  // Get animation context
  const { animationEnabled, getAnimationDelay } = useAnimation();
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Use the animation hook for all animation-related logic
  const {
    entryRef,
    isEntryInView,
    isVerified,
    isEven,
    animationDelay,
    slideVariants,
    bubbleVariants,
    dotVariants,
    securityBadgeVariants,
    securityId
  } = useTimelineAnimation({ 
    index, 
    id: id || `timeline-entry-${data.company.replace(/\s+/g, '-').toLowerCase()}-${index}`,
    isTimeline: false
  });
  
  // Create a code snippet as decoration
  const codeSnippet = useMemo(() => {
    const snippets = [
      `function verify() {\n  return checkAuth();\n}`,
      `const secure = {\n  level: 'high',\n  verified: true\n};`,
      `// Security clearance\nlet access = 'granted';`,
      `/* Web development\n * best practices\n */`
    ];
    return snippets[index % snippets.length];
  }, [index]);
  
  // Create different headers for compact and expanded views
  const cardHeader = (
    <div className="card-header">
      <TerminalControls variant="macos" />
      <div className="terminal-title">
        {isExpanded ? `${data.role} @ ${data.company}` : data.role}
      </div>
    </div>
  );
  
  // Create a session ID for the terminal
  const sessionId = useMemo(() => {
    const hash = Math.abs(
      data.company.split('').reduce((acc, char) => {
        return (acc << 5) - acc + char.charCodeAt(0) >>> 0;
      }, 0)
    ).toString(16).substring(0, 8);
    return `session-${hash}`;
  }, [data.company]);
  
  // Create an animated timeline entry
  return (
    <motion.div 
      className="timeline-entry" 
      ref={componentRef}
      variants={MotionVariants.timeline.entry}
      initial="hidden"
      animate={isInView && animationEnabled ? "visible" : "hidden"}
      transition={{ delay: index * 0.3 }}
    >
      <div className="timeline-connector">
        <motion.div 
          className="node-container"
          variants={MotionVariants.timeline.connector}
          initial="hidden"
          animate={isInView && animationEnabled ? "visible" : "hidden"}
          transition={{ delay: index * 0.3 + 0.1 }}
        >
          <DateBubble date={extractDateYear(data.date)} />
          
          <motion.div
            className="node-data-line node-data-line-top"
            variants={MotionVariants.timeline.nodeLine}
            initial="hidden"
            animate={isInView && animationEnabled ? "visible" : "hidden"}
            transition={{ delay: index * 0.3 + 0.2 }}
          >
            <motion.span 
              className="data-packet"
              variants={MotionVariants.timeline.dataFlow}
              initial="hidden"
              animate={isInView && animationEnabled ? "visible" : "hidden"}
            />
          </motion.div>
          
          <TimelineNode active={isEntryInView} />
          
          <motion.div
            className="node-data-line node-data-line-bottom"
            variants={MotionVariants.timeline.nodeLine}
            initial="hidden"
            animate={isInView && animationEnabled ? "visible" : "hidden"}
            transition={{ delay: index * 0.3 + 0.2 }}
          >
            <motion.span 
              className="data-packet"
              variants={MotionVariants.timeline.dataFlow}
              initial="hidden"
              animate={isInView && animationEnabled ? "visible" : "hidden"}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="timeline-line"
          variants={MotionVariants.timeline.line}
          initial="hidden"
          animate={isInView && animationEnabled ? "visible" : "hidden"}
          transition={{ delay: index * 0.3 + 0.15 }}
        >
          <motion.div 
            className="timeline-line-packet"
            variants={MotionVariants.timeline.dataFlow}
            initial="hidden"
            animate={isInView && animationEnabled ? "visible" : "hidden"}
          />
        </motion.div>
      </div>

      <div className="timeline-date-container">
        <motion.div 
          className={`timeline-card-container ${isExpanded ? 'expanded' : 'compact'}`}
          variants={MotionVariants.timeline.card}
          initial="hidden"
          animate={isInView && animationEnabled ? "visible" : (isExpanded ? "expanded" : "visible")}
          transition={{ delay: index * 0.3 + 0.25 }}
          onClick={toggleExpand}
        >
          {variant === 'terminal' ? (
            // Terminal-style card
            <Card className="timeline-card terminal-card">
              {cardHeader}
              <div className="terminal-content">
                <div className="compact-summary">
                  <span className="command-prompt-symbol">$</span>
                  <motion.span 
                    className="command-text"
                    variants={MotionVariants.timeline.typing}
                    initial="hidden"
                    animate={isInView && animationEnabled ? "visible" : "hidden"}
                    transition={{ delay: index * 0.3 + 0.4 }}
                  >
                    view job --role="{data.role}" --company="{data.company}"
                  </motion.span>
                  <motion.span 
                    className="cursor"
                    variants={MotionVariants.timeline.cursor}
                    initial="hidden"
                    animate={isInView && animationEnabled ? "visible" : "hidden"}
                  >
                    |
                  </motion.span>
                </div>
                
                {isExpanded && (
                  <motion.div 
                    className="expanded-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="company-logo-container">
                      <img
                        className="company-logo"
                        src={data.companylogo}
                        alt={`${data.company} logo`}
                      />
                    </div>
                    
                    <div className="description-text">
                      {data.desc}
                    </div>
                    
                    {data.descBullets && data.descBullets.length > 0 && (
                      <ul className="description-bullets">
                        {data.descBullets.map((bullet, i) => (
                          <li key={i} className="description-bullet-item">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="tech-stack">
                      <div className="tech-verification-header">
                        <div className="tech-scan-status">TECH SCAN COMPLETE</div>
                        <div className="tech-scan-id">ID: {sessionId}</div>
                      </div>
                      <div className="tech-stack-response">
                        <TechBadge label="React" />
                        <TechBadge label="TypeScript" />
                        <TechBadge label="Node.js" />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="terminal-decoration">
                  <CodeSnippet code={codeSnippet} language="javascript" />
                </div>
              </div>
            </Card>
          ) : (
            // Default card (you have other variants too)
            <ExperienceCard
              data={data}
              index={index}
              variant={variant}
              showHeader={true}
              shadow={true}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TimelineEntry);
