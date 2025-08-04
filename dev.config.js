/**
 * Development Environment Configuration
 * 
 * This file defines the configuration for running multiple development services
 * in parallel with proper process management, logging, and cleanup.
 */

export const devConfig = {
  // Service definitions
  services: {
    vite: {
      name: 'vite',
      command: 'vite',
      color: 'cyan',
      port: 5173,
      url: 'http://localhost:5173',
      description: 'Vite development server (React app)',
      readyPattern: /Local:\s+http:\/\/localhost:(\d+)/,
      cwd: process.cwd()
    },
    storybook: {
      name: 'storybook',
      command: 'storybook dev -p 6006',
      color: 'magenta',
      port: 6006,
      url: 'http://localhost:6006',
      description: 'Storybook component documentation',
      readyPattern: /Local:\s+http:\/\/localhost:6006/,
      cwd: process.cwd()
    },
    docs: {
      name: 'docs',
      command: 'cd docs && bundle install && bundle exec jekyll serve --watch --livereload --host 0.0.0.0',
      color: 'yellow',
      port: 4000,
      url: 'http://localhost:4000',
      description: 'Jekyll documentation site',
      readyPattern: /Server running\.\.\. press ctrl-c to stop/,
      cwd: process.cwd()
    },
    server: {
      name: 'server',
      command: 'node server.js',
      color: 'green',
      port: 3001,
      url: 'http://localhost:3001',
      description: 'Express production server',
      readyPattern: /Server is running on port (\d+)/,
      cwd: process.cwd()
    }
  },

  // Predefined service combinations
  combinations: {
    all: ['vite', 'storybook', 'docs', 'server'],
    frontend: ['vite', 'storybook'],
    minimal: ['vite', 'server'],
    docs: ['vite', 'docs'],
    full: ['vite', 'storybook', 'docs', 'server']
  },

  // Global settings
  settings: {
    killOthersOnFail: true,
    restartTries: 3,
    restartDelay: 1000,
    successCondition: 'first',
    prefix: '[{name}]',
    timestampFormat: 'HH:mm:ss'
  }
};

/**
 * Get service URLs for quick access
 */
export const getServiceUrls = () => {
  const urls = {};
  Object.entries(devConfig.services).forEach(([key, service]) => {
    urls[key] = service.url;
  });
  return urls;
};

/**
 * Get services by combination name
 */
export const getServiceCombination = (combinationName = 'all') => {
  const combination = devConfig.combinations[combinationName] || devConfig.combinations.all;
  return combination.map(serviceName => devConfig.services[serviceName]).filter(Boolean);
};

export default devConfig;