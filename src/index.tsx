
// Import browser compatibility fixes first
import '@utils/browserFixes';

// Import font loader for better font loading experience
// This is now non-blocking and won't prevent React hydration
import '@utils/fontLoader';

// Import CSS files first - order matters for CSS cascade
import '@assets/css/design-system/index.css';
import '@assets/css/index.css';

// Import React and ReactDOM directly - using standard named imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main application
// App already includes the DebugProvider setup internally
// import TestApp from './TestApp';
import App from './App';

// One-time greeting for anyone who opens devtools
console.info(
  [
    '%c      ___',
    '   .-"   "-.',
    '  /  o   o  \\    hello, fellow inspector',
    '  \\   ---   /',
    "   `-._____.-'",
  ].join('\n'),
  'color:#22d3ee;font-family:monospace;line-height:1.3'
);
console.info(
  '%cOpen source, served from a homelab in a garage. The Experience timeline is hiding something. Look closer.',
  'color:#94a3b8;font-family:monospace'
);

// Create root and render application
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

