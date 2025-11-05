'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and App Name - Left Side */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-base font-semibold text-gray-900">Axon</span>
            </Link>

            {/* Navigation - Discover */}
            <Link
              href="/search"
              className="text-gray-700 text-sm hover:text-gray-900 transition-colors ml-6"
            >
              Discover
            </Link>
          </div>

          {/* Right Side - Docs */}
          <a
            href="#"
            className="flex items-center gap-1 text-gray-700 text-sm hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
              />
            </svg>
            Docs
          </a>
        </div>
      </div>
    </header>
  );
}

