import { describe, expect, it } from 'vitest';

import { createGetPatientByIdUseCase } from '../../../../../src/factories/useCases/patients/createGetPatientByIdUseCase';
import { GetPatientByIdUseCase } from '../../../../../src/useCases/patients/GetPatientByIdUseCase';

describe('createGetPatientByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetPatientByIdUseCase).toBe('function');
  });

  it('should return an instance of GetPatientByIdUseCase', () => {
    const useCase = createGetPatientByIdUseCase();
    expect(useCase).toBeInstanceOf(GetPatientByIdUseCase);
  });
});
