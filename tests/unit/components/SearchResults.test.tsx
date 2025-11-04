import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from '@/components/search/SearchResults';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

// Mock fetch
global.fetch = jest.fn();

describe('SearchResults Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAssets = [
    {
      id: 'asset-1',
      name: 'React Library',
      description: 'A React library',
      category: 'CODE_COMPONENTS',
      assetType: 'Frontend Components',
      version: '1.0.0',
      status: 'PUBLISHED',
      updatedAt: new Date(),
      tags: [],
    },
  ];

  it('renders search results container', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery="test"
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  it('displays search query in results', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery="React"
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Results for/)).toBeInTheDocument();
    });
  });

  it('renders status filter', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery=""
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders asset cards', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery=""
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    await waitFor(() => {
      expect(screen.getByText('React Library')).toBeInTheDocument();
    });
  });

  it('renders category filter', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery=""
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('calls fetch API on mount', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery=""
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/assets')
      );
    });
  });

  it('shows no results message when empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasMore: false },
      }),
    });

    render(
      <SearchResults
        initialQuery="nonexistent"
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/No assets found/)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <SearchResults
        initialQuery=""
        initialCategory=""
        initialAssetType=""
        initialStatus=""
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
    });
  });
});

