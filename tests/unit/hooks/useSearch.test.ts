import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';

// Mock fetch
global.fetch = jest.fn();

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update query state', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test query');
    });

    expect(result.current.query).toBe('test query');
  });

  it('should clear results when query is empty', async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    act(() => {
      result.current.setQuery('');
    });

    expect(result.current.results).toEqual([]);
  });

  it('should debounce search requests', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          {
            id: '1',
            name: 'React',
            description: 'A JavaScript library',
            type: 'tag',
          },
        ],
      }),
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('r');
    });

    act(() => {
      result.current.setQuery('re');
    });

    act(() => {
      result.current.setQuery('rea');
    });

    // Should only call fetch once after 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle successful search', async () => {
    const mockResults = [
      {
        id: '1',
        name: 'React',
        description: 'A JavaScript library',
        type: 'tag' as const,
      },
      {
        id: '2',
        name: 'Vue',
        description: 'Another JavaScript library',
        type: 'tag' as const,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockResults,
      }),
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('javascript');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.results).toEqual(mockResults);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle search errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: false,
        error: 'Search failed',
      }),
    });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Search failed');
      expect(result.current.results).toEqual([]);
    });
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Search failed');
      expect(result.current.results).toEqual([]);
    });
  });

  it('should set loading state during search', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: async () => ({
                success: true,
                data: [],
              }),
            });
          }, 100);
        })
    );

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery('test');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Loading should be true during fetch
    expect(result.current.loading).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should call search function directly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          {
            id: '1',
            name: 'Test Asset',
            description: 'A test asset',
            type: 'asset' as const,
          },
        ],
      }),
    });

    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.search('test');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Test Asset');
  });

  it('should encode search query in URL', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
      }),
    });

    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.search('test query with spaces');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('test%20query%20with%20spaces')
    );
  });
});

