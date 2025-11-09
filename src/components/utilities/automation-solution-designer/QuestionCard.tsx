'use client';

import React from 'react';
import { Question } from '@/lib/types/data-ingestion';

interface QuestionCardProps {
  question: Question;
  onSelectOption: (value: string) => void;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionCard({ question, onSelectOption, currentStep, totalSteps }: QuestionCardProps) {
  const stepLabels = ['Strategic Choice', 'Data Characteristics', 'AI Capability'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Progress Bar with Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {stepLabels.map((label, index) => (
            <span
              key={index}
              className={`text-xs font-medium ${
                index < currentStep ? 'text-green-700' : index === currentStep - 1 ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Question Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{question.title}</h2>

      {/* Question Description */}
      <p className="text-gray-700 mb-6 leading-relaxed">{question.description}</p>

      {/* Help Text - styled as guidance, not alert */}
      {question.helpText && (
        <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">{question.helpText}</p>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelectOption(option.value)}
            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-700 hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-green-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

