import { describe, expect, it } from 'vitest';

import { createUpdateRoleUseCase } from '../../../../../src/factories/useCases/roles/createUpdateRoleUseCase';
import { UpdateRoleUseCase } from '../../../../../src/useCases/roles/UpdateRoleUseCase';

describe('createUpdateRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateRoleUseCase).toBe('function');
  });

  it('should return an instance of UpdateRoleUseCase', () => {
    const useCase = createUpdateRoleUseCase();
    expect(useCase).toBeInstanceOf(UpdateRoleUseCase);
  });
});
