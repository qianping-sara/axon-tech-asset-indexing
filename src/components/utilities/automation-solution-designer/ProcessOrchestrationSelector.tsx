'use client';

import React from 'react';
import { Q1StrategicIntentForm } from './Q1StrategicIntentForm';
import { Q2BusinessNatureForm } from './Q2BusinessNatureForm';
import { Q3IntegrationRequirementForm } from './Q3IntegrationRequirementForm';
import { Q3_5IntegrationStrategyForm } from './Q3_5IntegrationStrategyForm';
import { Q4IntegrationFootprintForm } from './Q4IntegrationFootprintForm';
import { Q5LogicComplexityForm } from './Q5LogicComplexityForm';
import { Q6CapabilityMatchForm } from './Q6CapabilityMatchForm';
import { ProcessOrchestrationResultCard } from './ProcessOrchestrationResultCard';
import DimensionOverview from './DimensionOverview';
import { ProcessOrchestrationState } from '@/lib/types/process-orchestration';
import { generateProcessOrchestrationRecommendation, PROCESS_ORCHESTRATION_PROGRESS } from '@/lib/constants/process-orchestration';
import { PROCESS_ORCHESTRATION_OVERVIEW, PROCESS_ORCHESTRATION_MERMAID_DIAGRAM } from '@/lib/constants/process-orchestration-overview';

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
    return (state.currentStep / 7) * 100;
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
        q3_5: undefined,
      },
    }));
  };

  // Handle Q2 answer (Business Nature - only shown when Q1='new')
  const handleQ2Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 3,
      answers: {
        ...prev.answers,
        q2: answer as any,
        q3: undefined,
        q3_5: undefined,
      },
    }));
  };

  // Handle Q3 answer (Integration Requirement - shown for all processes)
  const handleQ3Answer = (answer: string) => {
    const q3Answer = answer as any;

    // If choosing 'integrate_to_workbench', go to Q3.5
    // If choosing 'standalone', go to Q4
    const nextStep = q3Answer === 'integrate_to_workbench' ? 3.5 : 4;

    setState((prev) => ({
      ...prev,
      currentStep: nextStep as any,
      answers: {
        ...prev.answers,
        q3: q3Answer,
        q3_5: undefined,
      },
    }));
  };

  // Handle Q3.5 answer (Integration Strategy - only shown when Q3='integrate_to_workbench')
  const handleQ3_5Answer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 4,
      answers: {
        ...prev.answers,
        q3_5: answer as any,
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
      q3_5: state.answers.q3_5 as any,
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
    setState((prev) => {
      let newStep: number | number = Math.max(1, prev.currentStep - 1);

      // Special handling for step transitions based on new flow
      // From Q4 (step 4): go back to Q3 or Q3.5 depending on Q3 answer
      if (prev.currentStep === 4) {
        if (prev.answers.q3 === 'integrate_to_workbench') {
          newStep = 3.5;
        } else {
          newStep = 3;
        }
      }

      // From Q3.5 (step 3.5): go back to Q3
      if (prev.currentStep === 3.5) {
        newStep = 3;
      }

      // From Q3 (step 3): go back to Q2 if Q1='new', otherwise go to Q1
      if (prev.currentStep === 3) {
        newStep = prev.answers.q1 === 'new' ? 2 : 1;
      }

      // From Q2 (step 2): go back to Q1
      if (prev.currentStep === 2) {
        newStep = 1;
      }

      return {
        ...prev,
        currentStep: newStep as any,
      };
    });
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
      {/* Dimension Overview - shown at the start */}
      {state.currentStep === 1 && !state.recommendation && (
        <DimensionOverview
          title={PROCESS_ORCHESTRATION_OVERVIEW.title}
          description={PROCESS_ORCHESTRATION_OVERVIEW.description}
          whenToUse={PROCESS_ORCHESTRATION_OVERVIEW.whenToUse}
          mermaidDiagram={PROCESS_ORCHESTRATION_MERMAID_DIAGRAM}
        />
      )}

      {/* Progress Bar with Step Labels */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            {state.recommendation ? 'Complete' : `Step ${state.currentStep} of ${PROCESS_ORCHESTRATION_PROGRESS.totalSteps}`}
          </span>
          <span className="text-sm text-gray-600">{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        {/* Step Labels */}
        <div className="flex justify-between">
          {PROCESS_ORCHESTRATION_PROGRESS.stepLabels.map((label, index) => (
            <span
              key={index}
              className={`text-xs font-medium ${
                index < state.currentStep - 1
                  ? 'text-green-600'
                  : index === state.currentStep - 1
                    ? 'text-gray-900'
                    : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          ))}
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
            {/* Q1: Process Scope */}
            {state.currentStep === 1 && (
              <Q1StrategicIntentForm
                onNext={handleQ1Answer}
                currentAnswer={state.answers.q1}
              />
            )}

            {/* Q2: Business Nature (only if Q1='new') */}
            {state.currentStep === 2 && state.answers.q1 === 'new' && (
              <Q2BusinessNatureForm
                onNext={handleQ2Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q2}
              />
            )}

            {/* Q3: Integration Requirement (shown for all processes) */}
            {state.currentStep === 3 && (
              <Q3IntegrationRequirementForm
                onNext={handleQ3Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q3}
              />
            )}

            {/* Q3.5: Integration Strategy (only if Q3='integrate_to_workbench') */}
            {state.currentStep === 3.5 && state.answers.q3 === 'integrate_to_workbench' && (
              <Q3_5IntegrationStrategyForm
                onNext={handleQ3_5Answer}
                onPrevious={handlePrevious}
                currentAnswer={state.answers.q3_5}
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

