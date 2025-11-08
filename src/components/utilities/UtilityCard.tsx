'use client';

import React from 'react';
import { Utility } from '@/lib/types/utility';
import { getUtilityIconComponent } from '@/lib/constants/utilityIcons';

interface UtilityCardProps {
  utility: Utility;
}

export default function UtilityCard({ utility }: UtilityCardProps) {
  return (
    <a
      href={utility.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-green-300 transition-all duration-200 h-full flex flex-col"
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
        <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
          {utility.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
        {utility.description}
      </p>

      {/* Open Tool Button */}
      <div className="flex items-center gap-2 text-green-700 font-medium text-sm hover:gap-3 transition-all">
        <span>Open Tool</span>
        <span>→</span>
      </div>
    </a>
  );
}

