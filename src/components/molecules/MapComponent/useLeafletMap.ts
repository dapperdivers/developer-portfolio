import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/** Where the map is centred and what its marker says. */
export interface MapView {
  lat: number;
  lng: number;
  zoom: number;
  /** Text shown above the marker and in its popup */
  label: string;
}

/** `dark` applies a CSS filter to the tiles; `light` shows them as served. */
export type MapTileMode = 'dark' | 'light';

export interface LeafletMapControls {
  zoomIn: () => void;
  zoomOut: () => void;
  /** Return to the current view's centre and zoom */
  recenter: () => void;
  /** Set if Leaflet could not start; the map is not usable when present */
  error: string | null;
}

const RING_COLOR = '0, 170, 255';
const RINGS: Array<{ radius: number; options: L.CircleMarkerOptions }> = [
  { radius: 50000, options: { color: `rgba(${RING_COLOR}, 0.3)`, fillColor: `rgba(${RING_COLOR}, 0.05)`, fillOpacity: 0.2, weight: 1, dashArray: '5, 5' } },
  { radius: 100000, options: { color: `rgba(${RING_COLOR}, 0.2)`, fillColor: `rgba(${RING_COLOR}, 0.02)`, fillOpacity: 0.1, weight: 1, dashArray: '3, 7' } },
];

const el = (tag: string, className: string, text?: string): HTMLElement => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// Marker and popup are built as DOM nodes, so the label is always inserted as
// text and can never be interpreted as markup.
const markerIcon = (label: string): L.DivIcon => {
  const root = el('div', 'enhanced-marker');
  const pulse = el('div', 'pulse-marker');
  pulse.appendChild(el('span', 'inner-circle'));
  root.append(pulse, el('div', 'marker-label', label));
  return L.divIcon({ html: root, className: 'custom-map-marker', iconSize: [40, 30], iconAnchor: [20, 15] });
};

const popupContent = (label: string): HTMLElement => {
  const root = el('div', 'popup-content');
  const status = el('div', 'popup-status', 'Status: ');
  status.appendChild(el('span', 'status-active', 'Active'));
  root.append(
    el('strong', '', 'Security Operations Center'),
    el('div', 'popup-location', label || 'Unknown Location'),
    status,
    el('div', 'popup-info', 'Secure Connection Established'),
    el('div', 'popup-info', `Last Updated: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}`)
  );
  return root;
};

const tileLayer = (mode: MapTileMode): L.TileLayer =>
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19,
    // The page-wide referrer policy is same-origin, but OpenStreetMap's tile
    // usage policy requires a Referer, so send the origin for tile requests.
    referrerPolicy: 'strict-origin-when-cross-origin',
    className: mode === 'dark' ? 'map-tiles--dark' : 'map-tiles--light',
  });

/**
 * Owns a Leaflet map inside `containerRef`.
 *
 * The map is created once and then updated in place: changing the view moves
 * the existing marker and rings, and changing the tile mode swaps one layer.
 * React must render nothing inside the container element, because Leaflet
 * manages that element's children itself.
 *
 * @param containerRef - Element to mount the map in; it needs a height
 * @param view - Centre, zoom and marker label, or null while not yet known
 * @param tileMode - Tile appearance
 */
const useLeafletMap = (containerRef: RefObject<HTMLElement | null>, view: MapView | null, tileMode: MapTileMode): LeafletMapControls => {
  const mapRef = useRef<L.Map | null>(null);
  const tilesRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const ringsRef = useRef<L.Circle[]>([]);
  const viewRef = useRef<MapView | null>(view);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create the map once, and remove it on unmount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let map: L.Map;
    try {
      map = L.map(container, {
        center: [0, 0],
        zoom: 2,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
        minZoom: 2,
        maxZoom: 18,
      });
    } catch (cause) {
      setError(`Error initializing map: ${cause instanceof Error ? cause.message : String(cause)}`);
      return undefined;
    }
    L.control.attribution({ position: 'bottomright', prefix: 'Map by <a href="https://leafletjs.com">Leaflet</a>' }).addTo(map);
    mapRef.current = map;
    setReady(true);

    // Leaflet measures its container once. Re-measure whenever the size
    // changes, which also covers the container being laid out after mount.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => map.invalidateSize());
    observer?.observe(container);

    return () => {
      observer?.disconnect();
      map.remove();
      mapRef.current = null;
      tilesRef.current = null;
      markerRef.current = null;
      ringsRef.current = [];
      setReady(false);
    };
  }, [containerRef]);

  // Tiles
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return undefined;
    const layer = tileLayer(tileMode).addTo(map);
    tilesRef.current = layer;
    return () => {
      layer.remove();
    };
  }, [ready, tileMode]);

  // View, marker and rings
  const lat = view?.lat;
  const lng = view?.lng;
  const zoom = view?.zoom;
  const label = view?.label;
  useEffect(() => {
    viewRef.current = lat === undefined || lng === undefined ? null : { lat, lng, zoom: zoom ?? 7, label: label ?? '' };
    const map = mapRef.current;
    const current = viewRef.current;
    if (!ready || !map) return;

    // No known place: clear the marker and rings and show the whole world
    if (!current) {
      markerRef.current?.remove();
      markerRef.current = null;
      ringsRef.current.forEach((ring) => ring.remove());
      ringsRef.current = [];
      map.setView([20, 0], 2);
      return;
    }

    const position: L.LatLngTuple = [current.lat, current.lng];
    map.setView(position, current.zoom);

    if (ringsRef.current.length === 0) {
      ringsRef.current = RINGS.map(({ radius, options }) => L.circle(position, { radius, ...options }).addTo(map));
    } else {
      ringsRef.current.forEach((ring) => ring.setLatLng(position));
    }

    // The popup is bound but not opened: the marker already carries a label,
    // and an open popup covers it (and most of the map on small screens).
    if (!markerRef.current) {
      markerRef.current = L.marker(position, { icon: markerIcon(current.label) }).addTo(map);
    } else {
      markerRef.current.setLatLng(position).setIcon(markerIcon(current.label));
    }
    markerRef.current.bindPopup(popupContent(current.label));
  }, [ready, lat, lng, zoom, label]);

  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);
  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);
  const recenter = useCallback(() => {
    const current = viewRef.current;
    if (current) mapRef.current?.setView([current.lat, current.lng], current.zoom);
  }, []);

  return { zoomIn, zoomOut, recenter, error };
};

export default useLeafletMap;
