/**
 * Cross-Site Navigator Web Component
 * 
 * A standalone web component that provides navigation between:
 * - Main Portfolio Site
 * - Storybook Component Library  
 * - Technical Documentation
 * 
 * This component can be embedded in any of the three sites and will
 * automatically detect the current site and provide navigation to the others.
 * 
 * Usage:
 * <script src="path/to/SiteNavigator.js"></script>
 * <site-navigator></site-navigator>
 */

class SiteNavigator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isExpanded = false;
    this.currentSite = this.detectCurrentSite();
    this.siteConfig = this.getSiteConfiguration();
  }

  /**
   * Detect which site we're currently on based on URL patterns
   */
  detectCurrentSite() {
    const url = window.location.href;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;

    // Check for Storybook
    if (url.includes('storybook') || pathname.includes('storybook') || hostname.includes('storybook')) {
      return 'storybook';
    }
    
    // Check for Docs
    if (url.includes('docs') || pathname.includes('docs') || hostname.includes('docs')) {
      return 'docs';
    }
    
    // Default to main site
    return 'main';
  }

  /**
   * Get site configuration including URLs from environment variables
   * This supports dynamic configuration for different Docker deployments
   */
  getSiteConfiguration() {
    // Try to get configuration from global window object (injected during build)
    const envConfig = window.__SITE_NAVIGATOR_CONFIG__ || this.getDefaultConfiguration();
    
    return envConfig.sites || this.getDefaultConfiguration();
  }

  /**
   * Get default configuration when environment variables are not available
   */
  getDefaultConfiguration() {
    const baseUrl = this.getBaseUrl();
    
    return {
      main: {
        name: 'Portfolio',
        icon: '🏠',
        url: baseUrl,
        description: 'Main Portfolio Site',
        shortName: 'HOME'
      },
      storybook: {
        name: 'Components',
        icon: '📚',
        url: this.getDefaultStorybookUrl(),
        description: 'Component Library',
        shortName: 'COMP'
      },
      docs: {
        name: 'Documentation',
        icon: '📋',
        url: this.getDefaultDocsUrl(),
        description: 'Technical Documentation',
        shortName: 'DOCS'
      }
    };
  }

  /**
   * Get base URL for the current environment
   */
  getBaseUrl() {
    // In development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${window.location.protocol}//${window.location.hostname}:3002`;
    }
    
    // In production - adjust these URLs based on your deployment setup
    return `${window.location.protocol}//${window.location.hostname}`;
  }

  /**
   * Get default Storybook URL based on current environment
   */
  getDefaultStorybookUrl() {
    const { protocol, hostname } = window.location;
    
    // Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:6006`;
    }
    
    // Production - common patterns: subdomain or path-based
    if (hostname.includes('storybook')) {
      return `${protocol}//${hostname}`;
    }
    
    return `${protocol}//storybook.${hostname.replace(/^(www\.)?/, '')}`;
  }

  /**
   * Get default docs URL based on current environment
   */
  getDefaultDocsUrl() {
    const { protocol, hostname } = window.location;
    
    // Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:4000`;
    }
    
    // Production - common patterns: subdomain or path-based
    if (hostname.includes('docs')) {
      return `${protocol}//${hostname}`;
    }
    
    return `${protocol}//docs.${hostname.replace(/^(www\.)?/, '')}`;
  }

  /**
   * Component lifecycle - called when element is added to DOM
   */
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    // Add slight delay to allow for smooth entrance animation
    setTimeout(() => {
      this.shadowRoot.querySelector('.navigator').classList.add('loaded');
    }, 100);
  }

  /**
   * Setup event listeners for the component
   */
  setupEventListeners() {
    const navigator = this.shadowRoot.querySelector('.navigator');
    const toggleBtn = this.shadowRoot.querySelector('.toggle-btn');
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');

    // Toggle expand/collapse
    toggleBtn.addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;
      navigator.classList.toggle('expanded', this.isExpanded);
    });

    // Handle navigation clicks
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const siteKey = item.dataset.site;
        this.navigateToSite(siteKey);
      });
    });

    // Collapse on outside click
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && this.isExpanded) {
        this.isExpanded = false;
        navigator.classList.remove('expanded');
      }
    });

    // Keyboard navigation
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isExpanded) {
        this.isExpanded = false;
        navigator.classList.remove('expanded');
      }
    });
  }

  /**
   * Navigate to a specific site
   */
  navigateToSite(siteKey) {
    const site = this.siteConfig[siteKey];
    if (site && siteKey !== this.currentSite) {
      // Add loading state
      this.shadowRoot.querySelector('.navigator').classList.add('loading');
      
      // Small delay for visual feedback
      setTimeout(() => {
        window.open(site.url, '_self');
      }, 150);
    }
  }

  /**
   * Render the component HTML and styles
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <div class="navigator" role="navigation" aria-label="Site Navigation">
        <button class="toggle-btn" aria-label="Toggle Site Navigation">
          <span class="toggle-icon">▶</span>
          <span class="toggle-text">SITES</span>
        </button>
        
        <div class="nav-content">
          <div class="nav-header">
            <div class="header-text">NAVIGATE</div>
            <div class="header-line"></div>
          </div>
          
          <div class="nav-items">
            ${Object.entries(this.siteConfig).map(([key, site]) => `
              <div class="nav-item ${key === this.currentSite ? 'active' : ''}" 
                   data-site="${key}" 
                   role="button" 
                   tabindex="0"
                   aria-label="Navigate to ${site.description}">
                <div class="nav-icon">${site.icon}</div>
                <div class="nav-text">
                  <div class="nav-name">${site.shortName}</div>
                  <div class="nav-desc">${site.description}</div>
                </div>
                <div class="nav-arrow">→</div>
              </div>
            `).join('')}
          </div>
          
          <div class="current-indicator">
            <div class="indicator-text">CURRENT: ${this.siteConfig[this.currentSite].shortName}</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get the component styles
   */
  getStyles() {
    return `
      /* CSS Custom Properties for theming */
      :host {
        --primary-cyan: #05d5fa;
        --secondary-cyan: #3dd8ff;
        --dark-bg: #0a0a0a;
        --darker-bg: #000000;
        --text-primary: #ffffff;
        --text-secondary: #b0b0b0;
        --border-color: #333333;
        --shadow-color: rgba(5, 213, 250, 0.3);
        --glow-color: rgba(5, 213, 250, 0.5);
      }

      .navigator {
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10000;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .navigator.loaded {
        opacity: 1;
      }

      .navigator.loading {
        pointer-events: none;
        opacity: 0.7;
      }

      .toggle-btn {
        background: linear-gradient(135deg, var(--dark-bg), var(--darker-bg));
        border: 1px solid var(--primary-cyan);
        color: var(--primary-cyan);
        padding: 12px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 0 8px 8px 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease;
        min-height: 44px;
        writing-mode: horizontal-tb;
      }

      .toggle-btn:hover {
        background: linear-gradient(135deg, #1a1a1a, var(--dark-bg));
        box-shadow: 0 6px 16px var(--shadow-color), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transform: translateX(2px);
      }

      .toggle-icon {
        font-size: 10px;
        transition: transform 0.2s ease;
      }

      .navigator.expanded .toggle-icon {
        transform: rotate(90deg);
      }

      .toggle-text {
        font-weight: bold;
        letter-spacing: 1px;
        writing-mode: vertical-lr;
        text-orientation: mixed;
        font-size: 10px;
      }

      .nav-content {
        position: absolute;
        left: 100%;
        top: 0;
        background: linear-gradient(135deg, var(--dark-bg), var(--darker-bg));
        border: 1px solid var(--primary-cyan);
        border-left: none;
        border-radius: 0 12px 12px 0;
        padding: 16px;
        min-width: 280px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px var(--shadow-color);
        opacity: 0;
        transform: translateX(-10px);
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .navigator.expanded .nav-content {
        opacity: 1;
        transform: translateX(0);
        pointer-events: all;
      }

      .nav-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color);
      }

      .header-text {
        color: var(--primary-cyan);
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 11px;
      }

      .header-line {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, var(--primary-cyan), transparent);
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid transparent;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .nav-item:hover {
        background: rgba(5, 213, 250, 0.1);
        border-color: var(--primary-cyan);
        box-shadow: 0 2px 8px var(--shadow-color);
        transform: translateX(4px);
      }

      .nav-item.active {
        background: linear-gradient(135deg, rgba(5, 213, 250, 0.2), rgba(5, 213, 250, 0.1));
        border-color: var(--primary-cyan);
        box-shadow: inset 0 0 10px rgba(5, 213, 250, 0.3);
      }

      .nav-item.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--primary-cyan);
        box-shadow: 0 0 6px var(--glow-color);
      }

      .nav-icon {
        font-size: 16px;
        width: 20px;
        text-align: center;
      }

      .nav-text {
        flex: 1;
      }

      .nav-name {
        color: var(--text-primary);
        font-weight: bold;
        font-size: 11px;
        letter-spacing: 1px;
      }

      .nav-desc {
        color: var(--text-secondary);
        font-size: 9px;
        margin-top: 2px;
      }

      .nav-arrow {
        color: var(--primary-cyan);
        opacity: 0;
        transition: all 0.2s ease;
        font-size: 12px;
      }

      .nav-item:hover .nav-arrow {
        opacity: 1;
        transform: translateX(2px);
      }

      .nav-item.active .nav-arrow {
        opacity: 0.5;
      }

      .current-indicator {
        padding-top: 12px;
        border-top: 1px solid var(--border-color);
      }

      .indicator-text {
        color: var(--text-secondary);
        font-size: 9px;
        letter-spacing: 1px;
        text-align: center;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .navigator {
          left: 10px;
        }
        
        .nav-content {
          min-width: 240px;
        }
        
        .toggle-btn {
          padding: 10px 6px;
        }
      }

      /* Accessibility improvements */
      .nav-item:focus {
        outline: 2px solid var(--primary-cyan);
        outline-offset: 2px;
      }

      .toggle-btn:focus {
        outline: 2px solid var(--primary-cyan);
        outline-offset: 2px;
      }

      /* Animation for loading state */
      .navigator.loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(5, 213, 250, 0.3), transparent);
        animation: loading-pulse 1.5s infinite;
      }

      @keyframes loading-pulse {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
  }
}

// Register the custom element
if (!customElements.get('site-navigator')) {
  customElements.define('site-navigator', SiteNavigator);
}

// Auto-initialize if the component tag exists
document.addEventListener('DOMContentLoaded', () => {
  // Check if component should be auto-added
  const shouldAutoAdd = !document.querySelector('site-navigator') && 
                       !document.querySelector('[data-no-site-navigator]');
  
  if (shouldAutoAdd) {
    const navigator = document.createElement('site-navigator');
    document.body.appendChild(navigator);
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SiteNavigator;
}