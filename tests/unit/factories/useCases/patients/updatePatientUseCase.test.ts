import { describe, expect, it } from 'vitest';

import { updatePatientUseCase } from '../../../../../src/factories/useCases/patients/updatePatientUseCase';
import { UpdatePatientUseCase } from '../../../../../src/useCases/patients/UpdatePatientUseCase';

describe('updatePatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updatePatientUseCase).toBe('function');
  });

  it('should return an instance of UpdatePatientUseCase', () => {
    const useCase = updatePatientUseCase();
    expect(useCase).toBeInstanceOf(UpdatePatientUseCase);
  });
});
