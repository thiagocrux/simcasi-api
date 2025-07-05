import { describe, expect, it } from 'vitest';

import { deleteTreatmentUseCase } from '../../../../../src/factories/useCases/treatments/deleteTreatmentUseCase';
import { DeleteTreatmentUseCase } from '../../../../../src/useCases/treatments/DeleteTreatmentUseCase';

describe('deleteTreatmentUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteTreatmentUseCase).toBe('function');
  });

  it('should return an instance of DeleteTreatmentUseCase', () => {
    const useCase = deleteTreatmentUseCase();
    expect(useCase).toBeInstanceOf(DeleteTreatmentUseCase);
  });
});
