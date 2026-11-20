import { motion, type Variants } from 'framer-motion';
import ClusterStatus from '@molecules/ClusterStatus';
import type { ClusterStatusResult } from '@/types/cluster';
import type { MapTileMode } from './useLeafletMap';

/**
 * Presentational pieces of the map panel. Each takes plain props and knows
 * nothing about Leaflet.
 */

const panelVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.6, ease: 'easeOut' } },
};

export interface MapGridOverlayProps {
  /** Tints the grid to stay visible on the current tiles */
  tileMode: MapTileMode;
}

/** Decorative 30 by 30 grid drawn over the map with CSS backgrounds. */
export const MapGridOverlay = ({ tileMode }: MapGridOverlayProps) => (
  <div className={`map-grid-overlay ${tileMode === 'dark' ? 'grid-dark-mode' : 'grid-light-mode'}`} aria-hidden="true">
    <div className="map-grid-overlay__pattern" />
  </div>
);

export interface MapMetricsPanelProps {
  /** Live cluster numbers. Without them the panel is not rendered: it never shows made-up figures. */
  cluster?: ClusterStatusResult;
  /** Whether the live dot pulses */
  animated?: boolean;
}

/** The floating cluster readout, showing real numbers passed in by props. */
export const MapMetricsPanel = ({ cluster, animated = true }: MapMetricsPanelProps) => {
  if (!cluster) return null;
  return (
    <motion.div className="security-metrics-panel" variants={panelVariants} initial="hidden" animate="visible">
      <ClusterStatus status={cluster.status} data={cluster.data} animated={animated} />
    </motion.div>
  );
};

export interface MapControlsBarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onToggleGrid: () => void;
  onToggleTiles: () => void;
  /** Current grid state, reported to assistive technology */
  gridVisible: boolean;
  /** Current tile mode; the tiles button offers the other one */
  tileMode: MapTileMode;
}

/** The row of map controls under the map. */
export const MapControlsBar = ({ onZoomIn, onZoomOut, onRecenter, onToggleGrid, onToggleTiles, gridVisible, tileMode }: MapControlsBarProps) => (
  <div className="map-controls-bar">
    <div className="controls-left">
      <span className="controls-label">Controls:</span>
      <button type="button" className="control-button zoom-in" onClick={onZoomIn} aria-label="Zoom in">
        [+]
      </button>
      <button type="button" className="control-button zoom-out" onClick={onZoomOut} aria-label="Zoom out">
        [-]
      </button>
      <span className="control-text">Zoom</span>
    </div>
    <div className="controls-center">
      <button type="button" className="control-button center-view" onClick={onRecenter} aria-label="Center view">
        [Center]
      </button>
      <span className="separator">|</span>
      <button type="button" className="control-button refresh" onClick={onToggleGrid} aria-label="Toggle grid overlay" aria-pressed={gridVisible}>
        [Grid]
      </button>
    </div>
    <div className="controls-right">
      <motion.button
        type="button"
        className="control-button toggle-layers-special"
        onClick={onToggleTiles}
        aria-label={tileMode === 'dark' ? 'Switch to light map' : 'Switch to dark map'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ['0 0 8px rgba(var(--color-cyan-rgb), 0.3)', '0 0 16px rgba(var(--color-cyan-rgb), 0.6)', '0 0 8px rgba(var(--color-cyan-rgb), 0.3)'],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {tileMode === 'dark' ? '☀ LIGHT MAP' : '☾ DARK MAP'}
      </motion.button>
    </div>
  </div>
);
