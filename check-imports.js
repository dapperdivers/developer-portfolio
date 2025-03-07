// Test imports individually to see which one is failing
async function testConfigFiles() {
  try {
    console.log('=== TESTING ENV.JS ===');
    const envModule = await import('./config/env.js');
    console.log('ENV keys:', Object.keys(envModule));
    console.log('ENV default:', typeof envModule.default);
    
    console.log('\n=== TESTING PATHS.JS ===');
    const pathsModule = await import('./config/paths.js');
    console.log('PATHS keys:', Object.keys(pathsModule));
    console.log('PATHS default:', typeof pathsModule.default);
    
    console.log('\n=== TESTING CORE PLUGINS ===');
    const corePluginsModule = await import('./config/plugins/core.js');
    console.log('CORE PLUGINS keys:', Object.keys(corePluginsModule));
    console.log('getCorePlugins:', typeof corePluginsModule.getCorePlugins);
    
    console.log('\n=== TESTING PWA PLUGINS ===');
    const pwaPluginsModule = await import('./config/plugins/pwa.js');
    console.log('PWA PLUGINS keys:', Object.keys(pwaPluginsModule));
    console.log('getPwaPlugins:', typeof pwaPluginsModule.getPwaPlugins);
    
    console.log('\n=== TESTING SPLITTING ===');
    const splittingModule = await import('./config/optimization/splitting.js');
    console.log('SPLITTING keys:', Object.keys(splittingModule));
    console.log('getCodeSplittingConfig:', typeof splittingModule.getCodeSplittingConfig);
    
    console.log('\n=== TESTING DEV SERVER ===');
    const devServerModule = await import('./config/dev/server.js');
    console.log('DEV SERVER keys:', Object.keys(devServerModule));
    console.log('getDevConfig:', typeof devServerModule.getDevConfig);
    
    console.log('\n=== TESTING CONFIG INDEX ===');
    try {
      const configIndex = await import('./config/index.js');
      console.log('CONFIG INDEX keys:', Object.keys(configIndex));
    } catch (e) {
      console.error('CONFIG INDEX import failed:', e.message);
      
      // Try to track what's causing the error in index.js
      console.log('\n=== ANALYZING CONFIG/INDEX.JS ===');
      
      // Check if we can call the functions from the modules correctly
      // to see if the issue is with imports or with function execution
      try {
        const env = envModule.initEnv();
        console.log('initEnv() works and returns:', Object.keys(env));
      } catch (envError) {
        console.error('Error calling initEnv():', envError.message);
      }
      
      try {
        const codeSplitting = splittingModule.getCodeSplittingConfig();
        console.log('getCodeSplittingConfig() works and returns:', Object.keys(codeSplitting));
      } catch (splittingError) {
        console.error('Error calling getCodeSplittingConfig():', splittingError.message);
      }
      
      try {
        const plugins = corePluginsModule.getCorePlugins({ isProd: false });
        console.log('getCorePlugins() works and returns array of length:', plugins.length);
      } catch (pluginsError) {
        console.error('Error calling getCorePlugins():', pluginsError.message);
      }
      
      try {
        const pwaPlugins = pwaPluginsModule.getPwaPlugins({ isProd: false, analyze: false });
        console.log('getPwaPlugins() works and returns array of length:', pwaPlugins.length);
      } catch (pwaError) {
        console.error('Error calling getPwaPlugins():', pwaError.message);
      }
      
      try {
        const devConfig = devServerModule.getDevConfig();
        console.log('getDevConfig() works and returns:', Object.keys(devConfig));
      } catch (devError) {
        console.error('Error calling getDevConfig():', devError.message);
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testConfigFiles().catch(console.error);
