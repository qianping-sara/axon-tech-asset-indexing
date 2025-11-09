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
  const recommendation = currentStep === 'result' ? getRecommendation(answers.q1_1, answers.q1_2, answers.q1_3) : null;

  // Calculate current step number (1-3 for questions, 4 for result)
  const stepMap: Record<DataIngestionStep, number> = {
    'q1.1': 1,
    'q1.2': 2,
    'q1.3': 3,
    'result': 4,
  };
  const currentStepNumber = stepMap[currentStep];

  return (
    <div className="space-y-6">
      {/* Question or Result */}
      {currentStep === 'result' && recommendation ? (
        <ResultCard recommendation={recommendation} answers={answers} onRestart={handleRestart} />
      ) : currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onSelectOption={handleSelectOption}
          currentStep={currentStepNumber}
          totalSteps={3}
        />
      ) : null}
    </div>
  );
}

