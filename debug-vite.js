#!/usr/bin/env node
import { createServer } from 'vite';

// Intercept errors in the config loading
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Step by step debugging
console.log('Step 1: Starting to import config');
try {
  const configModule = await import('./vite.config.js');
  console.log('Step 2: Config imported successfully');
  
  // Log some info about the config
  console.log('Config keys:', Object.keys(configModule));
  
  const config = configModule.default;
  console.log('Step 3: Config extracted:', Object.keys(config));
  
  console.log('Step 4: Creating server with config...');
  const server = await createServer({
    // Don't use full config at first to isolate issues
    configFile: false,
    root: process.cwd(),
    server: {
      port: 3000
    }
  });
  
  console.log('Step 5: Server created, starting it...');
  await server.listen();
  console.log('Step 6: Server started successfully on port:', server.config.server.port);
} catch (error) {
  console.error('Error in Vite startup process:');
  console.error(error);
  
  if (error.cause) {
    console.error('Caused by:', error.cause);
  }
  
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
  
  // Try to check specific config files
  try {
    console.log('Trying to directly import and check specific modules:');
    const envModule = await import('./config/env.js');
    console.log('env.js module loaded:', Object.keys(envModule));
    
    const pathsModule = await import('./config/paths.js');
    console.log('paths.js module loaded:', Object.keys(pathsModule));
    
    const pluginsModule = await import('./config/plugins/core.js');
    console.log('core.js plugins module loaded:', Object.keys(pluginsModule));
    
    const splittingModule = await import('./config/optimization/splitting.js');
    console.log('splitting.js module loaded:', Object.keys(splittingModule));
  } catch (moduleError) {
    console.error('Error checking specific modules:', moduleError);
  }
}
