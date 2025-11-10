'use client';

import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Download,
  RotateCcw,
} from 'lucide-react';
import { ProcessOrchestrationRecommendation } from '@/lib/types/process-orchestration';

interface ProcessOrchestrationResultCardProps {
  recommendation: ProcessOrchestrationRecommendation;
  onRestart: () => void;
}

export function ProcessOrchestrationResultCard({
  recommendation,
  onRestart,
}: ProcessOrchestrationResultCardProps) {
  const getIcon = () => {
    switch (recommendation.type) {
      case 'matched':
        return <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />;
      case 'blocked':
        return <AlertCircle className="w-6 h-6 text-gray-600 flex-shrink-0" />;
      case 'redirect':
        return <AlertCircle className="w-6 h-6 text-gray-600 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getHeaderColor = () => {
    switch (recommendation.type) {
      case 'matched':
        return 'bg-white border-l-4 border-l-green-600';
      case 'warning':
        return 'bg-white border-l-4 border-l-orange-600';
      case 'blocked':
        return 'bg-white border-l-4 border-l-gray-600';
      case 'redirect':
        return 'bg-white border-l-4 border-l-gray-600';
      default:
        return 'bg-white border-l-4 border-l-gray-300';
    }
  };

  const handleExport = (format: 'pdf' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(recommendation, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'process-orchestration-recommendation.json';
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Details */}
      <div className={`border rounded-lg p-4 ${getHeaderColor()}`}>
        <div className="flex items-start gap-3">
          <div>{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-black">
              {recommendation.strategy}
            </h2>
            <p className="text-sm text-gray-700 mt-1">{recommendation.description}</p>

            {/* Details integrated into header */}
            {recommendation.details && recommendation.details.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-300">
                <ul className="space-y-1">
                  {recommendation.details.map((detail, index) => (
                    <li key={index} className="text-xs text-gray-600 ml-4">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Brain/Platform */}
      {recommendation.primaryBrain && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-black mb-2">Primary Brain/Platform</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold text-black">Technology:</span>{' '}
            {recommendation.technology || recommendation.primaryBrain}
          </p>
          {recommendation.additionalComponents && recommendation.additionalComponents.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-black mb-1">Additional Components:</p>
              <ul className="space-y-1">
                {recommendation.additionalComponents.map((component) => (
                  <li key={component} className="text-xs text-gray-600 ml-4">
                    • {component === 'L1_RPA' && 'L1 RPA (BluePrism) - Legacy System Integration'}
                    {component === 'L1_IPAAS' && 'L1 iPaaS (Gravitee) - Modern API Integration'}
                    {component === 'L3_CUSTOM' && 'L3 Custom Microservice - Complex Logic'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Warnings */}
      {recommendation.warnings && recommendation.warnings.length > 0 && (
        <div className="border border-orange-300 rounded-lg p-4">
          <h3 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Warnings
          </h3>
          <ul className="space-y-1">
            {recommendation.warnings.map((warning, index) => (
              <li key={index} className="text-xs text-gray-700 ml-6">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {recommendation.suggestions && recommendation.suggestions.length > 0 && (
        <div className="border border-green-300 rounded-lg p-4">
          <h3 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Suggestions
          </h3>
          <ul className="space-y-1">
            {recommendation.suggestions.map((suggestion, index) => (
              <li key={index} className="text-xs text-gray-700 ml-6">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-bold text-black mb-2">Next Steps</h3>
        <ol className="space-y-1">
          {recommendation.nextSteps.map((step, index) => (
            <li key={index} className="text-xs text-gray-600 ml-4">
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Governance */}
      {recommendation.governance && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-sm font-bold text-black mb-2">Governance</h3>
          <p className="text-xs text-gray-600">{recommendation.governance}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={() => handleExport('json')}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Restart
        </button>
      </div>
    </div>
  );
}

