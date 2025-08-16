import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import { usePortfolio } from '@context/PortfolioContext';
import './Timeline.css';

// Enhanced animation variants with cyberpunk flair
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const timelineVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
};

const experienceVariants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Matrix-style text effect for secret messages
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// Secret messages and easter eggs
const secretMessages = [
  "AUTHENTICATED_USER_DETECTED",
  "NEURAL_LINK_ESTABLISHED",
  "ENCRYPTION_PROTOCOL_ACTIVE", 
  "FIREWALL_STATUS_OPTIMAL",
  "QUANTUM_ENCRYPTION_ENABLED",
  "BIOMETRIC_SCAN_COMPLETE",
  "ACCESS_GRANTED_LEVEL_9",
  "CYBERSEC_PROTOCOLS_ONLINE"
];

const developerQuotes = [
  "In code we trust, in bugs we debug",
  "Cybersecurity: Because 'password123' isn't enough",
  "Zero-day exploits? More like zero-day fun!",
  "Security through obscurity is like hiding keys under the doormat",
  "There are only 10 types of people: those who understand binary and those who don't"
];

// Audio context for sound effects
let audioContext = null;
const initAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }
};

// Sound effect functions
const playBeep = (frequency = 440, duration = 100) => {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
};

const playHackSound = () => {
  if (!audioContext) return;
  
  [200, 300, 400, 500].forEach((freq, index) => {
    setTimeout(() => playBeep(freq, 50), index * 50);
  });
};

/**
 * Enhanced Timeline component with cyberpunk visual effects and easter eggs
 * Integrates with terminal controls from the Experience component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.experiences - Array of experience data
 * @param {Set} props.expandedCards - Set of expanded card indices
 * @param {function} props.onCardToggle - Function to handle card expansion toggle
 * @param {string} [props.variant='default'] - Visual variant
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} Enhanced Timeline component
 */
const Timeline = ({ 
  experiences = [], 
  expandedCards = new Set(), 
  onCardToggle = () => {},
  variant = 'default',
  className = '',
  onTerminalCommand = null // New prop to detect terminal commands
}) => {
  const { isAnimationEnabled } = useAnimation();
  
  // Easter egg states
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [matrixMode, setMatrixMode] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [hackMode, setHackMode] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clickCounts, setClickCounts] = useState({});
  const [achievements, setAchievements] = useState(new Set());
  const [timeBasedEffect, setTimeBasedEffect] = useState('');
  const [screenShake, setScreenShake] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [achievementCount, setAchievementCount] = useState(0);
  
  const timelineRef = useRef(null);
  const mouseTrailRef = useRef([]);
  
  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  // Reset all easter egg states (declared early to avoid temporal dead zone)
  const resetEasterEggs = useCallback(() => {
    setMatrixMode(false);
    setGlitchMode(false);
    setHackMode(false);
    setSecretMessage('');
    setMouseTrail([]);
    setClickCounts({});
    setAchievements(new Set());
    setScreenShake(false);
    setEasterEggActive(false);
    setAchievementCount(0);
    setKonamiProgress(0);
    mouseTrailRef.current = [];
  }, []);
  
  // Initialize audio context
  useEffect(() => {
    initAudioContext();
  }, []);
  
  // Time-based effects
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 6) {
      setTimeBasedEffect('night-mode');
    } else if (hour >= 12 && hour <= 14) {
      setTimeBasedEffect('lunch-break');
    } else if (hour >= 9 && hour <= 17) {
      setTimeBasedEffect('work-hours');
    }
  }, []);
  
  // Konami code detection (only works after 3 clicks)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!easterEggActive) return; // Only work after 3 clicks
      
      if (event.code === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === konamiCode.length) {
          // Konami code completed!
          setMatrixMode(true);
          setHackMode(true);
          playHackSound();
          setSecretMessage('KONAMI CODE ACTIVATED - MATRIX MODE ENABLED');
          setAchievements(prev => {
            const newAchievements = new Set([...prev, 'konami-master']);
            setAchievementCount(newAchievements.size);
            // Check if this is the final achievement
            if (newAchievements.size >= 3) {
              setTimeout(() => {
                resetEasterEggs();
                setSecretMessage('KONAMI MASTER - SYSTEM RESTORED');
                setTimeout(() => setSecretMessage(''), 2000);
              }, 3000);
            }
            return newAchievements;
          });
          setKonamiProgress(0);
          
          setTimeout(() => {
            setSecretMessage('');
          }, 3000);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, easterEggActive, resetEasterEggs]);
  
  // Secret keyboard combinations (only work after 3 clicks)
  useEffect(() => {
    const handleKeyCombo = (event) => {
      if (!easterEggActive) return; // Only work after 3 clicks
      
      // Ctrl + Shift + D = Developer mode
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setGlitchMode(!glitchMode);
        setSecretMessage(developerQuotes[Math.floor(Math.random() * developerQuotes.length)]);
        setAchievements(prev => {
          const newAchievements = new Set([...prev, 'developer-mode']);
          setAchievementCount(newAchievements.size);
          return newAchievements;
        });
        playBeep(800, 200);
        
        setTimeout(() => setSecretMessage(''), 2500);
      }
      
      // Alt + H = Hacker mode
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        setHackMode(!hackMode);
        setSecretMessage(secretMessages[Math.floor(Math.random() * secretMessages.length)]);
        setAchievements(prev => {
          const newAchievements = new Set([...prev, 'hacker-mode']);
          setAchievementCount(newAchievements.size);
          return newAchievements;
        });
        playHackSound();
        
        setTimeout(() => setSecretMessage(''), 2000);
      }
    };
    
    window.addEventListener('keydown', handleKeyCombo);
    return () => window.removeEventListener('keydown', handleKeyCombo);
  }, [glitchMode, hackMode, easterEggActive]);
  
  // Mouse trail effect (only works when easter eggs are active)
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!easterEggActive || (!matrixMode && !hackMode)) return;
      
      const trail = {
        x: event.clientX,
        y: event.clientY,
        id: Date.now(),
        timestamp: Date.now()
      };
      
      mouseTrailRef.current = [...mouseTrailRef.current.slice(-10), trail];
      setMouseTrail([...mouseTrailRef.current]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [matrixMode, hackMode, easterEggActive]);
  
  // Clean up old mouse trail points
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const filtered = mouseTrailRef.current.filter(point => now - point.timestamp < 1000);
      mouseTrailRef.current = filtered;
      setMouseTrail([...filtered]);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Track terminal commands to reset easter eggs
  useEffect(() => {
    if (onTerminalCommand) {
      resetEasterEggs();
    }
  }, [onTerminalCommand, resetEasterEggs]);

  // Enhanced card toggle with easter eggs (requires 3+ clicks)
  const handleCardToggle = useCallback((index) => {
    const newCount = (clickCounts[index] || 0) + 1;
    setClickCounts(prev => ({ ...prev, [index]: newCount }));
    
    // Only start easter eggs after 3rd click
    if (newCount === 3) {
      setEasterEggActive(true);
      setScreenShake(true);
      setSecretMessage('AUTHORIZATION REQUIRED - SYSTEM BREACH DETECTED!');
      setAchievements(prev => {
        const newAchievements = new Set([...prev, 'triple-clicker']);
        setAchievementCount(newAchievements.size);
        return newAchievements;
      });
      playHackSound();
      
      setTimeout(() => {
        setScreenShake(false);
        setSecretMessage('');
      }, 1500);
    }
    
    // Progressive easter eggs only after initial 3 clicks
    if (newCount === 5 && easterEggActive) {
      setMatrixMode(true);
      setGlitchMode(true);
      setSecretMessage('REALITY.EXE HAS STOPPED WORKING - MATRIX PROTOCOL ACTIVE');
      setAchievements(prev => {
        const newAchievements = new Set([...prev, 'reality-breaker']);
        setAchievementCount(newAchievements.size);
        return newAchievements;
      });
      
      setTimeout(() => {
        setSecretMessage('');
      }, 3000);
    }

    if (newCount === 7 && easterEggActive) {
      setHackMode(true);
      setSecretMessage('FINAL PROTOCOL INITIATED - SYSTEM OVERRIDE COMPLETE');
      setAchievements(prev => {
        const newAchievements = new Set([...prev, 'system-override']);
        setAchievementCount(newAchievements.size);
        
        // Check if this achievement completes the cycle (3 total achievements)
        if (newAchievements.size >= 3) {
          setTimeout(() => {
            setTimeout(() => {
              resetEasterEggs();
              setSecretMessage('SYSTEM RESTORED TO DEFAULT STATE');
              setTimeout(() => setSecretMessage(''), 2000);
            }, 1000);
          }, 3500);
        }
        
        return newAchievements;
      });
      
      setTimeout(() => {
        setSecretMessage('');
      }, 3000);
    }
    
    // Only play sounds after 3rd click
    if (newCount >= 3) {
      playBeep(newCount * 100 + 200, 100);
    }
    
    onCardToggle(index);
  }, [clickCounts, onCardToggle, easterEggActive, resetEasterEggs]);
  
  // Matrix text generator
  const generateMatrixText = () => {
    return Array.from({ length: 20 }, () => 
      matrixChars[Math.floor(Math.random() * matrixChars.length)]
    ).join('');
  };
  
  if (!experiences.length) {
    return (
      <div className="timeline timeline--empty">
        <p className="timeline__empty-message">No experiences to display</p>
      </div>
    );
  }

  return (
    <>
      {/* Mouse trail effects */}
      <AnimatePresence>
        {mouseTrail.map((point) => (
          <motion.div
            key={point.id}
            className="timeline__mouse-trail"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed',
              left: point.x - 5,
              top: point.y - 5,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: variant === 'breach' ? '#ef4444' : '#64ffda',
              boxShadow: `0 0 10px ${variant === 'breach' ? '#ef4444' : '#64ffda'}`,
              pointerEvents: 'none',
              zIndex: 9999
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Secret message overlay */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            className="timeline__secret-message"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {secretMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Achievement notifications */}
      <AnimatePresence>
        {Array.from(achievements).map((achievement, index) => (
          <motion.div
            key={achievement}
            className="timeline__achievement"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ delay: index * 0.5 }}
            style={{ top: `${100 + index * 60}px` }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setAchievements(prev => {
                  const newAchievements = new Set(prev);
                  newAchievements.delete(achievement);
                  return newAchievements;
                });
              }, 3000);
            }}
          >
            🏆 Achievement Unlocked: {achievement.replace('-', ' ').toUpperCase()}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        ref={timelineRef}
        className={`timeline timeline--${variant} ${className} ${matrixMode ? 'timeline--matrix' : ''} ${glitchMode ? 'timeline--glitch' : ''} ${hackMode ? 'timeline--hack' : ''} ${screenShake ? 'timeline--shake' : ''} timeline--${timeBasedEffect}`}
        variants={containerVariants}
        initial={isAnimationEnabled ? "hidden" : false}
        animate={isAnimationEnabled ? "visible" : false}
        viewport={{ once: true }}
      >
        {/* Enhanced central timeline line with breathing effect */}
        <motion.div 
          className="timeline__line"
          variants={timelineVariants}
          animate={{
            boxShadow: [
              `0 0 10px rgba(100, 255, 218, 0.3)`,
              `0 0 20px rgba(100, 255, 218, 0.8)`,
              `0 0 10px rgba(100, 255, 218, 0.3)`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Enhanced animated data particles */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div 
              key={`particle-${i}`}
              className={`timeline__particle timeline__particle--${(i % 3) + 1}`}
              animate={{ 
                y: ['-10px', '100vh'],
                opacity: [0, 1, 1, 0],
                scale: matrixMode ? [1, 1.5, 1] : [1, 1, 1]
              }}
              transition={{ 
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1 + (i % 2),
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Matrix mode particles */}
          {matrixMode && Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="timeline__matrix-particle"
              animate={{
                y: ['-20px', '100vh'],
                opacity: [0, 1, 0],
                x: [0, Math.sin(i) * 20]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                left: `${45 + Math.random() * 10}%`,
                color: '#00ff00',
                fontSize: '10px',
                fontFamily: 'monospace'
              }}
            >
              {generateMatrixText().slice(0, 1)}
            </motion.div>
          ))}
        </motion.div>

        {/* Experience entries */}
        <div className="timeline__entries">
          {experiences.map((experience, index) => {
            const isExpanded = expandedCards.has(index);
            const isLeft = index % 2 === 0;
            const clickCount = clickCounts[index] || 0;
            
            return (
              <motion.div
                key={`experience-${index}`}
                className={`timeline__entry timeline__entry--${isLeft ? 'left' : 'right'} ${isExpanded ? 'timeline__entry--expanded' : ''}`}
                variants={experienceVariants}
                whileHover={hackMode ? {
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 2
                } : {}}
              >
                {/* Timeline connector with enhanced effects */}
                <div className="timeline__connector">
                  <motion.div 
                    className={`timeline__node ${isExpanded ? 'timeline__node--active' : ''}`}
                    whileHover={{ scale: 1.3 }}
                    animate={isExpanded ? {
                      boxShadow: [
                        '0 0 0 rgba(100, 255, 218, 0.5)',
                        '0 0 30px rgba(100, 255, 218, 1)',
                        '0 0 0 rgba(100, 255, 218, 0.5)'
                      ],
                      rotate: hackMode ? [0, 360] : [0, 0]
                    } : {}}
                    transition={{ 
                      duration: hackMode ? 2 : 2, 
                      repeat: Infinity,
                      ease: hackMode ? "linear" : "easeInOut"
                    }}
                  />
                  
                  {/* Node pulse rings */}
                  {isExpanded && (
                    <>
                      <motion.div
                        className="timeline__pulse-ring"
                        animate={{
                          scale: [1, 3],
                          opacity: [0.7, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="timeline__pulse-ring"
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Enhanced experience card */}
                <motion.div 
                  className={`timeline__card ${isExpanded ? 'timeline__card--expanded' : ''} ${clickCount >= 3 ? 'timeline__card--clicked' : ''}`}
                  onClick={() => handleCardToggle(index)}
                  whileHover={{ 
                    y: -6,
                    boxShadow: isExpanded 
                      ? `0 25px 50px rgba(100, 255, 218, 0.4)`
                      : `0 15px 30px rgba(0, 0, 0, 0.4)`,
                    scale: glitchMode ? [1, 1.02, 1] : 1
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={glitchMode ? {
                    x: [0, 2, -2, 0],
                    skew: [0, 1, -1, 0]
                  } : {}}
                  transition={glitchMode ? {
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  } : {}}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Holographic overlay */}
                  {(matrixMode || hackMode) && (
                    <motion.div
                      className="timeline__hologram"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        background: [
                          'linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.1), transparent)',
                          'linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.3), transparent)',
                          'linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.1), transparent)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Enhanced security badge */}
                  {isExpanded && (
                    <motion.div 
                      className="timeline__security-badge"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        boxShadow: hackMode ? [
                          '0 0 15px rgba(100, 255, 218, 0.5)',
                          '0 0 25px rgba(100, 255, 218, 0.8)',
                          '0 0 15px rgba(100, 255, 218, 0.5)'
                        ] : '0 0 15px rgba(100, 255, 218, 0.5)'
                      }}
                      transition={{ 
                        delay: 0.3, 
                        duration: 0.5,
                        boxShadow: hackMode ? { duration: 1.5, repeat: Infinity } : {}
                      }}
                    >
                      <motion.span 
                        className="timeline__badge-icon"
                        animate={hackMode ? { rotate: [0, 360] } : {}}
                        transition={hackMode ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
                      >
                        🔐
                      </motion.span>
                      <span className="timeline__badge-text">
                        {clickCount >= 5 ? 'HACKED' : clickCount >= 3 ? 'BREACHED' : 'ACTIVE'}
                      </span>
                    </motion.div>
                  )}

                  {/* Company logo with enhanced effects */}
                  {experience.companylogo && (
                    <motion.div 
                      className="timeline__logo"
                      whileHover={hackMode ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                    >
                      <motion.img 
                        src={experience.companylogo} 
                        alt={`${experience.company} logo`}
                        className="timeline__logo-image"
                        animate={glitchMode ? {
                          filter: [
                            'none',
                            'hue-rotate(90deg) saturate(150%)',
                            'hue-rotate(180deg) saturate(200%)',
                            'none'
                          ]
                        } : {}}
                        transition={glitchMode ? { duration: 2, repeat: Infinity } : {}}
                      />
                    </motion.div>
                  )}

                  {/* Card header */}
                  <div className="timeline__header">
                    <motion.h3 
                      className="timeline__role"
                      animate={matrixMode ? {
                        color: ['#ffffff', '#00ff00', '#ffffff']
                      } : {}}
                      transition={matrixMode ? { duration: 3, repeat: Infinity } : {}}
                    >
                      {experience.role}
                    </motion.h3>
                    <div className="timeline__company-info">
                      <span className="timeline__company">{experience.company}</span>
                      <span className="timeline__date">{experience.date}</span>
                    </div>
                  </div>

                  {/* Expandable content with enhanced animations */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        className="timeline__content"
                        initial={{ opacity: 0, height: 0, rotateX: -90 }}
                        animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
                        exit={{ opacity: 0, height: 0, rotateX: -90 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {/* Enhanced security classification with description */}
                        <motion.div 
                          className="timeline__classification"
                          animate={hackMode ? {
                            backgroundColor: ['#ef4444', '#f59e0b', '#ef4444']
                          } : {}}
                          transition={hackMode ? { duration: 1, repeat: Infinity } : {}}
                        >
                          <motion.span 
                            className="timeline__classification-label"
                            animate={hackMode ? {
                              textShadow: [
                                '0 0 5px #ef4444',
                                '0 0 10px #ef4444, 0 0 15px #ef4444',
                                '0 0 5px #ef4444'
                              ]
                            } : {}}
                            transition={hackMode ? { duration: 1.5, repeat: Infinity } : {}}
                          >
                            {clickCount >= 5 ? 'CLASSIFIED' : clickCount >= 3 ? 'RESTRICTED' : 'DECLASSIFIED'}
                          </motion.span>
                          
                          {/* Description now inside classification section */}
                          {experience.desc && (
                            <motion.p 
                              className="timeline__description"
                              animate={matrixMode ? {
                                textShadow: [
                                  'none',
                                  '0 0 5px #00ff00',
                                  'none'
                                ]
                              } : {}}
                              transition={matrixMode ? { duration: 2, repeat: Infinity } : {}}
                            >
                              {experience.desc}
                            </motion.p>
                          )}
                        </motion.div>

                        {/* Enhanced bullet points */}
                        {experience.descBullets && experience.descBullets.length > 0 && (
                          <ul className="timeline__bullets">
                            {experience.descBullets.map((bullet, bulletIndex) => (
                              <motion.li 
                                key={bulletIndex}
                                className="timeline__bullet"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: bulletIndex * 0.15 }}
                                whileHover={hackMode ? {
                                  x: 10,
                                  color: '#00ff00'
                                } : {}}
                              >
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {/* Enhanced terminal footer */}
                        <motion.div 
                          className="timeline__terminal"
                          animate={hackMode ? {
                            boxShadow: [
                              '0 0 5px rgba(100, 255, 218, 0.3)',
                              '0 0 15px rgba(100, 255, 218, 0.6)',
                              '0 0 5px rgba(100, 255, 218, 0.3)'
                            ]
                          } : {}}
                          transition={hackMode ? { duration: 2, repeat: Infinity } : {}}
                        >
                          <span className="timeline__prompt">user@portfolio:~$</span>
                          <motion.span 
                            className="timeline__cursor"
                            animate={{
                              opacity: [1, 0, 1],
                              scale: hackMode ? [1, 1.2, 1] : [1, 1, 1]
                            }}
                            transition={{
                              opacity: { duration: 1, repeat: Infinity },
                              scale: hackMode ? { duration: 0.5, repeat: Infinity } : {}
                            }}
                          >
                            _
                          </motion.span>
                          {hackMode && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              className="timeline__hack-text"
                            >
                              {' '}accessing_classified_data...
                            </motion.span>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced cyberpunk border effects */}
                  <motion.div 
                    className="timeline__border-effect"
                    animate={isExpanded && hackMode ? {
                      background: [
                        'linear-gradient(45deg, transparent 30%, rgba(100, 255, 218, 0.1) 50%, transparent 70%)',
                        'linear-gradient(45deg, transparent 30%, rgba(239, 68, 68, 0.2) 50%, transparent 70%)',
                        'linear-gradient(45deg, transparent 30%, rgba(100, 255, 218, 0.1) 50%, transparent 70%)'
                      ]
                    } : {}}
                    transition={isExpanded && hackMode ? { duration: 2, repeat: Infinity } : {}}
                  />
                  
                  {/* Enhanced data streams */}
                  {isExpanded && (
                    <div className="timeline__data-streams">
                      {[1, 2, 3, 4, 5].map((stream) => (
                        <motion.div
                          key={stream}
                          className={`timeline__data-stream timeline__data-stream--${(stream % 3) + 1}`}
                          animate={{
                            y: ['-10px', '110%'],
                            opacity: hackMode ? [0, 1, 0.5, 0] : [0, 1, 0],
                            scale: matrixMode ? [1, 1.5, 1] : [1, 1, 1]
                          }}
                          transition={{
                            duration: 2 + (stream % 3),
                            delay: stream * 0.3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Glitch overlay */}
                  {glitchMode && (
                    <motion.div
                      className="timeline__glitch-overlay"
                      animate={{
                        opacity: [0, 0.3, 0],
                        x: [0, 5, -5, 0],
                        scaleX: [1, 1.01, 0.99, 1]
                      }}
                      transition={{
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced background cybersecurity effects */}
        <div className="timeline__background-effects">
          <motion.div 
            className="timeline__security-scan"
            animate={{ 
              x: ['-100vw', '100vw'],
              opacity: [0, 1, 1, 0],
              height: hackMode ? ['2px', '4px', '2px'] : ['2px', '2px', '2px']
            }}
            transition={{ 
              duration: hackMode ? 6 : 8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: hackMode ? 2 : 4
            }}
          />
          
          <motion.div 
            className="timeline__grid-overlay"
            animate={{ 
              opacity: matrixMode ? [0.1, 0.4, 0.1] : [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: matrixMode ? 2 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Additional hack mode effects */}
          {hackMode && (
            <>
              <motion.div
                className="timeline__hack-scanline"
                animate={{
                  y: ['-10px', '100vh'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className="timeline__radar-sweep"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </>
          )}
        </div>
        
        {/* Matrix rain effect */}
        {matrixMode && (
          <div className="timeline__matrix-rain">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="timeline__matrix-column"
                style={{ left: `${i * 5}%` }}
                animate={{
                  y: ['-100vh', '100vh']
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              >
                {generateMatrixText()}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

Timeline.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string,
    descBullets: PropTypes.arrayOf(PropTypes.string),
    companylogo: PropTypes.string,
    url: PropTypes.string
  })).isRequired,
  expandedCards: PropTypes.instanceOf(Set),
  onCardToggle: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  className: PropTypes.string,
  onTerminalCommand: PropTypes.any // Prop to detect terminal commands and reset easter eggs
};

export default Timeline;