import React from 'react';
import { render, screen } from '@testing-library/react';
import EvaluationSummary from '@/components/utilities/business-case/EvaluationSummary';
import { CriteriaData } from '@/lib/types/business-case';

// Mock download functionality
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('EvaluationSummary Component', () => {
  const mockCriteriaDataEmpty: CriteriaData = {
    clearProblemDefinition: { notes: '', score: 0 },
    explicitStrategicLink: { notes: '', score: 0 },
    capabilityBasedDefinition: { notes: '', score: 0 },
    identificationOfStakeholders: { notes: '', score: 0 },
    preliminaryBuyIn: { notes: '', score: 0 },
  };

  const mockCriteriaDataFilled: CriteriaData = {
    clearProblemDefinition: { notes: 'Clear', score: 5 },
    explicitStrategicLink: { notes: 'Strategic', score: 4 },
    capabilityBasedDefinition: { notes: 'Capability', score: 4 },
    identificationOfStakeholders: { notes: 'Stakeholders', score: 3 },
    preliminaryBuyIn: { notes: 'Buy-in', score: 5 },
  };

  it('shows nothing when no scores', () => {
    const { container } = render(<EvaluationSummary criteriaData={mockCriteriaDataEmpty} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays score summary when scores exist', () => {
    render(<EvaluationSummary criteriaData={mockCriteriaDataFilled} />);
    expect(screen.getByText(/Total Score/)).toBeInTheDocument();
    expect(screen.getByText(/Overall Score/)).toBeInTheDocument();
  });

  it('displays export button when scores exist', () => {
    render(<EvaluationSummary criteriaData={mockCriteriaDataFilled} />);
    expect(screen.getByText(/Export CSV/)).toBeInTheDocument();
  });

  it('shows "Proceed" recommendation for high scores', () => {
    render(<EvaluationSummary criteriaData={mockCriteriaDataFilled} />);
    expect(screen.getByText(/Proceed/)).toBeInTheDocument();
  });

  it('shows "Review" recommendation for low scores', () => {
    const lowScoreData: CriteriaData = {
      clearProblemDefinition: { notes: '', score: 1 },
      explicitStrategicLink: { notes: '', score: 1 },
      capabilityBasedDefinition: { notes: '', score: 1 },
      identificationOfStakeholders: { notes: '', score: 1 },
      preliminaryBuyIn: { notes: '', score: 1 },
    };
    render(<EvaluationSummary criteriaData={lowScoreData} />);
    expect(screen.getByText(/Review/)).toBeInTheDocument();
  });

  it('export button is clickable', () => {
    render(<EvaluationSummary criteriaData={mockCriteriaDataFilled} />);
    const exportCsvButton = screen.getByText(/Export CSV/);
    expect(exportCsvButton).toBeEnabled();
  });
});

