'use client';

import Link from 'next/link';

interface CategoryCardProps {
  category: {
    name: string;
    displayName: string;
    description: string;
    icon: string;
    assetTypes: string[];
    assetCount?: number;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const displayAssetTypes = category.assetTypes.slice(0, 3);
  const hasMore = category.assetTypes.length > 3;

  return (
    <Link href={`/search?category=${encodeURIComponent(category.name)}`}>
      <div className="h-full p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-green-300 transition-all cursor-pointer">
        {/* Icon and Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{category.icon}</div>
          {category.assetCount !== undefined && (
            <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              {category.assetCount}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {category.displayName}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {category.description}
        </p>

        {/* Asset Types */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">
            Asset Types
          </p>
          <div className="flex flex-wrap gap-2">
            {displayAssetTypes.map((type) => (
              <span
                key={type}
                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded"
              >
                {type}
              </span>
            ))}
            {hasMore && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{category.assetTypes.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

