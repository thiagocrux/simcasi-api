import { describe, expect, it } from 'vitest';

import { createGetAllRolesUseCase } from '../../../../../src/factories/useCases/roles/createGetAllRolesUseCase';
import { GetAllRolesUseCase } from '../../../../../src/useCases/roles/GetAllRolesUseCase';

describe('createGetAllRolesUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllRolesUseCase).toBe('function');
  });

  it('should return an instance of GetAllRolesUseCase', () => {
    const useCase = createGetAllRolesUseCase();
    expect(useCase).toBeInstanceOf(GetAllRolesUseCase);
  });
});
