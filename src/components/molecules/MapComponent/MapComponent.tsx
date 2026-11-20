import { useMemo, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { findLocation } from '@utils/geocodingUtils';
import { fadeInVariants, useMotionEnabled } from '@utils/motion';
import useLeafletMap, { type MapTileMode, type MapView } from './useLeafletMap';
import { MapControlsBar, MapGridOverlay, MapMetricsPanel } from './MapParts';
import './MapComponent.css';

const wrapperVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const formatCoordinates = (view: MapView | null): string => (view ? `${view.lat.toFixed(4)}°, ${view.lng.toFixed(4)}°` : 'LOCATION UNKNOWN');

export interface MapComponentProps {
  /** Place name to show, e.g. "Canton, GA". Resolved from a built-in list; no network lookup is made. An unknown name shows a world view with no marker. */
  location: string;
  /** Whether the status light pulses */
  animated?: boolean;
}

/**
 * A terminal-styled map panel centred on a named place, with zoom, recentre,
 * grid and light/dark tile controls. A props-only building block.
 *
 * Leaflet is driven by `useLeafletMap`; this component only decides what to
 * show.
 */
const MapComponent = ({ location, animated = true }: MapComponentProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tileMode, setTileMode] = useState<MapTileMode>('dark');
  const [gridVisible, setGridVisible] = useState(true);
  const motionOn = useMotionEnabled(animated);

  // A place that is not in the built-in list has no view: the map stays on
  // its world view with no marker, and the status line says so.
  const view = useMemo<MapView | null>(() => {
    const found = findLocation(location);
    return found ? { lat: found.lat, lng: found.lng, zoom: found.zoom, label: found.name } : null;
  }, [location]);

  const map = useLeafletMap(mountRef, view, tileMode);
  const errorMessage = map.error;

  return (
    <motion.div className="map-container-wrapper" variants={wrapperVariants} initial="hidden" animate="visible">
      {errorMessage && (
        <motion.div className="map-error-message" role="alert" variants={fadeInVariants} initial="hidden" animate="visible">
          <h3>Map Error</h3>
          <p>{errorMessage}</p>
        </motion.div>
      )}

      {/* Kept mounted even on error, so the map is never torn down and rebuilt */}
      <div hidden={Boolean(errorMessage)}>
        <div className="map-status-bar">
          <div className="status-left">
            <span>{formatCoordinates(view)}</span>
            <span className="separator">|</span>
            <span className="metric-label">SECURITY LEVEL:</span>
            <span className="metric-value">STANDARD</span>
            <span className="separator">|</span>
            <span className="metric-label">PROTOCOL:</span>
            <span className="metric-value">TLS 1.3</span>
            <span className="separator">|</span>
            <span className="metric-label">ENCRYPTION:</span>
            <span className="metric-value">AES-256</span>
            <span className="separator">|</span>
            <span className="metric-label">STATUS:</span>
            <span className="metric-value status-online">ONLINE</span>
          </div>
        </div>

        <div className="map-display-container">
          <div className="map-container">
            {/* Leaflet owns this element's children; React renders nothing inside it */}
            <div ref={mountRef} className="map-container__leaflet" role="application" aria-label={`Map of ${view?.label ?? location}`} />
            {gridVisible && <MapGridOverlay tileMode={tileMode} />}
          </div>

          <div className="map-data-overlay">{view && <MapMetricsPanel animated={motionOn} />}</div>
        </div>

        <MapControlsBar
          onZoomIn={map.zoomIn}
          onZoomOut={map.zoomOut}
          onRecenter={map.recenter}
          onToggleGrid={() => setGridVisible((visible) => !visible)}
          onToggleTiles={() => setTileMode((mode) => (mode === 'dark' ? 'light' : 'dark'))}
          gridVisible={gridVisible}
          tileMode={tileMode}
        />
      </div>
    </motion.div>
  );
};

export default MapComponent;
