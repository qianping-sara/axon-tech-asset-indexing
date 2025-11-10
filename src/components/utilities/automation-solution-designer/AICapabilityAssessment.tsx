'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AICapabilityAssessmentProps {
  onComplete: (answers: {
    hasExisting: string;
    precisionAcceptable?: string | null;
    improvementApproach?: string | null;
    hasResources?: string | null;
  }) => void;
}

export default function AICapabilityAssessment({ onComplete }: AICapabilityAssessmentProps) {
  const [hasExisting, setHasExisting] = useState<string | null>(null);
  const [precisionAcceptable, setPrecisionAcceptable] = useState<string | null>(null);
  const [improvementApproach, setImprovementApproach] = useState<string | null>(null);
  const [hasResources, setHasResources] = useState<string | null>(null);

  const handleComplete = () => {
    if (!hasExisting) return;

    // If has existing capability and precision is acceptable, we're done
    if (hasExisting === 'yes' && precisionAcceptable === 'yes') {
      onComplete({ hasExisting, precisionAcceptable });
      return;
    }

    // If needs improvement/new capability, need improvement approach
    if (!improvementApproach) return;

    // If improvement approach is training, need resources check
    if (improvementApproach === 'training' && !hasResources) return;

    onComplete({
      hasExisting,
      precisionAcceptable,
      improvementApproach,
      hasResources,
    });
  };

  const isComplete =
    hasExisting &&
    (hasExisting === 'yes' && precisionAcceptable === 'yes'
      ? true
      : improvementApproach &&
          (improvementApproach === 'training' ? hasResources : true));

  return (
    <div className="space-y-6">
      {/* Part 1: Existing Capability */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Part 1: Existing Capability</h3>
        <p className="text-sm text-gray-600 mb-4">
          Is there an existing general capability that could handle your use case?
        </p>
        <div className="space-y-3">
          {[
            {
              value: 'yes',
              label: 'Yes, there is an existing capability',
              desc: 'We can leverage existing platform capabilities (e.g., standard OCR, general invoice processing)',
            },
            {
              value: 'no',
              label: 'No, we need a custom or specialized solution',
              desc: 'Our use case is unique or requires specialized handling',
            },
          ].map((option) => (
            <label key={option.value} className="flex items-start gap-3 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="hasExisting"
                value={option.value}
                checked={hasExisting === option.value}
                onChange={(e) => setHasExisting(e.target.value)}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Part 2: Precision Check (conditional) */}
      {hasExisting === 'yes' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Part 2: Precision Check</h3>
          <p className="text-sm text-gray-600 mb-4">
            Does the existing capability meet your precision/accuracy requirements?
          </p>
          <div className="space-y-3">
            {[
              {
                value: 'yes',
                label: 'Yes, the precision is acceptable',
                desc: 'The existing capability meets our accuracy requirements',
              },
              {
                value: 'no',
                label: 'No, we need better precision',
                desc: 'We need to improve or customize the capability',
              },
            ].map((option) => (
              <label key={option.value} className="flex items-start gap-3 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="precisionAcceptable"
                  value={option.value}
                  checked={precisionAcceptable === option.value}
                  onChange={(e) => setPrecisionAcceptable(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Part 3: Improvement Approach (conditional) */}
      {(hasExisting === 'no' || (hasExisting === 'yes' && precisionAcceptable === 'no')) && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Part 3: Improvement Approach</h3>
          <p className="text-sm text-gray-600 mb-4">
            What approach best fits your situation?
          </p>
          <div className="space-y-3">
            {[
              {
                value: 'config',
                label: 'Simple Configuration',
                desc: 'Parameter tuning, rule adjustments, or template configuration that our team can handle',
              },
              {
                value: 'training',
                label: 'Model Training with Platform Tools',
                desc: 'We have training data and want to use platform AutoML/no-code tools to train a custom model',
              },
              {
                value: 'specialized',
                label: 'Professional AI/ML Team Support',
                desc: 'Our scenario is too complex; we need a professional AI/ML team to design and implement',
              },
            ].map((option) => (
              <label key={option.value} className="flex items-start gap-3 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="improvementApproach"
                  value={option.value}
                  checked={improvementApproach === option.value}
                  onChange={(e) => setImprovementApproach(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Part 4: Resources Check (conditional) */}
      {improvementApproach === 'training' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Part 4: Resources & Data</h3>
          <p className="text-sm text-gray-600 mb-4">
            Do you have the necessary resources for model training?
          </p>
          <div className="space-y-3">
            {[
              {
                value: 'yes',
                label: 'Yes, we have data and tools',
                desc: 'We have sufficient labeled training data (100-1000+ samples) and access to platform no-code training tools',
              },
              {
                value: 'no',
                label: 'No, we lack data or tools',
                desc: 'We don\'t have enough training data or lack access to no-code training capabilities',
              },
            ].map((option) => (
              <label key={option.value} className="flex items-start gap-3 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasResources"
                  value={option.value}
                  checked={hasResources === option.value}
                  onChange={(e) => setHasResources(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!isComplete}
        className={`w-full py-3 px-4 rounded font-medium transition-colors ${
          isComplete
            ? 'bg-green-700 text-white hover:bg-green-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Complete Assessment
      </button>
    </div>
  );
}

