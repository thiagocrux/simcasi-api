import { describe, expect, it } from 'vitest';

import { getAllPatientsUseCase } from '../../../../../src/factories/useCases/patients/getAllPatientsUseCase';
import { GetAllPatientsUseCase } from '../../../../../src/useCases/patients/GetAllPatientsUseCase';

describe('getAllPatientsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllPatientsUseCase).toBe('function');
  });

  it('should return an instance of GetAllPatientsUseCase', () => {
    const useCase = getAllPatientsUseCase();
    expect(useCase).toBeInstanceOf(GetAllPatientsUseCase);
  });
});
