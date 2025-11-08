export interface CriteriaScore {
  notes: string;
  score: number; // 1-5
}

export interface CriteriaData {
  clearProblemDefinition: CriteriaScore;
  explicitStrategicLink: CriteriaScore;
  capabilityBasedDefinition: CriteriaScore;
  identificationOfStakeholders: CriteriaScore;
  preliminaryBuyIn: CriteriaScore;
}

export interface CriteriaDefinition {
  id: keyof CriteriaData;
  title: string;
  weight: number; // percentage
  description: string;
}

export interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  details: {
    [key in keyof CriteriaData]: {
      title: string;
      weight: number;
      score: number;
      weightedScore: number;
      notes: string;
    };
  };
}

