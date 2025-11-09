'use client';

import React from 'react';
import { Question } from '@/lib/types/data-ingestion';
import { AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onSelectOption: (value: string) => void;
  progress: number;
}

export default function QuestionCard({ question, onSelectOption, progress }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{question.title}</h2>

      {/* Question Description */}
      <p className="text-gray-700 mb-6 leading-relaxed">{question.description}</p>

      {/* Help Text */}
      {question.helpText && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">{question.helpText}</p>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelectOption(option.value)}
            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-700 hover:bg-green-50 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-green-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                {option.hint && (
                  <p className="text-xs text-green-700 font-medium mt-2">{option.hint}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

