/**
 * Packages that ship without type declarations.
 */
declare module 'smoothscroll-polyfill' {
  export function polyfill(): void;
}

// Untyped; only src/utils/propTypesFix.ts and not-yet-converted files use these.
declare module 'prop-types';
declare module 'prop-types-extra';
