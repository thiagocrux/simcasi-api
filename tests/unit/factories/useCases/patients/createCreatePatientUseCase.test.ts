import { describe, expect, it } from 'vitest';

import { createCreatePatientUseCase } from '../../../../../src/factories/useCases/patients/createCreatePatientUseCase';
import { CreatePatientUseCase } from '../../../../../src/useCases/patients/CreatePatientUseCase';

describe('createCreatePatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreatePatientUseCase).toBe('function');
  });

  it('should return an instance of CreatePatientUseCase', () => {
    const useCase = createCreatePatientUseCase();
    expect(useCase).toBeInstanceOf(CreatePatientUseCase);
  });
});
