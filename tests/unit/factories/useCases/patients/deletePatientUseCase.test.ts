import { describe, expect, it } from 'vitest';

import { deletePatientUseCase } from '../../../../../src/factories/useCases/patients/deletePatientUseCase';
import { DeletePatientUseCase } from '../../../../../src/useCases/patients/DeletePatientUseCase';

describe('deletePatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deletePatientUseCase).toBe('function');
  });

  it('should return an instance of DeletePatientUseCase', () => {
    const useCase = deletePatientUseCase();
    expect(useCase).toBeInstanceOf(DeletePatientUseCase);
  });
});
