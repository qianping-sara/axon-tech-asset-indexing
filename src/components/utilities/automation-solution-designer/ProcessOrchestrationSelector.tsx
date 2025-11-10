'use client';

import React from 'react';
import { Q1StrategicIntentForm } from './Q1StrategicIntentForm';
import { Q2IntegrationStrategyForm } from './Q2IntegrationStrategyForm';
import { Q3ConfirmationStep } from './Q3ConfirmationStep';
import { Q4IntegrationFootprintForm } from './Q4IntegrationFootprintForm';
import { Q5LogicComplexityForm } from './Q5LogicComplexityForm';
import { Q6CapabilityMatchForm } from './Q6CapabilityMatchForm';
import { ProcessOrchestrationResultCard } from './ProcessOrchestrationResultCard';
import { ProcessOrchestrationState } from '@/lib/types/process-orchestration';
import { generateProcessOrchestrationRecommendation } from '@/lib/constants/process-orchestration';

interface ProcessOrchestrationSelectorProps {
  // Props will be defined when implementing the actual content
}

export default function ProcessOrchestrationSelector({}: ProcessOrchestrationSelectorProps) {
  const [state, setState] = React.useState<ProcessOrchestrationState>({
    currentStep: 1,
    answers: {},
    recommendation: null,
    isLoading: false,
    error: null,
  });

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (state.recommendation) return 100;
    return (state.currentStep / 6) * 100;
  };

  // Handle Q1 answer
  const handleQ1Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 2,
      answers: {
        ...prev.answers,
        q1: answer as any,
        q2: undefined,
        q3: undefined,
      },
    }));
  };

  // Handle Q2 answer (only shown when Q1='integrate')
  const handleQ2Answer = (answer: string) => {
    const q2Answer = answer as any;

    // Rule 0: Workbench Enhancement - Exit
    if (q2Answer === 'workbench_enhancement') {
      const recommendation = generateProcessOrchestrationRecommendation({
        q1: state.answers.q1 as any,
        q2: q2Answer,
      });
      setState((prev) => ({
        ...prev,
        recommendation: recommendation,
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      currentStep: 4,
      answers: {
        ...prev.answers,
        q2: q2Answer,
        q3: undefined,
      },
    }));
  };

  // Handle Q3 answer (only shown when Q1='new_strategic' or 'new_tactical')
  const handleQ3Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 4,
      answers: {
        ...prev.answers,
        q3: answer as any,
      },
    }));
  };

  // Handle Q4 answer
  const handleQ4Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 5,
      answers: {
        ...prev.answers,
        q4: answer as any,
      },
    }));
  };

  // Handle Q5 answer
  const handleQ5Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 6,
      answers: {
        ...prev.answers,
        q5: answer as any,
      },
    }));
  };

  // Handle Q6 answer and generate recommendation
  const handleQ6Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      answers: {
        ...prev.answers,
        q6: answer as any,
      },
    }));

    // Generate recommendation
    const recommendation = generateProcessOrchestrationRecommendation({
      q1: state.answers.q1 as any,
      q2: state.answers.q2 as any,
      q3: state.answers.q3 as any,
      q4: state.answers.q4 as any,
      q5: state.answers.q5 as any,
      q6: answer as any,
    });

    setState((prev) => ({
      ...prev,
      recommendation: recommendation,
      isLoading: false,
    }));
  };

  // Handle previous step
  const handlePrevious = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as any,
    }));
  };

  // Handle restart
  const handleRestart = () => {
    setState({
      currentStep: 1,
      answers: {},
      recommendation: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            {state.recommendation ? 'Complete' : `Step ${state.currentStep} of 6`}
          </span>
          <span className="text-sm text-gray-600">{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {state.recommendation ? (
          <ProcessOrchestrationResultCard
            recommendation={state.recommendation}
            onRestart={handleRestart}
          />
        ) : (
          <>
            {/* Q1: Strategic Intent */}
            {state.currentStep === 1 && (
              <Q1StrategicIntentForm
                onNext={handleQ1Answer}
                currentAnswer={state.answers.q1}
              />
            )}

            {/* Q2: Integration Strategy (only if Q1='integrate') */}
            {state.currentStep === 2 && state.answers.q1 === 'integrate' && (
              <Q2IntegrationStrategyForm
                onNext={handleQ2Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q2}
              />
            )}

            {/* Q3: Confirmation (only if Q1='new_strategic' or 'new_tactical') */}
            {state.currentStep === 2 &&
              (state.answers.q1 === 'new_strategic' || state.answers.q1 === 'new_tactical') && (
                <Q3ConfirmationStep
                  onNext={handleQ3Answer}
                  onPrevious={handlePrevious}
                  q1Answer={state.answers.q1}
                />
              )}

            {/* Q4: Integration Footprint */}
            {state.currentStep === 4 && (
              <Q4IntegrationFootprintForm
                onNext={handleQ4Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q4}
              />
            )}

            {/* Q5: Logic Complexity */}
            {state.currentStep === 5 && (
              <Q5LogicComplexityForm
                onNext={handleQ5Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q5}
              />
            )}

            {/* Q6: Capability Match */}
            {state.currentStep === 6 && (
              <Q6CapabilityMatchForm
                onNext={handleQ6Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q6}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

