import React from 'react';
import { motion, AnimatePresence, Transition, TargetAndTransition } from 'framer-motion';
import './TimelineCard.css';
import type { Experience } from '@/types/portfolio';

const CYAN_GLOW = (alpha: number) => `rgba(100, 255, 218, ${alpha})`;
const loop = (duration: number, extra: Transition = {}): Transition => ({ duration, repeat: Infinity, ...extra });

/** Badge and classification wording escalate with the number of clicks. */
const statusFor = (clickCount: number) => {
  if (clickCount >= 5) return { badge: 'HACKED', classification: 'CLASSIFIED' };
  if (clickCount >= 3) return { badge: 'BREACHED', classification: 'RESTRICTED' };
  return { badge: 'ACTIVE', classification: 'DECLASSIFIED' };
};

/** Up to three capital letters from a company name, e.g. "Mastery Logistics Systems" gives "MLS". */
export const companyInitials = (company: string): string =>
  company
    .split(/[\s&,.-]+/)
    .filter((word) => /^[A-Za-z0-9]/.test(word) && !/^(the|of|and|inc|llc|ltd)$/i.test(word))
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join('') || company.slice(0, 2).toUpperCase();

/** Generated avatars are placeholders, not logos; draw the initials badge instead. */
const isPlaceholderLogo = (url?: string) => !url || /ui-avatars\.com/i.test(url);

/** One role on the timeline. Only the role, company and dates are required. */
export type TimelineExperience = Pick<Experience, 'role' | 'company' | 'date'> &
  Partial<Pick<Experience, 'desc' | 'descBullets' | 'companylogo' | 'url'>>;

/** Easter-egg effects; each is off unless set. */
export interface TimelineEffects {
  matrix?: boolean;
  glitch?: boolean;
  hack?: boolean;
  shake?: boolean;
}

export interface TimelineCardProps {
  /** The role to show */
  experience: TimelineExperience;
  /** Whether the details are open */
  expanded?: boolean;
  /** Called when the card is activated */
  onToggle?: () => void;
  /** Times this card has been clicked; changes the status wording */
  clickCount?: number;
  /** Easter-egg effects to apply: matrix, glitch, hack */
  effects?: TimelineEffects;
  /** Whether looping decoration (data streams, blinking cursor) runs; the timeline turns it off while off screen */
  ambient?: boolean;
}

/**
 * One role on the experience timeline: logo, title, company and dates, with
 * the description, achievements and a terminal footer shown when expanded.
 *
 * Takes everything through props and renders without any provider.
 *
 * @component
 */
const TimelineCard = ({ experience, expanded = false, onToggle = () => {}, clickCount = 0, effects = {}, ambient = true }: TimelineCardProps) => {
  const { matrix = false, glitch = false, hack = false } = effects;
  const status = statusFor(clickCount);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      className={`timeline__card ${expanded ? 'timeline__card--expanded' : ''} ${clickCount >= 3 ? 'timeline__card--clicked' : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${experience.role} at ${experience.company}, ${experience.date}`}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      whileHover={{
        y: -6,
        boxShadow: expanded ? `0 25px 50px ${CYAN_GLOW(0.4)}` : '0 15px 30px rgba(0, 0, 0, 0.4)',
        scale: glitch ? [1, 1.02, 1] : 1,
      }}
      whileTap={{ scale: 0.98 }}
      // skew animates at runtime but is missing from Framer Motion's target type
      animate={glitch ? ({ x: [0, 2, -2, 0], skew: [0, 1, -1, 0] } as TargetAndTransition) : {}}
      transition={glitch ? loop(0.2, { repeatType: 'reverse' }) : {}}
      style={{ cursor: 'pointer' }}
    >
      {ambient && (matrix || hack) && (
        <motion.div
          className="timeline__hologram"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            background: [0.1, 0.3, 0.1].map((alpha) => `linear-gradient(45deg, transparent, ${CYAN_GLOW(alpha)}, transparent)`),
          }}
          transition={loop(2)}
        />
      )}

      {expanded && (
        <motion.div
          className="timeline__security-badge"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            boxShadow: hack ? [0.5, 0.8, 0.5].map((alpha, i) => `0 0 ${i === 1 ? 25 : 15}px ${CYAN_GLOW(alpha)}`) : `0 0 15px ${CYAN_GLOW(0.5)}`,
          }}
          transition={{ delay: 0.3, duration: 0.5, boxShadow: hack ? loop(1.5) : {} }}
        >
          <motion.span
            className="timeline__badge-icon"
            aria-hidden="true"
            animate={hack ? { rotate: [0, 360] } : {}}
            transition={hack ? loop(2, { ease: 'linear' }) : {}}
          >
            🔐
          </motion.span>
          <span className="timeline__badge-text">{status.badge}</span>
        </motion.div>
      )}

      {isPlaceholderLogo(experience.companylogo) ? (
        <div className="timeline__logo">
          <span className="timeline__initials" aria-hidden="true">{companyInitials(experience.company)}</span>
        </div>
      ) : (
        <motion.div className="timeline__logo" whileHover={hack ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] } : {}}>
          <motion.img
            src={experience.companylogo}
            alt={`${experience.company} logo`}
            className="timeline__logo-image"
            animate={glitch ? { filter: ['none', 'hue-rotate(90deg) saturate(150%)', 'hue-rotate(180deg) saturate(200%)', 'none'] } : {}}
            transition={glitch ? loop(2) : {}}
          />
        </motion.div>
      )}

      <div className="timeline__header">
        <motion.h3
          className="timeline__role"
          animate={matrix ? { color: ['#ffffff', '#00ff00', '#ffffff'] } : {}}
          transition={matrix ? loop(3) : {}}
        >
          {experience.role}
        </motion.h3>
        <div className="timeline__company-info">
          <span className="timeline__company">{experience.company}</span>
          <span className="timeline__date">{experience.date}</span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="timeline__content"
            initial={{ opacity: 0, height: 0, rotateX: -90 }}
            animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: -90 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <motion.div
              className="timeline__classification"
              animate={hack ? { backgroundColor: ['#ef4444', '#f59e0b', '#ef4444'] } : {}}
              transition={hack ? loop(1) : {}}
            >
              <motion.span
                className="timeline__classification-label"
                animate={hack ? { textShadow: ['0 0 5px #ef4444', '0 0 10px #ef4444, 0 0 15px #ef4444', '0 0 5px #ef4444'] } : {}}
                transition={hack ? loop(1.5) : {}}
              >
                {status.classification}
              </motion.span>

              {experience.desc && (
                <motion.p
                  className="timeline__description"
                  animate={matrix ? { textShadow: ['none', '0 0 5px #00ff00', 'none'] } : {}}
                  transition={matrix ? loop(2) : {}}
                >
                  {experience.desc}
                </motion.p>
              )}
            </motion.div>

            {experience.descBullets && experience.descBullets.length > 0 && (
              <ul className="timeline__bullets">
                {experience.descBullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    className="timeline__bullet"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={hack ? { x: 10, color: '#00ff00' } : {}}
                  >
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            )}

            <motion.div
              className="timeline__terminal"
              aria-hidden="true"
              animate={hack ? { boxShadow: [0.3, 0.6, 0.3].map((alpha, i) => `0 0 ${i === 1 ? 15 : 5}px ${CYAN_GLOW(alpha)}`) } : {}}
              transition={hack ? loop(2) : {}}
            >
              <span className="timeline__prompt">user@portfolio:~$</span>
              <motion.span
                className="timeline__cursor"
                animate={ambient ? { opacity: [1, 0, 1], scale: hack ? [1, 1.2, 1] : [1, 1, 1] } : { opacity: 1 }}
                transition={ambient ? { opacity: loop(1), scale: hack ? loop(0.5) : {} } : { duration: 0 }}
              >
                _
              </motion.span>
              {hack && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} className="timeline__hack-text">
                  {' '}accessing_classified_data...
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="timeline__border-effect"
        animate={
          expanded && hack
            ? {
                background: [CYAN_GLOW(0.1), 'rgba(239, 68, 68, 0.2)', CYAN_GLOW(0.1)].map(
                  (color) => `linear-gradient(45deg, transparent 30%, ${color} 50%, transparent 70%)`
                ),
              }
            : {}
        }
        transition={expanded && hack ? loop(2) : {}}
      />

      {expanded && ambient && (
        <div className="timeline__data-streams" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((stream) => (
            <motion.div
              key={stream}
              className={`timeline__data-stream timeline__data-stream--${(stream % 3) + 1}`}
              animate={{
                y: ['-10px', '110%'],
                opacity: hack ? [0, 1, 0.5, 0] : [0, 1, 0],
                scale: matrix ? [1, 1.5, 1] : [1, 1, 1],
              }}
              transition={loop(2 + (stream % 3), { delay: stream * 0.3, ease: 'linear' })}
            />
          ))}
        </div>
      )}

      {glitch && (
        <motion.div
          className="timeline__glitch-overlay"
          animate={{ opacity: [0, 0.3, 0], x: [0, 5, -5, 0], scaleX: [1, 1.01, 0.99, 1] }}
          transition={loop(0.15, { repeatType: 'reverse' })}
        />
      )}
    </motion.div>
  );
};

export default TimelineCard;
