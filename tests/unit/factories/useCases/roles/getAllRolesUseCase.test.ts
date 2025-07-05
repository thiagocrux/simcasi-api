import { describe, expect, it } from 'vitest';

import { getAllRolesUseCase } from '../../../../../src/factories/useCases/roles/getAllRolesUseCase';
import { GetAllRolesUseCase } from '../../../../../src/useCases/roles/GetAllRolesUseCase';

describe('getAllRolesUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllRolesUseCase).toBe('function');
  });

  it('should return an instance of GetAllRolesUseCase', () => {
    const useCase = getAllRolesUseCase();
    expect(useCase).toBeInstanceOf(GetAllRolesUseCase);
  });
});
