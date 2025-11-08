'use client';

import React from 'react';
import { Utility } from '@/lib/types/utility';
import UtilityCard from './UtilityCard';

interface UtilityGridProps {
  utilities: Utility[];
  isLoading?: boolean;
}

export default function UtilityGrid({ utilities, isLoading = false }: UtilityGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-6 h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (utilities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-base">No utilities found</p>
      </div>
    );
  }

  // Group utilities by category
  const groupedByCategory = utilities.reduce(
    (acc, utility) => {
      if (!acc[utility.category]) {
        acc[utility.category] = [];
      }
      acc[utility.category].push(utility);
      return acc;
    },
    {} as Record<string, Utility[]>
  );

  return (
    <div className="space-y-12">
      {Object.entries(groupedByCategory).map(([category, categoryUtilities]) => (
        <div key={category}>
          {/* Category Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 capitalize">
            {category.replace('-', ' ')} Tools
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryUtilities.map((utility) => (
              <UtilityCard key={utility.id} utility={utility} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

