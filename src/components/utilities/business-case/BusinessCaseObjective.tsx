import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function BusinessCaseObjective() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-start gap-4">
        <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Objective</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Before considering any specific technology solutions, the first step is to rigorously
            validate the authenticity and urgency of the business need and ensure its alignment
            with your overall corporate strategy.
          </p>
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-900 font-medium">
              This evaluation framework helps you assess whether a proposed initiative meets the
              critical business and strategic criteria before proceeding to technology selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

