import { findLocation } from '@utils/geocodingUtils';

describe('findLocation', () => {
  it('finds a city by its name before the comma and keeps the name as given', () => {
    expect(findLocation('Canton, GA')).toEqual({ lat: 34.2368, lng: -84.4908, zoom: 10, name: 'Canton, GA' });
  });

  it('ignores case and surrounding space', () => {
    expect(findLocation('  seattle  ')?.lat).toBe(47.6062);
    expect(findLocation('WARRIOR, Al')?.zoom).toBe(13);
  });

  it('resolves aliases only as whole names', () => {
    expect(findLocation('LA')?.lat).toBe(34.0522);
    // "Portland" contains "la" and "Dallas" contains "al": neither is an alias match
    expect(findLocation('Portland, OR')?.lat).toBe(45.5051);
    expect(findLocation('Dallas, TX')?.lat).toBe(32.7767);
  });

  it('falls back to the region when the city is not listed', () => {
    expect(findLocation('Smallville, TX')).toEqual({ lat: 31.9686, lng: -99.9018, zoom: 6, name: 'Smallville, TX' });
    expect(findLocation('United States')?.zoom).toBe(4);
  });

  it('returns null for a place that is not in the list', () => {
    expect(findLocation('Nowhere, ZZ')).toBeNull();
    expect(findLocation('London, UK')).toBeNull();
  });

  it('returns null for empty input', () => {
    expect(findLocation('')).toBeNull();
    expect(findLocation('   ')).toBeNull();
    expect(findLocation(null)).toBeNull();
    expect(findLocation(undefined)).toBeNull();
  });
});
