import { describe, expect, it } from 'vitest';

import { deleteRoleUseCase } from '../../../../../src/factories/useCases/roles/deleteRoleUseCase';
import { DeleteRoleUseCase } from '../../../../../src/useCases/roles/DeleteRoleUseCase';

describe('deleteRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteRoleUseCase).toBe('function');
  });

  it('should return an instance of DeleteRoleUseCase', () => {
    const useCase = deleteRoleUseCase();
    expect(useCase).toBeInstanceOf(DeleteRoleUseCase);
  });
});
