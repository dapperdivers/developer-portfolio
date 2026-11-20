/**
 * Place-name lookup for the map.
 *
 * Names are resolved from the list below, so no geocoding request ever leaves
 * the browser. A name that is not in the list resolves to `null`; callers
 * decide what to show.
 */

export interface Coordinates {
  lat: number;
  lng: number;
  /** Map zoom level */
  zoom: number;
}

export interface NamedCoordinates extends Coordinates {
  /** The place name the coordinates were looked up for, as given */
  name: string;
}

const CITIES: Record<string, Coordinates> = {
  atlanta: { lat: 33.749, lng: -84.388, zoom: 11 },
  austin: { lat: 30.2672, lng: -97.7431, zoom: 11 },
  baltimore: { lat: 39.2904, lng: -76.6122, zoom: 11 },
  boston: { lat: 42.3601, lng: -71.0589, zoom: 12 },
  // City-centre coordinates (downtown Canton), not a street address
  canton: { lat: 34.2368, lng: -84.4908, zoom: 10 },
  chicago: { lat: 41.8781, lng: -87.6298, zoom: 12 },
  dallas: { lat: 32.7767, lng: -96.797, zoom: 11 },
  denver: { lat: 39.7392, lng: -104.9903, zoom: 11 },
  detroit: { lat: 42.3314, lng: -83.0458, zoom: 11 },
  houston: { lat: 29.7604, lng: -95.3698, zoom: 11 },
  'las vegas': { lat: 36.1699, lng: -115.1398, zoom: 11 },
  'los angeles': { lat: 34.0522, lng: -118.2437, zoom: 11 },
  miami: { lat: 25.7617, lng: -80.1918, zoom: 12 },
  milwaukee: { lat: 43.0389, lng: -87.9065, zoom: 11 },
  'new york': { lat: 40.7128, lng: -74.006, zoom: 12 },
  'new york city': { lat: 40.7128, lng: -74.006, zoom: 12 },
  philadelphia: { lat: 39.9526, lng: -75.1652, zoom: 11 },
  phoenix: { lat: 33.4484, lng: -112.074, zoom: 11 },
  portland: { lat: 45.5051, lng: -122.675, zoom: 11 },
  'san francisco': { lat: 37.7749, lng: -122.4194, zoom: 12 },
  seattle: { lat: 47.6062, lng: -122.3321, zoom: 12 },
  warrior: { lat: 33.8151, lng: -86.8129, zoom: 13 },
  'washington dc': { lat: 38.9072, lng: -77.0369, zoom: 11 },
};

const REGIONS: Record<string, Coordinates> = {
  alabama: { lat: 33.2589, lng: -86.8295, zoom: 7 },
  california: { lat: 36.7783, lng: -119.4179, zoom: 6 },
  florida: { lat: 27.6648, lng: -81.5158, zoom: 7 },
  illinois: { lat: 40.6331, lng: -89.3985, zoom: 7 },
  texas: { lat: 31.9686, lng: -99.9018, zoom: 6 },
  washington: { lat: 47.7511, lng: -120.7401, zoom: 7 },
  'united states': { lat: 37.0902, lng: -95.7129, zoom: 4 },
  'north america': { lat: 37.0902, lng: -95.7129, zoom: 3 },
};

const ALIASES: Record<string, string> = {
  al: 'alabama',
  ca: 'california',
  fl: 'florida',
  il: 'illinois',
  tx: 'texas',
  wa: 'washington',
  us: 'united states',
  usa: 'united states',
  la: 'los angeles',
  nyc: 'new york city',
  ny: 'new york',
  sf: 'san francisco',
};

const lookup = (key: string): Coordinates | undefined => {
  const name = ALIASES[key] ?? key;
  return CITIES[name] ?? REGIONS[name];
};

/**
 * Coordinates for a place name such as "Canton, GA" or "United States".
 *
 * The whole name is tried first, then the part before the first comma (the
 * city), then the part after it (the state or country). Matching is on whole
 * names only, so "Portland" never matches the "la" alias inside it.
 *
 * @returns The coordinates with the name as given, or null if it is not in the list
 */
export const findLocation = (location: string | null | undefined): NamedCoordinates | null => {
  const name = location?.trim();
  if (!name) return null;

  const normalized = name.toLowerCase().replace(/\s+/g, ' ');
  const [city, ...rest] = normalized.split(',').map((part) => part.trim());
  const region = rest.join(', ');

  const found = lookup(normalized) ?? lookup(city) ?? (region ? lookup(region) : undefined);
  return found ? { ...found, name } : null;
};
