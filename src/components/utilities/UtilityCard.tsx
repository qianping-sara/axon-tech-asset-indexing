'use client';

import React from 'react';
import Link from 'next/link';
import { Utility } from '@/lib/types/utility';
import { getUtilityIconComponent } from '@/lib/constants/utilityIcons';

interface UtilityCardProps {
  utility: Utility;
}

// Map utility names to their tool URLs
const getToolUrl = (name: string): string => {
  if (name === 'Business Case and Strategic Alignment') {
    return '/utilities/business-case';
  }
  if (name === 'Sourcing Model Analysis') {
    return '/utilities/sourcing-model';
  }
  // Default fallback
  return '/utilities';
};

export default function UtilityCard({ utility }: UtilityCardProps) {
  const toolUrl = getToolUrl(utility.name);

  return (
    <Link
      href={toolUrl}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col"
    >
      {/* Icon */}
      <div className="mb-4 flex-shrink-0">
        {getUtilityIconComponent(utility.icon)}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
        {utility.name}
      </h3>

      {/* Category Badge */}
      <div className="mb-3 flex-shrink-0">
        <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          {utility.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
        {utility.description}
      </p>

      {/* Open Tool Button */}
      <div className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:gap-3 transition-all">
        <span>Open</span>
        <span>→</span>
      </div>
    </Link>
  );
}

