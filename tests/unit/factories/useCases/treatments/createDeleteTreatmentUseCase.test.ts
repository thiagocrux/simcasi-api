import { describe, expect, it } from 'vitest';

import { createDeleteTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/createDeleteTreatmentUseCase';
import { DeleteTreatmentUseCase } from '../../../../../src/useCases/treatments/DeleteTreatmentUseCase';

describe('createDeleteTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteTreatmentUseCase).toBe('function');
  });

  it('should return an instance of DeleteTreatmentUseCase', () => {
    const useCase = createDeleteTreatmentUseCase();
    expect(useCase).toBeInstanceOf(DeleteTreatmentUseCase);
  });
});
