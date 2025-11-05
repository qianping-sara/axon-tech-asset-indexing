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
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  zap: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'trending-up': (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

export default function FourPillars() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Built on Four Pillars
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our vision for horizontal technical asset management
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center justify-center">
                {icons[pillar.icon]}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

