import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to replace problematic bootstrap-legacy-autofill-overlay
    {
      name: 'remove-bootstrap-legacy-autofill',
      transform(code, id) {
        // If this is a bootstrap file that contains the problematic code
        if (id.includes('bootstrap-legacy-autofill-overlay.js') || 
            (id.includes('bootstrap') && code.includes('checkPageContainsShadowDom'))) {
          console.log('Removing problematic bootstrap-legacy-autofill-overlay code from', id);
          
          // Replace the problematic method with an empty function
          const modifiedCode = code
            .replace(/checkPageContainsShadowDom\s*\(\)\s*\{[\s\S]*?\}/g, 
                     'checkPageContainsShadowDom() { return false; }')
            .replace(/domQueryService\.checkPageContainsShadowDom\(\)/g, 
                     '/* removed problematic call */ false');
          
          return { code: modifiedCode };
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lottie-react'],
          animations: ['lottie-web']
        }
      }
    },
    terserOptions: {
      parse: {
        bare_returns: false
      },
      compress: {
        passes: 2,
        warnings: false,
        evaluate: false
      },
      mangle: true,
      module: false
    }
  }
});
