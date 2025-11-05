'use client';

import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { CATEGORIES } from '@/lib/constants/categories';

interface CategoryWithStats {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  assetTypes: string[];
  assetCount: number;
}

interface CategoryGridProps {
  showTitle?: boolean;
  showSection?: boolean;
}

export default function CategoryGrid({ showTitle = true, showSection = true }: CategoryGridProps) {
  const [categories, setCategories] = useState<CategoryWithStats[]>(
    CATEGORIES.map((cat) => ({ ...cat, assetCount: 0 }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories?stats=true');
        const data = await response.json();
        if (data.success && data.data) {
          // Merge API data with constants
          const enrichedCategories = CATEGORIES.map((cat) => {
            const apiData = (data.data as Array<{ name: string; assetCount: number }>).find(
              (c) => c.name === cat.name
            );
            return {
              ...cat,
              assetCount: apiData?.assetCount || 0,
            };
          });
          setCategories(enrichedCategories);
        } else {
          // Fallback to constants with 0 count
          setCategories(CATEGORIES.map((cat) => ({ ...cat, assetCount: 0 })));
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        // Fallback to constants
        setCategories(CATEGORIES.map((cat) => ({ ...cat, assetCount: 0 })));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const content = (
    <>
      {/* Title */}
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Asset Categories
          </h2>
          <p className="text-gray-600">
            Explore our comprehensive collection of technical assets organized by category
          </p>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          {categories.map((category) => (
            <div key={category.name} className="border border-gray-200 rounded-lg">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      )}
    </>
  );

  if (showSection) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {content}
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      {content}
    </div>
  );
}

