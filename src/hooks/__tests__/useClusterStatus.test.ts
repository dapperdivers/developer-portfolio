import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useClusterStatus, { type ClusterStatusData } from '@hooks/useClusterStatus';

const fixture: ClusterStatusData = {
  updatedAt: '2026-11-20T12:00:00.000Z',
  badges: { cluster_pod_count: { title: 'Pods', value: '266', color: 'green' } },
};

const okResponse = (body: unknown = fixture) => ({ ok: true, json: async () => body }) as Response;

describe('useClusterStatus', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts loading, then reports ok with data', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const { result } = renderHook(() => useClusterStatus());
    expect(result.current).toEqual({ status: 'loading', data: null });
    await act(async () => {});
    expect(result.current).toEqual({ status: 'ok', data: fixture });
    expect(fetchMock.mock.calls[0][0]).toBe('/api/cluster-status');
  });

  it('reports error on a failed response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 503, json: async () => ({}) });
    const { result } = renderHook(() => useClusterStatus());
    await act(async () => {});
    expect(result.current).toEqual({ status: 'error', data: null });
  });

  it('reports error on a malformed body', async () => {
    fetchMock.mockResolvedValue(okResponse({ nope: true }));
    const { result } = renderHook(() => useClusterStatus());
    await act(async () => {});
    expect(result.current.status).toBe('error');
  });

  it('refreshes every 60 s while the tab is visible', async () => {
    fetchMock.mockResolvedValue(okResponse());
    renderHook(() => useClusterStatus());
    await act(async () => {});
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('skips the refresh while the tab is hidden', async () => {
    fetchMock.mockResolvedValue(okResponse());
    renderHook(() => useClusterStatus());
    await act(async () => {});
    const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    visibility.mockRestore();
  });

  it('keeps the last good data when a refresh fails', async () => {
    fetchMock.mockResolvedValueOnce(okResponse()).mockRejectedValue(new Error('offline'));
    const { result } = renderHook(() => useClusterStatus());
    await act(async () => {});
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    expect(result.current).toEqual({ status: 'ok', data: fixture });
  });

  it('stops polling on unmount', async () => {
    fetchMock.mockResolvedValue(okResponse());
    const { unmount } = renderHook(() => useClusterStatus());
    await act(async () => {});
    unmount();
    await vi.advanceTimersByTimeAsync(120_000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
