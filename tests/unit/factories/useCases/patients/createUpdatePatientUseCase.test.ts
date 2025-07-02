import { describe, expect, it } from 'vitest';

import { createUpdatePatientUseCase } from '../../../../../src/factories/useCases/patients/createUpdatePatientUseCase';
import { UpdatePatientUseCase } from '../../../../../src/useCases/patients/UpdatePatientUseCase';

describe('createUpdatePatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdatePatientUseCase).toBe('function');
  });

  it('should return an instance of UpdatePatientUseCase', () => {
    const useCase = createUpdatePatientUseCase();
    expect(useCase).toBeInstanceOf(UpdatePatientUseCase);
  });
});
