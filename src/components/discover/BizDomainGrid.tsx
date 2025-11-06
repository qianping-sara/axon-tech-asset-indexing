'use client';

import { useEffect, useState } from 'react';
import BizDomainCard from './BizDomainCard';
import { BIZ_DOMAINS, BizDomainInfo } from '@/lib/constants/bizDomains';

interface BizDomainWithStats extends BizDomainInfo {
  assetCount: number;
}

export default function BizDomainGrid() {
  const [domains, setDomains] = useState<BizDomainWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/biz-domains?stats=true');
        const data = await response.json();
        if (data.success && data.data) {
          setDomains(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch biz domains:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  const coreDomains = domains.filter(d => d.category === 'core');
  const supportDomains = domains.filter(d => d.category === 'support');
  const commonDomains = domains.filter(d => d.category === 'common');

  return (
    <div className="space-y-8">
      {/* Core Domains */}
      {coreDomains.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Core Servicing Domains</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coreDomains.map(domain => (
              <div key={domain.name} className="h-32">
                <BizDomainCard domain={domain} assetCount={domain.assetCount} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Domains */}
      {supportDomains.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Support Domain Capabilities</h3>
          <div className="grid grid-cols-1 gap-4">
            {supportDomains.map(domain => (
              <div key={domain.name} className="h-24">
                <BizDomainCard domain={domain} assetCount={domain.assetCount} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Domains */}
      {commonDomains.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">General Domain Capabilities</h3>
          <div className="grid grid-cols-1 gap-4">
            {commonDomains.map(domain => (
              <div key={domain.name} className="h-40">
                <BizDomainCard domain={domain} assetCount={domain.assetCount} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

