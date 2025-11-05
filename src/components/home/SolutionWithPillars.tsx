'use client';

const pillars = [
  {
    id: 'reliable',
    title: 'Reliable',
    description: 'Validated and trustworthy assets from source systems',
    icon: 'shield',
  },
  {
    id: 'reusable',
    title: 'Re-usable',
    description: 'Build once, use multiple times across scenarios',
    icon: 'zap',
  },
  {
    id: 'scalable',
    title: 'Scalable',
    description: 'Support future automation with sustainable architecture',
    icon: 'trending-up',
  },
  {
    id: 'trackable',
    title: 'Trackable',
    description: 'Know which assets are used by whom and where',
    icon: 'search',
  },
];

// Minimalist SVG icons
const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  zap: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'trending-up': (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

export default function SolutionWithPillars() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Solution Intro */}
          <div className="flex flex-col justify-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full w-fit mb-6">
              <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-green-700">The Solution</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Unified Discovery Portal
            </h2>

            {/* Problem Statement */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              When automation assets are scattered across disconnected systems, developers waste time searching and often reinvent solutions that already exist.
            </p>

            {/* Solution Statement */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              Axon is the <span className="font-bold">Golden Index</span> for automation assets. We don&apos;t replace your existing systems—we connect them, providing a single search interface to discover all automation capabilities across your organization.
            </p>

            {/* Key Capabilities */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-700 text-sm">Contextual search across all asset types</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 text-sm">Trusted metadata from source systems</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-gray-700 text-sm">Accelerate delivery, reduce costs</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors w-fit"
            >
              Start Discovering Assets
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right: Four Pillars */}
          <div className="flex flex-col gap-2 justify-center">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-2.5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex gap-2.5"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {icons[pillar.icon]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-tight">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

