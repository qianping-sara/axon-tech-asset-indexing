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
import Q3DiagnosisForm from './Q3DiagnosisForm';

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
        // Clear Q2 and Q3 answers when Q1 changes
        delete newAnswers.q2;
        delete newAnswers.q3_1;
        delete newAnswers.q3_2;
        delete newAnswers.q3_3;
        break;
      case 'q2':
        newAnswers.q2 = value as any;
        // Clear Q3 answers when Q2 changes
        delete newAnswers.q3_1;
        delete newAnswers.q3_2;
        delete newAnswers.q3_3;
        break;
    }

    setAnswers(newAnswers);

    // Determine next step
    const nextStep = getNextStep(newAnswers);
    setCurrentStep(nextStep);
  };

  const handleQ3Complete = (q3Answers: {
    q3_1: string;
    q3_2: string;
    q3_3: string;
    q3_4?: string;
  }) => {
    const newAnswers: DataIngestionAnswers = {
      ...answers,
      q3_1: q3Answers.q3_1 as any,
      q3_2: q3Answers.q3_2 as any,
      q3_3: q3Answers.q3_3 as any,
      ...(q3Answers.q3_4 ? { q3_4: q3Answers.q3_4 as any } : {}),
    };
    setAnswers(newAnswers);
    setCurrentStep('recommendation');
  };

  const handleBackToQ2 = () => {
    // Go back to Q2, clear Q3 answers
    const newAnswers = { ...answers };
    delete newAnswers.q3_1;
    delete newAnswers.q3_2;
    delete newAnswers.q3_3;
    delete newAnswers.q3_4;
    setAnswers(newAnswers);
    setCurrentStep('q2');
  };

  const handleBackToQ1 = () => {
    // Go back to Q1, clear Q2 and Q3 answers
    const newAnswers = { ...answers };
    delete newAnswers.q2;
    delete newAnswers.q3_1;
    delete newAnswers.q3_2;
    delete newAnswers.q3_3;
    delete newAnswers.q3_4;
    setAnswers(newAnswers);
    setCurrentStep('q1');
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
      recommendation = generateAIRecommendation(
        answers.q3_1,
        answers.q3_2,
        answers.q3_3,
        answers.q3_4 // Pass Q3.4 (data readiness) parameter
      );
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
          onPrevious={currentStep === 'q2' ? handleBackToQ1 : currentStep === 'q1' ? undefined : undefined}
        />
      ) : currentStep === 'q3' ? (
        <Q3DiagnosisForm
          onComplete={handleQ3Complete}
          onBack={handleBackToQ2}
        />
      ) : null}
    </div>
  );
}

