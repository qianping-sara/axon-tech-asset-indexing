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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title and Description */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Browse
            </h2>
            <p className="text-gray-600">
              Explore automation assets
            </p>
          </div>

          {/* Tab Navigation */}
          <BrowseTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content based on active tab */}
          {activeTab === 'bizDomain' ? (
            <BizDomainGrid />
          ) : (
            <CategoryGrid showTitle={false} showSection={false} />
          )}
        </div>
      </section>

      {/* Recently Updated Assets */}
      <RecentlyUpdatedAssets />
    </div>
  );
}

