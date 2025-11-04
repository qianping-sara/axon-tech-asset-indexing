'use client';

import { useState, useEffect } from 'react';
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
  updatedAt: Date | string;
  tags?: Array<{ id: string; name: string }>;
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

  // Fetch assets when filters change
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (initialQuery) params.append('search', initialQuery);
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
  }, [initialQuery, category, assetTypes, status, page]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setAssetTypes([]); // Reset asset types when category changes
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Search Summary */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
        {initialQuery && (
          <p className="text-gray-600">
            Results for &quot;<span className="font-semibold">{initialQuery}</span>&quot;
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
              <div className="mb-4 text-sm text-gray-600">
                Found {assets.length} asset{assets.length !== 1 ? 's' : ''}
              </div>
              <div className="space-y-4 mb-8">
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
  );
}

