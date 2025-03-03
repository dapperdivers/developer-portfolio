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
  
  // Define CSP directives
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://api.github.com",
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
 * Apply X-XSS-Protection header equivalent
 * Enables the browser's built-in XSS filter
 */
export const applyXXSSProtection = () => {
  if (!securityConfig.enableXXSSProtection) return;
  
  const meta = document.createElement('meta');
  meta.httpEquiv = 'X-XSS-Protection';
  meta.content = '1; mode=block';
  document.head.appendChild(meta);
};

/**
 * Apply frame protection (X-Frame-Options equivalent)
 * Prevents the page from being displayed in an iframe
 */
export const applyFrameProtection = () => {
  if (!securityConfig.enableFrameProtection) return;
  
  const meta = document.createElement('meta');
  meta.httpEquiv = 'X-Frame-Options';
  meta.content = 'DENY';
  document.head.appendChild(meta);
};

/**
 * Apply Strict-Transport-Security header equivalent
 * Enforces the use of HTTPS
 */
export const applyStrictTransportSecurity = () => {
  if (!securityConfig.enableStrictTransportSecurity) return;
  
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Strict-Transport-Security';
  meta.content = 'max-age=31536000; includeSubDomains';
  document.head.appendChild(meta);
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
 */
export const applySecurityEnhancements = () => {
  // Apply security headers via meta tags
  applyCSP();
  applyReferrerPolicy();
  applyXXSSProtection();
  applyFrameProtection();
  applyStrictTransportSecurity();
  
  // Apply runtime protections
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
