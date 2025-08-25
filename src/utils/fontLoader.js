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
      // Check if we're in a restricted network environment (Docker)
      const isRestricted = typeof window !== 'undefined' && window.location.hostname === 'localhost';
      
      // For Google Fonts CSS URLs, use link element instead of @font-face
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.crossOrigin = 'anonymous';
      
      // Add preconnect for faster loading
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://fonts.googleapis.com';
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
      
      const preconnectStatic = document.createElement('link');
      preconnectStatic.rel = 'preconnect';
      preconnectStatic.href = 'https://fonts.gstatic.com';
      preconnectStatic.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectStatic);
      
      link.onload = () => {
        console.log(`[DEBUG] Font loaded via CSS: ${fontFamily}`);
        this.loadedFonts.add(fontFamily);
        this.addFontLoadedClass(fontFamily);
        onLoad && onLoad(fontFamily);
        resolve(true);
      };
      
      link.onerror = () => {
        console.warn(`[DEBUG] Font CSS loading failed: ${fontFamily}`);
        this.failedFonts.add(fontFamily);
        onError && onError(fontFamily, new Error('CSS loading failed'));
        // Don't reject - resolve false to allow graceful fallback
        resolve(false);
      };
      
      document.head.appendChild(link);
      
      // Add timeout as backup - increased timeout for Docker networks
      const timeout = isRestricted ? 6000 : this.timeout;
      setTimeout(() => {
        if (!this.loadedFonts.has(fontFamily) && !this.failedFonts.has(fontFamily)) {
          console.warn(`[DEBUG] Font CSS loading timeout: ${fontFamily} (${timeout}ms)`);
          this.failedFonts.add(fontFamily);
          onError && onError(fontFamily, new Error('CSS loading timeout'));
          // Don't reject - resolve false to allow graceful fallback
          resolve(false);
        }
      }, timeout);
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
   * Detect if we're in a network-restricted environment
   */
  detectRestrictedEnvironment() {
    // Check common indicators of restricted environments
    const isDocker = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('docker') ||
      navigator.userAgent.includes('Docker')
    );
    
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    
    return isDocker || isOffline;
  }

  /**
   * Apply CSS-based font fallbacks immediately
   */
  applyImmediateFallbacks() {
    const fallbackCSS = `
      :root {
        --font-family-primary: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --font-family-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --font-family-script: cursive, "Brush Script MT", "Lucida Handwriting", fantasy;
      }
      
      body {
        font-family: var(--font-family-primary) !important;
      }
      
      .font-fallback-active {
        font-family: var(--font-family-primary) !important;
      }
      
      .font-mono, .font-jetbrains, code, pre {
        font-family: var(--font-family-mono) !important;
      }
      
      .font-script, .font-luxurious {
        font-family: var(--font-family-script) !important;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = fallbackCSS;
    document.head.appendChild(style);
    document.documentElement.classList.add('font-fallback-active');
    console.log('[DEBUG] Applied immediate font fallbacks');
  }

  /**
   * Load all fonts for the application
   */
  async loadAllFonts() {
    const isRestricted = this.detectRestrictedEnvironment();
    
    if (isRestricted) {
      console.log('[DEBUG] Restricted environment detected - applying fallbacks immediately');
      this.applyImmediateFallbacks();
    }
    
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
        family: 'Luxurious Script',
        url: 'https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap',
        weight: '400',
        style: 'normal',
        display: 'swap',
        fallback: 'cursive, "Brush Script MT", "Lucida Handwriting", fantasy',
        onLoad: (fontFamily) => console.log(`✅ ${fontFamily} loaded successfully`),
        onError: (fontFamily, error) => console.warn(`⚠️ Failed to load ${fontFamily}:`, error)
      }
    ];

    console.log('[DEBUG] Starting font loading process...');

    // In restricted environments, try loading with shorter timeout
    if (isRestricted) {
      this.timeout = 2000; // Reduce timeout for Docker environments
    }

    const results = await Promise.allSettled(
      fonts.map(font => this.loadFont(font.family, font.url, font))
    );

    // Log results with detailed information
    const loaded = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const failed = results.length - loaded;
    
    console.log(`[DEBUG] Font loading complete: ${loaded} loaded, ${failed} failed`);
    
    if (loaded === fonts.length) {
      console.log('[DEBUG] All fonts loaded successfully!');
      document.documentElement.classList.add('all-fonts-loaded');
      document.documentElement.classList.remove('font-fallback-active');
    } else if (failed > 0) {
      console.warn(`[DEBUG] ${failed} fonts failed to load - keeping fallbacks active`);
      document.documentElement.classList.add('fonts-partial-failure');
    }
    
    return { loaded, failed, total: results.length };
  }
}

// Create global instance
const fontLoader = new FontLoader();

// Auto-load fonts when DOM is ready - NON-BLOCKING for React hydration
const loadFontsAsync = async () => {
  try {
    console.log('[DEBUG] Starting async font loading...');
    await fontLoader.loadAllFonts();
    console.log('[DEBUG] Font loading completed');
  } catch (error) {
    console.warn('[DEBUG] Font loading failed, continuing with fallbacks:', error);
    // Don't block React hydration even if fonts fail
  }
};

// Use setTimeout to ensure this doesn't block React hydration
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadFontsAsync, 0); // Defer to next tick
  });
} else {
  setTimeout(loadFontsAsync, 0); // Defer to next tick
}

export default fontLoader;