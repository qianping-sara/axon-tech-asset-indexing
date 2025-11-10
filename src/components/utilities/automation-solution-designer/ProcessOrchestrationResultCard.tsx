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
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'blocked':
        return <AlertCircle className="w-8 h-8 text-red-600" />;
      case 'redirect':
        return <AlertCircle className="w-8 h-8 text-blue-600" />;
      default:
        return null;
    }
  };

  const getHeaderColor = () => {
    switch (recommendation.type) {
      case 'matched':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'blocked':
        return 'bg-red-50 border-red-200';
      case 'redirect':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
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
    <div className="space-y-6">
      <div className={`border-2 rounded-lg p-6 ${getHeaderColor()}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-2">
              {recommendation.strategy}
            </h2>
            <p className="text-gray-700">{recommendation.description}</p>
          </div>
        </div>
      </div>

      {recommendation.primaryBrain && (
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Primary Brain/Platform</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-black">Technology:</span>{' '}
              {recommendation.technology || recommendation.primaryBrain}
            </p>
            {recommendation.additionalComponents && recommendation.additionalComponents.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-black mb-2">Additional Components:</p>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.additionalComponents.map((component) => (
                    <li key={component} className="text-sm text-gray-600">
                      {component === 'L1_RPA' && 'L1 RPA (BluePrism) - Legacy System Integration'}
                      {component === 'L1_IPAAS' && 'L1 iPaaS (Gravitee) - Modern API Integration'}
                      {component === 'L3_CUSTOM' && 'L3 Custom Microservice - Complex Logic'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-black mb-4">Details</h3>
        <ul className="list-disc list-inside space-y-2">
          {recommendation.details.map((detail, index) => (
            <li key={index} className="text-sm text-gray-600">
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {recommendation.warnings && recommendation.warnings.length > 0 && (
        <div className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Warnings
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {recommendation.warnings.map((warning, index) => (
              <li key={index} className="text-sm text-yellow-800">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendation.suggestions && recommendation.suggestions.length > 0 && (
        <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Suggestions</h3>
          <ul className="list-disc list-inside space-y-2">
            {recommendation.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-800">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-black mb-4">Next Steps</h3>
        <ol className="list-decimal list-inside space-y-2">
          {recommendation.nextSteps.map((step, index) => (
            <li key={index} className="text-sm text-gray-600">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {recommendation.governance && (
        <div className="border border-gray-300 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Governance</h3>
          <p className="text-sm text-gray-600">{recommendation.governance}</p>
        </div>
      )}

      <div className="flex justify-between gap-3 pt-6">
        <button
          onClick={() => handleExport('json')}
          className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export as JSON
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Assessment
        </button>
      </div>
    </div>
  );
}

