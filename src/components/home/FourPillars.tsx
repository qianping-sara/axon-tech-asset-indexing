'use client';

const pillars = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'Find and explore all your technical assets in one unified platform',
    icon: '🔍',
  },
  {
    id: 'integrate',
    title: 'Integrate',
    description: 'Seamlessly integrate assets into your workflows and applications',
    icon: '🔗',
  },
  {
    id: 'govern',
    title: 'Govern',
    description: 'Maintain control and compliance across all your technical assets',
    icon: '⚖️',
  },
  {
    id: 'optimize',
    title: 'Optimize',
    description: 'Continuously improve and optimize your asset portfolio',
    icon: '⚡',
  },
];

export default function FourPillars() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Four Pillars
          </h2>
          <p className="text-gray-600">
            Our approach to managing technical assets
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

