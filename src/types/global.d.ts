/**
 * Non-standard globals the app reads or installs on `window`.
 * `__DEBUG_FLAGS` is declared in src/context/AnimationContext.tsx.
 */
export {};

/** One React Profiler commit, as recorded by the debug tools. */
export interface ProfilerRenderRecord {
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  timestamp: number;
}

declare global {
  interface Window {
    /** Google Analytics, present only when the tag is loaded. */
    gtag?: (...args: unknown[]) => void;
    /** Safari's prefixed AudioContext. */
    webkitAudioContext?: typeof AudioContext;
    /** Stub installed by browserFixes for Firefox extensions that call it. */
    checkPageContainsShadowDom?: () => boolean;
    /** object-fit fallback installed by browserFixes on Edge. */
    ObjectFitPolyfill?: { apply: () => void };
    /** Set by the passive-listener feature test. */
    supportPassiveEvents?: boolean;
    /** HTML-escaping helper installed by security.applyXXSSProtection. */
    encodeHTML?: (str: unknown) => string;
    /** Marker installed by the CSS-variable fallback. */
    cssVars?: () => void;
    /** Render log shared by the debug profiler components. */
    PERFORMANCE_DEBUG?: {
      renders: Record<string, ProfilerRenderRecord[]>;
      recordRender: (id: string, data: ProfilerRenderRecord) => void;
      clear: () => void;
    };
    /** Console helpers installed by RenderDebugTools while it is enabled. */
    debugUtils?: {
      profiler: object;
      toggleMonitoring: () => void;
      capturePerformance: () => void;
    };
    /** Set by RenderVisualizer for other debug components to read. */
    RENDER_VISUALIZATION_ENABLED?: boolean;
    /** Chrome DevTools extension API; only present inside DevTools pages. */
    chrome?: { devtools?: { executeScript: (options: { code: string }) => void } };
    /** Chrome DevTools console utility; not available to page scripts. */
    getEventListeners?: (target: EventTarget) => { length?: number };
    /** Installed by the React DevTools extension. */
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      onCommitFiberRoot: (...args: unknown[]) => unknown;
      onCommitFiberUnmount: (...args: unknown[]) => unknown;
    };
  }

  interface Performance {
    /** Chromium-only heap statistics. */
    memory?: { usedJSHeapSize: number };
  }
}
