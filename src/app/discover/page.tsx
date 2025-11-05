import Header from '@/components/layout/Header';
import SearchBlock from '@/components/search/SearchBlock';
import CategoryGrid from '@/components/home/CategoryGrid';
import RecentlyUpdatedAssets from '@/components/discover/RecentlyUpdatedAssets';

export const metadata = {
  title: 'Discover - Axon Asset Golden Index',
  description: 'Discover and explore automation assets, APIs, and processes',
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search Block */}
      <SearchBlock />

      {/* Browse by Category */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title and Description */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600">
              Explore automation assets organized by type
            </p>
          </div>

          {/* Categories Grid - Reuse from home without title and section */}
          <CategoryGrid showTitle={false} showSection={false} />
        </div>
      </section>

      {/* Recently Updated Assets */}
      <RecentlyUpdatedAssets />
    </div>
  );
}

