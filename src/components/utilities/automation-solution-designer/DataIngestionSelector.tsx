'use client';

import React, { useState } from 'react';
import { DataIngestionAnswers, DataIngestionStep } from '@/lib/types/data-ingestion';
import {
  getNextStep,
  getCurrentQuestion,
  getProgressInfo,
} from '@/lib/utils/data-ingestion';
import { generateAIRecommendation, RECOMMENDATIONS } from '@/lib/constants/data-ingestion';
import { DATA_INGESTION_OVERVIEW, DATA_INGESTION_MERMAID_DIAGRAM } from '@/lib/constants/data-ingestion-overview';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import DimensionOverview from './DimensionOverview';

interface DataIngestionSelectorProps {
  // Props will be defined when implementing the actual content
}

export default function DataIngestionSelector({}: DataIngestionSelectorProps) {
  const [answers, setAnswers] = useState<DataIngestionAnswers>({});
  const [currentStep, setCurrentStep] = useState<DataIngestionStep>('q1');

  const handleSelectOption = (value: string) => {
    // Update answers based on current step
    const newAnswers = { ...answers };

    switch (currentStep) {
      case 'q1':
        newAnswers.q1 = value as any;
        break;
      case 'q2':
        newAnswers.q2 = value as any;
        break;
    }

    setAnswers(newAnswers);

    // Determine next step
    const nextStep = getNextStep(newAnswers);
    setCurrentStep(nextStep);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep('q1');
  };

  // Generate recommendation based on current step and answers
  let recommendation = null;
  if (currentStep === 'recommendation') {
    if (answers.q1 === 'yes') {
      // Shift-Left recommendation
      recommendation = RECOMMENDATIONS['shift-left'];
    } else if (answers.q2 === 'mapping') {
      // Template-based recommendation
      recommendation = RECOMMENDATIONS['template-based'];
    } else if (answers.q3_1 && answers.q3_2 && answers.q3_3) {
      // AI diagnosis recommendation
      recommendation = generateAIRecommendation(answers.q3_1, answers.q3_2, answers.q3_3);
    }
  }

  const currentQuestion = getCurrentQuestion(currentStep);
  const progressInfo = getProgressInfo(currentStep);

  return (
    <div className="space-y-6">
      {/* Dimension Overview - shown at the start */}
      {currentStep === 'q1' && (
        <DimensionOverview
          title={DATA_INGESTION_OVERVIEW.title}
          description={DATA_INGESTION_OVERVIEW.description}
          whenToUse={DATA_INGESTION_OVERVIEW.whenToUse}
          mermaidDiagram={DATA_INGESTION_MERMAID_DIAGRAM}
        />
      )}

      {/* Question or Result */}
      {currentStep === 'recommendation' && recommendation ? (
        <ResultCard recommendation={recommendation} answers={answers} onRestart={handleRestart} />
      ) : currentQuestion && currentStep !== 'q3' ? (
        <QuestionCard
          question={currentQuestion}
          onSelectOption={handleSelectOption}
          currentStep={progressInfo.stepNumber}
          totalSteps={progressInfo.totalSteps}
        />
      ) : currentStep === 'q3' ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Q3 Diagnosis Form Component (To be implemented)</p>
        </div>
      ) : null}
    </div>
  );
}

