'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import PreliminaryObjective from '@/components/utilities/preliminary-evaluation/PreliminaryObjective';
import InitialAssessmentCriteria from '@/components/utilities/preliminary-evaluation/InitialAssessmentCriteria';
import SourcingModelSpecificCriteria from '@/components/utilities/preliminary-evaluation/SourcingModelSpecificCriteria';
import PreliminaryEvaluationSummary from '@/components/utilities/preliminary-evaluation/PreliminaryEvaluationSummary';
import { ArrowLeft } from 'lucide-react';
import { PreliminaryEvaluationData } from '@/lib/types/preliminary-evaluation';

export default function PreliminaryEvaluationPage() {
  const [selectedModel, setSelectedModel] = useState<'buy' | 'build' | 'openSource'>('buy');
  const [data, setData] = useState<PreliminaryEvaluationData>({
    initialAssessment: {
      businessValuePotential: { notes: '', score: 0 },
      coreFeatureCompleteness: { notes: '', score: 0 },
      usabilityUserExperience: { notes: '', score: 0 },
      futureProofingScalability: { notes: '', score: 0 },
      apiFirstDesign: { notes: '', score: 0 },
      cloudNativeArchitecture: { notes: '', score: 0 },
      integrationWithCoreSystems: { notes: '', score: 0 },
      dataModelInteroperability: { notes: '', score: 0 },
      popiaCompliance: { notes: '', score: 0 },
      fscaJointStandardCompliance: { notes: '', score: 0 },
      generalSecurityPosture: { notes: '', score: 0 },
      vendorFinancialHealthMarketPosition: { notes: '', score: 0 },
      productRoadmapVision: { notes: '', score: 0 },
      supportModelSLA: { notes: '', score: 0 },
      customerReferences: { notes: '', score: 0 },
      initialAcquisitionSubscriptionCost: { notes: '', score: 0 },
      pricingModelClarity: { notes: '', score: 0 },
    },
    sourcingModelSpecific: {
      buy: {
        vendorSupport: { notes: '', score: 0 },
        implementationSupport: { notes: '', score: 0 },
        customizationCapability: { notes: '', score: 0 },
        costPredictability: { notes: '', score: 0 },
        vendorLockInRisk: { notes: '', score: 0 },
        integrationCapability: { notes: '', score: 0 },
        scalability: { notes: '', score: 0 },
        securityCompliance: { notes: '', score: 0 },
      },
      build: {
        developmentTimeline: { notes: '', score: 0 },
        resourceAvailability: { notes: '', score: 0 },
        technicalComplexity: { notes: '', score: 0 },
        maintenanceBurden: { notes: '', score: 0 },
        scalabilityPotential: { notes: '', score: 0 },
        securityImplementation: { notes: '', score: 0 },
        knowledgeTransfer: { notes: '', score: 0 },
        longTermSupport: { notes: '', score: 0 },
      },
      openSource: {
        communityActivity: { notes: '', score: 0 },
        codeQualityMaturity: { notes: '', score: 0 },
        licenseCompatibility: { notes: '', score: 0 },
        securityPatching: { notes: '', score: 0 },
        documentationQuality: { notes: '', score: 0 },
        integrationEcosystem: { notes: '', score: 0 },
        customizationFlexibility: { notes: '', score: 0 },
        longTermViability: { notes: '', score: 0 },
      },
    },
  });

  // Load sourcing model from localStorage on mount
  useEffect(() => {
    const sourcingModelData = localStorage.getItem('sourcingModelData');
    if (sourcingModelData) {
      try {
        const parsed = JSON.parse(sourcingModelData);
        if (parsed.recommendation) {
          const modelMap: Record<string, 'buy' | 'build' | 'openSource'> = {
            Buy: 'buy',
            Build: 'build',
            'Open Source': 'openSource',
          };
          const model = modelMap[parsed.recommendation];
          if (model) {
            setSelectedModel(model);
          }
        }
      } catch (e) {
        console.error('Failed to parse sourcing model data:', e);
      }
    }
  }, []);

  const handleInitialAssessmentChange = (key: keyof typeof data.initialAssessment, value: any) => {
    setData((prev) => ({
      ...prev,
      initialAssessment: {
        ...prev.initialAssessment,
        [key]: value,
      },
    }));
  };

  const handleInitialAssessmentClearAll = () => {
    if (window.confirm('Clear all initial assessment data?')) {
      setData((prev) => ({
        ...prev,
        initialAssessment: {
          businessValuePotential: { notes: '', score: 0 },
          coreFeatureCompleteness: { notes: '', score: 0 },
          usabilityUserExperience: { notes: '', score: 0 },
          futureProofingScalability: { notes: '', score: 0 },
          apiFirstDesign: { notes: '', score: 0 },
          cloudNativeArchitecture: { notes: '', score: 0 },
          integrationWithCoreSystems: { notes: '', score: 0 },
          dataModelInteroperability: { notes: '', score: 0 },
          popiaCompliance: { notes: '', score: 0 },
          fscaJointStandardCompliance: { notes: '', score: 0 },
          generalSecurityPosture: { notes: '', score: 0 },
          vendorFinancialHealthMarketPosition: { notes: '', score: 0 },
          productRoadmapVision: { notes: '', score: 0 },
          supportModelSLA: { notes: '', score: 0 },
          customerReferences: { notes: '', score: 0 },
          initialAcquisitionSubscriptionCost: { notes: '', score: 0 },
          pricingModelClarity: { notes: '', score: 0 },
        },
      }));
    }
  };

  const handleSourcingModelChange = (
    model: 'buy' | 'build' | 'openSource',
    key: string,
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      sourcingModelSpecific: {
        ...prev.sourcingModelSpecific,
        [model]: {
          ...prev.sourcingModelSpecific[model],
          [key]: value,
        },
      },
    }));
  };

  const handleSourcingModelClearAll = (model: 'buy' | 'build' | 'openSource') => {
    if (window.confirm(`Clear all ${model} evaluation data?`)) {
      const emptyData =
        model === 'buy'
          ? {
              vendorSupport: { notes: '', score: 0 },
              implementationSupport: { notes: '', score: 0 },
              customizationCapability: { notes: '', score: 0 },
              costPredictability: { notes: '', score: 0 },
              vendorLockInRisk: { notes: '', score: 0 },
              integrationCapability: { notes: '', score: 0 },
              scalability: { notes: '', score: 0 },
              securityCompliance: { notes: '', score: 0 },
            }
          : model === 'build'
            ? {
                developmentTimeline: { notes: '', score: 0 },
                resourceAvailability: { notes: '', score: 0 },
                technicalComplexity: { notes: '', score: 0 },
                maintenanceBurden: { notes: '', score: 0 },
                scalabilityPotential: { notes: '', score: 0 },
                securityImplementation: { notes: '', score: 0 },
                knowledgeTransfer: { notes: '', score: 0 },
                longTermSupport: { notes: '', score: 0 },
              }
            : {
                communityActivity: { notes: '', score: 0 },
                codeQualityMaturity: { notes: '', score: 0 },
                licenseCompatibility: { notes: '', score: 0 },
                securityPatching: { notes: '', score: 0 },
                documentationQuality: { notes: '', score: 0 },
                integrationEcosystem: { notes: '', score: 0 },
                customizationFlexibility: { notes: '', score: 0 },
                longTermViability: { notes: '', score: 0 },
              };

      setData((prev) => ({
        ...prev,
        sourcingModelSpecific: {
          ...prev.sourcingModelSpecific,
          [model]: emptyData,
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/utilities"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CoE Utilities
        </Link>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Preliminary Evaluation and Shortlisting
          </h1>
        </div>

        {/* Objective Section */}
        <div className="mb-8">
          <PreliminaryObjective />
        </div>

        {/* Part 1: Initial Assessment */}
        <InitialAssessmentCriteria
          data={data.initialAssessment}
          onDataChange={handleInitialAssessmentChange}
          onClearAll={handleInitialAssessmentClearAll}
        />

        {/* Part 2: Sourcing Model Specific */}
        <SourcingModelSpecificCriteria
          data={data.sourcingModelSpecific}
          selectedModel={selectedModel}
          onDataChange={handleSourcingModelChange}
          onClearAll={handleSourcingModelClearAll}
        />

        {/* Part 3: Comprehensive Conclusion */}
        <PreliminaryEvaluationSummary data={data} selectedModel={selectedModel} />
      </main>
    </div>
  );
}

