import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from '@/components/search/SearchResults';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/search',
}));

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
      axon_asset_tag: [],
    },
  ];

  it('renders search bar', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
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

    expect(screen.getByPlaceholderText(/Search for APIs/)).toBeInTheDocument();
  });

  it('displays search query in results', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
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
      expect(screen.getByText(/Search results for "React"/)).toBeInTheDocument();
    });
  });

  it('renders category filter', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
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

  it('renders asset cards when data is returned', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockAssets,
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
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
      expect(screen.getByText('React Library')).toBeInTheDocument();
    });
  });

  it('renders status filter', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
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

  it('shows no results message when empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
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

  it('renders search interface with all filters', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
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

    // Verify all filter sections are present
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Business Domain')).toBeInTheDocument();
  });
});

