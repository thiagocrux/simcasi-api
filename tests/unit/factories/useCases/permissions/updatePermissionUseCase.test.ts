import { describe, expect, it } from 'vitest';

import { updatePermissionUseCase } from '../../../../../src/factories/useCases/permissions/updatePermissionUseCase';
import { UpdatePermissionUseCase } from '../../../../../src/useCases/permissions/UpdatePermissionUseCase';

describe('updatePermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updatePermissionUseCase).toBe('function');
  });

  it('should return an instance of UpdatePermissionUseCase', () => {
    const useCase = updatePermissionUseCase();
    expect(useCase).toBeInstanceOf(UpdatePermissionUseCase);
  });
});
