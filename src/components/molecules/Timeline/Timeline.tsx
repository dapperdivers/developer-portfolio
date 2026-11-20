import React, { useMemo } from 'react';
import { motion, Transition, Variants } from 'framer-motion';
import TimelineCard from './TimelineCard';
import type { TimelineEffects, TimelineExperience } from './TimelineCard';
import './Timeline.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.5, ease: 'easeOut' } },
};

const entryVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const matrixText = (length: number) => Array.from({ length }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join('');

const loop = (duration: number, extra: Transition = {}): Transition => ({ duration, repeat: Infinity, ...extra });

interface TimelineNodeProps {
  active?: boolean;
  hack?: boolean;
}

/** The node on the centre line for one entry, with pulse rings while its card is open. */
const TimelineNode = ({ active, hack }: TimelineNodeProps) => (
  <div className="timeline__connector" aria-hidden="true">
    <motion.div
      className={`timeline__node ${active ? 'timeline__node--active' : ''}`}
      whileHover={{ scale: 1.3 }}
      animate={
        active
          ? {
              boxShadow: ['0 0 0 rgba(100, 255, 218, 0.5)', '0 0 30px rgba(100, 255, 218, 1)', '0 0 0 rgba(100, 255, 218, 0.5)'],
              rotate: hack ? [0, 360] : [0, 0],
            }
          : {}
      }
      transition={loop(2, { ease: hack ? 'linear' : 'easeInOut' })}
    />
    {active &&
      [
        { scale: [1, 3], opacity: [0.7, 0], delay: 0 },
        { scale: [1, 2.5], opacity: [0.5, 0], delay: 0.5 },
      ].map(({ delay, ...ring }) => (
        <motion.div key={delay} className="timeline__pulse-ring" animate={ring} transition={loop(2, { ease: 'easeOut', delay })} />
      ))}
  </div>
);

export type TimelineVariant = 'default' | 'secure' | 'breach' | 'critical';

export type TimelineTimeOfDay = '' | 'night-mode' | 'lunch-break' | 'work-hours';

export interface TimelineProps {
  /** Roles to show, newest first */
  experiences: TimelineExperience[];
  /** Indices of the open cards */
  expandedCards?: Set<number>;
  /** Called with the index of an activated card */
  onCardToggle?: (index: number) => void;
  /** Colour variant */
  variant?: TimelineVariant;
  /** Extra class names for the root element */
  className?: string;
  /** Play the entrance animation */
  animated?: boolean;
  /** Easter-egg effects: matrix, glitch, hack, shake */
  effects?: TimelineEffects;
  /** Clicks per card index */
  clickCounts?: Record<number, number>;
  /** Optional ambience */
  timeOfDay?: TimelineTimeOfDay;
}

/**
 * Vertical timeline of roles, alternating left and right of a centre line.
 *
 * A props-only building block: it holds no data and reads no context. The
 * parent decides which cards are open and passes any easter-egg `effects`
 * (see `useTimelineEasterEggs`); with none passed it is a plain timeline.
 *
 * @component
 */
const Timeline = ({
  experiences = [],
  expandedCards = new Set<number>(),
  onCardToggle = () => {},
  variant = 'default',
  className = '',
  animated = true,
  effects = {},
  clickCounts = {},
  timeOfDay = '',
}: TimelineProps) => {
  const { matrix = false, glitch = false, hack = false, shake = false } = effects;

  // Random placement for the matrix extras, fixed for as long as the mode is on
  const matrixParticles = useMemo(
    () =>
      matrix
        ? Array.from({ length: 10 }, (_, i) => ({
            char: matrixText(1),
            left: `${45 + Math.random() * 10}%`,
            drift: Math.sin(i) * 20,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
          }))
        : [],
    [matrix]
  );
  const matrixRain = useMemo(
    () => (matrix ? Array.from({ length: 20 }, () => ({ text: matrixText(20), duration: 3 + Math.random() * 2, delay: Math.random() * 2 })) : []),
    [matrix]
  );

  if (!experiences.length) {
    return (
      <div className="timeline timeline--empty">
        <p className="timeline__empty-message">No experiences to display</p>
      </div>
    );
  }

  const rootClass = [
    'timeline',
    `timeline--${variant}`,
    className,
    matrix && 'timeline--matrix',
    glitch && 'timeline--glitch',
    hack && 'timeline--hack',
    shake && 'timeline--shake',
    timeOfDay && `timeline--${timeOfDay}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div className={rootClass} variants={containerVariants} initial={animated ? 'hidden' : false} animate={animated ? 'visible' : false}>
      <motion.div
        className="timeline__line"
        aria-hidden="true"
        variants={lineVariants}
        animate={{ boxShadow: [0.3, 0.8, 0.3].map((alpha, i) => `0 0 ${i === 1 ? 20 : 10}px rgba(100, 255, 218, ${alpha})`) }}
        transition={loop(3, { ease: 'easeInOut' })}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`timeline__particle timeline__particle--${(i % 3) + 1}`}
            animate={{ y: ['-10px', '100vh'], opacity: [0, 1, 1, 0], scale: matrix ? [1, 1.5, 1] : [1, 1, 1] }}
            transition={loop(4 + (i % 3), { ease: 'linear', repeatDelay: 1 + (i % 2), delay: i * 0.5 })}
          />
        ))}

        {matrixParticles.map((particle, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="timeline__matrix-particle"
            animate={{ y: ['-20px', '100vh'], opacity: [0, 1, 0], x: [0, particle.drift] }}
            transition={loop(particle.duration, { delay: particle.delay, ease: 'linear' })}
            style={{ position: 'absolute', left: particle.left, color: '#00ff00', fontSize: '10px', fontFamily: 'monospace' }}
          >
            {particle.char}
          </motion.div>
        ))}
      </motion.div>

      <div className="timeline__entries">
        {experiences.map((experience, index) => {
          const expanded = expandedCards.has(index);
          return (
            <motion.div
              key={`experience-${index}`}
              className={`timeline__entry timeline__entry--${index % 2 === 0 ? 'left' : 'right'} ${expanded ? 'timeline__entry--expanded' : ''}`}
              variants={entryVariants}
              whileHover={hack ? { scale: 1.05, rotateY: 5, rotateX: 2 } : {}}
            >
              <TimelineNode active={expanded} hack={hack} />
              <TimelineCard
                experience={experience}
                expanded={expanded}
                onToggle={() => onCardToggle(index)}
                clickCount={clickCounts[index] || 0}
                effects={effects}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="timeline__background-effects" aria-hidden="true">
        <motion.div
          className="timeline__security-scan"
          animate={{ x: ['-100vw', '100vw'], opacity: [0, 1, 1, 0], height: hack ? ['2px', '4px', '2px'] : ['2px', '2px', '2px'] }}
          transition={loop(hack ? 6 : 8, { ease: 'linear', repeatDelay: hack ? 2 : 4 })}
        />
        <motion.div
          className="timeline__grid-overlay"
          animate={{ opacity: matrix ? [0.1, 0.4, 0.1] : [0.3, 0.6, 0.3] }}
          transition={loop(matrix ? 2 : 4, { ease: 'easeInOut' })}
        />
        {hack && (
          <>
            <motion.div className="timeline__hack-scanline" animate={{ y: ['-10px', '100vh'], opacity: [0, 1, 0] }} transition={loop(3, { ease: 'linear' })} />
            <motion.div className="timeline__radar-sweep" animate={{ rotate: [0, 360] }} transition={loop(4, { ease: 'linear' })} />
          </>
        )}
      </div>

      {matrix && (
        <div className="timeline__matrix-rain" aria-hidden="true">
          {matrixRain.map((column, i) => (
            <motion.div
              key={`rain-${i}`}
              className="timeline__matrix-column"
              style={{ left: `${i * 5}%` }}
              animate={{ y: ['-100vh', '100vh'] }}
              transition={loop(column.duration, { delay: column.delay, ease: 'linear' })}
            >
              {column.text}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Timeline;
