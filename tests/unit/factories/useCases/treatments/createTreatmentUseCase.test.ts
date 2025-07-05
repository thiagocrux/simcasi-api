import { describe, expect, it } from 'vitest';

import { createTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/createTreatmentUseCase';
import { CreateTreatmentUseCase } from '../../../../../src/useCases/treatments/CreateTreatmentUseCase';

describe('createTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createTreatmentUseCase).toBe('function');
  });

  it('should return an instance of CreateTreatmentUseCase', () => {
    const useCase = createTreatmentUseCase();
    expect(useCase).toBeInstanceOf(CreateTreatmentUseCase);
  });
});
