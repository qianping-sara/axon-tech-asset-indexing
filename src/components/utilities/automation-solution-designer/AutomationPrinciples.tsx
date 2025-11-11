'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function AutomationPrinciples() {
  const [isExpanded, setIsExpanded] = useState(false);

  const principles = [
    {
      title: 'Eliminate Before You Automate',
      description:
        'Always prioritize "Shift-Left" (eliminating unstructured data on the channel side) as the highest priority option. Elimination is more valuable than automation. Before investing in complex data extraction or processing, first explore whether the data can be structured at the source.',
    },
    {
      title: 'Assemble, Don\'t Rebuild',
      description:
        'Prioritize reusing existing platform components and capabilities rather than building custom logic for each new process. Leverage common patterns, templates, and pre-built solutions to accelerate delivery and reduce maintenance burden.',
    },
    {
      title: 'Commonality to Platform, Differentiation to Business',
      description:
        'Use a three-tier approach: (1) Level 1 "Common" - Use platform-provided general capabilities (standard APIs, general models, common components) for standard scenarios; (2) Level 2 "Scenario" - Configure platform tools (Bizagi, Power Platform, AutoML, no-code tools) to handle your specific business logic and differentiated needs; (3) Level 3 "Custom" - Only build custom solutions when the first two levels cannot meet your requirements. This ensures you maximize platform value while maintaining flexibility for true differentiation.',
    },
  ];

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-lg font-semibold text-gray-900">Guiding Principles</h2>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {principles.map((principle, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{principle.description}</p>
              {index === 2 && (
                <div className="mt-4 flex justify-center">
                  <div className="w-4/5">
                    <Image
                      src="/assets/automation/solution-tiers-pyramid.png"
                      alt="Three-tier approach: Common, Scenario, and Custom solutions"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

