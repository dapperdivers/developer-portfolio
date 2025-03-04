/**
 * Security enhancements for the portfolio website
 * Implements security best practices for client-side web applications
 */

/**
 * Configuration for security features
 */
export const securityConfig = {
  enableCSP: true, // Content Security Policy
  enableReferrerPolicy: true,
  enableXXSSProtection: true,
  enableFrameProtection: true,
  enableStrictTransportSecurity: true,
  sanitizeInputs: true,
  preventClickjacking: true
};

/**
 * Apply Content Security Policy
 * Restricts the sources from which resources can be loaded
 */
export const applyCSP = () => {
  if (!securityConfig.enableCSP) return;
  
  // Define CSP directives - remove jsdelivr reference
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://api.github.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://avatars.githubusercontent.com https://*.githubusercontent.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.github.com",
    "frame-src 'none'",
    "object-src 'none'"
  ].join('; ');

  // Apply CSP meta tag
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = cspDirectives;
  document.head.appendChild(meta);
};

/**
 * Apply Referrer Policy
 * Controls how much referrer information should be included with requests
 */
export const applyReferrerPolicy = () => {
  if (!securityConfig.enableReferrerPolicy) return;
  
  const meta = document.createElement('meta');
  meta.name = 'referrer';
  meta.content = 'same-origin';
  document.head.appendChild(meta);
};

/**
 * Apply XSS protection measures
 * Note: While X-XSS-Protection as a meta tag is widely supported,
 * it's better set server-side. We implement additional client-side measures.
 */
export const applyXXSSProtection = () => {
  if (!securityConfig.enableXXSSProtection) return;
  
  // The meta tag is still useful for some browsers but should be set server-side as a header
  const meta = document.createElement('meta');
  meta.httpEquiv = 'X-XSS-Protection';
  meta.content = '1; mode=block';
  document.head.appendChild(meta);
  
  // Add CSP directive that helps with XSS protection
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = "script-src 'self' 'unsafe-inline' https://api.github.com";
  document.head.appendChild(cspMeta);
  
  // Add HTML encoding helper to window object
  window.encodeHTML = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
};

/**
 * Apply frame protection using CSP frame-ancestors
 * Prevents the page from being displayed in an iframe
 * Note: X-Frame-Options can only be set server-side via HTTP headers,
 * so we use CSP frame-ancestors directive instead for client-side protection
 */
export const applyFrameProtection = () => {
  if (!securityConfig.enableFrameProtection) return;
  
  // Use CSP frame-ancestors directive instead of X-Frame-Options
  // This achieves the same effect but works with meta tags
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "frame-ancestors 'none'";
  document.head.appendChild(meta);
  
  // Also apply a JavaScript-based protection as a fallback
  if (window !== window.top) {
    try {
      // If we're in a frame, try to break out
      window.top.location.href = window.location.href;
    } catch (e) {
      // If we can't access the parent (different origin), we're likely being framed
      console.warn('Attempted frame embedding detected');
    }
  }
};

/**
 * Apply HTTPS enforcement
 * Note: Strict-Transport-Security can only be set server-side via HTTP headers
 * This function provides a client-side fallback to redirect HTTP to HTTPS
 */
export const applyStrictTransportSecurity = () => {
  if (!securityConfig.enableStrictTransportSecurity) return;
  
  // Redirect to HTTPS if currently on HTTP
  if (window.location.protocol === 'http:' && !window.location.hostname.includes('localhost')) {
    const httpsUrl = 'https:' + window.location.href.substring(window.location.protocol.length);
    window.location.replace(httpsUrl);
  }
  
  // Add a comment in the HTML to remind developers this should be set server-side
  const comment = document.createComment(
    ' HSTS should be set server-side via Strict-Transport-Security header with value: max-age=31536000; includeSubDomains '
  );
  document.head.appendChild(comment);
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The user input to sanitize
 * @returns {string} The sanitized input
 */
export const sanitizeInput = (input) => {
  if (!securityConfig.sanitizeInputs) return input;
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Prevent clickjacking by ensuring top frame is same origin
 */
export const preventClickjacking = () => {
  if (!securityConfig.preventClickjacking) return;
  
  if (window !== window.top) {
    // Page is in an iframe
    try {
      // Try to access location of parent frame to check if same origin
      window.top.location.hostname;
    } catch (e) {
      // If error, then different origin, block rendering
      document.body.innerHTML = 'This page cannot be displayed in a frame.';
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
      document.body.style.padding = '20px';
      document.body.style.textAlign = 'center';
      document.body.style.fontFamily = 'sans-serif';
    }
  }
};

/**
 * Apply all security enhancements
 * Note: Many security headers are already set server-side in server.js
 * This function focuses on client-side security enhancements
 */
export const applySecurityEnhancements = () => {
  // Since we have server.js setting headers correctly,
  // only use client-side CSP for development mode or as fallback
  if (process.env.NODE_ENV === 'development' || !window.location.hostname.includes('localhost')) {
    // Only apply CSP client-side in development or when not served by our server
    applyCSP();
  }
  
  // Apply referrer policy (this works fine as a meta tag)
  applyReferrerPolicy();
  
  // Skip client-side header emulation since they are properly set in server.js
  // This prevents browser console warnings
  // applyXXSSProtection();
  // applyFrameProtection();
  // applyStrictTransportSecurity();
  
  // Apply runtime protections (these are still valuable)
  preventClickjacking();
  
  // Add event listeners to sanitize form inputs
  if (securityConfig.sanitizeInputs) {
    document.querySelectorAll('input, textarea').forEach(element => {
      element.addEventListener('change', (event) => {
        event.target.value = sanitizeInput(event.target.value);
      });
    });
  }
  
  // Set secure attributes for external links
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
  
  // Add comment explaining server-side headers
  if (process.env.NODE_ENV === 'development') {
    const comment = document.createComment(
      ' Security headers (X-Frame-Options, Strict-Transport-Security, X-XSS-Protection) ' +
      'are properly set server-side in server.js using Helmet middleware '
    );
    document.head.appendChild(comment);
  }
};

export default {
  securityConfig,
  applyCSP,
  applyReferrerPolicy,
  applyXXSSProtection,
  applyFrameProtection,
  applyStrictTransportSecurity,
  sanitizeInput,
  preventClickjacking,
  applySecurityEnhancements
};
