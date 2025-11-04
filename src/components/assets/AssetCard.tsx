'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

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
    tags?: Tag[];
  };
}

const statusColors: Record<string, { bg: string; text: string }> = {
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-700' },
  PUBLISHED: { bg: 'bg-green-100', text: 'text-green-700' },
  DEPRECATED: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  ARCHIVED: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export default function AssetCard({ asset }: AssetCardProps) {
  const statusColor = statusColors[asset.status] || statusColors.DRAFT;
  const updatedDate = new Date(asset.updatedAt);
  const timeAgo = formatDistanceToNow(updatedDate, {
    addSuffix: true,
    locale: zhCN,
  });

  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all cursor-pointer">
        {/* Header with Title and Status */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900 flex-1 line-clamp-2">
            {asset.name}
          </h3>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${statusColor.bg} ${statusColor.text}`}
          >
            {asset.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {asset.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
            {asset.category}
          </span>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
            {asset.assetType}
          </span>
          {asset.tags && asset.tags.length > 0 && (
            <>
              {asset.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag.name}
                </span>
              ))}
              {asset.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{asset.tags.length - 2}
                </span>
              )}
            </>
          )}
        </div>

        {/* Footer with Version and Updated Time */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>v{asset.version}</span>
          <span>Updated {timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}

