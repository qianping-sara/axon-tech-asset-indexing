'use client';

import React, { useState } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Question } from '@/lib/types/data-ingestion';

interface QuestionCardProps {
  question: Question;
  onSelectOption: (value: string) => void;
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
}

export default function QuestionCard({ question, onSelectOption, currentStep, totalSteps, onPrevious }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const stepLabels = ['Strategic Choice', 'Data Characteristics', 'AI Capability'];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected) {
      onSelectOption(selected);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar with Steps */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        {/* Step Labels */}
        <div className="flex justify-between">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <span
                key={index}
                className={`text-xs font-medium ${
                  isCompleted
                    ? 'text-green-600'
                    : isCurrent
                      ? 'text-gray-900'
                      : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Question Title */}
        <h2 className="text-2xl font-bold text-black mb-2">{question.title}</h2>

        {/* Question Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{question.description}</p>

        {/* Help Text - styled as guidance, not alert */}
        {question.helpText && (
          <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">{question.helpText}</p>
        )}

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
                selected === option.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selected === option.value
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === option.value && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{option.label}</h3>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>

                  {/* Examples - Insurance domain specific */}
                  {option.examples && option.examples.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
                      <ul className="space-y-1">
                        {option.examples.map((example, idx) => (
                          <li key={idx} className="text-xs text-gray-600">
                            • {example}
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

        {/* Navigation Buttons */}
        <div className={`flex gap-3 pt-6 ${onPrevious ? 'justify-between' : 'justify-end'}`}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selected}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

