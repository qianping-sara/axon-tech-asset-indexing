export interface CriteriaScore {
  notes: string;
  score: number; // 1-5
}

// Part 1: Initial Assessment
export interface InitialAssessmentData {
  vendorStability: CriteriaScore;
  implementationComplexity: CriteriaScore;
  supportMaintenance: CriteriaScore;
  costConsiderations: CriteriaScore;
  riskAssessment: CriteriaScore;
}

// Part 2: Sourcing Model Specific - Buy (COTS)
export interface COTSEvaluationData {
  vendorSupport: CriteriaScore;
  implementationSupport: CriteriaScore;
  customizationCapability: CriteriaScore;
  costPredictability: CriteriaScore;
  vendorLockInRisk: CriteriaScore;
  integrationCapability: CriteriaScore;
  scalability: CriteriaScore;
  securityCompliance: CriteriaScore;
}

// Part 2: Sourcing Model Specific - Build (Custom Development)
export interface CustomDevelopmentEvaluationData {
  developmentTimeline: CriteriaScore;
  resourceAvailability: CriteriaScore;
  technicalComplexity: CriteriaScore;
  maintenanceBurden: CriteriaScore;
  scalabilityPotential: CriteriaScore;
  securityImplementation: CriteriaScore;
  knowledgeTransfer: CriteriaScore;
  longTermSupport: CriteriaScore;
}

// Part 2: Sourcing Model Specific - OSS (Open Source)
export interface OSSEvaluationData {
  communityActivity: CriteriaScore;
  codeQualityMaturity: CriteriaScore;
  licenseCompatibility: CriteriaScore;
  securityPatching: CriteriaScore;
  documentationQuality: CriteriaScore;
  integrationEcosystem: CriteriaScore;
  customizationFlexibility: CriteriaScore;
  longTermViability: CriteriaScore;
}

// Combined data for all sourcing models
export interface SourcingModelSpecificData {
  buy: COTSEvaluationData;
  build: CustomDevelopmentEvaluationData;
  openSource: OSSEvaluationData;
}

// Complete preliminary evaluation data
export interface PreliminaryEvaluationData {
  initialAssessment: InitialAssessmentData;
  sourcingModelSpecific: SourcingModelSpecificData;
}

// Evaluation result
export interface PreliminaryEvaluationResult {
  initialAssessmentScore: number;
  sourcingModelScore: number;
  totalScore: number;
  percentage: number;
  recommendation: 'Proceed' | 'Review' | 'Reject';
}

