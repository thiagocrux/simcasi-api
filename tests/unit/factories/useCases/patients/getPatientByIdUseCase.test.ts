import { describe, expect, it } from 'vitest';

import { getPatientByIdUseCase } from '../../../../../src/factories/useCases/patients/getPatientByIdUseCase';
import { GetPatientByIdUseCase } from '../../../../../src/useCases/patients/GetPatientByIdUseCase';

describe('getPatientByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getPatientByIdUseCase).toBe('function');
  });

  it('should return an instance of GetPatientByIdUseCase', () => {
    const useCase = getPatientByIdUseCase();
    expect(useCase).toBeInstanceOf(GetPatientByIdUseCase);
  });
});
