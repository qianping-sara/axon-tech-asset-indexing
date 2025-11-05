'use client';

import Link from 'next/link';
import { Code2, Zap, TrendingUp, Workflow, Shield, BookMarked } from 'lucide-react';

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

// Lucide icons for categories
const categoryIcons: Record<string, React.ReactNode> = {
  CODE_COMPONENTS: <Code2 className="w-6 h-6 text-green-700" />,
  SERVICES_APIS: <Zap className="w-6 h-6 text-green-700" />,
  AI_ML_SERVICES: <TrendingUp className="w-6 h-6 text-green-700" />,
  AUTOMATION_WORKFLOWS: <Workflow className="w-6 h-6 text-green-700" />,
  DATA_ANALYTICS: <TrendingUp className="w-6 h-6 text-green-700" />,
  ARCHITECTURE_GOVERNANCE: <Shield className="w-6 h-6 text-green-700" />,
  KNOWLEDGE_PRACTICES: <BookMarked className="w-6 h-6 text-green-700" />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${encodeURIComponent(category.name)}`}>
      <div className="h-32 p-5 bg-white hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between rounded-lg">
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
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

