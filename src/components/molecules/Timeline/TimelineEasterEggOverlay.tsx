import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TimelineEasterEggOverlay.css';
import type { TimelineTrailPoint } from './useTimelineEasterEggs';

/** How long an achievement toast stays before asking to be dismissed. */
const ACHIEVEMENT_MS = 3500;

interface AchievementProps {
  name: string;
  index: number;
  onDismiss: (name: string) => void;
}

const Achievement = ({ name, index, onDismiss }: AchievementProps) => {
  useEffect(() => {
    const id = setTimeout(() => onDismiss(name), ACHIEVEMENT_MS + index * 500);
    return () => clearTimeout(id);
  }, [name, index, onDismiss]);

  return (
    <motion.div
      className="timeline__achievement"
      role="status"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ delay: index * 0.5 }}
      style={{ top: `${100 + index * 60}px` }}
    >
      🏆 Achievement Unlocked: {name.replace('-', ' ').toUpperCase()}
    </motion.div>
  );
};

export interface TimelineEasterEggOverlayProps {
  /** Banner text; empty hides the banner */
  secretMessage?: string;
  /** Achievement names to show as toasts */
  achievements?: string[];
  /** Called with a name when its toast has been shown long enough */
  onDismissAchievement?: (name: string) => void;
  /** Viewport points to draw fading dots at */
  mouseTrail?: TimelineTrailPoint[];
  /** Colour of the trail dots */
  trailColor?: string;
}

/**
 * Screen-level feedback for the timeline's hidden extras: the pointer trail,
 * the banner message and the achievement toasts. Renders nothing when all
 * three are empty.
 *
 * @component
 */
const TimelineEasterEggOverlay = ({
  secretMessage = '',
  achievements = [],
  onDismissAchievement = () => {},
  mouseTrail = [],
  trailColor = '#64ffda',
}: TimelineEasterEggOverlayProps) => (
  <>
    <AnimatePresence>
      {mouseTrail.map((point) => (
        <motion.div
          key={point.id}
          className="timeline__mouse-trail"
          aria-hidden="true"
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
            background: trailColor,
            boxShadow: `0 0 10px ${trailColor}`,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      ))}
    </AnimatePresence>

    <AnimatePresence>
      {secretMessage && (
        <motion.div
          className="timeline__secret-message"
          role="status"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          {secretMessage}
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {achievements.map((name, index) => (
        <Achievement key={name} name={name} index={index} onDismiss={onDismissAchievement} />
      ))}
    </AnimatePresence>
  </>
);

export default TimelineEasterEggOverlay;
