// Import plugin using CommonJS require
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const reactContextSafetyPlugin = require('./.eslintplugins/index.cjs');

export default [
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "storybook-static/**",
      "**/lottie-web/**",
      "**/@storybook/core/**"
    ]
  },
  {
    // Configuration for JavaScript files
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Browser globals
        document: "readonly",
        window: "readonly",
        console: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        fetch: "readonly",
        Image: "readonly",
        URL: "readonly",
        alert: "readonly",
        IntersectionObserver: "readonly",
        AbortController: "readonly",
        CustomEvent: "readonly",
        Event: "readonly",
        
        // Node.js globals
        require: "readonly",
        module: "readonly",
        process: "readonly",
        global: "readonly",
        
        // Testing globals
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
        performance: "readonly"
      }
    },
    rules: {
      // Allow React import even if unused (needed for JSX)
      "no-unused-vars": ["warn", { 
        "varsIgnorePattern": "React" 
      }],
      "no-undef": "warn",
      
      // React Context Safety Rules
      "react-context-safety/no-destructured-react-import": "error",
      "react-context-safety/use-react-namespace": "warn",
      "react-context-safety/use-context-utils": "warn"
    },
    plugins: {
      "react-context-safety": reactContextSafetyPlugin
    }
  },
  {
    // Configuration for TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // React Context Safety Rules for TypeScript
      "react-context-safety/no-destructured-react-import": "error",
      "react-context-safety/use-react-namespace": "warn",
      "react-context-safety/use-context-utils": "warn"
    },
    plugins: {
      "react-context-safety": reactContextSafetyPlugin
    }
  }
];
