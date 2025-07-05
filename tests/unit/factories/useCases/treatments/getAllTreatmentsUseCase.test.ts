import { describe, expect, it } from 'vitest';

import { getAllTreatmentsUseCase } from '../../../../../src/factories/useCases/treatments/getAllTreatmentsUseCase';
import { GetAllTreatmentsUseCase } from '../../../../../src/useCases/treatments/GetAllTreatmentsUseCase';

describe('getAllTreatmentsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllTreatmentsUseCase).toBe('function');
  });

  it('should return an instance of GetAllTreatmentsUseCase', () => {
    const useCase = getAllTreatmentsUseCase();
    expect(useCase).toBeInstanceOf(GetAllTreatmentsUseCase);
  });
});
