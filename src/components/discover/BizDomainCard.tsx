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
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">{domain.displayName}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{domain.description}</p>
          </div>
          <div className="flex-shrink-0 text-gray-700">
            {getBizDomainIconWithColor(domain.icon, 'text-gray-700')}
          </div>
        </div>

        {/* Footer - Asset Count */}
        <div className="text-xs font-medium text-gray-600">
          {assetCount} {assetCount === 1 ? 'asset' : 'assets'}
        </div>
      </div>
    </Link>
  );
}

