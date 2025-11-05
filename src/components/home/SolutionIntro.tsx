'use client';

// Solution intro section with core positioning
export default function SolutionIntro() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-green-700">The Solution</span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
          Your Unified Discovery Portal
        </h2>

        {/* Problem Statement */}
        <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
          When automation assets are scattered across disconnected systems, developers waste time searching and often reinvent solutions that already exist.
        </p>

        {/* Solution Statement */}
        <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
          Axon is the <span className="font-bold">Golden Index</span> for automation assets. We don&apos;t replace your existing systems—we connect them, providing a single search interface to discover all automation capabilities across your organization.
        </p>

        {/* Key Capabilities */}
        <div className="space-y-4 mb-12">
          <div className="flex items-start gap-4">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-700">Contextual search across all asset types</span>
          </div>
          <div className="flex items-start gap-4">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">Trusted metadata from source systems</span>
          </div>
          <div className="flex items-start gap-4">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-gray-700">Accelerate delivery, reduce costs</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Discovering Assets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

