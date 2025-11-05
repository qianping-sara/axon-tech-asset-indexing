'use client';

import Link from 'next/link';
import { format } from 'date-fns';

interface Tag {
  id: string;
  name: string;
}

interface AssetCardProps {
  asset: {
    id: string;
    name: string;
    description: string;
    category: string;
    assetType: string;
    version: string;
    status: string;
    owner?: string;
    updatedAt: Date | string;
    axon_asset_tag?: Tag[];
  };
}

export default function AssetCard({ asset }: AssetCardProps) {
  const updatedDate = new Date(asset.updatedAt);
  const formattedDate = format(updatedDate, 'MMM d, yyyy');

  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="h-full p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all cursor-pointer flex flex-col">
        {/* Header with Title and Icons */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-gray-800 flex-1 line-clamp-2">
            {asset.name}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <a
              href={`/assets/${asset.id}`}
              className="text-gray-500 hover:text-gray-700"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Category and Asset Type Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-green-700 text-white">
            {asset.category}
          </span>
          <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-orange-500 text-white">
            {asset.assetType}
          </span>
          <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-white border border-gray-300 text-gray-700">
            {asset.version}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2 flex-grow">
          {asset.description}
        </p>

        {/* Tags */}
        {asset.axon_asset_tag && asset.axon_asset_tag.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {asset.axon_asset_tag.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tag.name}
              </span>
            ))}
            {asset.axon_asset_tag.length > 3 && (
              <span className="px-2 py-0.5 text-gray-600 text-xs">
                +{asset.axon_asset_tag.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer with Owner, Source and Status */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {asset.owner && (
              <span>{asset.owner}</span>
            )}
            <span>Status: {asset.status}</span>
          </div>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

