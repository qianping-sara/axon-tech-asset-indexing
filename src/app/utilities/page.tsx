'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import UtilitySearch from '@/components/utilities/UtilitySearch';
import UtilityCategoryFilter from '@/components/utilities/UtilityCategoryFilter';
import UtilityGrid from '@/components/utilities/UtilityGrid';
import { Utility } from '@/lib/types/utility';
import { UTILITY_CATEGORIES } from '@/lib/constants/utilities';

function UtilitiesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [filteredUtilities, setFilteredUtilities] = useState<Utility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category') || null
  );

  // Fetch utilities on mount
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/utilities');
        const data = await response.json();

        if (data.success) {
          setUtilities(data.data || []);
        } else {
          setError('Failed to load utilities');
        }
      } catch (err) {
        setError('Failed to load utilities');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUtilities();
  }, []);

  // Update URL parameters when search or category changes (with debounce)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.set('search', searchQuery);
      }
      if (selectedCategory) {
        params.set('category', selectedCategory);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `/utilities?${queryString}` : '/utilities';
      router.push(newUrl, { scroll: false });
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, selectedCategory, router]);

  // Filter utilities based on search and category
  useEffect(() => {
    let filtered = utilities;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((u) => u.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.description.toLowerCase().includes(query)
      );
    }

    setFilteredUtilities(filtered);
  }, [utilities, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* White Background Section - Header and Search */}
      <div className="bg-white border-b border-gray-200">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CoE Utilities</h1>
            <p className="text-gray-600 text-lg">
              Discover and manage all tools available in the Center of Excellence ecosystem
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="space-y-6">
            {/* Search */}
            <UtilitySearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search utilities by name or description..."
            />

            {/* Category Filter */}
            <UtilityCategoryFilter
              categories={UTILITY_CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </main>
      </div>

      {/* Gray Background Section - Content */}
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Error State */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Utilities Grid */}
          <UtilityGrid utilities={filteredUtilities} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}

export default function UtilitiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <UtilitiesPageContent />
    </Suspense>
  );
}
