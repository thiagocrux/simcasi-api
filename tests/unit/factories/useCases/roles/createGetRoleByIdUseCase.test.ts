import { describe, expect, it } from 'vitest';

import { createGetRoleByIdUseCase } from '../../../../../src/factories/useCases/roles/createGetRoleByIdUseCase';
import { GetRoleByIdUseCase } from '../../../../../src/useCases/roles/GetRoleByIdUseCase';

describe('createGetRoleByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetRoleByIdUseCase).toBe('function');
  });

  it('should return an instance of GetRoleByIdUseCase', () => {
    const useCase = createGetRoleByIdUseCase();
    expect(useCase).toBeInstanceOf(GetRoleByIdUseCase);
  });
});
