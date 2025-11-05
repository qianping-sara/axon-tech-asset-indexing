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
    updatedAt: Date | string;
    axon_asset_tag?: Tag[];
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  CODE_COMPONENTS: { bg: 'bg-blue-100', text: 'text-blue-700' },
  SERVICES_APIS: { bg: 'bg-purple-100', text: 'text-purple-700' },
  AUTOMATION_WORKFLOWS: { bg: 'bg-green-100', text: 'text-green-700' },
  DATA_ANALYTICS: { bg: 'bg-orange-100', text: 'text-orange-700' },
  ARCHITECTURE_GOVERNANCE: { bg: 'bg-red-100', text: 'text-red-700' },
  KNOWLEDGE_PRACTICES: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
};

const assetTypeColors: Record<string, { bg: string; text: string }> = {
  'REST APIs': { bg: 'bg-green-100', text: 'text-green-700' },
  'Process Model': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Banking API': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Servicing': { bg: 'bg-orange-100', text: 'text-orange-700' },
};

export default function AssetCard({ asset }: AssetCardProps) {
  const categoryColor = categoryColors[asset.category] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  const assetTypeColor = assetTypeColors[asset.assetType] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  const updatedDate = new Date(asset.updatedAt);
  const formattedDate = format(updatedDate, 'MMM d, yyyy');

  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="h-full p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all cursor-pointer flex flex-col">
        {/* Header with Title and Icons */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-bold text-gray-900 flex-1 line-clamp-2">
            {asset.name}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <a
              href={`/assets/${asset.id}`}
              className="text-gray-400 hover:text-gray-600"
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
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
            {asset.category}
          </span>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${assetTypeColor.bg} ${assetTypeColor.text}`}>
            {asset.assetType}
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {asset.version}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
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

        {/* Footer with Source and Status */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span>Source:</span>
            <span className="text-gray-600 font-medium">{asset.status}</span>
          </div>
          <span>Updated {formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

