/**
 * Professional Font Loading Utility
 * 
 * This utility provides robust font loading with error handling,
 * fallback strategies, and performance optimizations.
 */

class FontLoader {
  constructor() {
    this.loadedFonts = new Set();
    this.failedFonts = new Set();
    this.callbacks = new Map();
    this.timeout = 3000; // 3 second timeout
    
    // Bind methods
    this.loadFont = this.loadFont.bind(this);
    this.checkFontAvailability = this.checkFontAvailability.bind(this);
  }

  /**
   * Load a font with error handling and fallback
   * @param {string} fontFamily - Font family name
   * @param {string} fontUrl - URL to font file
   * @param {Object} options - Loading options
   */
  async loadFont(fontFamily, fontUrl, options = {}) {
    const {
      weight = '400',
      style = 'normal',
      display = 'swap',
      fallback = null,
      onLoad = null,
      onError = null
    } = options;

    // Check if already loaded
    if (this.loadedFonts.has(fontFamily)) {
      onLoad && onLoad(fontFamily);
      return true;
    }

    // Check if already failed
    if (this.failedFonts.has(fontFamily)) {
      onError && onError(fontFamily, 'Previously failed to load');
      return false;
    }

    try {
      // Use Font Loading API if available
      if (typeof window !== 'undefined' && 'FontFace' in window) {
        return await this.loadFontWithAPI(fontFamily, fontUrl, {
          weight, style, display, onLoad, onError
        });
      } else {
        // Fallback to CSS method
        return await this.loadFontWithCSS(fontFamily, fontUrl, {
          weight, style, display, onLoad, onError
        });
      }
    } catch (error) {
      console.warn(`Failed to load font ${fontFamily}:`, error);
      this.failedFonts.add(fontFamily);
      
      // Apply fallback if provided
      if (fallback) {
        this.applyFontFallback(fontFamily, fallback);
      }
      
      onError && onError(fontFamily, error);
      return false;
    }
  }

  /**
   * Load font using Font Loading API
   */
  async loadFontWithAPI(fontFamily, fontUrl, options) {
    const { weight, style, display, onLoad, onError } = options;
    
    // eslint-disable-next-line no-undef
    const font = new FontFace(fontFamily, `url(${fontUrl})`, {
      weight,
      style,
      display
    });

    // Add timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Font loading timeout')), this.timeout);
    });

    try {
      const loadedFont = await Promise.race([font.load(), timeoutPromise]);
      document.fonts.add(loadedFont);
      
      this.loadedFonts.add(fontFamily);
      this.addFontLoadedClass(fontFamily);
      
      onLoad && onLoad(fontFamily);
      return true;
    } catch (error) {
      this.failedFonts.add(fontFamily);
      onError && onError(fontFamily, error);
      return false;
    }
  }

  /**
   * Load font using CSS method (fallback)
   */
  async loadFontWithCSS(fontFamily, fontUrl, options) {
    const { weight, style, display, onLoad, onError } = options;
    
    return new Promise((resolve, reject) => {
      const style_element = document.createElement('style');
      style_element.textContent = `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-weight: ${weight};
          font-style: ${style};
          font-display: ${display};
        }
      `;
      
      document.head.appendChild(style_element);
      
      // Test if font loaded
      const timeout = setTimeout(() => {
        this.failedFonts.add(fontFamily);
        onError && onError(fontFamily, new Error('CSS loading timeout'));
        reject(new Error('Font loading timeout'));
      }, this.timeout);
      
      // Simple load test
      setTimeout(() => {
        if (this.checkFontAvailability(fontFamily)) {
          clearTimeout(timeout);
          this.loadedFonts.add(fontFamily);
          this.addFontLoadedClass(fontFamily);
          onLoad && onLoad(fontFamily);
          resolve(true);
        }
      }, 100);
    });
  }

  /**
   * Check if a font is available
   */
  checkFontAvailability(fontFamily) {
    // Create test elements
    const testString = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const testSize = '72px';
    const fallbackFont = 'monospace';
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Measure with fallback font
    context.font = `${testSize} ${fallbackFont}`;
    const fallbackWidth = context.measureText(testString).width;
    
    // Measure with target font
    context.font = `${testSize} ${fontFamily}, ${fallbackFont}`;
    const targetWidth = context.measureText(testString).width;
    
    // If widths differ, font is loaded
    return targetWidth !== fallbackWidth;
  }

  /**
   * Apply font fallback
   */
  applyFontFallback(originalFont, fallbackFont) {
    const elements = document.querySelectorAll(`[style*="${originalFont}"]`);
    elements.forEach(el => {
      el.style.fontFamily = fallbackFont;
    });
    
    // Add fallback class
    document.documentElement.classList.add(`font-fallback-${originalFont.toLowerCase()}`);
  }

  /**
   * Add font loaded class for styling
   */
  addFontLoadedClass(fontFamily) {
    document.documentElement.classList.add(`font-loaded-${fontFamily.toLowerCase()}`);
    document.documentElement.classList.add('fonts-loaded');
  }

  /**
   * Load all fonts for the application
   */
  async loadAllFonts() {
    // Centralized font management with Google Fonts API
    const fonts = [
      {
        family: 'Inter',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        weight: '300-700',
        style: 'normal',
        display: 'swap',
        fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        onLoad: (fontFamily) => console.log(`✅ ${fontFamily} loaded successfully`),
        onError: (fontFamily, error) => console.warn(`⚠️ Failed to load ${fontFamily}:`, error)
      },
      {
        family: 'JetBrains Mono',
        url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
        weight: '400-700',
        style: 'normal',
        display: 'swap',
        fallback: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        onLoad: (fontFamily) => console.log(`✅ ${fontFamily} loaded successfully`),
        onError: (fontFamily, error) => console.warn(`⚠️ Failed to load ${fontFamily}:`, error)
      },
      {
        family: 'Orbitron',
        url: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap',
        weight: '400-900',
        style: 'normal',
        display: 'swap',
        fallback: 'Impact, "Arial Black", sans-serif',
        onLoad: (fontFamily) => console.log(`✅ ${fontFamily} loaded successfully`),
        onError: (fontFamily, error) => console.warn(`⚠️ Failed to load ${fontFamily}:`, error)
      }
    ];

    console.log('🎨 Starting font loading process...');

    const results = await Promise.allSettled(
      fonts.map(font => this.loadFont(font.family, font.url, font))
    );

    // Log results with detailed information
    const loaded = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const failed = results.length - loaded;
    
    console.log(`🎨 Font loading complete: ${loaded} loaded, ${failed} failed`);
    
    if (loaded === fonts.length) {
      console.log('✅ All fonts loaded successfully!');
      document.documentElement.classList.add('all-fonts-loaded');
    } else if (failed > 0) {
      console.warn(`⚠️ ${failed} fonts failed to load - using fallbacks`);
      document.documentElement.classList.add('fonts-partial-failure');
    }
    
    return { loaded, failed, total: results.length };
  }
}

// Create global instance
const fontLoader = new FontLoader();

// Auto-load fonts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => fontLoader.loadAllFonts());
} else {
  fontLoader.loadAllFonts();
}

export default fontLoader;