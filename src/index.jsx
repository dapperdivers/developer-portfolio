// Import Firefox fix first before other imports to ensure it runs early
import '@utils/browserFixes';

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
