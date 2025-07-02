import { describe, expect, it } from 'vitest';

import { createCreatePermissionUseCase } from '../../../../../src/factories/useCases/permissions/createCreatePermissionUseCase';
import { CreatePermissionUseCase } from '../../../../../src/useCases/permissions/CreatePermissionUseCase';

describe('createCreatePermissionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreatePermissionUseCase).toBe('function');
  });

  it('should return an instance of CreatePermissionUseCase', () => {
    const useCase = createCreatePermissionUseCase();
    expect(useCase).toBeInstanceOf(CreatePermissionUseCase);
  });
});
