import { describe, expect, it } from 'vitest';

import { createPatientUseCase } from '../../../../../src/factories/useCases/patients/createPatientUseCase';
import { CreatePatientUseCase } from '../../../../../src/useCases/patients/CreatePatientUseCase';

describe('createPatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createPatientUseCase).toBe('function');
  });

  it('should return an instance of CreatePatientUseCase', () => {
    const useCase = createPatientUseCase();
    expect(useCase).toBeInstanceOf(CreatePatientUseCase);
  });
});
