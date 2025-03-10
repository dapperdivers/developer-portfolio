/**
 * Root Vite configuration file
 * 
 * This file serves as the entry point for Vite configuration.
 * It imports and re-exports the modular configuration from the config directory.
 * The configuration is split into modules for better maintainability and separation of concerns.
 */

import { UserConfig } from 'vite';
import config from './config/vite';

export default config as UserConfig;