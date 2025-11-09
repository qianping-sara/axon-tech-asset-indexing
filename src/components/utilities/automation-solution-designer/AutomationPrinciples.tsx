import React from 'react';

export default function AutomationPrinciples() {
  const principles = [
    {
      title: 'Commonality to Platform, Differentiation to Business',
      description:
        'This is the core of the pyramid model. Prioritize using Level 1 "common" capabilities provided by the platform; use Level 2 "scenario" capabilities (Bizagi, Power Platform, AutoML) to configure "differentiated" business logic; only access Level 3 "custom" capabilities when necessary.',
    },
    {
      title: 'Profile First, Assemble Second',
      description:
        'Completely define the "complexity profile" of the problem across all dimensions first, then "assemble" the solution from platform capabilities. Avoid jumping to tool selection too early.',
    },
    {
      title: 'Eliminate Before You Automate',
      description:
        'Always prioritize "Shift-Left" (eliminating unstructured data on the channel side) as the highest priority option. Elimination is more valuable than automation.',
    },
    {
      title: 'Assemble, Don\'t Rebuild',
      description:
        'Prioritize reusing Level 1 "common" components (RPA, iPaaS) rather than building repetitive Level 3 "custom" logic for each new process.',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Guiding Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((principle, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">{principle.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{principle.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

