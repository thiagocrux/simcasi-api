import { describe, expect, it } from 'vitest';

import { createGetPermissionByIdUseCase } from '../../../../../src/factories/useCases/permissions/createGetPermissionByIdUseCase';
import { GetPermissionByIdUseCase } from '../../../../../src/useCases/permissions/GetPermissionByIdUseCase';

describe('createGetPermissionByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetPermissionByIdUseCase).toBe('function');
  });

  it('should return an instance of GetPermissionByIdUseCase', () => {
    const useCase = createGetPermissionByIdUseCase();
    expect(useCase).toBeInstanceOf(GetPermissionByIdUseCase);
  });
});
