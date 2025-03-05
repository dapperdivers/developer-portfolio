import { create } from '@storybook/theming/create';

// Export a theme object with sensible defaults that works with our CSS variables
export default create({
  base: 'light',
  
  // Typography
  fontBase: 'var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  fontCode: 'var(--font-family-mono, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
  
  // Colors
  colorPrimary: 'var(--color-primary, #007bff)',
  colorSecondary: 'var(--color-secondary, #6c757d)',
  
  // UI
  appBg: 'var(--color-background, #ffffff)',
  appContentBg: 'var(--color-background, #ffffff)',
  appBorderColor: 'var(--color-border, #e9ecef)',
  appBorderRadius: 4,
  
  // Text colors
  textColor: 'var(--color-text, #212529)',
  textInverseColor: 'var(--color-white, #ffffff)',
  textMutedColor: 'var(--color-text-muted, #6c757d)',
  
  // Brand
  brandTitle: 'Developer Portfolio Design System',
  brandUrl: './',
});
