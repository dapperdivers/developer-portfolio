import { motion } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import { formatUpdated } from '@utils/clusterTelemetry';
import './TelemetryStatusLine.css';

export type TelemetryState = 'up' | 'degraded' | 'loading' | 'offline';

export interface TelemetryStatusLineProps {
  state: TelemetryState;
  /** Text next to the dot. Defaults from `state`. */
  label?: string;
  /** ISO timestamp of the last reading; shown as local time */
  updatedAt?: string;
  /** Whether the dot pulses */
  animated?: boolean;
}

const DEFAULT_LABEL: Record<TelemetryState, string> = {
  up: 'cluster up',
  degraded: 'cluster degraded',
  loading: 'reading the cluster',
  offline: 'telemetry offline',
};

/** A live dot, the cluster state in words, and when it was last read. Props only. */
const TelemetryStatusLine = ({ state, label, updatedAt, animated = true }: TelemetryStatusLineProps) => {
  const motionOn = useMotionEnabled(animated);
  const pulse = motionOn && state !== 'offline';
  const time = updatedAt ? formatUpdated(updatedAt) : null;

  return (
    <p className={`telemetry-status telemetry-status--${state}`} role="status">
      <motion.span
        className="telemetry-status__dot"
        aria-hidden="true"
        animate={{ opacity: pulse ? [0.35, 1, 0.35] : 1 }}
        transition={pulse ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      />
      <span className="telemetry-status__state">{label ?? DEFAULT_LABEL[state]}</span>
      {time && updatedAt ? (
        <span className="telemetry-status__updated">
          updated <time dateTime={updatedAt}>{time}</time>
        </span>
      ) : null}
    </p>
  );
};

export default TelemetryStatusLine;
