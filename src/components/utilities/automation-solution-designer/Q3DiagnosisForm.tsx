'use client';

import React, { useState } from 'react';
import { QUESTION_Q3_1, QUESTION_Q3_2, QUESTION_Q3_3 } from '@/lib/constants/data-ingestion';

interface Q3DiagnosisFormProps {
  onComplete: (answers: {
    q3_1: string;
    q3_2: string;
    q3_3: string;
  }) => void;
  onBack?: () => void;
}

export default function Q3DiagnosisForm({ onComplete, onBack }: Q3DiagnosisFormProps) {
  const [q3_1, setQ3_1] = useState<string | null>(null);
  const [q3_2, setQ3_2] = useState<string | null>(null);
  const [q3_3, setQ3_3] = useState<string | null>(null);

  const isComplete = q3_1 && q3_2 && q3_3;

  const handleAnalyze = () => {
    if (isComplete) {
      onComplete({
        q3_1,
        q3_2,
        q3_3,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">Step 3 of 3</span>
          <span className="text-sm font-medium text-gray-600">100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-700 h-2 rounded-full" style={{ width: '100%' }} />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-xs font-medium text-green-700">Strategic Choice</span>
          <span className="text-xs font-medium text-green-700">Data Characteristics</span>
          <span className="text-xs font-medium text-gray-900">AI Capability</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Capability & Resource Diagnosis</h2>
      <p className="text-gray-600 text-sm mb-8 italic">
        Answer all three questions below to get a personalized recommendation based on your situation.
      </p>

      {/* Q3.1 - Problem Type */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{QUESTION_Q3_1.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{QUESTION_Q3_1.description}</p>
        {QUESTION_Q3_1.helpText && (
          <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_1.helpText}</p>
        )}
        <div className="space-y-2">
          {QUESTION_Q3_1.options.map((option) => (
            <button
              key={option.value}
              onClick={() => setQ3_1(option.value)}
              className={`w-full text-left p-4 border rounded-lg transition-all ${
                q3_1 === option.value
                  ? 'border-green-700 bg-green-50'
                  : 'border-gray-200 hover:border-green-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                    q3_1 === option.value
                      ? 'border-green-700 bg-green-700'
                      : 'border-gray-300 hover:border-green-700'
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  {option.examples && (
                    <div className="mt-2 pl-3 border-l-2 border-gray-300">
                      <p className="text-xs font-medium text-gray-500 mb-1">Examples:</p>
                      <ul className="space-y-1">
                        {option.examples.map((ex, idx) => (
                          <li key={idx} className="text-xs text-gray-600">
                            • {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Q3.2 - Capability Match */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{QUESTION_Q3_2.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{QUESTION_Q3_2.description}</p>
        {QUESTION_Q3_2.helpText && (
          <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_2.helpText}</p>
        )}
        <div className="space-y-2">
          {QUESTION_Q3_2.options.map((option) => (
            <button
              key={option.value}
              onClick={() => setQ3_2(option.value)}
              className={`w-full text-left p-4 border rounded-lg transition-all ${
                q3_2 === option.value
                  ? 'border-green-700 bg-green-50'
                  : 'border-gray-200 hover:border-green-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                    q3_2 === option.value
                      ? 'border-green-700 bg-green-700'
                      : 'border-gray-300 hover:border-green-700'
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  {option.examples && (
                    <div className="mt-2 pl-3 border-l-2 border-gray-300">
                      <p className="text-xs font-medium text-gray-500 mb-1">Examples:</p>
                      <ul className="space-y-1">
                        {option.examples.map((ex, idx) => (
                          <li key={idx} className="text-xs text-gray-600">
                            • {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Q3.3 - Business Criticality */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{QUESTION_Q3_3.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{QUESTION_Q3_3.description}</p>
        {QUESTION_Q3_3.helpText && (
          <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_3.helpText}</p>
        )}
        <div className="space-y-2">
          {QUESTION_Q3_3.options.map((option) => (
            <button
              key={option.value}
              onClick={() => setQ3_3(option.value)}
              className={`w-full text-left p-4 border rounded-lg transition-all ${
                q3_3 === option.value
                  ? 'border-green-700 bg-green-50'
                  : 'border-gray-200 hover:border-green-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                    q3_3 === option.value
                      ? 'border-green-700 bg-green-700'
                      : 'border-gray-300 hover:border-green-700'
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  {option.examples && (
                    <div className="mt-2 pl-3 border-l-2 border-gray-300">
                      <p className="text-xs font-medium text-gray-500 mb-1">Examples:</p>
                      <ul className="space-y-1">
                        {option.examples.map((ex, idx) => (
                          <li key={idx} className="text-xs text-gray-600">
                            • {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          onClick={handleAnalyze}
          disabled={!isComplete}
          className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
            isComplete
              ? 'bg-green-700 text-white hover:bg-green-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Analyze My AI Profile and Generate Recommendation
        </button>
      </div>
    </div>
  );
}

