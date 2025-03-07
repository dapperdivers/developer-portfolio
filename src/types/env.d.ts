/**
 * Type definitions for environment variables
 * 
 * This file provides TypeScript types for all environment variables used in the application.
 * It ensures type safety when accessing environment variables and documents their purpose.
 */

interface ImportMetaEnv {
  // Required application information
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  
  // Server configuration
  readonly PORT?: string;
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly ALLOWED_DOMAINS?: string;
  
  // Optional variables with defaults
  readonly VITE_ENABLE_PWA?: string;
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_GA_TRACKING_ID?: string;
  
  // Feature flags
  readonly VITE_FEATURE_DARK_MODE?: string;
  readonly VITE_FEATURE_ANIMATIONS?: string;
  readonly VITE_ENABLE_PERFORMANCE_MONITORING?: string;
  
  // Mode information (provided by Vite)
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
