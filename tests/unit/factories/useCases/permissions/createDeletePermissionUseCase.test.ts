import { describe, expect, it } from 'vitest';

import { createDeletePermissionUseCase } from '../../../../../src/factories/useCases/permissions/createDeletePermissionUseCase';
import { DeletePermissionUseCase } from '../../../../../src/useCases/permissions/DeletePermissionUseCase';

describe('createDeletePermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeletePermissionUseCase).toBe('function');
  });

  it('should return an instance of DeletePermissionUseCase', () => {
    const useCase = createDeletePermissionUseCase();
    expect(useCase).toBeInstanceOf(DeletePermissionUseCase);
  });
});
