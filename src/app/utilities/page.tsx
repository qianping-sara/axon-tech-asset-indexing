'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import UtilitySearch from '@/components/utilities/UtilitySearch';
import UtilityCategoryFilter from '@/components/utilities/UtilityCategoryFilter';
import UtilityGrid from '@/components/utilities/UtilityGrid';
import { Utility, UtilityCategory } from '@/lib/types/utility';
import { UTILITY_CATEGORIES } from '@/lib/constants/utilities';

export default function UtilitiesPage() {
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [filteredUtilities, setFilteredUtilities] = useState<Utility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CoE Utilities</h1>
          <p className="text-gray-600 text-lg">
            Discover and manage all tools available in the Center of Excellence ecosystem
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-6">
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
  );
}

