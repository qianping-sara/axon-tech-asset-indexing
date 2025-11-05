'use client';

import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';

export default function DocsPage() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch('/docs/getting-started.md');
        if (!response.ok) {
          throw new Error('Failed to load documentation');
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              <p className="mt-4 text-gray-600">Loading documentation...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        ) : content ? (
          <div className="bg-white">
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No documentation available</p>
          </div>
        )}
      </div>
    </div>
  );
}

