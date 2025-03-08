import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinatesForLocation, formatPopupContent } from '../../../utils/geocodingUtils';
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
  const [showGrid, setShowGrid] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const locationCircle1Ref = useRef(null);
  const locationCircle2Ref = useRef(null);
  const tileLayerRef = useRef(null);
  
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
            zoomControl: true,
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
          
          // Satellite tiles for when the user toggles map mode
          const satelliteTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
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
            iconSize: [100, 60],
            iconAnchor: [50, 30]
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
            iconSize: [120, 60],
            iconAnchor: [60, 30]
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
      tileLayerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }}
    >
      <div className="map-controls">
        <div className="map-label">
          <span className="blinking-dot"></span>
          Current Location
        </div>
        <div className="map-actions">
          <button 
            className="map-action-button" 
            title="Reset View"
            onClick={handleResetView}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
          <button 
            className={`map-action-button ${mapMode === 'satellite' ? 'active' : ''}`} 
            title={`Switch to ${mapMode === 'dark' ? 'Satellite' : 'Dark'} View`}
            onClick={handleToggleMapMode}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
          <button 
            className={`map-action-button ${showGrid ? 'active' : ''}`} 
            title="Toggle Grid"
            onClick={handleToggleGrid}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="15" y1="3" x2="15" y2="21"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Location information panel */}
      {locationData && (
        <motion.div 
          className="location-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="location-info-header">
            <div className="location-name">{locationData.name}</div>
            <div className="location-badge">
              <span className="blinking-dot small"></span>
              Live
            </div>
          </div>
          <div className="location-coordinates">
            {formatCoordinates(locationData.lat, locationData.lng)}
          </div>
          <div className="location-metrics">
            <div className="metric">
              <span className="metric-label">Status</span>
              <span className="metric-value status-active">Active</span>
            </div>
            <div className="metric">
              <span className="metric-label">Security</span>
              <span className="metric-value">Level 3</span>
            </div>
            <div className="metric">
              <span className="metric-label">Map Mode</span>
              <span className="metric-value map-mode">
                {mapMode === 'dark' ? 'Dark' : 'Satellite'}
              </span>
            </div>
          </div>
          <div className="location-data-streams">
            <div className="data-stream"></div>
            <div className="data-stream"></div>
            <div className="data-stream"></div>
          </div>
        </motion.div>
      )}
      
      {/* Map container with explicit dimensions */}
      <div 
        ref={mapRef} 
        className="map-container" 
        style={{ 
          width: '100%', 
          height: '400px', 
          position: 'relative',
          zIndex: 5,
          background: 'linear-gradient(135deg, #1a1a2e, #162447)'
        }} 
        id="map-container"
      >
        {showGrid && (
          <div className="map-grid-overlay">
            {/* Create 10 horizontal grid lines */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`h-${i}`}
                className="map-grid-horizontal" 
                style={{ top: `${(i + 1) * 10}%` }}
              />
            ))}
            
            {/* Create 10 vertical grid lines */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`v-${i}`}
                className="map-grid-vertical" 
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
            
            {/* Create grid points at intersections */}
            {[...Array(9)].flatMap((_, row) => 
              [...Array(9)].map((_, col) => (
                <div 
                  key={`p-${row}-${col}`}
                  className="map-grid-point" 
                  style={{ 
                    top: `${(row + 1) * 10}%`, 
                    left: `${(col + 1) * 10}%` 
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Error message if map fails to load */}
      {mapError && (
        <div className="map-error-message">
          <p>Map loading error: {mapError}</p>
        </div>
      )}
    </motion.div>
  );
};

MapComponent.propTypes = {
  location: PropTypes.string.isRequired
};

export default MapComponent;