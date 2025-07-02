import { describe, expect, it } from 'vitest';

import { createGetTreatmentByIdUseCase } from '../../../../../src/factories/useCases/treatments/createGetTreatmentByIdUseCase';
import { GetTreatmentByIdUseCase } from '../../../../../src/useCases/treatments/GetTreatmentByIdUseCase';

describe('createGetTreatmentByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetTreatmentByIdUseCase).toBe('function');
  });

  it('should return an instance of GetTreatmentByIdUseCase', () => {
    const useCase = createGetTreatmentByIdUseCase();
    expect(useCase).toBeInstanceOf(GetTreatmentByIdUseCase);
  });
});
