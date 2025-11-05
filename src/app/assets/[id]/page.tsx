'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import Header from '@/components/layout/Header';

interface Tag {
  id: string;
  name: string;
}

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
  sourceSystem?: string;
  contentPath?: string;
  createdAt: string;
  updatedAt: string;
  axon_asset_tag?: Tag[];
}

export default function AssetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const assetId = params.id as string;

  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/assets/${assetId}`);
        const data = await response.json();

        if (data.success && data.data) {
          setAsset(data.data);
        } else {
          setError('Asset not found');
        }
      } catch (err) {
        setError('Failed to load asset');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (assetId) {
      fetchAsset();
    }
  }, [assetId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading asset...</p>
        </div>
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500 mb-4">{error || 'Asset not found'}</p>
            <Link
              href="/search"
              className="text-green-700 hover:text-green-800 underline"
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const createdDate = new Date(asset.createdAt);
  const updatedDate = new Date(asset.updatedAt);
  const formattedCreatedDate = format(createdDate, 'MMM d, yyyy');
  const formattedUpdatedDate = format(updatedDate, 'MMM d, yyyy');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Asset Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{asset.name}</h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-700 text-white">
              {asset.category}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-orange-500 text-white">
              {asset.assetType}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-700">
              {asset.version}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              asset.status === 'PUBLISHED'
                ? 'bg-green-100 text-green-700'
                : asset.status === 'DRAFT'
                ? 'bg-yellow-100 text-yellow-700'
                : asset.status === 'DEPRECATED'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {asset.status}
            </span>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {asset.description}
              </p>
            </div>

            {/* Tags */}
            {asset.axon_asset_tag && asset.axon_asset_tag.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {asset.axon_asset_tag.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Details - Placeholder for markdown rendering */}
            {asset.contentPath && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                <p className="text-gray-500 text-sm">
                  Content rendering will be implemented here (contentPath: {asset.contentPath})
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Overview Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Overview</h3>

              {/* Owner */}
              {asset.owner && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Owner
                  </p>
                  <p className="text-gray-900">{asset.owner}</p>
                </div>
              )}

              {/* Source System */}
              {asset.sourceSystem && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Source System
                  </p>
                  <p className="text-gray-900">{asset.sourceSystem}</p>
                </div>
              )}

              {/* Source Link */}
              {asset.sourceLink && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Source Link
                  </p>
                  <a
                    href={asset.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800 break-all text-sm underline"
                  >
                    {asset.sourceLink}
                  </a>
                </div>
              )}

              {/* Created Date */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Created
                </p>
                <p className="text-gray-900">{formattedCreatedDate}</p>
              </div>

              {/* Updated Date */}
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Last Updated
                </p>
                <p className="text-gray-900">{formattedUpdatedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

