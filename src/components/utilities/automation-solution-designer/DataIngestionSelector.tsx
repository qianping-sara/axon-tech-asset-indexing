'use client';

import React, { useState } from 'react';
import { DataIngestionAnswers, DataIngestionStep } from '@/lib/types/data-ingestion';
import {
  getNextStep,
  getCurrentQuestion,
  getProgressInfo,
} from '@/lib/utils/data-ingestion';
import { getRecommendation } from '@/lib/constants/data-ingestion';
import { DATA_INGESTION_OVERVIEW, DATA_INGESTION_MERMAID_DIAGRAM } from '@/lib/constants/data-ingestion-overview';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import DimensionOverview from './DimensionOverview';

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
      case 'q1.3a':
        newAnswers.q1_3a = value as any;
        break;
      case 'q1.3b':
        newAnswers.q1_3b = value as any;
        break;
      case 'q1.3c':
        newAnswers.q1_3c = value as any;
        break;
      case 'q1.3d':
        newAnswers.q1_3d = value as any;
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
  const recommendation = currentStep === 'result' ? getRecommendation(answers.q1_1, answers.q1_2, answers.q1_3a, answers.q1_3b, answers.q1_3c, answers.q1_3d) : null;
  const progressInfo = getProgressInfo(currentStep);

  return (
    <div className="space-y-6">
      {/* Dimension Overview - shown at the start */}
      {currentStep === 'q1.1' && (
        <DimensionOverview
          title={DATA_INGESTION_OVERVIEW.title}
          description={DATA_INGESTION_OVERVIEW.description}
          whenToUse={DATA_INGESTION_OVERVIEW.whenToUse}
          mermaidDiagram={DATA_INGESTION_MERMAID_DIAGRAM}
        />
      )}

      {/* Question or Result */}
      {currentStep === 'result' && recommendation ? (
        <ResultCard recommendation={recommendation} answers={answers} onRestart={handleRestart} />
      ) : currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onSelectOption={handleSelectOption}
          currentStep={progressInfo.stepNumber}
          totalSteps={progressInfo.totalSteps}
        />
      ) : null}
    </div>
  );
}

