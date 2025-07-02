import { describe, expect, it } from 'vitest';

import { createGetAllPatientsUseCase } from '../../../../../src/factories/useCases/patients/createGetAllPatientsUseCase';
import { GetAllPatientsUseCase } from '../../../../../src/useCases/patients/GetAllPatientsUseCase';

describe('createGetAllPatientsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllPatientsUseCase).toBe('function');
  });

  it('should return an instance of GetAllPatientsUseCase', () => {
    const useCase = createGetAllPatientsUseCase();
    expect(useCase).toBeInstanceOf(GetAllPatientsUseCase);
  });
});
