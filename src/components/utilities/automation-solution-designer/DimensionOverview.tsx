'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import FlowDiagramModal from './FlowDiagramModal';

interface DimensionOverviewProps {
  title: string;
  description: string;
  whenToUse: string;
  mermaidDiagram: string;
}

export default function DimensionOverview({
  title,
  description,
  whenToUse,
  mermaidDiagram,
}: DimensionOverviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
        {/* Title and Help Button */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-green-700 transition-colors flex-shrink-0 ml-2"
            title="View decision flow"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

        {/* When to Use */}
        <div className="bg-white rounded p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">When to use this dimension:</p>
          <p className="text-sm text-gray-700 leading-relaxed">{whenToUse}</p>
        </div>
      </div>

      {/* Modal */}
      <FlowDiagramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description="Decision flow diagram"
        mermaidDiagram={mermaidDiagram}
      />
    </>
  );
}

