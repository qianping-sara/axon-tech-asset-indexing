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
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-full">
        {/* Top: Icon, Title, Description, and Count */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Left: Icon */}
          <div className="flex-shrink-0">
            {getBizDomainIconWithColor(domain.icon, 'text-green-700')}
          </div>

          {/* Middle: Title and Description */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm">{domain.displayName}</h3>
            <p className="text-xs text-gray-600 line-clamp-3 mt-1">{domain.description}</p>
          </div>

          {/* Right: Asset Count */}
          <div className="flex-shrink-0 ml-2">
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
              {assetCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

