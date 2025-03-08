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
  
  // Skip external API geocoding due to CSP restrictions
  console.log(`Geocoding "${locationString}" using local database only`);
  
  // Add more locations to our known locations data to improve coverage
  const extendedLocations = {
    "warrior": { lat: 33.8151, lng: -86.8129, zoom: 13 },
    "warrior, al": { lat: 33.8151, lng: -86.8129, zoom: 13 },
    "new york city": { lat: 40.7128, lng: -74.0060, zoom: 12 },
    "new york": { lat: 40.7128, lng: -74.0060, zoom: 12 },
    "ny": { lat: 40.7128, lng: -74.0060, zoom: 10 },
    "alabama": { lat: 33.2589, lng: -86.8295, zoom: 7 },
    "al": { lat: 33.2589, lng: -86.8295, zoom: 7 },
    "california": { lat: 36.7783, lng: -119.4179, zoom: 6 },
    "ca": { lat: 36.7783, lng: -119.4179, zoom: 6 },
    "florida": { lat: 27.6648, lng: -81.5158, zoom: 7 },
    "fl": { lat: 27.6648, lng: -81.5158, zoom: 7 },
    "texas": { lat: 31.9686, lng: -99.9018, zoom: 6 },
    "tx": { lat: 31.9686, lng: -99.9018, zoom: 6 },
    "washington": { lat: 47.7511, lng: -120.7401, zoom: 7 },
    "wa": { lat: 47.7511, lng: -120.7401, zoom: 7 },
    "illinois": { lat: 40.6331, lng: -89.3985, zoom: 7 },
    "il": { lat: 40.6331, lng: -89.3985, zoom: 7 },
    "chicago": { lat: 41.8781, lng: -87.6298, zoom: 11 },
    "seattle": { lat: 47.6062, lng: -122.3321, zoom: 12 },
    "los angeles": { lat: 34.0522, lng: -118.2437, zoom: 11 },
    "la": { lat: 34.0522, lng: -118.2437, zoom: 11 },
    "san francisco": { lat: 37.7749, lng: -122.4194, zoom: 12 },
    "sf": { lat: 37.7749, lng: -122.4194, zoom: 12 },
    "boston": { lat: 42.3601, lng: -71.0589, zoom: 12 },
    "miami": { lat: 25.7617, lng: -80.1918, zoom: 12 },
    "atlanta": { lat: 33.7490, lng: -84.3880, zoom: 11 },
    "houston": { lat: 29.7604, lng: -95.3698, zoom: 11 },
    "denver": { lat: 39.7392, lng: -104.9903, zoom: 11 },
    "dallas": { lat: 32.7767, lng: -96.7970, zoom: 11 },
    "austin": { lat: 30.2672, lng: -97.7431, zoom: 11 },
    "phoenix": { lat: 33.4484, lng: -112.0740, zoom: 11 },
    "portland": { lat: 45.5051, lng: -122.6750, zoom: 11 },
    "milwaukee": { lat: 43.0389, lng: -87.9065, zoom: 11 },
    "detroit": { lat: 42.3314, lng: -83.0458, zoom: 11 },
    "philadelphia": { lat: 39.9526, lng: -75.1652, zoom: 11 },
    "baltimore": { lat: 39.2904, lng: -76.6122, zoom: 11 },
    "washington dc": { lat: 38.9072, lng: -77.0369, zoom: 11 },
    "las vegas": { lat: 36.1699, lng: -115.1398, zoom: 11 },
    "usa": { lat: 37.0902, lng: -95.7129, zoom: 4 },
    "united states": { lat: 37.0902, lng: -95.7129, zoom: 4 },
    "us": { lat: 37.0902, lng: -95.7129, zoom: 4 },
    "north america": { lat: 37.0902, lng: -95.7129, zoom: 3 }
  };
  
  // Combine with existing known locations
  const combinedLocations = { ...KNOWN_LOCATIONS, ...extendedLocations };
  
  // Try with the combined set
  for (const [key, coords] of Object.entries(combinedLocations)) {
    if (normalizedLocation.includes(key)) {
      console.log(`Found matching known location for "${locationString}": ${key}`);
      return { ...coords, name: locationString };
    }
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
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  
  return `
    <div class="popup-content">
      <strong>Security Operations Center</strong>
      <div class="popup-location">${locationString || 'Unknown Location'}</div>
      <div class="popup-status">Status: <span class="status-active">Active</span></div>
      <div class="popup-info">Secure Connection Established</div>
      <div class="popup-info">Last Updated: ${timestamp}</div>
    </div>
  `;
};
