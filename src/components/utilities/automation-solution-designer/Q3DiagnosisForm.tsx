'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { QUESTION_Q3_1, QUESTION_Q3_2, QUESTION_Q3_3, QUESTION_Q3_4 } from '@/lib/constants/data-ingestion';

interface Q3DiagnosisFormProps {
  onComplete: (answers: {
    q3_1: string;
    q3_2: string;
    q3_3: string;
    q3_4?: string;
  }) => void;
  onBack?: () => void;
}

export default function Q3DiagnosisForm({ onComplete, onBack }: Q3DiagnosisFormProps) {
  const [q3_1, setQ3_1] = useState<string | null>(null);
  const [q3_2, setQ3_2] = useState<string | null>(null);
  const [q3_3, setQ3_3] = useState<string | null>(null);
  const [q3_4, setQ3_4] = useState<string | null>(null);

  // Q3.4 is only required if Q3.1 is "new_pattern" or "new_cognitive"
  const needsDataReadiness = q3_1 === 'new_pattern' || q3_1 === 'new_cognitive';
  const isComplete = q3_1 && q3_2 && q3_3 && (needsDataReadiness ? q3_4 : true);

  const handleAnalyze = () => {
    if (isComplete) {
      onComplete({
        q3_1,
        q3_2,
        q3_3,
        ...(needsDataReadiness && q3_4 ? { q3_4 } : {}),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Step 3 of 3</span>
          <span className="text-sm text-gray-600">100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }} />
        </div>
        <div className="flex justify-between">
          <span className="text-xs font-medium text-green-600">Strategic Choice</span>
          <span className="text-xs font-medium text-green-600">Data Characteristics</span>
          <span className="text-xs font-medium text-gray-900">AI Capability</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-2">AI Capability & Resource Diagnosis</h2>
        <p className="text-gray-700 mb-8">
          Answer all three questions below to get a personalized recommendation based on your situation.
        </p>

        {/* Q3.1 - Problem Type */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-2">{QUESTION_Q3_1.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{QUESTION_Q3_1.description}</p>
          {QUESTION_Q3_1.helpText && (
            <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_1.helpText}</p>
          )}
          <div className="space-y-4">
            {QUESTION_Q3_1.options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
                  q3_1 === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                onClick={() => setQ3_1(option.value)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      q3_1 === option.value
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {q3_1 === option.value && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black mb-1">{option.label}</h4>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    {option.examples && (
                      <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Q3.2 - Capability Match */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-2">{QUESTION_Q3_2.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{QUESTION_Q3_2.description}</p>
          {QUESTION_Q3_2.helpText && (
            <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_2.helpText}</p>
          )}
          <div className="space-y-4">
            {QUESTION_Q3_2.options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
                  q3_2 === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                onClick={() => setQ3_2(option.value)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      q3_2 === option.value
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {q3_2 === option.value && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black mb-1">{option.label}</h4>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    {option.examples && (
                      <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Q3.3 - Business Criticality */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-2">{QUESTION_Q3_3.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{QUESTION_Q3_3.description}</p>
          {QUESTION_Q3_3.helpText && (
            <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_3.helpText}</p>
          )}
          <div className="space-y-4">
            {QUESTION_Q3_3.options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
                  q3_3 === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                onClick={() => setQ3_3(option.value)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      q3_3 === option.value
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {q3_3 === option.value && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black mb-1">{option.label}</h4>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    {option.examples && (
                      <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Q3.4 - Data Readiness (conditional - only if Q3.1 is new_pattern or new_cognitive) */}
        {needsDataReadiness && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-black mb-2">{QUESTION_Q3_4.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{QUESTION_Q3_4.description}</p>
            {QUESTION_Q3_4.helpText && (
              <p className="text-gray-600 text-sm mb-4 italic">{QUESTION_Q3_4.helpText}</p>
            )}
            <div className="space-y-4">
              {QUESTION_Q3_4.options.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
                    q3_4 === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setQ3_4(option.value)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        q3_4 === option.value
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {q3_4 === option.value && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-1">{option.label}</h4>
                      <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                      {option.examples && (
                        <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`flex gap-3 pt-6 ${onBack ? 'justify-between' : 'justify-end'}`}>
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          <button
            onClick={handleAnalyze}
            disabled={!isComplete}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze & Generate Recommendation
          </button>
        </div>
      </div>
    </div>
  );
}

