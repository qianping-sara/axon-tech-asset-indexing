'use client';

import Link from 'next/link';
import { getBizDomainIconWithColor } from '@/lib/constants/bizDomainIcons';
import { BizDomainInfo } from '@/lib/constants/bizDomains';

interface BizDomainCardProps {
  domain: BizDomainInfo;
  assetCount: number;
}

export default function BizDomainCard({ domain, assetCount }: BizDomainCardProps) {
  return (
    <Link href={`/search?bizDomain=${domain.name}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start justify-between h-full">
        {/* Left: Icon */}
        <div className="flex-shrink-0 mr-3">
          {getBizDomainIconWithColor(domain.icon, 'text-green-700')}
        </div>

        {/* Middle: Title and Description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">{domain.displayName}</h3>
          <p className="text-xs text-gray-600 line-clamp-1 mt-1">{domain.description}</p>
        </div>

        {/* Right: Asset Count */}
        <div className="flex-shrink-0 ml-3">
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
            {assetCount}
          </span>
        </div>
      </div>
    </Link>
  );
}

