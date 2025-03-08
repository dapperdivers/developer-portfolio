import React, { memo, useMemo, FC, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from '@molecules/ExperienceCard';
import Card from '@atoms/Card';
import { TimelineNode } from '@atoms/TimelineCore';
import DateBubble from '@atoms/DateBubble/DateBubble';
import CodeSnippet from '@atoms/CodeSnippet/CodeSnippet';
import SecurityBadge from '@atoms/SecurityBadge/SecurityBadge';
import TerminalControls from '@atoms/TerminalControls/TerminalControls';
import TechBadge from '@atoms/TechBadge/TechBadge';
import useTimelineAnimation from '@hooks/useTimelineAnimation';
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
        return (acc * 31 + char.charCodeAt(0)) & 0xffffffff;
      }, 0)
    ).toString(16).toUpperCase().padStart(8, '0');
    return `0x${hash}`;
  }, [data.company]);

  // Parse tech keywords from description
  const techKeywords = useMemo(() => {
    const keywords = [];
    const text = data.desc.toLowerCase();
    
    if (text.includes('react')) keywords.push('React');
    if (text.includes('angular')) keywords.push('Angular');
    if (text.includes('vue')) keywords.push('Vue');
    if (text.includes('node')) keywords.push('Node.js');
    if (text.includes('typescript') || text.includes(' ts ')) keywords.push('TypeScript');
    if (text.includes('javascript') || text.includes(' js ')) keywords.push('JavaScript');
    if (text.includes('python')) keywords.push('Python');
    if (text.includes('php')) keywords.push('PHP');
    if (text.includes('laravel')) keywords.push('Laravel');
    if (text.includes('aws')) keywords.push('AWS');
    if (text.includes('azure')) keywords.push('Azure');
    if (text.includes('google cloud') || text.includes('gcp')) keywords.push('GCP');
    if (text.includes('docker')) keywords.push('Docker');
    if (text.includes('kubernetes') || text.includes(' k8s ')) keywords.push('Kubernetes');
    if (text.includes('ci/cd') || text.includes('cicd') || text.includes('devops')) keywords.push('CI/CD');
    if (text.includes('.net') || text.includes('dotnet') || text.includes('c#')) keywords.push('.NET');
    if (text.includes('sql')) keywords.push('SQL');
    
    // Add role-based keywords if not detected in text
    if (data.role.toLowerCase().includes('frontend') && !keywords.includes('React')) keywords.push('React');
    if (data.role.toLowerCase().includes('backend') && !keywords.includes('Node.js')) keywords.push('Node.js');
    if (data.role.toLowerCase().includes('full') && !keywords.includes('Full Stack')) keywords.push('Full Stack');
    if ((data.role.toLowerCase().includes('security') || data.role.toLowerCase().includes('cyber')) && 
        !keywords.includes('Security')) keywords.push('Security');
    
    // Ensure we have at least some tech badges
    if (keywords.length === 0) {
      keywords.push(index % 2 === 0 ? 'JavaScript' : 'TypeScript');
      keywords.push('Web Dev');
    }
    
    // Limit to at most 5 keywords
    return keywords.slice(0, 5);
  }, [data.desc, data.role, index]);

  // Create binary code decorations
  const binaryCode = useMemo(() => {
    const chars = '01';
    let result = '';
    const length = 50 + Math.floor(Math.random() * 50);
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i % 8 === 7) result += ' ';
      if (i % 32 === 31) result += '\n';
    }
    
    return result;
  }, []);

  return (
    <motion.div 
      className="timeline-entry"
      ref={entryRef}
      style={{ 
        transitionDelay: animationDelay
      }}
      initial="hidden"
      animate={isEntryInView ? "visible" : "hidden"}
      variants={slideVariants}
      viewport={{ once: true, margin: "-50px 0px" }}
    >
      <div className="timeline-connector">
        <div className="node-container">
          <div className="node-data-line node-data-line-top"></div>
          <TimelineNode
            id={`timeline-node-${index}`}
            variant={(variant || "security") as '' | 'security' | 'terminal'}
            animated={true}
            active={isVerified}
            size="md"
            interactive={false}
            style={{
              opacity: isEntryInView ? 1 : 0,
              transform: isEntryInView ? 'scale(1)' : 'scale(0)',
              transition: 'all 0.4s ease'
            }}
            aria-label={`Timeline node for ${data.company} experience`}
          />
          <div className="node-data-line node-data-line-bottom"></div>
        </div>
        <div className="timeline-line">
          <div className="timeline-line-packet"></div>
        </div>
      </div>
      
      <div className="timeline-date-container">
        <DateBubble
          date={extractDateYear(data.date)}
          level={index % 3 === 0 ? 'low' : (index % 3 === 1 ? 'medium' : 'high')}
          variant={(variant || "security") as '' | 'security' | 'terminal'}
          size="md"
          animation={bubbleVariants}
          aria-label={`Work period: ${data.date}`}
        />
      </div>
      
      <div 
        className={`timeline-card-container ${isExpanded ? 'expanded' : 'compact'}`}
        onClick={toggleExpand}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleExpand();
            e.preventDefault();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`Experience at ${data.company} as ${data.role}`}
      >
        <Card
          variant={(variant || "security") as '' | 'security' | 'terminal'}
          shadow
          header={cardHeader}
          className="timeline-card"
        >
          {/* Security verification badge */}
          <SecurityBadge 
            verified={isVerified}
            variant={(variant || "security") as '' | 'security' | 'terminal'}
            securityId={securityId}
            animation={securityBadgeVariants}
          />

          <div className="terminal-content">
            {/* Command: AUTH with enhanced cyberpunk elements */}
            <div className="command-prompt">
              <span className="command-prompt-symbol">$</span>
              <span className={`command-text ${isEntryInView ? '' : 'typing'}`}>
                AUTH {sessionId} "{data.company}"
              </span>
              <span className="command-access-level">[LEVEL {index % 5 + 1}]</span>
            </div>
            
            {/* Response: Position & Timeline with cyberpunk enhancements */}
            <div className="command-response">
              <div className="authentication-message">
                AUTHENTICATION VERIFIED - ACCESS GRANTED
                <span className="auth-status-code">[0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}]</span>
              </div>
              <div>{'>'} POSITION: <span className="highlight-value">{data.role}</span></div>
              <div>{'>'} TIMELINE: <span className="highlight-value">{data.date}</span></div>
              <div>{'>'} SECURITY CLEARANCE: <span className="highlight-value blink-slow">AUTHORIZED</span></div>
            </div>
            
            {/* Company Logo */}
            {data.companylogo && (
              <div className="company-logo-container">
                <img
                  className="company-logo"
                  src={data.companylogo}
                  alt={`${data.company} logo`}
                  loading="lazy"
                  width={80}
                  height={80}
                />
              </div>
            )}
            
            {/* Command: DISPLAY RESPONSIBILITIES with enhanced styling */}
            <div className="command-prompt">
              <span className="command-prompt-symbol">$</span>
              <span className="command-text">
                DISPLAY_RESPONSIBILITIES --format=secure --decrypt
              </span>
              <span className="command-status">[EXECUTED]</span>
            </div>
            
            {/* Display job description with enhanced cyberpunk styling */}
            <div className="command-response responsibilities-response">
              {!isExpanded ? (
                <div className="compact-view">
                  {/* Decryption message for compact view */}
                  <div className="decrypt-message">
                    <div className="decrypt-status">
                      <span className="decrypt-icon"></span>
                      DECRYPTION COMPLETE - SUMMARY VIEW
                    </div>
                  </div>
                  
                  {/* Show brief summary in compact mode */}
                  <div className="compact-description">
                    {/* Show first line of description (truncated if needed) */}
                    <div className="compact-summary">
                      <span className="highlight-prefix">[SUMMARY]</span> {data.desc.split('.')[0].trim() + '.'}
                    </div>
                    
                    {/* Show key technologies in compact view */}
                    <div className="tech-stack compact-tech-stack">
                      {techKeywords.slice(0, 3).map((keyword, i) => (
                        <TechBadge 
                          key={`tech-compact-${i}`}
                          label={keyword} 
                          variant={(variant || "security") as '' | 'security' | 'terminal'}
                          level={keyword === 'Security' ? 'high' : undefined}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="expand-collapse-hint">
                    <span className="expand-icon">⤢</span> Click to access full data <span className="expand-icon">⤢</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Decryption message for expanded view */}
                  <div className="decrypt-message">
                    <div className="decrypt-status">
                      <span className="decrypt-icon"></span>
                      DECRYPTION COMPLETE - FULL DETAILS
                    </div>
                    <div className="decrypt-id">DOCUMENT ID: FILE-{securityId.substring(2, 8)}</div>
                  </div>
                  
                  <div className="description-text">
                    <span className="highlight-prefix">[DETAILS]</span> {data.desc}
                  </div>
                  
                  {/* Display bullets with enhanced styling if available - only shown when expanded */}
                  {data.descBullets && data.descBullets.length > 0 && (
                    <>
                      <div className="responsibilities-header">KEY RESPONSIBILITIES:</div>
                      <ul className="description-bullets">
                        {data.descBullets.map((item, i) => (
                          <li key={`bullet-${i}`} className="description-bullet-item">
                            <span className="bullet-counter">{(i + 1).toString().padStart(2, '0')}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {/* Show expand/collapse hint */}
                  <div className="expand-collapse-hint">
                    <span className="collapse-icon">⤡</span> Click to minimize data <span className="collapse-icon">⤡</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Command: VERIFY TECHNOLOGIES - Shown in expanded view with enhanced cyberpunk styling */}
            {isExpanded && (
              <>
                <div className="command-prompt tech-verify-command">
                  <span className="command-prompt-symbol">$</span>
                  <span className="command-text">
                    VERIFY_TECHNOLOGIES --scan --authenticate
                  </span>
                  <span className="command-status">[VERIFIED]</span>
                </div>
                
                {/* Tech stack badges with enhanced cyberpunk styling */}
                <div className="command-response tech-stack-response">
                  <div className="tech-verification-header">
                    <div className="tech-scan-status">
                      <span className="tech-scan-icon"></span>
                      SCANNING COMPLETE - {techKeywords.length} TECHNOLOGIES IDENTIFIED
                    </div>
                    <div className="tech-scan-id">
                      SECURITY LEVEL: {techKeywords.some(k => k === 'Security') ? 'HIGH' : 'STANDARD'}
                      <span className="security-timestamp">{new Date().toISOString().replace('T', ' ').substring(0, 19)}</span>
                    </div>
                  </div>
                  
                  <div className="tech-stack">
                    {techKeywords.map((keyword, i) => (
                      <TechBadge 
                        key={`tech-${i}`}
                        label={keyword} 
                        variant={(variant || "security") as '' | 'security' | 'terminal'}
                        level={keyword === 'Security' ? 'high' : undefined}
                      />
                    ))}
                  </div>
                  
                  <div className="tech-stack-footer">
                    <div className="tech-verification-seal"></div>
                    TECHNOLOGIES VERIFIED - ACCESS GRANTED
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Terminal footer */}
          <div className="terminal-footer">
            <div className="session-id">SESSION ID: {sessionId}</div>
            <div className="connection-status">
              <span className="status-indicator"></span>
              CONNECTION SECURE
            </div>
          </div>
          
          {/* Binary decoration - simplified and reduced in quantity */}
          <div className="binary-decoration binary-top-right">
            {binaryCode.slice(0, 60)}
          </div>
        </Card>
      </div>
      
      {/* Decorative code snippets */}
      <div className="terminal-decoration">
        <CodeSnippet
          code={codeSnippet}
          variant={variant || "security"}
          theme="dark"
          language="javascript"
          isDecorative={true}
          className={`terminal-code-snippet ${isEven ? 'terminal-code-left' : 'terminal-code-right'}`}
        />
      </div>
    </motion.div>
  );
};

export default memo(TimelineEntry);
