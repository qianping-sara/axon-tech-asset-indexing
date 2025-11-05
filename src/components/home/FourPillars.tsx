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
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  zap: (
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'trending-up': (
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  search: (
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

export default function FourPillars() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Built on Four Pillars
          </h2>
          <p className="text-gray-600 text-base">
            Our vision for horizontal technical asset management
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Icon */}
              <div className="mb-6 flex-shrink-0">
                {icons[pillar.icon]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

