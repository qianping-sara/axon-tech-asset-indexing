'use client';

import React from 'react';
import { UtilityCategory } from '@/lib/types/utility';

interface UtilityCategoryFilterProps {
  categories: UtilityCategory[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function UtilityCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: UtilityCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* All button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
          selectedCategory === null
            ? 'bg-green-700 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all capitalize ${
            selectedCategory === category.id
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

