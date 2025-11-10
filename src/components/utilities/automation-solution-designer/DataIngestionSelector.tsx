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
import AICapabilityAssessment from './AICapabilityAssessment';

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
    }

    setAnswers(newAnswers);

    // Determine next step
    const nextStep = getNextStep(newAnswers);
    setCurrentStep(nextStep);
  };

  const handleAICapabilityComplete = (assessmentAnswers: {
    hasExisting: string;
    precisionAcceptable?: string | null;
    improvementApproach?: string | null;
    hasResources?: string | null;
  }) => {
    const newAnswers = { ...answers };
    newAnswers.q1_3a = assessmentAnswers.hasExisting as any;
    newAnswers.q1_3b = assessmentAnswers.precisionAcceptable as any;
    newAnswers.q1_3c = assessmentAnswers.improvementApproach as any;
    newAnswers.q1_3d = assessmentAnswers.hasResources as any;

    setAnswers(newAnswers);

    // Move to result
    setCurrentStep('result');
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

      {/* AI Capability Assessment - comprehensive form for Q1.3 */}
      {currentStep === 'q1.3a' && (
        <>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Step 3 of 3</h3>
                <p className="text-sm text-gray-600 mt-1">AI Capability Assessment</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">100%</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-700 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <AICapabilityAssessment onComplete={handleAICapabilityComplete} />
        </>
      )}

      {/* Question or Result */}
      {currentStep === 'result' && recommendation ? (
        <ResultCard recommendation={recommendation} answers={answers} onRestart={handleRestart} />
      ) : currentQuestion && currentStep !== 'q1.3a' ? (
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

