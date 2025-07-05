import { describe, expect, it } from 'vitest';

import { getPermissionByIdUseCase } from '../../../../../src/factories/useCases/permissions/getPermissionByIdUseCase';
import { GetPermissionByIdUseCase } from '../../../../../src/useCases/permissions/GetPermissionByIdUseCase';

describe('getPermissionByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getPermissionByIdUseCase).toBe('function');
  });

  it('should return an instance of GetPermissionByIdUseCase', () => {
    const useCase = getPermissionByIdUseCase();
    expect(useCase).toBeInstanceOf(GetPermissionByIdUseCase);
  });
});
