import { describe, expect, it } from 'vitest';

import { createCreateTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/createCreateTreatmentUseCase';
import { CreateTreatmentUseCase } from '../../../../../src/useCases/treatments/CreateTreatmentUseCase';

describe('createCreateTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateTreatmentUseCase).toBe('function');
  });

  it('should return an instance of CreateTreatmentUseCase', () => {
    const useCase = createCreateTreatmentUseCase();
    expect(useCase).toBeInstanceOf(CreateTreatmentUseCase);
  });
});
