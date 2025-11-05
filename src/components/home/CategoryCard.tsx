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

// Minimalist SVG icons for categories
const categoryIcons: Record<string, React.ReactNode> = {
  CODE_COMPONENTS: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  SERVICES_APIS: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  AUTOMATION_WORKFLOWS: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  DATA_ANALYTICS: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ARCHITECTURE_GOVERNANCE: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  KNOWLEDGE_PRACTICES: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
    </svg>
  ),
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${encodeURIComponent(category.name)}`}>
      <div className="h-full p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer">
        {/* Icon and Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-shrink-0">
            {categoryIcons[category.name] || (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            )}
          </div>
          {category.assetCount !== undefined && (
            <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              {category.assetCount}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {category.displayName}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {category.description}
        </p>

        {/* Asset Types - Show all */}
        <div className="flex flex-wrap gap-2">
          {category.assetTypes.map((type) => (
            <span
              key={type}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

