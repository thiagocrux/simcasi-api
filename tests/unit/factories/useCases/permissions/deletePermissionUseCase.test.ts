import { describe, expect, it } from 'vitest';

import { deletePermissionUseCase } from '../../../../../src/factories/useCases/permissions/deletePermissionUseCase';
import { DeletePermissionUseCase } from '../../../../../src/useCases/permissions/DeletePermissionUseCase';

describe('deletePermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deletePermissionUseCase).toBe('function');
  });

  it('should return an instance of DeletePermissionUseCase', () => {
    const useCase = deletePermissionUseCase();
    expect(useCase).toBeInstanceOf(DeletePermissionUseCase);
  });
});
