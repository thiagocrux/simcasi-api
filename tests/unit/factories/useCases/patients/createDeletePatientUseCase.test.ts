import { describe, expect, it } from 'vitest';

import { createDeletePatientUseCase } from '../../../../../src/factories/useCases/patients/createDeletePatientUseCase';
import { DeletePatientUseCase } from '../../../../../src/useCases/patients/DeletePatientUseCase';

describe('createDeletePatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeletePatientUseCase).toBe('function');
  });

  it('should return an instance of DeletePatientUseCase', () => {
    const useCase = createDeletePatientUseCase();
    expect(useCase).toBeInstanceOf(DeletePatientUseCase);
  });
});
