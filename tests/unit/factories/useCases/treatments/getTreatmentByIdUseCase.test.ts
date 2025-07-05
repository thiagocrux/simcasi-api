import { describe, expect, it } from 'vitest';

import { getTreatmentByIdUseCase } from '../../../../../src/factories/useCases/treatments/getTreatmentByIdUseCase';
import { GetTreatmentByIdUseCase } from '../../../../../src/useCases/treatments/GetTreatmentByIdUseCase';

describe('getTreatmentByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getTreatmentByIdUseCase).toBe('function');
  });

  it('should return an instance of GetTreatmentByIdUseCase', () => {
    const useCase = getTreatmentByIdUseCase();
    expect(useCase).toBeInstanceOf(GetTreatmentByIdUseCase);
  });
});
