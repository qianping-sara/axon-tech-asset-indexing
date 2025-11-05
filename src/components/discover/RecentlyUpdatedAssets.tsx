'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

interface Asset {
  id: string;
  name: string;
  description: string;
  category: string;
  assetType: string;
  version: string;
  status: string;
  owner: string;
  updatedAt: string;
  axon_asset_tag: Array<{
    id: string;
    name: string;
  }>;
}

export default function RecentlyUpdatedAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/assets?limit=6&sortBy=updatedAt&sortOrder=desc');
        const data = await response.json();
        if (data.success && data.data) {
          setAssets(data.data);
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
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      CODE_COMPONENTS: 'bg-blue-50 text-blue-700',
      SERVICES_APIS: 'bg-green-50 text-green-700',
      AUTOMATION_WORKFLOWS: 'bg-purple-50 text-purple-700',
      DATA_ANALYTICS: 'bg-orange-50 text-orange-700',
      ARCHITECTURE_GOVERNANCE: 'bg-red-50 text-red-700',
      KNOWLEDGE_PRACTICES: 'bg-indigo-50 text-indigo-700',
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      CODE_COMPONENTS: 'Code Component',
      SERVICES_APIS: 'Service/API',
      AUTOMATION_WORKFLOWS: 'Workflow',
      DATA_ANALYTICS: 'Analytics',
      ARCHITECTURE_GOVERNANCE: 'Architecture',
      KNOWLEDGE_PRACTICES: 'Knowledge',
    };
    return labels[category] || category;
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title and Description */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Recently Updated Assets
          </h2>
          <p className="text-gray-600">
            Discover the latest additions to the CoE catalog
          </p>
        </div>

        {/* Assets Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Loading assets...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">{error}</p>
          </div>
        ) : assets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <Link key={asset.id} href={`/search?q=${encodeURIComponent(asset.name)}`}>
                <div className="h-full p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                  {/* Header with Title and Category Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">
                      {asset.name}
                    </h3>
                    <a
                      href={`/search?q=${encodeURIComponent(asset.name)}`}
                      className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                      onClick={(e) => e.preventDefault()}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(asset.category)}`}>
                      {getCategoryLabel(asset.category)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {asset.description}
                  </p>

                  {/* Tags */}
                  {asset.axon_asset_tag && asset.axon_asset_tag.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {asset.axon_asset_tag.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {asset.axon_asset_tag.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{asset.axon_asset_tag.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer with Date and Type */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>Updated {format(new Date(asset.updatedAt), 'MMM d, yyyy')}</span>
                    <span className="text-gray-600 font-medium">{asset.assetType}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">No assets found</p>
          </div>
        )}
      </div>
    </section>
  );
}

