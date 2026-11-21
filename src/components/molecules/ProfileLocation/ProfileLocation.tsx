import { useState } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import MapComponent from '@molecules/MapComponent';
import { useMotionEnabled } from '@utils/motion';
import type { ClusterStatusResult } from '@/types/cluster';
import './ProfileLocation.css';

const terminalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export type ProfileLocationVariant = 'default' | 'secure' | 'breach' | 'critical';

const STATUS_TEXT: Record<ProfileLocationVariant, string> = {
  default: 'ACTIVE',
  secure: 'SECURED',
  breach: 'BREACH DETECTED',
  critical: 'CRITICAL ALERT',
};

export interface ProfileLocationProps extends Omit<HTMLMotionProps<'div'>, 'animate'> {
  /** Place name shown in the status line and on the map, e.g. "Canton, GA" */
  location?: string;
  /** Security theme for the status line */
  variant?: ProfileLocationVariant;
  /** Whether to animate the component */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Live cluster telemetry for the map panel; omitted, the panel is hidden */
  clusterStatus?: ClusterStatusResult;
}

/**
 * A system-status line above the map: frames `MapComponent` as a terminal
 * panel for the profile card. A props-only building block.
 */
const ProfileLocation = ({ location = 'Canton, GA', variant = 'default', animate = true, className = '', clusterStatus, ...props }: ProfileLocationProps) => {
  const [isLive, setIsLive] = useState(true);
  const shouldAnimate = useMotionEnabled(animate);

  if (!location) {
    return null;
  }

  return (
    <motion.div
      className={`profile-location profile-location--${variant} ${className}`}
      variants={shouldAnimate ? terminalVariants : undefined}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      {...props}
    >
      <div className="profile-location__system-status">
        <div className="status-left">
          <span className="system-label">SECURITY SYSTEM:</span>
          <span className={`system-status system-status--${variant}`}>{STATUS_TEXT[variant]}</span>
          <span className="separator">|</span>
          <span className="profile-location__place">Location: {location}</span>
        </div>
        <div className="status-right">
          <span className={`live-indicator ${isLive ? 'active' : ''}`}>[{isLive ? 'LIVE' : 'OFF'}]</span>
          <button type="button" className="control-button refresh-btn" onClick={() => setIsLive((live) => !live)} aria-label="Toggle live status" aria-pressed={isLive}>
            [REFRESH]
          </button>
        </div>
      </div>

      <div className="profile-location__map-wrapper">
        <MapComponent location={location} animated={animate} clusterStatus={clusterStatus} />
      </div>
    </motion.div>
  );
};

export default ProfileLocation;
