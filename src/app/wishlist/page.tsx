'use client';

import Header from '@/components/layout/Header';
import { ExternalLink } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* White Background Section - Header */}
      <div className="bg-white border-b border-gray-200">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Wishlist</h1>
            <p className="text-gray-600 text-lg">
              A collaborative space where business teams share expectations and IT teams respond with solutions
            </p>
          </div>
        </main>
      </div>

      {/* Gray Background Section - Content */}
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Coming Soon Message */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
            <p className="text-sm text-gray-700">
              This feature is currently in design and development. For a prototype reference, visit{' '}
              <a
                href="https://v0-automation-use-case-flowchart.vercel.app/wishlist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                v0-automation-use-case-flowchart.vercel.app/wishlist
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

