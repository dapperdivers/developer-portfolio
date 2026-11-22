import { motion } from 'framer-motion';
import StatTileGrid from '@molecules/StatTileGrid';
import TelemetryStatusLine from '@molecules/TelemetryStatusLine';
import VersionChips from '@molecules/VersionChips';
import useClusterStatus from '@hooks/useClusterStatus';
import { useAnimation } from '@context/AnimationContext';
import { slideUpVariants, useMotionEnabled } from '@utils/motion';
import { ageSentence, gitopsSummary, telemetryTiles, versionItems } from '@utils/clusterTelemetry';
import { clusterHealth } from '@molecules/ClusterStatus/clusterSummary';
import type { ClusterStatusResult } from '@/types/cluster';
import './ClusterTelemetry.css';

export const CLUSTER_REPO_URL = 'https://github.com/dapperdivers/dapper-cluster';

const PLACEHOLDER_LABELS = ['Nodes', 'Pods', 'Services up', 'Uptime', 'Power draw', 'CPU', 'Memory', 'Alerts'];

export interface ClusterTelemetryProps {
  /** Use this reading instead of fetching one (stories and tests) */
  result?: ClusterStatusResult;
}

/**
 * The live telemetry band under the hero: the numbers from the Kubernetes
 * cluster that serves this page. Shows only what the cluster reported;
 * while loading it shimmers, and when the feed is down it says so.
 */
const ClusterTelemetry = ({ result }: ClusterTelemetryProps) => {
  const live = useClusterStatus();
  const { status, data } = result ?? live;
  const { animationEnabled } = useAnimation();
  const motionOn = useMotionEnabled(animationEnabled);

  const ok = status === 'ok' && data !== null;
  const tiles = ok ? telemetryTiles(data) : [];
  const hasFigures = tiles.length > 0;
  const health = ok ? clusterHealth(data) : 'unknown';
  const gitops = ok ? gitopsSummary(data) : null;

  const state = status === 'loading' ? 'loading' : !ok || (!hasFigures && health === 'unknown') ? 'offline' : health === 'degraded' ? 'degraded' : 'up';

  return (
    <motion.section
      id="cluster"
      className="cluster-telemetry"
      aria-labelledby="cluster-telemetry-title"
      variants={slideUpVariants}
      initial={motionOn ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      data-state={state}
    >
      <div className="cluster-telemetry__inner">
        <header className="cluster-telemetry__header">
          <div className="cluster-telemetry__heading">
            <p className="cluster-telemetry__kicker" aria-hidden="true">~/cluster</p>
            <h2 id="cluster-telemetry-title" className="cluster-telemetry__title">
              This site runs in my garage
            </h2>
            <p className="cluster-telemetry__lede">
              These numbers are live from the Kubernetes cluster serving this page.
            </p>
          </div>
          <a
            className="cluster-telemetry__link"
            href={CLUSTER_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            See how it&apos;s built <span aria-hidden="true">→</span>
            <span className="cluster-telemetry__sr"> (opens GitHub in a new tab)</span>
          </a>
        </header>

        {state === 'offline' ? (
          <TelemetryStatusLine state="offline" label="Telemetry offline" animated={animationEnabled} />
        ) : (
          <>
            <StatTileGrid
              tiles={tiles.map((t) => ({ id: t.id, label: t.label, value: t.number, unit: t.unit, tone: t.tone }))}
              loading={status === 'loading'}
              placeholders={PLACEHOLDER_LABELS}
              animated={animationEnabled}
              ariaLabel="Live cluster readings"
            />
            <div className="cluster-telemetry__meta">
              <TelemetryStatusLine
                state={state}
                updatedAt={ok ? data.updatedAt : undefined}
                animated={animationEnabled}
              />
              {ok && (
                <div className="cluster-telemetry__stack">
                  <VersionChips items={versionItems(data)} note={ageSentence(data) ?? undefined} />
                  {gitops && (gitops.items.length > 0 || gitops.note) && (
                    <div className="cluster-telemetry__gitops" data-testid="cluster-gitops">
                      <span className="cluster-telemetry__gitops-label">GitOps</span>
                      <VersionChips items={gitops.items} note={gitops.note ?? undefined} label="Flux objects" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default ClusterTelemetry;
