'use client';

import { useMemo } from 'react';
import { ASSET_TYPES_BY_CATEGORY } from '@/lib/constants/categories';

interface AssetTypeFilterProps {
  selectedCategory?: string;
  selectedAssetTypes: string[];
  onChange: (assetTypes: string[]) => void;
}

export default function AssetTypeFilter({
  selectedCategory,
  selectedAssetTypes,
  onChange,
}: AssetTypeFilterProps) {
  const availableAssetTypes = useMemo(() => {
    if (!selectedCategory) return [];
    return ASSET_TYPES_BY_CATEGORY[selectedCategory] || [];
  }, [selectedCategory]);

  const handleToggle = (assetType: string) => {
    if (selectedAssetTypes.includes(assetType)) {
      onChange(selectedAssetTypes.filter((t) => t !== assetType));
    } else {
      onChange([...selectedAssetTypes, assetType]);
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  if (!selectedCategory || availableAssetTypes.length === 0) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-500">
          Select a category to filter by asset type
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Asset Type</h3>
        {selectedAssetTypes.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {availableAssetTypes.map((assetType) => (
          <label
            key={assetType}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={selectedAssetTypes.includes(assetType)}
              onChange={() => handleToggle(assetType)}
              className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">{assetType}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

