import { describe, expect, it } from 'vitest';

import { updateRoleUseCase } from '../../../../../src/factories/useCases/roles/updateRoleUseCase';
import { UpdateRoleUseCase } from '../../../../../src/useCases/roles/UpdateRoleUseCase';

describe('updateRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateRoleUseCase).toBe('function');
  });

  it('should return an instance of UpdateRoleUseCase', () => {
    const useCase = updateRoleUseCase();
    expect(useCase).toBeInstanceOf(UpdateRoleUseCase);
  });
});
