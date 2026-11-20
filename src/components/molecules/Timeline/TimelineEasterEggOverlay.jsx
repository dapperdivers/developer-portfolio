import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './Timeline.css';

/** How long an achievement toast stays before asking to be dismissed. */
const ACHIEVEMENT_MS = 3500;

const Achievement = ({ name, index, onDismiss }) => {
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

Achievement.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

/**
 * Screen-level feedback for the timeline's hidden extras: the pointer trail,
 * the banner message and the achievement toasts. Renders nothing when all
 * three are empty.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.secretMessage=''] - Banner text; empty hides the banner
 * @param {string[]} [props.achievements=[]] - Achievement names to show as toasts
 * @param {function} [props.onDismissAchievement] - Called with a name when its toast has been shown long enough
 * @param {Array<{id: number, x: number, y: number}>} [props.mouseTrail=[]] - Viewport points to draw fading dots at
 * @param {string} [props.trailColor='#64ffda'] - Colour of the trail dots
 */
const TimelineEasterEggOverlay = ({
  secretMessage = '',
  achievements = [],
  onDismissAchievement = () => {},
  mouseTrail = [],
  trailColor = '#64ffda',
}) => (
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

TimelineEasterEggOverlay.propTypes = {
  secretMessage: PropTypes.string,
  achievements: PropTypes.arrayOf(PropTypes.string),
  onDismissAchievement: PropTypes.func,
  mouseTrail: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired, x: PropTypes.number.isRequired, y: PropTypes.number.isRequired })),
  trailColor: PropTypes.string,
};

export default TimelineEasterEggOverlay;
