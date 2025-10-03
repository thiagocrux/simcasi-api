import { describe, expect, it } from 'vitest';

import { getAllTreatmentsByPatientUseCase } from '../../../../../src/factories/useCases/treatments/getAllTreatmentsByPatientUseCase';
import { GetAllTreatmentsByPatientUseCase } from '../../../../../src/useCases/treatments/GetAllTreatmentsByPatientUseCase';

describe('getAllTreatmentsByPatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllTreatmentsByPatientUseCase).toBe('function');
  });

  it('should return an instance of GetAllTreatmentsByPatientUseCase', () => {
    const useCase = getAllTreatmentsByPatientUseCase();
    expect(useCase).toBeInstanceOf(GetAllTreatmentsByPatientUseCase);
  });
});
