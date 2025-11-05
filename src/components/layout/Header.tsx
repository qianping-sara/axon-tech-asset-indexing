'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isDiscoverActive = pathname === '/discover';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
          </div>

          {/* Right Side - Docs */}
          <Link
            href="/docs"
            className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3.042.525A9.006 9.006 0 002.25 9v12a9.006 9.006 0 009.75 8.951h.008v-.008a8.967 8.967 0 016-2.292c1.052 0 2.062.18 3.042.525A9 9 0 0021.75 20V9a9.006 9.006 0 00-9.75-8.951z"
              />
            </svg>
            Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

