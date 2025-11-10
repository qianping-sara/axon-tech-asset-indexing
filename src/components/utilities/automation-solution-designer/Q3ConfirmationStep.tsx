'use client';

import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Q3Answer, Q1Answer } from '@/lib/types/process-orchestration';
import { PROCESS_ORCHESTRATION_QUESTIONS } from '@/lib/constants/process-orchestration';

interface Q3ConfirmationStepProps {
  onNext: (answer: Q3Answer) => void;
  onPrevious: () => void;
  q1Answer?: Q1Answer;
}

export function Q3ConfirmationStep({
  onNext,
  onPrevious,
  q1Answer,
}: Q3ConfirmationStepProps) {
  const [confirmed, setConfirmed] = React.useState(false);
  const question = PROCESS_ORCHESTRATION_QUESTIONS.Q3;

  // Get the label for Q1 answer
  const q1Label = PROCESS_ORCHESTRATION_QUESTIONS.Q1.options.find(
    (opt) => opt.id === q1Answer
  )?.label;

  const handleNext = () => {
    if (confirmed) {
      onNext('confirmed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">{question.title}</h2>
        <p className="text-gray-700">{question.description}</p>
      </div>

      <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6">
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Your Choice:</span> {q1Label}
          </p>
          <p className="text-sm text-gray-600">
            You have chosen to build a new process. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-2">
            <li>This is a new, standalone process (not integrating into existing workbench)</li>
            <li>You will need to commit to building and maintaining this process</li>
            <li>You need to match "capability-platform-operations" commitment</li>
            <li>
              We will guide you through diagnostic steps to find the right technology stack
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`cursor-pointer transition-all border-2 rounded-lg p-6 ${
          confirmed
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
        onClick={() => setConfirmed(!confirmed)}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
              confirmed ? 'border-green-500 bg-green-500' : 'border-gray-300'
            }`}
          >
            {confirmed && <CheckCircle className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-black mb-1">I Confirm My Choice</h3>
            <p className="text-gray-600 text-sm">
              I understand the implications and want to proceed with the diagnostic steps.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3 pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!confirmed}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

