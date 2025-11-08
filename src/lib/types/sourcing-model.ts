export interface CriteriaScore {
  notes: string;
  score: number; // 1-5
}

export interface SourcingModelData {
  strategicDifferentiation: CriteriaScore;
  requirementsFit: CriteriaScore;
  timeToMarket: CriteriaScore;
  roadmapControl: CriteriaScore;
  tcoPrediability: CriteriaScore;
  internalSkillset: CriteriaScore;
  vendorLockIn: CriteriaScore;
  integrationFriendliness: CriteriaScore;
}

export interface SourcingModelScores {
  build: number;
  buy: number;
  openSource: number;
}

export interface SourcingModelResult {
  build: SourcingModelScores;
  buy: SourcingModelScores;
  openSource: SourcingModelScores;
  recommendation: 'Build' | 'Buy' | 'Open Source';
}

