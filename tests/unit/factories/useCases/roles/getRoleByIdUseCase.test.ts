import { describe, expect, it } from 'vitest';

import { getRoleByIdUseCase } from '../../../../../src/factories/useCases/roles/getRoleByIdUseCase';
import { GetRoleByIdUseCase } from '../../../../../src/useCases/roles/GetRoleByIdUseCase';

describe('getRoleByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getRoleByIdUseCase).toBe('function');
  });

  it('should return an instance of GetRoleByIdUseCase', () => {
    const useCase = getRoleByIdUseCase();
    expect(useCase).toBeInstanceOf(GetRoleByIdUseCase);
  });
});
