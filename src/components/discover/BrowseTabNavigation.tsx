'use client';

interface BrowseTabNavigationProps {
  activeTab: 'bizDomain' | 'category';
  onTabChange: (tab: 'bizDomain' | 'category') => void;
}

export default function BrowseTabNavigation({ activeTab, onTabChange }: BrowseTabNavigationProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200 mb-8">
      <button
        onClick={() => onTabChange('bizDomain')}
        className={`pb-3 font-semibold transition-colors ${
          activeTab === 'bizDomain'
            ? 'text-gray-900 border-b-2 border-green-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Business Domain
      </button>
      <button
        onClick={() => onTabChange('category')}
        className={`pb-3 font-semibold transition-colors ${
          activeTab === 'category'
            ? 'text-gray-900 border-b-2 border-green-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Category
      </button>
    </div>
  );
}

