import { describe, expect, it } from 'vitest';

import { updateTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/updateTreatmentUseCase';
import { UpdateTreatmentUseCase } from '../../../../../src/useCases/treatments/UpdateTreatmentUseCase';

describe('updateTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateTreatmentUseCase).toBe('function');
  });

  it('should return an instance of UpdateTreatmentUseCase', () => {
    const useCase = updateTreatmentUseCase();
    expect(useCase).toBeInstanceOf(UpdateTreatmentUseCase);
  });
});
