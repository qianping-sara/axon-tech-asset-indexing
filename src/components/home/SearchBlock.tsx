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
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Discover Automation Assets
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 text-sm md:text-base mb-10 leading-relaxed">
          Your unified portal for finding reusable APIs, processes,<br />
          bots, and AI models across the CoE ecosystem
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for APIs, processes, bots, or knowledge..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular Tags */}
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-gray-600 mb-3 font-medium">Popular:</p>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <p className="text-gray-500 text-xs">Loading tags...</p>
            ) : error ? (
              <p className="text-gray-500 text-xs">No popular tags available</p>
            ) : tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  {tag.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No tags available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

