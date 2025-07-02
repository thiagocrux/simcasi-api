import { describe, expect, it } from 'vitest';

import { createUpdatePermissionUseCase } from '../../../../../src/factories/useCases/permissions/createUpdatePermissionUseCase';
import { UpdatePermissionUseCase } from '../../../../../src/useCases/permissions/UpdatePermissionUseCase';

describe('createUpdatePermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdatePermissionUseCase).toBe('function');
  });

  it('should return an instance of UpdatePermissionUseCase', () => {
    const useCase = createUpdatePermissionUseCase();
    expect(useCase).toBeInstanceOf(UpdatePermissionUseCase);
  });
});
