/**
 * Accessibility utility functions for enhancing component accessibility.
 * These utilities help ensure WCAG compliance and better screen reader support.
 */

/**
 * Generates appropriate ARIA attributes for interactive elements based on their state
 * 
 * @param {Object} props - Properties for the interactive element
 * @param {boolean} [props.isDisabled] - Whether the element is disabled
 * @param {boolean} [props.isExpanded] - Whether the element is expanded (for dropdowns, accordions)
 * @param {boolean} [props.isSelected] - Whether the element is selected (for tabs, options)
 * @param {boolean} [props.hasPopup] - Whether the element triggers a popup
 * @param {string} [props.controls] - ID of the element this element controls
 * @param {string} [props.describedBy] - ID of element that describes this element
 * @param {string} [props.labelledBy] - ID of element that labels this element
 * @param {boolean} [props.isCurrent] - Whether this element represents the current page/step
 * @returns {Object} ARIA attributes object that can be spread onto an element
 * 
 * @example
 * import { getAriaAttributes } from '@utils/accessibilityUtils';
 * 
 * function MyButton({ isDisabled, controls }) {
 *   const ariaAttrs = getAriaAttributes({ isDisabled, controls });
 *   
 *   return (
 *     <button 
 *       disabled={isDisabled}
 *       {...ariaAttrs}
 *     >
 *       Click Me
 *     </button>
 *   );
 * }
 */
export function getAriaAttributes({
  isDisabled,
  isExpanded,
  isSelected,
  hasPopup,
  controls,
  describedBy,
  labelledBy,
  isCurrent,
  role
}) {
  const attributes = {};
  
  // Add attributes only if they're defined (to avoid null/undefined values)
  if (isDisabled !== undefined) attributes['aria-disabled'] = isDisabled;
  if (isExpanded !== undefined) attributes['aria-expanded'] = isExpanded;
  if (isSelected !== undefined) attributes['aria-selected'] = isSelected;
  if (hasPopup !== undefined) attributes['aria-haspopup'] = hasPopup;
  if (controls) attributes['aria-controls'] = controls;
  if (describedBy) attributes['aria-describedby'] = describedBy;
  if (labelledBy) attributes['aria-labelledby'] = labelledBy;
  if (isCurrent) attributes['aria-current'] = isCurrent === true ? 'page' : isCurrent;
  if (role) attributes.role = role;
  
  return attributes;
}

/**
 * Creates an ID that can be used for ARIA relationships
 * Uses a prefix and suffix to ensure uniqueness
 * 
 * @param {string} prefix - Prefix for the ID
 * @param {string|number} suffix - Unique suffix (e.g., item index or name)
 * @returns {string} Unique ID for ARIA relationships
 * 
 * @example
 * import { createAriaId } from '@utils/accessibilityUtils';
 * 
 * function MyComponent({ items }) {
 *   return (
 *     <div>
 *       {items.map((item, index) => (
 *         <div 
 *           key={index}
 *           id={createAriaId('item', index)}
 *           aria-labelledby={createAriaId('label', index)}
 *         >
 *           {item.content}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */
export function createAriaId(prefix, suffix) {
  return `${prefix}-${suffix}`;
}

/**
 * Adds keyboard event handlers for improved accessibility
 * Supports enter and space key handling for custom interactive elements
 * 
 * @param {Function} onAction - Function to call when the element is activated
 * @returns {Object} Object with event handlers
 * 
 * @example
 * import { getKeyboardHandlers } from '@utils/accessibilityUtils';
 * 
 * function CustomButton({ onClick, children }) {
 *   const keyboardHandlers = getKeyboardHandlers(onClick);
 *   
 *   return (
 *     <div 
 *       role="button"
 *       tabIndex={0}
 *       onClick={onClick}
 *       {...keyboardHandlers}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 */
export function getKeyboardHandlers(onAction) {
  return {
    onKeyDown: (e) => {
      // Trigger the action when Enter or Space is pressed
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Prevent scroll on space
        onAction(e);
      }
    }
  };
}

/**
 * Creates attributes for screen reader only text
 * Used to add additional context for screen readers without visual impact
 * 
 * @returns {Object} Object with style properties for screen reader only text
 * 
 * @example
 * import { srOnlyStyle } from '@utils/accessibilityUtils';
 * 
 * function IconButton({ icon, label }) {
 *   return (
 *     <button aria-label={label}>
 *       {icon}
 *       <span style={srOnlyStyle()}>
 *         {label}
 *       </span>
 *     </button>
 *   );
 * }
 */
export function srOnlyStyle() {
  return {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0'
  };
}

/**
 * Returns CSS styles for a skip link that allows keyboard users
 * to bypass navigation and jump to main content
 * 
 * @returns {Object} Skip link styles object
 * 
 * @example
 * import { skipLinkStyles } from '@utils/accessibilityUtils';
 * 
 * function App() {
 *   return (
 *     <>
 *       <a href="#main-content" className="skip-link" style={skipLinkStyles()}>
 *         Skip to main content
 *       </a>
 *       <Header />
 *       <main id="main-content">
 *         Content here
 *       </main>
 *     </>
 *   );
 * }
 */
export function skipLinkStyles() {
  return {
    position: 'absolute',
    top: '-40px',
    left: '0',
    background: 'var(--color-primary)',
    color: 'white',
    padding: '8px 16px',
    zIndex: '9999',
    transition: 'top 0.2s ease',
    borderRadius: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '16px',
    textDecoration: 'none',
    // Focus styles have to be applied via CSS instead
    // Use this class name in your CSS file:
    // .skip-link:focus { top: 0; }
  };
}

/**
 * Checks if the current color contrast meets WCAG standards
 * 
 * @param {string} foreground - Foreground color in hex format (#RRGGBB)
 * @param {string} background - Background color in hex format (#RRGGBB)
 * @param {string} [level='AA'] - WCAG level to check against ('A', 'AA', or 'AAA')
 * @param {boolean} [isLargeText=false] - Whether the text is considered large by WCAG standards
 * @returns {boolean} Whether the contrast ratio meets the specified WCAG level
 */
export function hasValidContrast(foreground, background, level = 'AA', isLargeText = false) {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  
  // Calculate relative luminance
  const calculateLuminance = (rgb) => {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  // Calculate contrast ratio
  const l1 = calculateLuminance(hexToRgb(foreground));
  const l2 = calculateLuminance(hexToRgb(background));
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  // WCAG 2.1 contrast requirements
  const requirements = {
    'A': { normal: 3, large: 3 },
    'AA': { normal: 4.5, large: 3 },
    'AAA': { normal: 7, large: 4.5 }
  };
  
  const requirement = requirements[level][isLargeText ? 'large' : 'normal'];
  return ratio >= requirement;
}
