'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Utility } from '@/lib/types/utility';
import { getUtilityIconComponent } from '@/lib/constants/utilityIcons';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function UtilityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [utility, setUtility] = useState<Utility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch utility details
  useEffect(() => {
    const fetchUtility = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/utilities/${id}`);
        const data = await response.json();

        if (data.success) {
          setUtility(data.data);
        } else {
          setError('Utility not found');
        }
      } catch (err) {
        setError('Failed to load utility details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUtility();
    }
  }, [id]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/utilities/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !utility) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Utility not found'}</p>
            <Link
              href="/utilities"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Utilities
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/utilities"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Utilities
        </Link>

        {/* Utility Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            {/* Icon */}
            <div className="flex-shrink-0">
              {getUtilityIconComponent(utility.icon)}
            </div>

            {/* Title and Meta */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {utility.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full capitalize">
                  {utility.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  v{utility.version}
                </span>
                {utility.owner && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {utility.owner}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {utility.description}
            </p>
          </div>

          {/* Tags */}
          {utility.tags && utility.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {utility.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200">
            {/* Open Tool Button */}
            <a
              href={utility.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              Open Tool
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

