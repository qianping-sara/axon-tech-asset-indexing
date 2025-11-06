'use client';

import Link from 'next/link';
import { getBizDomainIconWithColor } from '@/lib/constants/bizDomainIcons';
import { BizDomainInfo } from '@/lib/constants/bizDomains';

interface BizDomainCardProps {
  domain: BizDomainInfo;
  assetCount: number;
  descriptionLines?: number;
}

export default function BizDomainCard({ domain, assetCount, descriptionLines = 2 }: BizDomainCardProps) {
  const lineClampClass = `line-clamp-${descriptionLines}`;

  return (
    <Link href={`/search?bizDomain=${domain.name}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
        {/* Top Row: Icon, Title, and Asset Count */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            {/* Left: Icon */}
            <div className="flex-shrink-0 pt-0.5">
              {getBizDomainIconWithColor(domain.icon, 'text-green-700')}
            </div>
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm">{domain.displayName}</h3>
          </div>
          {/* Right: Asset Count */}
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full flex-shrink-0 whitespace-nowrap">
            {assetCount}
          </span>
        </div>

        {/* Description: Full Width */}
        <p className={`text-xs text-gray-600 ${lineClampClass}`}>{domain.description}</p>
      </div>
    </Link>
  );
}

