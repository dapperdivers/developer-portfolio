/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Colors from design system
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
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
    },
  },
  plugins: [],
}
