'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Q2Answer } from '@/lib/types/process-orchestration';
import { PROCESS_ORCHESTRATION_QUESTIONS } from '@/lib/constants/process-orchestration';

interface Q2BusinessNatureFormProps {
  onNext: (answer: Q2Answer) => void;
  onPrevious?: () => void;
  currentAnswer?: Q2Answer;
}

export function Q2BusinessNatureForm({
  onNext,
  onPrevious,
  currentAnswer,
}: Q2BusinessNatureFormProps) {
  const [selected, setSelected] = React.useState<Q2Answer | undefined>(currentAnswer);
  const question = PROCESS_ORCHESTRATION_QUESTIONS.Q2;

  const handleSelect = (optionId: string) => {
    setSelected(optionId as Q2Answer);
  };

  const handleNext = () => {
    if (selected) {
      onNext(selected);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">{question.title}</h2>
        <p className="text-gray-700">{question.description}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
              selected === option.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                  selected === option.id
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              >
                {selected === option.id && (
                  <CheckCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-1">{option.label}</h3>
                <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                {option.example && (
                  <div className="bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Insurance Servicing Example:
                    </p>
                    <p className="text-xs text-gray-600">{option.example}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-3 pt-6">
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

