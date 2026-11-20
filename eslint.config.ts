import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

interface ESLintFlatConfig {
  files?: string[];
  ignores?: string[];
  languageOptions?: {
    ecmaVersion?: number;
    sourceType?: 'module' | 'script' | 'commonjs';
    parser?: any;
    parserOptions?: {
      ecmaVersion?: number;
      sourceType?: 'module' | 'script' | 'commonjs';
      ecmaFeatures?: {
        jsx?: boolean;
      };
      project?: string;
      tsconfigRootDir?: string;
    };
    globals?: Record<string, 'readonly' | 'writable' | 'off'>;
  };
  plugins?: Record<string, any>;
  rules?: Record<string, any>;
}

const config: ESLintFlatConfig[] = [
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
      ecmaVersion: 2024,
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
        PerformanceObserver: "readonly",
        Element: "readonly",
        Node: "readonly",
        
        // Node.js globals
        require: "readonly",
        module: "readonly",
        process: "readonly",
        global: "readonly",
        
        // Testing globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
        jest: "readonly",
        performance: "readonly"
      }
    },
    rules: {
      // Disable unused vars warnings as they cause issues in SARIF reporting
      "no-unused-vars": "off",
      "no-undef": "warn"
    }
  },
  {
    // Configuration for TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project: "./tsconfig.json",
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url))
      }
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin
    },
    rules: {
      // TypeScript will handle these
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },
  {
    // Building blocks must render with no provider around them: atoms and
    // molecules take everything through props. Only organisms and layout read
    // app context or portfolio data.
    files: ["src/components/atoms/**", "src/components/molecules/**"],
    ignores: ["**/*.stories.*", "**/*.test.*", "**/__mocks__/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["@context/**", "**/context/**"],
            message: "Atoms and molecules must not read app context. Take the value as a prop from the organism."
          },
          {
            // useIntersectionObserver is a generic UI hook with no app state
            group: ["@hooks/*", "**/hooks/*", "!@hooks/useIntersectionObserver", "!**/hooks/useIntersectionObserver"],
            message: "Atoms and molecules must not use app data hooks. Take the data as props."
          },
          {
            group: ["**/portfolio", "@/portfolio", "@data/*"],
            message: "Atoms and molecules must not import portfolio data. Take it as props."
          }
        ]
      }]
    }
  }
];

export default config; 