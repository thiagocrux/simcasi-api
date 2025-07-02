import { describe, expect, it } from 'vitest';

import { createUpdateTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/createUpdateTreatmentUseCase';
import { UpdateTreatmentUseCase } from '../../../../../src/useCases/treatments/UpdateTreatmentUseCase';

describe('createUpdateTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateTreatmentUseCase).toBe('function');
  });

  it('should return an instance of UpdateTreatmentUseCase', () => {
    const useCase = createUpdateTreatmentUseCase();
    expect(useCase).toBeInstanceOf(UpdateTreatmentUseCase);
  });
});
