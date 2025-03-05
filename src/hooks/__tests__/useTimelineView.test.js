import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useTimelineView from '../useTimelineView';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Simulate entries becoming visible
  triggerEntries(isIntersecting) {
    const entries = Array.from(this.elements).map((element) => ({
      isIntersecting,
      target: element,
      boundingClientRect: {},
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {},
      rootBounds: null,
      time: Date.now(),
    }));
    this.callback(entries);
  }
}

// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Replace global IntersectionObserver with mock
global.IntersectionObserver = MockIntersectionObserver;

// Mock window.innerWidth for responsive tests
let windowWidth = 1200;
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: windowWidth,
});

describe('useTimelineView Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    windowWidth = 1200;
    window.innerWidth = windowWidth;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('initializes with default timeline view', () => {
    const { result } = renderHook(() => useTimelineView());
    expect(result.current.viewType).toBe('timeline');
  });

  it('initializes with specified view', () => {
    const { result } = renderHook(() => useTimelineView({ defaultView: 'grid' }));
    expect(result.current.viewType).toBe('grid');
  });

  it('toggles between timeline and grid views', () => {
    const { result } = renderHook(() => useTimelineView());
    expect(result.current.viewType).toBe('timeline');

    act(() => {
      result.current.toggleView();
    });
    expect(result.current.viewType).toBe('grid');

    act(() => {
      result.current.toggleView();
    });
    expect(result.current.viewType).toBe('timeline');
  });

  it('sets a specific view type', () => {
    const { result } = renderHook(() => useTimelineView());
    expect(result.current.viewType).toBe('timeline');

    act(() => {
      result.current.setView('grid');
    });
    expect(result.current.viewType).toBe('grid');

    // Invalid view type should be ignored
    act(() => {
      result.current.setView('invalid-view');
    });
    expect(result.current.viewType).toBe('grid');
  });

  it('returns animation delay based on index', () => {
    const { result } = renderHook(() => 
      useTimelineView({ animationDelayIncrement: 200 })
    );
    
    expect(result.current.getAnimationDelay(0)).toBe('0s');
    expect(result.current.getAnimationDelay(1)).toBe('0.2s');
    expect(result.current.getAnimationDelay(2)).toBe('0.4s');
  });

  it('creates ref callback function for timeline entries', () => {
    const { result } = renderHook(() => useTimelineView());
    const refCallback = result.current.entryRef(0);
    
    expect(typeof refCallback).toBe('function');
    
    // Test calling the ref callback
    const mockElement = document.createElement('div');
    refCallback(mockElement);
    
    // Internal entriesRef should now have the element
    expect(result.current.entriesRef.current[0]).toBe(mockElement);
  });

  it('extracts year from date strings', () => {
    const { result } = renderHook(() => useTimelineView());
    
    expect(result.current.extractDateYear('2022 - Present')).toBe('2022');
    expect(result.current.extractDateYear('January 2021 - December 2022')).toBe('2021');
    expect(result.current.extractDateYear('No year here')).toBe('');
  });

  it('switches to grid view on small screens', () => {
    // Set window width to small screen
    windowWidth = 800;
    window.innerWidth = windowWidth;
    
    const { result } = renderHook(() => useTimelineView());
    
    // Give time for the resize handler to run
    act(() => {
      jest.runAllTimers();
    });
    
    // Should automatically switch to grid layout
    expect(result.current.viewType).toBe('grid');
  });
});