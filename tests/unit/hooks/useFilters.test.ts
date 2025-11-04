import { renderHook, act, waitFor } from '@testing-library/react';
import { useFilters } from '@/hooks/useFilters';

// Mock fetch
global.fetch = jest.fn();

describe('useFilters Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false,
        },
      }),
    });

    const { result } = renderHook(() => useFilters());

    expect(result.current.filters).toEqual({
      search: undefined,
      category: undefined,
      assetType: undefined,
      status: undefined,
      tags: [],
    });
    expect(result.current.page).toBe(1);

    await waitFor(() => {
      expect(result.current.results).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });

  it('should initialize with provided filters', () => {
    const initialFilters = {
      search: 'test',
      category: 'CODE_COMPONENTS',
      tags: ['React'],
    };

    const { result } = renderHook(() => useFilters(initialFilters));

    expect(result.current.filters.search).toBe('test');
    expect(result.current.filters.category).toBe('CODE_COMPONENTS');
    expect(result.current.filters.tags).toEqual(['React']);
  });

  it('should update filters', () => {
    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setFilters({ search: 'new search' });
    });

    expect(result.current.filters.search).toBe('new search');
  });

  it('should reset page to 1 when filters change', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false,
        },
      }),
    });

    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPage(5);
    });

    act(() => {
      result.current.setFilters({ search: 'new' });
    });

    expect(result.current.page).toBe(1);
  });

  it('should fetch assets on mount', async () => {
    const mockAssets = [
      {
        id: '1',
        name: 'React Library',
        description: 'A React library',
        category: 'CODE_COMPONENTS',
        assetType: 'Frontend Components',
        version: '1.0.0',
        status: 'PUBLISHED',
        updatedAt: '2024-01-15',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
          hasMore: false,
        },
      }),
    });

    const { result } = renderHook(() => useFilters());

    await waitFor(() => {
      expect(result.current.results).toEqual(mockAssets);
    });
  });

  it('should fetch assets with filters', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false,
        },
      }),
    });

    renderHook(() =>
      useFilters({
        search: 'test',
        category: 'CODE_COMPONENTS',
      })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain('search=test');
      expect(url).toContain('category=CODE_COMPONENTS');
    });
  });

  it('should handle pagination', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 2,
          limit: 20,
          total: 100,
          totalPages: 5,
          hasMore: true,
        },
      }),
    });

    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(result.current.page).toBe(2);
      expect(result.current.pagination.page).toBe(2);
      expect(result.current.pagination.hasMore).toBe(true);
    });
  });

  it('should handle fetch errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: false,
        error: 'Failed to load assets',
      }),
    });

    const { result } = renderHook(() => useFilters());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load assets');
      expect(result.current.results).toEqual([]);
    });
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useFilters());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load assets');
      expect(result.current.results).toEqual([]);
    });
  });

  it('should set loading state during fetch', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: async () => ({
                success: true,
                data: [],
                pagination: {
                  page: 1,
                  limit: 20,
                  total: 0,
                  totalPages: 0,
                  hasMore: false,
                },
              }),
            });
          }, 100);
        })
    );

    const { result } = renderHook(() => useFilters());

    // Initial loading should be true
    expect(result.current.loading).toBe(true);
  });

  it('should handle multiple filter updates', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false,
        },
      }),
    });

    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setFilters({ search: 'test' });
    });

    act(() => {
      result.current.setFilters({ category: 'CODE_COMPONENTS' });
    });

    act(() => {
      result.current.setFilters({ tags: ['React', 'TypeScript'] });
    });

    await waitFor(() => {
      expect(result.current.filters.search).toBe('test');
      expect(result.current.filters.category).toBe('CODE_COMPONENTS');
      expect(result.current.filters.tags).toEqual(['React', 'TypeScript']);
    });
  });

  it('should include tags in query parameters', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false,
        },
      }),
    });

    renderHook(() =>
      useFilters({
        tags: ['React', 'TypeScript'],
      })
    );

    await waitFor(() => {
      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain('tag=React');
      expect(url).toContain('tag=TypeScript');
    });
  });
});

