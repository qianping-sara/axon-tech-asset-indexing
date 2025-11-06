'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import SearchResults from '@/components/search/SearchResults';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const assetType = searchParams.get('assetType') || '';
  const status = searchParams.get('status') || '';
  const bizDomain = searchParams.get('bizDomain') || '';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchResults
        initialQuery={query}
        initialCategory={category}
        initialAssetType={assetType}
        initialStatus={status}
        initialBizDomain={bizDomain}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

