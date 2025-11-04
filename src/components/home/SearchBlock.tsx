'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tag {
  id: string;
  name: string;
  count: number;
}

export default function SearchBlock() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch popular tags on mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tags?limit=10');
        const data = await response.json();
        if (data.success) {
          setTags(data.data || []);
        } else {
          setError('Failed to load tags');
        }
      } catch (err) {
        setError('Failed to load tags');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleTagClick = (tagName: string) => {
    router.push(`/search?q=${encodeURIComponent(tagName)}`);
  };

  return (
    <section className="bg-green-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            One Search, All Assets
          </h1>
          <p className="text-gray-600">
            Discover and explore all your technical assets in one place
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets, tags, components..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular Tags */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-600 mb-3">Popular tags:</p>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading tags...</p>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className="px-3 py-1 bg-white border border-green-200 text-green-700 rounded-full text-sm hover:bg-green-50 transition-colors"
                >
                  {tag.name}
                  <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No tags available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

