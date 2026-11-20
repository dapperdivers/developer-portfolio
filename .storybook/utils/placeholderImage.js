/**
 * Placeholder images for stories.
 *
 * Returns an inline SVG data URI, so stories render the same offline, in CI
 * and in the published static build, and never depend on a third-party image
 * host staying up.
 */

const PALETTE = {
  cyan: '#64ffda',
  red: '#ff4d4d',
  blue: '#5ac8fa',
  amber: '#ffcc00',
  green: '#34c759',
};

/**
 * @param {number} width - Intrinsic width in pixels
 * @param {number} height - Intrinsic height in pixels
 * @param {Object} [options]
 * @param {string} [options.label] - Text drawn in the middle; defaults to the dimensions
 * @param {keyof PALETTE} [options.accent='cyan'] - Accent colour
 * @returns {string} SVG data URI
 */
export const placeholderImage = (width, height, { label, accent = 'cyan' } = {}) => {
  const color = PALETTE[accent] || PALETTE.cyan;
  const text = label || `${width} × ${height}`;
  const fontSize = Math.max(10, Math.round(Math.min(width / (text.length * 0.7), height / 4, 40)));
  const grid = Math.max(8, Math.round(Math.min(width, height) / 10));
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a192f"/>
      <stop offset="1" stop-color="#212529"/>
    </linearGradient>
    <pattern id="grid" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">
      <path d="M ${grid} 0 L 0 0 0 ${grid}" fill="none" stroke="${color}" stroke-opacity="0.12" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="${color}" stroke-opacity="0.4"/>
  <text x="50%" y="50%" fill="${color}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
};

export default placeholderImage;
