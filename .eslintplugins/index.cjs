/**
 * ESLint Plugin for React Context Safety
 * 
 * This plugin helps enforce patterns that prevent tree-shaking issues
 * with React Context and other critical React APIs in production builds.
 */

module.exports = {
  rules: {
    // Rule to prevent destructured imports from 'react'
    'no-destructured-react-import': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Disallow destructured imports from React',
          category: 'Best Practices',
          recommended: true,
          url: 'https://reactjs.org/docs/context.html',
        },
        fixable: 'code',
        schema: [],
        messages: {
          noDestructuredReactImport: 'Avoid destructured imports from React. Use "import React from \'react\'" instead.',
        },
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            // Check if this is an import from 'react'
            if (node.source.value === 'react') {
              // Check if it's a destructured import
              if (node.specifiers.some(specifier => specifier.type === 'ImportSpecifier')) {
                const destructuredImports = node.specifiers
                  .filter(specifier => specifier.type === 'ImportSpecifier')
                  .map(specifier => specifier.imported.name);
                
                const sourceCode = context.getSourceCode();
                
                context.report({
                  node,
                  messageId: 'noDestructuredReactImport',
                  fix(fixer) {
                    // Check if there's already a default import
                    const hasDefaultImport = node.specifiers.some(
                      specifier => specifier.type === 'ImportDefaultSpecifier'
                    );
                    
                    if (hasDefaultImport) {
                      // Just convert all destructured imports to use React namespace
                      return null; // Not easily fixable - would require modifying usage throughout file
                    } else {
                      // Add a default import and convert destructured imports
                      return fixer.replaceText(
                        node,
                        `import React from 'react';`
                      );
                    }
                  },
                });
              }
            }
          },
        };
      },
    },
    
    // Rule to enforce using React.createContext instead of destructured createContext
    'use-react-namespace': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce use of React namespace for critical APIs',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
          useReactNamespace: 'Use React namespace (e.g., React.createContext) instead of destructured APIs',
        },
      },
      create(context) {
        // Track destructured React imports
        const destructuredReactImports = new Set();
        
        return {
          ImportDeclaration(node) {
            if (node.source.value === 'react') {
              // Track all destructured imports
              node.specifiers
                .filter(specifier => specifier.type === 'ImportSpecifier')
                .forEach(specifier => {
                  destructuredReactImports.add(specifier.imported.name);
                });
            }
          },
          
          // Check for direct use of createContext and other critical APIs
          CallExpression(node) {
            if (node.callee.type === 'Identifier' && 
                destructuredReactImports.has(node.callee.name) &&
                ['createContext', 'memo', 'forwardRef', 'lazy'].includes(node.callee.name)) {
              
              context.report({
                node,
                messageId: 'useReactNamespace',
                fix(fixer) {
                  const sourceCode = context.getSourceCode();
                  return fixer.replaceText(
                    node.callee,
                    `React.${node.callee.name}`
                  );
                },
              });
            }
          },
        };
      },
    },
    
    // Rule to enforce using contextUtils.ts helpers
    'use-context-utils': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce use of contextUtils.ts helpers for context creation',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [],
        messages: {
          useContextUtils: 'Use contextUtils.ts helpers for context creation instead of direct React.createContext',
        },
      },
      create(context) {
        return {
          // Check for direct use of React.createContext
          CallExpression(node) {
            if (node.callee.type === 'MemberExpression' && 
                node.callee.object.name === 'React' &&
                node.callee.property.name === 'createContext') {
              
              // Look for source file to determine if it's appropriate to suggest the alternative
              const filename = context.getFilename();
              
              // Skip suggesting in contextUtils.ts itself
              if (filename.includes('contextUtils.ts')) {
                return;
              }
              
              context.report({
                node,
                messageId: 'useContextUtils',
              });
            }
            
            // Also check for destructured createContext
            if (node.callee.type === 'Identifier' && 
                node.callee.name === 'createContext') {
              
              // Skip in contextUtils.ts
              const filename = context.getFilename();
              if (filename.includes('contextUtils.ts')) {
                return;
              }
              
              context.report({
                node,
                messageId: 'useContextUtils',
              });
            }
          },
        };
      },
    },
  },
  
  // Define a recommended configuration
  configs: {
    recommended: {
      plugins: ['react-context-safety'],
      rules: {
        'react-context-safety/no-destructured-react-import': 'error',
        'react-context-safety/use-react-namespace': 'warn',
        'react-context-safety/use-context-utils': 'warn',
      },
    },
  },
};
