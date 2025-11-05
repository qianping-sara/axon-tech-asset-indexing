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
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  SERVICES_APIS: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  AI_ML_SERVICES: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  ),
  AUTOMATION_WORKFLOWS: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  DATA_ANALYTICS: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ARCHITECTURE_GOVERNANCE: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  KNOWLEDGE_PRACTICES: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
    </svg>
  ),
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${encodeURIComponent(category.name)}`}>
      <div className="p-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer border-b border-r border-gray-200 last:border-b-0 last:border-r-0 odd:border-r-0 lg:odd:border-r">
        {/* Header with Icon and Count */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              {categoryIcons[category.name] || (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                {category.displayName}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1">
                {category.description}
              </p>
            </div>
          </div>
          {category.assetCount !== undefined && (
            <span className="ml-2 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full flex-shrink-0">
              {category.assetCount}
            </span>
          )}
        </div>

        {/* Asset Types */}
        <div className="flex flex-wrap gap-1">
          {category.assetTypes.map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

