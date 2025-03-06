/**
 * Geocoding utilities to help with location handling and fallbacks
 */

// Default coordinates to use as fallback
export const DEFAULT_COORDINATES = {
  lat: 41.8781,
  lng: -87.6298,
  zoom: 12,
  name: "Chicago, IL"
};

// Common locations with their coordinates
// This helps avoid API calls for known locations
export const KNOWN_LOCATIONS = {
  "chicago": { lat: 41.8781, lng: -87.6298, zoom: 12 },
  "chicago, il": { lat: 41.8781, lng: -87.6298, zoom: 12 },
  "chicago, illinois": { lat: 41.8781, lng: -87.6298, zoom: 12 },
  "san francisco": { lat: 37.7749, lng: -122.4194, zoom: 12 },
  "san francisco, ca": { lat: 37.7749, lng: -122.4194, zoom: 12 },
  "los angeles": { lat: 34.0522, lng: -118.2437, zoom: 11 },
  "new york": { lat: 40.7128, lng: -74.0060, zoom: 12 },
  "seattle": { lat: 47.6062, lng: -122.3321, zoom: 12 },
  "austin": { lat: 30.2672, lng: -97.7431, zoom: 12 },
  "boston": { lat: 42.3601, lng: -71.0589, zoom: 12 },
  "denver": { lat: 39.7392, lng: -104.9903, zoom: 12 },
  "atlanta": { lat: 33.7490, lng: -84.3880, zoom: 12 },
  "dallas": { lat: 32.7767, lng: -96.7970, zoom: 11 }
};

/**
 * Get coordinates for a location string, trying known locations first
 * then attempting geocoding through our proxy
 * 
 * @param {string} locationString - The location to geocode
 * @return {Promise<Object>} - Promise resolving to coordinates with lat, lng, and zoom
 */
export const getCoordinatesForLocation = async (locationString) => {
  if (!locationString) {
    console.warn('No location string provided, using default');
    return DEFAULT_COORDINATES;
  }
  
  // Normalize the location string for comparison
  const normalizedLocation = locationString.toLowerCase().trim();
  
  // Check if it's a known location (for instant results without API calls)
  for (const [key, coords] of Object.entries(KNOWN_LOCATIONS)) {
    if (normalizedLocation.includes(key)) {
      console.log(`Found matching known location for "${locationString}": ${key}`);
      return { ...coords, name: locationString };
    }
  }
  
  // Look for comma-separated parts and try to match on the first part
  const parts = normalizedLocation.split(',');
  if (parts.length > 1) {
    const firstPart = parts[0].trim();
    for (const [key, coords] of Object.entries(KNOWN_LOCATIONS)) {
      if (key.startsWith(firstPart) || firstPart.includes(key)) {
        console.log(`Partial match for "${locationString}" using known location: ${key}`);
        return { ...coords, name: locationString };
      }
    }
  }
  
  // Try geocoding through our proxy
  try {
    const response = await fetch(`/nominatim/search?format=json&q=${encodeURIComponent(locationString)}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`Successfully geocoded "${locationString}" via proxy`);
        return { 
          lat: parseFloat(lat), 
          lng: parseFloat(lon), 
          zoom: 13,
          name: locationString 
        };
      }
    }
  } catch (error) {
    console.warn('Geocoding through proxy failed:', error);
  }
  
  // No match found, return default
  console.warn(`No coordinates found for "${locationString}", using default`);
  return { ...DEFAULT_COORDINATES, name: locationString };
};

/**
 * Format a location string for display in a popup
 * @param {string} locationString - The location to format
 * @return {string} - Formatted HTML for the popup
 */
export const formatPopupContent = (locationString) => {
  const cityName = locationString ? locationString.split(',')[0] : 'Unknown';
  
  return `
    <div class="popup-content">
      <strong>Security Office</strong>
      <div class="popup-location">${locationString || 'Unknown Location'}</div>
      <div class="popup-status">Status: <span class="status-active">Active</span></div>
      <div class="popup-coordinates">Secure Connection Established</div>
    </div>
  `;
};
