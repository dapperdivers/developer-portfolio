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
    
    // For Google Fonts CSS URLs, we need to use CSS loading method
    // FontFace API is for individual font files, not CSS stylesheets
    return await this.loadFontWithCSS(fontFamily, fontUrl, options);

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
   * Load font using CSS method (for Google Fonts CSS URLs)
   */
  async loadFontWithCSS(fontFamily, fontUrl, options) {
    const { weight, style, display, onLoad, onError } = options;
    
    return new Promise((resolve, reject) => {
      // For Google Fonts CSS URLs, use link element instead of @font-face
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.crossOrigin = 'anonymous';
      
      link.onload = () => {
        this.loadedFonts.add(fontFamily);
        this.addFontLoadedClass(fontFamily);
        onLoad && onLoad(fontFamily);
        resolve(true);
      };
      
      link.onerror = () => {
        this.failedFonts.add(fontFamily);
        onError && onError(fontFamily, new Error('CSS loading failed'));
        reject(new Error('Font loading failed'));
      };
      
      document.head.appendChild(link);
      
      // Add timeout as backup
      setTimeout(() => {
        if (!this.loadedFonts.has(fontFamily) && !this.failedFonts.has(fontFamily)) {
          this.failedFonts.add(fontFamily);
          onError && onError(fontFamily, new Error('CSS loading timeout'));
          reject(new Error('Font loading timeout'));
        }
      }, this.timeout);
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
    // Convert font name to valid CSS class name (remove spaces, special chars)
    const validClassName = fontFamily.toLowerCase().replace(/[^a-z0-9]/g, '-');
    document.documentElement.classList.add(`font-loaded-${validClassName}`);
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
        family: 'Dancing Script',
        url: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap',
        weight: '400-700',
        style: 'normal',
        display: 'swap',
        fallback: 'cursive, "Brush Script MT", "Lucida Handwriting", fantasy',
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