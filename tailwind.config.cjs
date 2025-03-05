/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/assets/css/*.css",
  ],
  safelist: [
    // Add padding utilties
    'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-6',
    'py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-6', 'py-8', 'py-12', 'py-16', 'py-20',
    'pt-8', 'pt-16', 'pt-20', 'pt-28',
    'pb-0', 'pb-16', 'pb-48', 'pb-60',
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8', 'p-12',
    
    // Add margin utilities
    'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6', 'mt-8', 'mt-10',
    'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6', 'mb-8',
    'mr-1', 'mr-2', 'mr-3', 'mr-4',
    'ml-1', 'ml-2', 'ml-3', 'ml-4',
    
    // Add flexbox utilities
    'flex', 'flex-row', 'flex-col', 'items-center', 'justify-center', 'gap-1', 'gap-2', 'gap-3',
    
    // Add text and font utilities
    'text-white', 'text-base', 'text-sm', 'text-lg', 'text-xl', 'text-2xl',
    'font-bold', 'font-semibold', 'font-medium',
    
    // Add background colors
    'bg-white', 'bg-primary', 'bg-gray-100', 'bg-gray-200',
    
    // Add border and rounded utilities
    'rounded', 'rounded-lg', 'rounded-full', 'border', 'border-solid',
    
    // Add sizing utilities
    'w-full', 'h-full', 'min-h-80',
    
    // Add other common utilities
    'relative', 'absolute', 'overflow-hidden', 'transition-all', 'duration-200', 'shadow-sm',
  ],
  theme: {
    extend: {
      // Colors from design system
      colors: {
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        'light-200': 'var(--color-light-200)', 
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          '50': 'var(--color-primary-50)',
          '100': 'var(--color-primary-100)',
          '200': 'var(--color-primary-200)',
          '300': 'var(--color-primary-300)',
          '400': 'var(--color-primary-400)',
          '500': 'var(--color-primary)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-dark)',
          '800': 'var(--color-primary-800)',
          '900': 'var(--color-primary-900)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
        },
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        link: 'var(--color-link)',
        'link-hover': 'var(--color-link-hover)',
        border: 'var(--color-border)',
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        'background-muted': 'var(--color-background-muted)',
      },
      
      // Typography from design system
      fontFamily: {
        base: 'var(--font-family-base)',
        heading: 'var(--font-family-heading)',
        mono: 'var(--font-family-monospace)',
        sans: 'var(--font-family-base)',
      },
      fontSize: {
        'xs': 'var(--font-size-sm)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-h5)',
        '3xl': 'var(--font-size-h4)',
        '4xl': 'var(--font-size-h3)',
        '5xl': 'var(--font-size-h2)',
        '6xl': 'var(--font-size-h1)',
      },
      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        0: '0',
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-base)',
        loose: 'var(--line-height-loose)',
      },
      
      // Spacing from design system
      spacing: {
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        'section-y': 'var(--section-padding-y)',
        'container-x': 'var(--container-padding-x)',
        'card': 'var(--card-padding)',
        'button-x': 'var(--button-padding-x)',
        'button-y': 'var(--button-padding-y)',
      },
      
      // Border settings from design system
      borderWidth: {
        3: '3px',
        thin: 'var(--border-width-thin)',
        DEFAULT: 'var(--border-width-thin)',
        medium: 'var(--border-width-medium)',
        thick: 'var(--border-width-thick)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius)',
        md: 'var(--border-radius)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        full: 'var(--border-radius-circle)',
        pill: 'var(--border-radius-pill)',
      },
      
      // Box shadows from design system
      boxShadow: {
        sm: 'var(--box-shadow-sm)',
        DEFAULT: 'var(--box-shadow)',
        md: 'var(--box-shadow)',
        lg: 'var(--box-shadow-lg)',
        focus: 'var(--box-shadow-focus)',
        none: 'none',
      },
      
      // Transitions from design system
      transitionProperty: {
        DEFAULT: 'all',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '100ms',
        slow: '300ms',
        1500: '1500ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      
      // Breakpoints from design system
      screens: {
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
        lg: 'var(--breakpoint-lg)',
        xl: 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-xxl)',
      },
      
      // Z-index from design system
      zIndex: {
        negative: 'var(--z-index-negative)',
        0: 'var(--z-index-0)',
        dropdown: 'var(--z-index-dropdown)',
        sticky: 'var(--z-index-sticky)',
        fixed: 'var(--z-index-fixed)',
        'modal-backdrop': 'var(--z-index-modal-backdrop)',
        modal: 'var(--z-index-modal)',
        popover: 'var(--z-index-popover)',
        toast: 'var(--z-index-toast)',
      },
      
      // Custom animations
      keyframes: {
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 }
        },
        spin: {
          'to': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
        spin: 'spin 1s linear infinite'
      }
    },
  },
  plugins: [
    function({ addComponents, addUtilities }) {
      // Add custom components
      addComponents({
        '.p-card': {
          'padding': '1.5rem',
        },
        '.z-dropdown': {
          'z-index': '1000',
        },
        '.z-fixed': {
          'z-index': '1030',
        },
      })

      // Add base utilities for older Tailwind patterns
      addUtilities({
        '.px-1': { 'padding-left': '0.25rem', 'padding-right': '0.25rem' },
        '.px-2': { 'padding-left': '0.5rem', 'padding-right': '0.5rem' },
        '.px-3': { 'padding-left': '0.75rem', 'padding-right': '0.75rem' },
        '.px-4': { 'padding-left': '1rem', 'padding-right': '1rem' },
        '.px-5': { 'padding-left': '1.25rem', 'padding-right': '1.25rem' },
        '.px-6': { 'padding-left': '1.5rem', 'padding-right': '1.5rem' },
        '.py-1': { 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' },
        '.py-2': { 'padding-top': '0.5rem', 'padding-bottom': '0.5rem' },
        '.py-3': { 'padding-top': '0.75rem', 'padding-bottom': '0.75rem' },
        '.py-4': { 'padding-top': '1rem', 'padding-bottom': '1rem' },
        '.py-5': { 'padding-top': '1.25rem', 'padding-bottom': '1.25rem' },
        '.py-6': { 'padding-top': '1.5rem', 'padding-bottom': '1.5rem' },
        '.py-8': { 'padding-top': '2rem', 'padding-bottom': '2rem' },
        '.py-12': { 'padding-top': '3rem', 'padding-bottom': '3rem' },
        '.py-16': { 'padding-top': '4rem', 'padding-bottom': '4rem' },
        '.py-20': { 'padding-top': '5rem', 'padding-bottom': '5rem' },
        '.pt-8': { 'padding-top': '2rem' },
        '.pt-16': { 'padding-top': '4rem' },
        '.pt-20': { 'padding-top': '5rem' },
        '.pb-0': { 'padding-bottom': '0' },
        '.pb-16': { 'padding-bottom': '4rem' },
        '.pb-48': { 'padding-bottom': '12rem' },
        '.pb-60': { 'padding-bottom': '15rem' },
        '.pt-28': { 'padding-top': '7rem' },
        
        // Add opacity variant utilities
        '.bg-white\\/95': { 'background-color': 'rgba(255, 255, 255, 0.95)' },
        '.bg-white\\/20': { 'background-color': 'rgba(255, 255, 255, 0.2)' },
        '.bg-black\\/60': { 'background-color': 'rgba(0, 0, 0, 0.6)' },
        '.text-white\\/90': { 'color': 'rgba(255, 255, 255, 0.9)' },
        '.text-white\\/80': { 'color': 'rgba(255, 255, 255, 0.8)' },
        '.ring-primary\\/50': { '--tw-ring-color': 'rgba(var(--color-primary-rgb), 0.5)' },
        '.ring-opacity-50': { '--tw-ring-opacity': '0.5' },
        
        // Add min-height utilities
        '.min-h-80': { 'min-height': '20rem' },
        
        // Add border color with opacity variants
        '.border-primary\\/20': { 'border-color': 'rgba(var(--color-primary-rgb), 0.2)' },
        '.border-primary\\/50': { 'border-color': 'rgba(var(--color-primary-rgb), 0.5)' },
        '.border-white\\/95': { 'border-color': 'rgba(255, 255, 255, 0.95)' },
        '.border-white\\/50': { 'border-color': 'rgba(255, 255, 255, 0.5)' },
        
        // Add opacity utilities
        '.opacity-85': { 'opacity': '0.85' },
        '.opacity-70': { 'opacity': '0.7' },
        '.opacity-65': { 'opacity': '0.65' },
        
        // Add color opacity variants for button states
        '.bg-success\\/90': { 'background-color': 'rgba(var(--color-success-rgb), 0.9)' },
        '.border-success\\/90': { 'border-color': 'rgba(var(--color-success-rgb), 0.9)' },
        '.bg-danger\\/90': { 'background-color': 'rgba(var(--color-danger-rgb), 0.9)' },
        '.border-danger\\/90': { 'border-color': 'rgba(var(--color-danger-rgb), 0.9)' },
        '.bg-warning\\/90': { 'background-color': 'rgba(var(--color-warning-rgb), 0.9)' },
        '.border-warning\\/90': { 'border-color': 'rgba(var(--color-warning-rgb), 0.9)' },
        '.bg-info\\/90': { 'background-color': 'rgba(var(--color-info-rgb), 0.9)' },
        '.border-info\\/90': { 'border-color': 'rgba(var(--color-info-rgb), 0.9)' },
      });
    }
  ],
}
