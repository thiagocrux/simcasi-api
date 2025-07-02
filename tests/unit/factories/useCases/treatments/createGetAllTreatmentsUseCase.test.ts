import { describe, expect, it } from 'vitest';

import { createGetAllTreatmentsUseCase } from '../../../../../src/factories/useCases/treatments/createGetAllTreatmentsUseCase';
import { GetAllTreatmentsUseCase } from '../../../../../src/useCases/treatments/GetAllTreatmentsUseCase';

describe('createGetAllTreatmentsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllTreatmentsUseCase).toBe('function');
  });

  it('should return an instance of GetAllTreatmentsUseCase', () => {
    const useCase = createGetAllTreatmentsUseCase();
    expect(useCase).toBeInstanceOf(GetAllTreatmentsUseCase);
  });
});
