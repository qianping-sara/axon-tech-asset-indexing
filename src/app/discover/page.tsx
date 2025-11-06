'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import SearchBlock from '@/components/search/SearchBlock';
import CategoryGrid from '@/components/home/CategoryGrid';
import BrowseTabNavigation from '@/components/discover/BrowseTabNavigation';
import BizDomainGrid from '@/components/discover/BizDomainGrid';
import RecentlyUpdatedAssets from '@/components/discover/RecentlyUpdatedAssets';

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'bizDomain' | 'category'>('bizDomain');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Search Block */}
      <SearchBlock />

      {/* Browse Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Navigation */}
          <BrowseTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content based on active tab */}
          <div className="mt-6">
            {activeTab === 'bizDomain' ? (
              <BizDomainGrid />
            ) : (
              <CategoryGrid showTitle={false} showSection={false} />
            )}
          </div>
        </div>
      </section>

      {/* Recently Updated Assets */}
      <RecentlyUpdatedAssets />
    </div>
  );
}

