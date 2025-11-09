'use client';

import React, { useState } from 'react';
import { DataIngestionAnswers, DataIngestionStep } from '@/lib/types/data-ingestion';
import {
  getNextStep,
  getCurrentQuestion,
  getProgressPercentage,
  generateAnswersSummary,
} from '@/lib/utils/data-ingestion';
import { getRecommendation } from '@/lib/constants/data-ingestion';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';

interface DataIngestionSelectorProps {
  // Props will be defined when implementing the actual content
}

export default function DataIngestionSelector({}: DataIngestionSelectorProps) {
  const [answers, setAnswers] = useState<DataIngestionAnswers>({});
  const [currentStep, setCurrentStep] = useState<DataIngestionStep>('q1.1');

  const handleSelectOption = (value: string) => {
    // Update answers based on current step
    const newAnswers = { ...answers };

    switch (currentStep) {
      case 'q1.1':
        newAnswers.q1_1 = value as any;
        break;
      case 'q1.2':
        newAnswers.q1_2 = value as any;
        break;
      case 'q1.3':
        newAnswers.q1_3 = value as any;
        break;
    }

    setAnswers(newAnswers);

    // Determine next step
    const nextStep = getNextStep(newAnswers);
    setCurrentStep(nextStep);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep('q1.1');
  };

  const currentQuestion = getCurrentQuestion(currentStep);
  const progress = getProgressPercentage(currentStep);
  const recommendation = currentStep === 'result' ? getRecommendation(answers.q1_1, answers.q1_2, answers.q1_3) : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Summary */}
      {Object.keys(answers).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Your Selections:</p>
          <div className="flex flex-wrap gap-2">
            {generateAnswersSummary(answers).map((summary, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
              >
                {summary}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Question or Result */}
      {currentStep === 'result' && recommendation ? (
        <ResultCard recommendation={recommendation} answers={answers} onRestart={handleRestart} />
      ) : currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onSelectOption={handleSelectOption}
          progress={progress}
        />
      ) : null}
    </div>
  );
}

