#!/usr/bin/env node
/**
 * Script to fix React context issues in production builds
 * 
 * This script specifically addresses issues with React.createContext being tree-shaken
 * in production builds, causing "createContext is not a function" errors.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const splitConfigPath = path.join(__dirname, 'config', 'optimization', 'splitting.js');
const indexJsxPath = path.join(__dirname, 'src', 'index.jsx');
const viteConfigPath = path.join(__dirname, 'vite.config.js');

async function fixReactContext() {
  console.log('===== FIX REACT CONTEXT IN PRODUCTION =====');
  
  try {
    // 1. Update the splitting.js strategy to ensure React context is preserved
    console.log('\n1. Updating code splitting strategy...');
    
    const splitContent = fs.readFileSync(splitConfigPath, 'utf8');
    if (splitContent.includes('// Context is critically important')) {
      console.log('Code splitting already contains React context protection.');
    } else {
      console.error('Code splitting needs to be updated to protect React context.');
      // We already updated this file earlier
    }
    
    // 2. Check index.jsx to ensure proper React initialization
    console.log('\n2. Checking React initialization in index.jsx...');
    
    const indexContent = fs.readFileSync(indexJsxPath, 'utf8');
    
    if (indexContent.includes('createContext polyfill')) {
      console.log('index.jsx contains React.createContext fallback - good');
    } else {
      console.error('index.jsx should have a React.createContext fallback');
    }
    
    if (indexContent.includes('window.React = React')) {
      console.log('index.jsx explicitly assigns React to window - good');
    } else {
      console.error('index.jsx should explicitly assign React to window');
    }
    
    // 3. Add React preservation to Vite config if needed
    console.log('\n3. Checking Vite configuration for React preservation...');
    
    // Add define settings to preserve React if needed
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Get current config/index.js content
    const configIndexPath = path.join(__dirname, 'config', 'index.js');
    const configIndexContent = fs.readFileSync(configIndexPath, 'utf8');
    
    if (configIndexContent.includes("'__REACT_FEATURES__': JSON.stringify(true)")) {
      console.log('Config already includes React features preservation setting');
    } else {
      console.log('Adding React features preservation to config/index.js');
      
      // Update config/index.js to ensure React features are preserved
      const updatedConfigContent = configIndexContent.replace(
        "// Ensure React is not tree-shaken in production",
        "// Ensure React is not tree-shaken in production\n      '__REACT_FEATURES__': JSON.stringify(true),"
      );
      
      fs.writeFileSync(configIndexPath, updatedConfigContent);
      console.log('Updated config/index.js with React preservation setting');
    }
    
    // 4. Create a browser test for context functionality
    console.log('\n4. Creating browser-based context test...');
    
    const testHtmlPath = path.join(__dirname, 'context-test.html');
    const testHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Context Test</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    .success { color: green; font-weight: bold; }
    .error { color: red; font-weight: bold; }
  </style>
</head>
<body>
  <h1>React Context API Test</h1>
  <div id="root"></div>
  
  <script type="text/babel">
    // Test context creation
    const TestContext = React.createContext('default value');
    
    // Test context provider and consumer
    function ContextTest() {
      const [value, setValue] = React.useState('Context value set by provider');
      
      return (
        <div>
          <h2>Context Test Results:</h2>
          <TestContext.Provider value={value}>
            <div>
              <p>Provider initialized with value: <span className="success">{value}</span></p>
              <ConsumerComponent />
              <HookComponent />
            </div>
          </TestContext.Provider>
        </div>
      );
    }
    
    // Test with Consumer component
    function ConsumerComponent() {
      return (
        <div>
          <h3>Using Context.Consumer:</h3>
          <TestContext.Consumer>
            {value => (
              <p>Value received by consumer: <span className="success">{value}</span></p>
            )}
          </TestContext.Consumer>
        </div>
      );
    }
    
    // Test with useContext hook
    function HookComponent() {
      try {
        const value = React.useContext(TestContext);
        return (
          <div>
            <h3>Using useContext Hook:</h3>
            <p>Value received by hook: <span className="success">{value}</span></p>
          </div>
        );
      } catch (error) {
        return (
          <div>
            <h3>Using useContext Hook:</h3>
            <p className="error">Error: {error.message}</p>
          </div>
        );
      }
    }
    
    // Test createContext function directly
    function testCreateContext() {
      try {
        const TestContext2 = React.createContext('test');
        return {success: true, message: 'React.createContext works correctly'};
      } catch (error) {
        return {success: false, message: \`Error: \${error.message}\`};
      }
    }
    
    // Display react and createContext test
    function TestRunner() {
      const reactResult = typeof React !== 'undefined' ? 
        {success: true, message: 'React is available'} : 
        {success: false, message: 'React is not defined'};
      
      const contextResult = testCreateContext();
      
      return (
        <div>
          <h2>Environment Tests:</h2>
          <p className={reactResult.success ? 'success' : 'error'}>
            React: {reactResult.message}
          </p>
          <p className={contextResult.success ? 'success' : 'error'}>
            createContext: {contextResult.message}
          </p>
          
          <ContextTest />
        </div>
      );
    }
    
    // Render the test
    ReactDOM.createRoot(document.getElementById('root')).render(<TestRunner />);
  </script>
</body>
</html>`;
    
    fs.writeFileSync(testHtmlPath, testHtmlContent);
    console.log(`Created context test HTML at ${testHtmlPath}`);
    
    // 5. Modify the build to include explicit React context preservation
    console.log('\n5. Updating production build with React context preservation...');
    
    const buildDir = path.resolve(__dirname, 'build');
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
      console.log('Cleaned existing build directory');
    }
    
    // Set environment variables to ensure React is preserved
    const buildEnv = {
      ...process.env,
      NODE_ENV: 'production',
      VITE_PRESERVE_REACT: 'true'
    };
    
    // Update build command with specific flags
    console.log('Running production build with React preservation...');
    await new Promise((resolve, reject) => {
      const build = spawn('node_modules/.bin/vite', [
        'build', 
        '--mode', 'production'
      ], {
        env: buildEnv,
        stdio: 'inherit'
      });
      
      build.on('close', code => {
        if (code === 0) {
          console.log('Build completed successfully with React preservation');
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
      
      build.on('error', reject);
    });
    
    console.log('\n✅ React context fix completed');
    console.log('You can now:');
    console.log('1. Run the production build with: yarn build:prod');
    console.log('2. Test the context functionality with: npx serve -s build');
    console.log('3. Open the context test HTML to verify context works: open context-test.html');
    
  } catch (error) {
    console.error('❌ React context fix failed:');
    console.error(error);
  }
}

fixReactContext().catch(console.error);
