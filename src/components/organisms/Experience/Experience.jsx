import React, { memo, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import ExperienceCard from '@molecules/ExperienceCard';
import Timeline from '@molecules/Timeline';
import Section from '../../layout/Section';
import ConsoleHeader from '@organisms/ConsoleHeader';
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context/AnimationContext";
import { experience as experienceData } from '../../../portfolio';
import './Experience.css';

/**
 * Experience section component displaying professional work history.
 * Now using the hybrid timeline-cyberpunk layout that combines traditional timeline structure
 * with enhanced cyberpunk card effects for the best of both approaches.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 */
const Experience = () => {
  const portfolioData = usePortfolio();
  const experience = portfolioData?.experience || experienceData || [];
  const { animationEnabled } = useAnimation();
  
  // State management
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentCommand, setCurrentCommand] = useState('');
  const [expandedCards, setExpandedCards] = useState(new Set([0])); // First card expanded by default
  const [showHelp, setShowHelp] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [hasUserTyped, setHasUserTyped] = useState(true);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });
  
  // Enhanced animation variants for dramatic effect
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        when: "beforeChildren"
      }
    }
  };
  
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardContainerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Enhanced console command handlers
  const handleConsoleCommand = useCallback((command) => {
    const cmd = command.toLowerCase().trim();
    setLastCommand(command);
    setFeedbackMessage('');
    setHasUserTyped(true);
    
    // Handle ls commands
    if (cmd.startsWith('ls')) {
      setCurrentCommand(`Executed: ${command}`);
      setVisibleCount(experience.length);
      if (cmd.includes(' la') || cmd.includes('-la') || cmd.includes('-a')) {
        const allIndices = new Set(Array.from({length: experience.length}, (_, i) => i));
        setExpandedCards(allIndices);
        setFeedbackMessage(`Listed and expanded all ${experience.length} experiences`);
      } else {
        setFeedbackMessage(`Listed all ${experience.length} experiences`);
      }
      setShowHelp(false);
      return;
    }
    
    // Handle help command
    if (cmd === 'help') {
      setCurrentCommand(`Executed: ${command}`);
      setShowHelp(!showHelp);
      setFeedbackMessage(showHelp ? 'Help hidden' : 'Help displayed');
      return;
    }
    
    // Handle pwd command
    if (cmd === 'pwd') {
      setCurrentCommand('/portfolio/experience');
      setFeedbackMessage('Current directory: /portfolio/experience');
      setShowHelp(false);
      return;
    }
    
    // Handle cat commands for specific companies
    if (cmd.startsWith('cat ')) {
      const company = cmd.split(' ')[1];
      const companyIndex = experience.findIndex(exp => 
        exp.company.toLowerCase().includes(company.toLowerCase())
      );
      if (companyIndex !== -1) {
        setCurrentCommand(`Viewing: ${experience[companyIndex].company}`);
        setExpandedCards(new Set([companyIndex]));
        if (companyIndex >= visibleCount) {
          setVisibleCount(companyIndex + 1);
        }
        setFeedbackMessage(`Expanded ${experience[companyIndex].company} experience`);
        setShowHelp(false);
      } else {
        setCurrentCommand(`cat: ${company}: No such experience found`);
        setFeedbackMessage(`Error: No experience found for "${company}"`);
        setTimeout(() => setShowHelp(true), 500);
      }
      return;
    }
    
    // Handle show more command
    if (cmd === 'show more' || cmd === 'more') {
      const newCount = Math.min(visibleCount + 3, experience.length);
      setCurrentCommand(`Showing ${newCount} of ${experience.length}`);
      setVisibleCount(newCount);
      setFeedbackMessage(`Loaded ${newCount - visibleCount} more experiences`);
      setShowHelp(false);
      return;
    }
    
    // Handle show all command
    if (cmd === 'show all' || cmd === 'all') {
      setCurrentCommand(`Showing all ${experience.length} experiences`);
      setVisibleCount(experience.length);
      setFeedbackMessage(`Displaying all ${experience.length} experiences`);
      setShowHelp(false);
      return;
    }
    
    // Handle clear command
    if (cmd === 'clear' || cmd === 'cls') {
      setCurrentCommand('');
      setVisibleCount(3);
      setExpandedCards(new Set([0]));
      setFeedbackMessage('Console cleared - Reset to default state (3 experiences, first expanded)');
      setShowHelp(false);
      return;
    }
    
    // Handle reset command
    if (cmd === 'reset') {
      setCurrentCommand('');
      setVisibleCount(3);
      setExpandedCards(new Set([0]));
      setFeedbackMessage('Experience section reset to default state');
      setShowHelp(false);
      return;
    }
    
    // Unknown command
    setCurrentCommand(`${command}: command not found`);
    setFeedbackMessage(`Unknown command: "${command}". Showing available commands...`);
    setTimeout(() => setShowHelp(true), 500);
  }, [experience, visibleCount, showHelp]);

  // Handle card expansion toggle
  const handleCardToggle = useCallback((index) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Handle load more functionality
  const handleLoadMore = () => {
    const newCount = Math.min(visibleCount + 3, experience.length);
    setVisibleCount(newCount);
    setCurrentCommand(`Loaded ${newCount - visibleCount} more experiences`);
    setFeedbackMessage(`Now showing ${newCount} of ${experience.length} experiences`);
  };

  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Transform experience data for the hybrid timeline-cyberpunk layout
  const visibleExperience = experience.slice(0, visibleCount);

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey in cybersecurity and technology"
      className="experience-section"
      aria-label="Work experience history"
      data-testid="experience-section"
    >
      <motion.div
        ref={containerRef}
        initial={animationEnabled ? "hidden" : false}
        animate={animationEnabled && isInView ? "visible" : false}
        variants={containerVariants}
        className="experience-container"
        style={{ 
          border: '8px solid #00ff00',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          width: '100%'
        }}
      >
        {/* Interactive Console Header */}
        <motion.div
          variants={headerVariants}
          className="experience-header"
        >
          <ConsoleHeader
            prompt="user@portfolio:/experience$"
            placeholder="Type 'help' for commands or 'ls la' to expand all experiences..."
            interactive={true}
            onCommand={handleConsoleCommand}
            variant="kitty"
            className="mb-4"
            ariaDescription="Interactive console for navigating experience section"
          />
          
          {/* Command Feedback */}
          {(currentCommand || feedbackMessage) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="console-feedback"
            >
              {currentCommand && (
                <div className="console-feedback__command">
                  user@portfolio:/experience$ {lastCommand}
                </div>
              )}
              {feedbackMessage && (
                <div className="console-feedback__message">
                  {feedbackMessage}
                </div>
              )}
            </motion.div>
          )}
          
          {/* Console Command Help */}
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="console-help"
            >
              <div className="console-help__title">Available Commands:</div>
              <div className="console-help__grid">
                <div>
                  <span className="console-help__command">ls</span>
                  <span className="console-help__description"> - list all experiences</span>
                </div>
                <div>
                  <span className="console-help__command">ls la</span>
                  <span className="console-help__description"> - list and expand all</span>
                </div>
                <div>
                  <span className="console-help__command">pwd</span>
                  <span className="console-help__description"> - current section</span>
                </div>
                <div>
                  <span className="console-help__command">cat [company]</span>
                  <span className="console-help__description"> - expand specific experience</span>
                </div>
                <div>
                  <span className="console-help__command">show more</span>
                  <span className="console-help__description"> - load more experiences</span>
                </div>
                <div>
                  <span className="console-help__command">show all</span>
                  <span className="console-help__description"> - show all experiences</span>
                </div>
                <div>
                  <span className="console-help__command">clear</span>
                  <span className="console-help__description"> - reset to default state</span>
                </div>
                <div>
                  <span className="console-help__command">reset</span>
                  <span className="console-help__description"> - reset to default state</span>
                </div>
              </div>
              <div className="console-help__examples">
                <strong>Examples:</strong> Try <code>ls la</code>, <code>cat microsoft</code>, <code>clear</code>, or <code>help</code> to toggle this menu
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* NEW: Hybrid Timeline-Cyberpunk Layout */}
        <motion.div
          variants={cardContainerVariants}
          className="experience-cards-container"
          style={{ 
            border: '6px solid #ff6600',
            backgroundColor: 'rgba(255, 102, 0, 0.1)',
            width: '100%'
          }}
        >
          <Timeline 
            items={visibleExperience.map((item, index) => ({
              id: `exp-${index}`,
              title: item.role,
              company: item.company,
              date: item.date,
              description: item.desc,
              descBullets: item.descBullets,
              companylogo: item.companylogo,
              url: item.url,
              isActive: expandedCards.has(index),
              data: item
            }))}
            renderItem={(item, index) => (
              <ExperienceCard
                key={`exp-card-${index}`}
                data={item.data}
                index={index}
                variant="cyberpunk"
                isExpanded={expandedCards.has(index)}
                onToggle={() => handleCardToggle(index)}
              />
            )}
            layout="timeline-cyberpunk"
            className="experience-timeline"
          />
        </motion.div>

        {/* Load More Button */}
        {visibleCount < experience.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="experience-load-more"
          >
            <motion.button
              onClick={handleLoadMore}
              className="load-more-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="load-more-btn__text">
                Load More Experiences ({experience.length - visibleCount} remaining)
              </span>
              <motion.div
                className="load-more-btn__glow"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}

        {/* Experience Summary with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="experience-summary"
        >
          <div className="summary-stats">
            <span className="stat-item">
              <span className="stat-number">{visibleCount}</span>
              <span className="stat-label">of {experience.length} experiences</span>
            </span>
            {expandedCards.size > 0 && (
              <span className="stat-item">
                <span className="stat-number">{expandedCards.size}</span>
                <span className="stat-label">expanded</span>
              </span>
            )}
          </div>
          <div className="summary-hint">
            Interactive timeline with cybersecurity-themed effects - use console commands to navigate
          </div>
        </motion.div>

        {/* Cybersecurity themed background effects */}
        <div className="experience-bg-effects">
          <div className="grid-overlay"></div>
          <div className="data-stream data-stream--1"></div>
          <div className="data-stream data-stream--2"></div>
          <div className="data-stream data-stream--3"></div>
        </div>
      </motion.div>
    </Section>
  );
};

// Apply memoization for performance optimization
export default memo(Experience);