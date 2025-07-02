import { describe, expect, it } from 'vitest';

import { createDeleteRoleUseCase } from '../../../../../src/factories/useCases/roles/createDeleteRoleUseCase';
import { DeleteRoleUseCase } from '../../../../../src/useCases/roles/DeleteRoleUseCase';

describe('createDeleteRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteRoleUseCase).toBe('function');
  });

  it('should return an instance of DeleteRoleUseCase', () => {
    const useCase = createDeleteRoleUseCase();
    expect(useCase).toBeInstanceOf(DeleteRoleUseCase);
  });
});
