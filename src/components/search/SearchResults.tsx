'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AssetCard from '@/components/assets/AssetCard';
import AssetTypeFilter from './AssetTypeFilter';
import { CATEGORIES } from '@/lib/constants/categories';

interface Asset {
  id: string;
  name: string;
  description: string;
  category: string;
  assetType: string;
  version: string;
  status: string;
  owner?: string;
  sourceLink?: string;
  updatedAt: Date | string;
  axon_asset_tag?: Array<{ id: string; name: string }>;
}

interface SearchResultsProps {
  initialQuery?: string;
  initialCategory?: string;
  initialAssetType?: string;
  initialStatus?: string;
}

export default function SearchResults({
  initialQuery = '',
  initialCategory = '',
  initialAssetType = '',
  initialStatus = '',
}: SearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [assetTypes, setAssetTypes] = useState<string[]>(
    initialAssetType ? [initialAssetType] : []
  );
  const [status, setStatus] = useState(initialStatus);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch assets when filters change (only if query is not empty)
  useEffect(() => {
    // Don't fetch if query is empty
    if (!query) {
      setAssets([]);
      setTotalCount(0);
      setTotalPages(1);
      return;
    }

    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (query) params.append('search', query);
        if (category) params.append('category', category);
        if (assetTypes.length > 0) {
          assetTypes.forEach((t) => params.append('assetType', t));
        }
        if (status) params.append('status', status);
        params.append('page', page.toString());
        params.append('limit', '20');

        const response = await fetch(`/api/assets?${params}`);
        const data = await response.json();

        if (data.success) {
          setAssets(data.data || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || 0);
        } else {
          setError('Failed to load assets');
        }
      } catch (err) {
        setError('Failed to load assets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [query, category, assetTypes, status, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    // Update URL with new search query
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (assetTypes.length > 0) {
      assetTypes.forEach((t) => params.append('assetType', t));
    }
    if (status) params.append('status', status);
    router.push(`/search?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setQuery('');
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setAssetTypes([]); // Reset asset types when category changes
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for APIs, processes, bots, or knowledge..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              Search
            </button>
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          {query ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Search results for &quot;{query}&quot;
              </h1>
              <p className="text-gray-600">
                Found {totalCount} asset{totalCount !== 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Enter a search term above to find assets
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Category Filter */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* Asset Type Filter */}
          <AssetTypeFilter
            selectedCategory={category}
            selectedAssetTypes={assetTypes}
            onChange={(types) => {
              setAssetTypes(types);
              setPage(1);
            }}
          />

          {/* Status Filter */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="DEPRECATED">Deprecated</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Right Content - Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">Loading assets...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">No assets found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {assets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

