import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinatesForLocation, formatPopupContent } from '../../../utils/geocodingUtils';
import './MapComponent.css';

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
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  
  useEffect(() => {
    // Initialize map
    const initializeMap = async () => {
      
      try {
        if (!mapInstanceRef.current && mapRef.current) {
          // Create map instance
          mapInstanceRef.current = L.map(mapRef.current, {
            center: [37.7749, -122.4194], // Default to San Francisco
            zoom: 12,
            scrollWheelZoom: false,
            zoomControl: true,
            attributionControl: false
          });
          
          // Add tile layer using proxy to avoid CORS issues
          L.tileLayer('/osm-tiles/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapInstanceRef.current);
          
          // Custom icon
          const securityIcon = L.divIcon({
            html: '<div class="pulse-marker"><span class="inner-circle"></span></div>',
            className: 'custom-map-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          // Add initial marker
          markerRef.current = L.marker([37.7749, -122.4194], { icon: securityIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<div class="popup-content"><strong>Security Office</strong><div class="popup-location">San Francisco, CA</div></div>');
        }
        
        // Geocode location
        geocodeLocation(location);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    
    // Use geocoding utilities to find coordinates for the location
    const geocodeLocation = async (locationString) => {
      if (!locationString || !mapInstanceRef.current) {
        return;
      }
      
      try {
        // Get location data from our utility function (no API calls)
        const locationData = await getCoordinatesForLocation(locationString);
        
        console.log('Using coordinates for location:', locationData);
        
        // Update map position
        mapInstanceRef.current.setView(
          [locationData.lat, locationData.lng], 
          locationData.zoom || 12
        );
        
        // Update marker
        if (markerRef.current) {
          markerRef.current
            .setLatLng([locationData.lat, locationData.lng])
            .bindPopup(formatPopupContent(locationData.name))
            .openPopup();
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
    
    // Log when map is initialized
    if (mapInstanceRef.current) {
      console.log('Map initialized successfully');
    }
    
    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        console.log('Cleaning up map instance');
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);
  
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
      <div className="map-overlay">
        <div className="map-label">
          <span className="blinking-dot"></span>
          Current Location
        </div>
      </div>
      
      {/* Map container must have dimensions to render properly */}
      <div 
        ref={mapRef} 
        className="map-container" 
        style={{ width: '100%', height: '100%', minHeight: '300px' }} 
      />
      
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
