/**
 * Site Navigator Configuration Utility
 * 
 * Handles environment variable configuration for cross-site navigation URLs.
 * This allows each Docker deployment to specify its own site URLs dynamically.
 */

/**
 * Get site navigation configuration from environment variables or defaults
 * 
 * Environment Variables:
 * - VITE_SITE_MAIN_URL: Main portfolio site URL
 * - VITE_SITE_STORYBOOK_URL: Storybook component library URL  
 * - VITE_SITE_DOCS_URL: Documentation site URL
 * - VITE_SITE_NAVIGATOR_ENABLED: Enable/disable the navigator (default: true)
 * 
 * @returns {Object} Site configuration object
 */
export function getSiteNavigatorConfig() {
  // Get environment variables with fallbacks
  const mainUrl = import.meta.env?.VITE_SITE_MAIN_URL || getDefaultMainUrl();
  const storybookUrl = import.meta.env?.VITE_SITE_STORYBOOK_URL || getDefaultStorybookUrl();
  const docsUrl = import.meta.env?.VITE_SITE_DOCS_URL || getDefaultDocsUrl();
  const isEnabled = import.meta.env?.VITE_SITE_NAVIGATOR_ENABLED !== 'false';

  return {
    enabled: isEnabled,
    sites: {
      main: {
        name: 'Portfolio',
        icon: '🏠',
        url: mainUrl,
        description: 'Main Portfolio Site',
        shortName: 'HOME'
      },
      storybook: {
        name: 'Components',
        icon: '📚',
        url: storybookUrl,
        description: 'Component Library',
        shortName: 'COMP'
      },
      docs: {
        name: 'Documentation',
        icon: '📋',
        url: docsUrl,
        description: 'Technical Documentation',
        shortName: 'DOCS'
      }
    }
  };
}

/**
 * Get default main site URL based on current environment
 */
function getDefaultMainUrl() {
  if (typeof window === 'undefined') return 'http://localhost:3002';
  
  const { protocol, hostname } = window.location;
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:3002`;
  }
  
  // Production - adjust based on your deployment
  return `${protocol}//${hostname}`;
}

/**
 * Get default Storybook URL based on current environment
 */
function getDefaultStorybookUrl() {
  if (typeof window === 'undefined') return 'http://localhost:6006';
  
  const { protocol, hostname } = window.location;
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:6006`;
  }
  
  // Production - adjust based on your deployment
  // Common patterns: subdomain or path-based
  if (hostname.includes('storybook')) {
    return `${protocol}//${hostname}`;
  }
  
  return `${protocol}//storybook.${hostname.replace(/^(www\.)?/, '')}`;
}

/**
 * Get default docs URL based on current environment
 */
function getDefaultDocsUrl() {
  if (typeof window === 'undefined') return 'http://localhost:4000';
  
  const { protocol, hostname } = window.location;
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:4000`;
  }
  
  // Production - adjust based on your deployment
  // Common patterns: subdomain or path-based
  if (hostname.includes('docs')) {
    return `${protocol}//${hostname}`;
  }
  
  return `${protocol}//docs.${hostname.replace(/^(www\.)?/, '')}`;
}

/**
 * Generate environment variables template for Docker deployment
 * 
 * @param {Object} options - Deployment options
 * @param {string} options.mainUrl - Main site URL
 * @param {string} options.storybookUrl - Storybook URL
 * @param {string} options.docsUrl - Docs URL
 * @param {boolean} options.enabled - Whether navigator is enabled
 * @returns {string} Environment variables as string
 */
export function generateEnvTemplate(options = {}) {
  return `# Site Navigator Configuration
VITE_SITE_MAIN_URL=${options.mainUrl || 'https://your-main-site.com'}
VITE_SITE_STORYBOOK_URL=${options.storybookUrl || 'https://storybook.your-site.com'}
VITE_SITE_DOCS_URL=${options.docsUrl || 'https://docs.your-site.com'}
VITE_SITE_NAVIGATOR_ENABLED=${options.enabled !== false ? 'true' : 'false'}`;
}

/**
 * Validate environment configuration
 * 
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validation result with errors if any
 */
export function validateSiteConfig(config) {
  const errors = [];
  
  if (!config || typeof config !== 'object') {
    errors.push('Configuration object is required');
    return { valid: false, errors };
  }
  
  if (!config.sites) {
    errors.push('Sites configuration is required');
    return { valid: false, errors };
  }
  
  // Validate each site
  ['main', 'storybook', 'docs'].forEach(siteKey => {
    const site = config.sites[siteKey];
    if (!site) {
      errors.push(`Missing configuration for ${siteKey} site`);
      return;
    }
    
    if (!site.url) {
      errors.push(`Missing URL for ${siteKey} site`);
    } else {
      try {
        new URL(site.url);
      } catch (e) {
        errors.push(`Invalid URL for ${siteKey} site: ${site.url}`);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export default getSiteNavigatorConfig;