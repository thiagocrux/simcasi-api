import { describe, expect, it } from 'vitest';

import { createPermissionUseCase } from '../../../../../src/factories/useCases/permissions/createPermissionUseCase';
import { CreatePermissionUseCase } from '../../../../../src/useCases/permissions/CreatePermissionUseCase';

describe('createPermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createPermissionUseCase).toBe('function');
  });

  it('should return an instance of CreatePermissionUseCase', () => {
    const useCase = createPermissionUseCase();
    expect(useCase).toBeInstanceOf(CreatePermissionUseCase);
  });
});
