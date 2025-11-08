'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isDiscoverActive = pathname === '/discover';
  const isUtilitiesActive = pathname === '/utilities';

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name - Left Side */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-green-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-base font-semibold text-gray-900">Axon</span>
            </Link>

            {/* Navigation - Discover */}
            <Link
              href="/discover"
              className={`transition-all duration-200 ${
                isDiscoverActive
                  ? 'text-green-700 font-bold text-base'
                  : 'text-gray-600 font-medium text-sm hover:text-gray-900'
              }`}
            >
              Discover
            </Link>

            {/* Navigation - CoE Utilities */}
            <Link
              href="/utilities"
              className={`transition-all duration-200 ${
                isUtilitiesActive
                  ? 'text-green-700 font-bold text-base'
                  : 'text-gray-600 font-medium text-sm hover:text-gray-900'
              }`}
            >
              CoE Utilities
            </Link>
          </div>

          {/* Right Side - Docs */}
          <Link
            href="/docs"
            className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

