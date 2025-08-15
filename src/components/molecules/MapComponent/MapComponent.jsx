import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinatesForLocation, formatPopupContent } from '../../../utils/geocodingUtils';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import './MapComponent.css';

// Fix Leaflet default icon path issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Animation variants
const mapVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const markerVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3
    }
  }
};

const pulseCircleVariants = {
  hidden: { 
    scale: 0.5,
    opacity: 0
  },
  visible: { 
    scale: [0.5, 1.2, 0.8],
    opacity: [0.8, 0.4, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const locationInfoVariants = {
  hidden: { 
    y: 20,
    opacity: 0
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const dataStreamVariants = {
  hidden: { 
    width: 0,
    opacity: 0 
  },
  visible: (custom) => ({
    width: "100%",
    opacity: [0, 0.7, 0.2],
    transition: {
      delay: custom * 0.2,
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  })
};

/**
 * An interactive map component that displays a location with animation.
 * Uses Leaflet.js for the mapping functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.location - Location name to geocode and display
 * @returns {React.ReactElement} Map component
 */
const MapComponent = ({ location }) => {
  const [mapError, setMapError] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [mapMode, setMapMode] = useState('dark'); // 'dark' or 'satellite'
  const [showGrid, setShowGrid] = useState(true);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const locationCircle1Ref = useRef(null);
  const locationCircle2Ref = useRef(null);
  const tileLayerRef = useRef(null);
  
  // Get animation context
  const { isAnimationEnabled } = useAnimation();
  
  useEffect(() => {
    // Initialize map
    const initializeMap = async () => {
      try {
        // Force cleanup any existing map instance to prevent duplicates
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        
        if (mapRef.current && !mapInstanceRef.current) {
          console.log('Creating new map instance');
          
          // Force a layout recalculation to ensure map container has dimensions
          mapRef.current.style.height = '400px';
          
          // Create map instance with explicit dimensions
          mapInstanceRef.current = L.map(mapRef.current, {
            center: [37.7749, -122.4194], // Default to San Francisco
            zoom: 12,
            scrollWheelZoom: false,
            zoomControl: false,
            attributionControl: false, // We'll add a custom one
            minZoom: 2,
            maxZoom: 18
          });
          
          // Use CartoDB dark theme map tiles which look great with the site's design
          const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          });
          
          // Alternative view tiles for when the user toggles map mode  
          const satelliteTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          });
          
          // Start with dark mode
          tileLayerRef.current = darkTileLayer;
          darkTileLayer.addTo(mapInstanceRef.current);
          
          // Add custom attribution control
          L.control.attribution({
            position: 'bottomright',
            prefix: 'Map by <a href="https://leafletjs.com">Leaflet</a>'
          }).addTo(mapInstanceRef.current);
          
          // Use setTimeout to allow the container to render fully
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
              console.log('Map size invalidated to force redraw');
            }
          }, 100);
          
          // Create an enhanced marker with more information
          const securityIcon = L.divIcon({
            html: `
              <div class="enhanced-marker">
                <div class="pulse-marker"><span class="inner-circle"></span></div>
                <div class="marker-label">Security HQ</div>
              </div>
            `,
            className: 'custom-map-marker',
            iconSize: [40, 30],
            iconAnchor: [20, 15]
          });
          
          // Add concentric circles around the location
          locationCircle1Ref.current = L.circle([37.7749, -122.4194], {
            radius: 50000,
            color: 'rgba(0, 170, 255, 0.3)',
            fillColor: 'rgba(0, 170, 255, 0.05)',
            fillOpacity: 0.2,
            weight: 1,
            dashArray: '5, 5'
          }).addTo(mapInstanceRef.current);
          
          locationCircle2Ref.current = L.circle([37.7749, -122.4194], {
            radius: 100000,
            color: 'rgba(0, 170, 255, 0.2)',
            fillColor: 'rgba(0, 170, 255, 0.02)',
            fillOpacity: 0.1,
            weight: 1,
            dashArray: '3, 7'
          }).addTo(mapInstanceRef.current);
          
          // Add initial marker
          markerRef.current = L.marker([37.7749, -122.4194], { icon: securityIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div class="popup-content">
                <strong>Security Operations Center</strong>
                <div class="popup-location">San Francisco, CA</div>
                <div class="popup-status">Status: <span class="status-active">Active</span></div>
                <div class="popup-info">Secure connection established</div>
              </div>
            `);
          
          console.log('Map initialized with dimensions:', mapRef.current.clientWidth, 'x', mapRef.current.clientHeight);
        }
        
        // Geocode location
        geocodeLocation(location);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Error initializing map: ' + error.message);
      }
    };
    
    // Use geocoding utilities to find coordinates for the location
    const geocodeLocation = async (locationString) => {
      if (!locationString || !mapInstanceRef.current) {
        return;
      }
      
      try {
        // Get location data from our utility function (no API calls)
        const locData = await getCoordinatesForLocation(locationString);
        
        console.log('Using coordinates for location:', locData);
        
        // Store location data in state for the info panel
        setLocationData(locData);
        
        // Update map position
        mapInstanceRef.current.setView(
          [locData.lat, locData.lng], 
          locData.zoom || 7
        );
        
        // Update marker
        if (markerRef.current) {
          // Create enhanced HTML for the marker
          const markerHtml = `
            <div class="enhanced-marker">
              <div class="pulse-marker"><span class="inner-circle"></span></div>
              <div class="marker-label">${locData.name}</div>
            </div>
          `;
          
          // Update marker icon and position
          const updatedIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-map-marker',
            iconSize: [40, 30],
            iconAnchor: [20, 15]
          });
          
          markerRef.current
            .setIcon(updatedIcon)
            .setLatLng([locData.lat, locData.lng])
            .bindPopup(formatPopupContent(locData.name))
            .openPopup();
            
          // Add or update concentric circles around the new location
          if (locationCircle1Ref.current) {
            locationCircle1Ref.current.setLatLng([locData.lat, locData.lng]);
            locationCircle2Ref.current.setLatLng([locData.lat, locData.lng]);
          } else {
            // Create circles if they don't exist yet
            locationCircle1Ref.current = L.circle([locData.lat, locData.lng], {
              radius: 50000,
              color: 'rgba(0, 170, 255, 0.3)',
              fillColor: 'rgba(0, 170, 255, 0.05)',
              fillOpacity: 0.2,
              weight: 1,
              dashArray: '5, 5'
            }).addTo(mapInstanceRef.current);
            
            locationCircle2Ref.current = L.circle([locData.lat, locData.lng], {
              radius: 100000,
              color: 'rgba(0, 170, 255, 0.2)',
              fillColor: 'rgba(0, 170, 255, 0.02)',
              fillOpacity: 0.1,
              weight: 1,
              dashArray: '3, 7'
            }).addTo(mapInstanceRef.current);
          }
        }
      } catch (error) {
        console.error('Error setting map location:', error);
        setMapError('Could not display location on map');
      }
    };
    
    // Initialize map asynchronously
    (async () => {
      try {
        await initializeMap();
      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('Failed to initialize map');
      }
    })();
    
    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        console.log('Cleaning up map instance');
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);
  
  // Format coordinates for display
  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return "Coordinates unavailable";
    return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  };
  
  // Reset map to the current location
  const handleResetView = () => {
    if (mapInstanceRef.current && locationData) {
      mapInstanceRef.current.setView(
        [locationData.lat, locationData.lng],
        locationData.zoom || 7
      );
    }
  };
  
  // Toggle between dark and satellite map modes
  const handleToggleMapMode = () => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    
    // Remove current tile layer
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    
    // Toggle map mode
    const newMode = mapMode === 'dark' ? 'satellite' : 'dark';
    setMapMode(newMode);
    
    // Add new tile layer based on selected mode
    if (newMode === 'dark') {
      tileLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    } else {
      tileLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }
  };
  
  // Toggle the grid overlay
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <motion.div 
      className="map-container-wrapper"
      variants={mapVariants}
      initial="hidden"
      animate="visible"
    >
      {mapError ? (
        <motion.div 
          className="map-error-message"
          variants={MotionVariants.fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h3>Map Error</h3>
          <p>{mapError}</p>
        </motion.div>
      ) : (
        <>
          {/* Main Status Bar */}
          <div className="map-status-bar">
            <div className="status-left">
              <span>Location: {locationData ? locationData.name : location}</span>
              <span className="separator">|</span>
              <span>{locationData ? formatCoordinates(locationData.lat, locationData.lng) : "00.0000°, 00.0000°"}</span>
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

          {/* Map Display Container */}
          <div className="map-display-container">
            {/* Map container with explicit dimensions */}
            <div 
              ref={mapRef} 
              className="map-container" 
              style={{ 
                width: '100%', 
                height: '400px', 
                position: 'relative',
                zIndex: 5,
                background: 'linear-gradient(135deg, #1a1a2e, #162447)',
                borderRadius: '0 0 8px 8px',
                overflow: 'hidden'
              }} 
              id="map-container"
            >
              {showGrid && (
                <div className={`map-grid-overlay ${mapMode === 'dark' ? 'grid-dark-mode' : 'grid-light-mode'}`}>
                  {/* Create 29 horizontal grid lines (30 divisions) */}
                  {[...Array(29)].map((_, i) => (
                    <div 
                      key={`h-${i}`}
                      className="map-grid-horizontal" 
                      style={{ top: `${((i + 1) / 30) * 100}%` }}
                    />
                  ))}
                  
                  {/* Create 29 vertical grid lines (30 divisions) */}
                  {[...Array(29)].map((_, i) => (
                    <div 
                      key={`v-${i}`}
                      className="map-grid-vertical" 
                      style={{ left: `${((i + 1) / 30) * 100}%` }}
                    />
                  ))}
                  
                  {/* Create grid points at intersections */}
                  {[...Array(29)].flatMap((_, row) => 
                    [...Array(29)].map((_, col) => (
                      <div 
                        key={`p-${row}-${col}`}
                        className="map-grid-point" 
                        style={{ 
                          top: `${((row + 1) / 30) * 100}%`, 
                          left: `${((col + 1) / 30) * 100}%` 
                        }}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Cybersecurity data overlay */}
            <div className="map-data-overlay">
              {locationData && (
                <motion.div 
                  className="security-metrics-panel"
                  variants={locationInfoVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="metrics-header">
                    <div className="panel-title">SECURITY METRICS</div>
                    <motion.div 
                      className="status-indicator"
                      animate={{ 
                        opacity: isAnimationEnabled ? [0.4, 1, 0.4] : 0.7
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="metric-label">THREAT LEVEL</span>
                      <span className="metric-value threat-low">LOW</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">PERIMETER</span>
                      <span className="metric-value">SECURE</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">UPTIME</span>
                      <span className="metric-value">99.8%</span>
                    </div>
                  </div>
                  <div className="data-streams">
                    <motion.div 
                      className="data-stream"
                      variants={dataStreamVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    />
                    <motion.div 
                      className="data-stream"
                      variants={dataStreamVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    />
                    <motion.div 
                      className="data-stream"
                      variants={dataStreamVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Control Bar */}
          <div className="map-controls-bar">
            <div className="controls-left">
              <span className="controls-label">Controls:</span>
              <button 
                className="control-button zoom-in" 
                onClick={() => mapInstanceRef.current?.zoomIn()}
                aria-label="Zoom in"
              >
                [+]
              </button>
              <button 
                className="control-button zoom-out" 
                onClick={() => mapInstanceRef.current?.zoomOut()}
                aria-label="Zoom out"
              >
                [-]
              </button>
              <span className="control-text">Zoom</span>
            </div>
            <div className="controls-center">
              <button 
                className="control-button center-view" 
                onClick={handleResetView}
                aria-label="Center view"
              >
                [Center]
              </button>
              <span className="separator">|</span>
              <button 
                className="control-button refresh" 
                onClick={handleToggleGrid}
                aria-label="Toggle grid overlay"
              >
                [Grid]
              </button>
            </div>
            <div className="controls-right">
              <motion.button 
                className="control-button toggle-layers-special" 
                onClick={handleToggleMapMode}
                aria-label="Toggle map layers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 8px rgba(var(--color-cyan-rgb), 0.3)",
                    "0 0 16px rgba(var(--color-cyan-rgb), 0.6)",
                    "0 0 8px rgba(var(--color-cyan-rgb), 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🛰️ {mapMode === 'dark' ? 'SATELLITE' : 'STANDARD'}
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

MapComponent.propTypes = {
  location: PropTypes.string.isRequired
};

export default MapComponent;