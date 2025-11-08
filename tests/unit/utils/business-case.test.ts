import { calculateEvaluationResult, generateReportJSON } from '@/lib/utils/business-case';
import { CriteriaData } from '@/lib/types/business-case';

describe('Business Case Utils', () => {
  const mockCriteriaData: CriteriaData = {
    clearProblemDefinition: { notes: 'Clear problem identified', score: 5 },
    explicitStrategicLink: { notes: 'Aligns with strategy', score: 4 },
    capabilityBasedDefinition: { notes: 'Capability-based approach', score: 4 },
    identificationOfStakeholders: { notes: 'Stakeholders identified', score: 3 },
    preliminaryBuyIn: { notes: 'Preliminary approval obtained', score: 5 },
  };

  describe('calculateEvaluationResult', () => {
    it('calculates total score correctly', () => {
      const result = calculateEvaluationResult(mockCriteriaData);
      expect(result.totalScore).toBeGreaterThan(0);
    });

    it('calculates percentage correctly', () => {
      const result = calculateEvaluationResult(mockCriteriaData);
      expect(result.percentage).toBeGreaterThan(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
    });

    it('includes all criteria in details', () => {
      const result = calculateEvaluationResult(mockCriteriaData);
      expect(Object.keys(result.details).length).toBe(5);
    });

    it('calculates weighted scores correctly', () => {
      const result = calculateEvaluationResult(mockCriteriaData);
      const clearProblemDetail = result.details.clearProblemDefinition;
      // Score 5/5 * weight 30% = 30
      expect(clearProblemDetail.weightedScore).toBe(30);
    });

    it('handles zero scores', () => {
      const zeroData: CriteriaData = {
        clearProblemDefinition: { notes: '', score: 0 },
        explicitStrategicLink: { notes: '', score: 0 },
        capabilityBasedDefinition: { notes: '', score: 0 },
        identificationOfStakeholders: { notes: '', score: 0 },
        preliminaryBuyIn: { notes: '', score: 0 },
      };
      const result = calculateEvaluationResult(zeroData);
      expect(result.totalScore).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('handles partial scores', () => {
      const partialData: CriteriaData = {
        clearProblemDefinition: { notes: 'Test', score: 3 },
        explicitStrategicLink: { notes: '', score: 0 },
        capabilityBasedDefinition: { notes: '', score: 0 },
        identificationOfStakeholders: { notes: '', score: 0 },
        preliminaryBuyIn: { notes: '', score: 0 },
      };
      const result = calculateEvaluationResult(partialData);
      expect(result.totalScore).toBeGreaterThan(0);
      expect(result.totalScore).toBeLessThan(100);
    });
  });

  describe('generateReportJSON', () => {
    it('generates valid JSON', () => {
      const json = generateReportJSON(mockCriteriaData);
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it('includes timestamp', () => {
      const json = generateReportJSON(mockCriteriaData);
      const report = JSON.parse(json);
      expect(report.timestamp).toBeDefined();
    });

    it('includes evaluation scores', () => {
      const json = generateReportJSON(mockCriteriaData);
      const report = JSON.parse(json);
      expect(report.evaluation.totalScore).toBeDefined();
      expect(report.evaluation.percentage).toBeDefined();
    });

    it('includes all criteria details', () => {
      const json = generateReportJSON(mockCriteriaData);
      const report = JSON.parse(json);
      expect(Object.keys(report.criteria).length).toBe(5);
    });
  });
});

