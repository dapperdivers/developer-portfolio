/**
 * Global test setup for Vitest (jsdom)
 * - Extends jest-dom matchers
 * - Polyfills commonly-missing browser APIs in jsdom
 * - Stubs canvas context used by decoration components
 */
import '@testing-library/jest-dom';

// matchMedia polyfill used by components checking media queries
// Always provide a robust polyfill to handle cases where matchMedia exists but is not properly implemented
window.matchMedia = (query: string) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  } as unknown as MediaQueryList;
};

// ResizeObserver polyfill (noop) in case components rely on it
if (!('ResizeObserver' in window)) {
  // @ts-expect-error polyfill
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// IntersectionObserver polyfill (noop)
if (!('IntersectionObserver' in window)) {
  // @ts-expect-error polyfill
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = '';
    thresholds = [];
  };
}

// Canvas getContext stub for jsdom
if (typeof HTMLCanvasElement !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const original = (HTMLCanvasElement.prototype as any).getContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (HTMLCanvasElement.prototype as any).getContext = function getContext(type: string) {
    if (type === '2d') {
      // minimal 2D context stub sufficient for render lifecycle
      return {
        canvas: this,
        // no-op methods frequently used
        fillRect: () => {},
        clearRect: () => {},
        getImageData: () => ({ data: [] }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        resetTransform: () => {},
        // extras used by components
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} }),
        createPattern: () => ({}),
        quadraticCurveTo: () => {},
        bezierCurveTo: () => {},
        clip: () => {},
        rect: () => {},
        strokeRect: () => {},
        strokeText: () => {},
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10,
        setLineDash: () => {},
        getLineDash: () => [],
        globalAlpha: 1,
        globalCompositeOperation: 'source-over',
        shadowBlur: 0,
        shadowColor: '#000000',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      };
    }
    return original ? original.apply(this, arguments as unknown as IArguments) : null;
  };
}