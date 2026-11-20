import { motion } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import type { ClusterStatusResult } from '@/types/cluster';
import { clusterHealth, clusterReadings, healthLabel } from './clusterSummary';
import './ClusterStatus.css';

export interface ClusterStatusProps extends ClusterStatusResult {
  /** Whether the live dot pulses */
  animated?: boolean;
  /** `panel` lists every reading; `compact` hides the title and last-updated line */
  variant?: 'panel' | 'compact';
}

const formatTime = (iso: string): string | null => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Live numbers from the homelab cluster, in the terminal style. Shows only
 * what the cluster reported: while loading or when the feed is down it says
 * so and shows no figures.
 */
const ClusterStatus = ({ status, data, animated = true, variant = 'panel' }: ClusterStatusProps) => {
  const motionOn = useMotionEnabled(animated);
  const live = status === 'ok' && data !== null;
  const health = live ? clusterHealth(data) : 'unknown';
  const readings = live ? clusterReadings(data) : [];
  const time = live ? formatTime(data.updatedAt) : null;
  const headline = healthLabel(health);

  const dotState = !live ? 'offline' : health === 'degraded' ? 'degraded' : 'live';
  const pulse = motionOn && dotState !== 'offline';

  return (
    <section className={`cluster-status cluster-status--${variant}`} aria-label="Cluster status" data-state={status}>
      <div className="cluster-status__header">
        {variant === 'panel' && <span className="cluster-status__title">CLUSTER TELEMETRY</span>}
        <span className="cluster-status__badge">
          <motion.span
            className={`cluster-status__dot cluster-status__dot--${dotState}`}
            aria-hidden="true"
            animate={{ opacity: pulse ? [0.35, 1, 0.35] : 1 }}
            transition={pulse ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
          />
          <span className="cluster-status__state">
            {status === 'loading' && 'ACQUIRING'}
            {status === 'error' && 'OFFLINE'}
            {live && (headline ? headline.toUpperCase() : 'LIVE')}
          </span>
        </span>
      </div>

      {status === 'loading' && <p className="cluster-status__note">Reading the cluster...</p>}
      {status === 'error' && <p className="cluster-status__note">Telemetry offline. No figures to show.</p>}
      {live && readings.length === 0 && <p className="cluster-status__note">Telemetry offline. No figures to show.</p>}

      {readings.length > 0 && (
        <dl className="cluster-status__grid">
          {readings.map((reading) => (
            <div className="cluster-status__row" key={reading.id}>
              <dt className="cluster-status__label">{reading.label}</dt>
              <dd className="cluster-status__value">{reading.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {variant === 'panel' && live && time && (
        <p className="cluster-status__updated">
          UPDATED <time dateTime={data.updatedAt}>{time}</time>
        </p>
      )}
    </section>
  );
};

export default ClusterStatus;
