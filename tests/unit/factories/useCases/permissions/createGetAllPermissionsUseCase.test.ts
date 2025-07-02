import { describe, expect, it } from 'vitest';

import { createGetAllPermissionsUseCase } from '../../../../../src/factories/useCases/permissions/createGetAllPermissionsUseCase';
import { GetAllPermissionsUseCase } from '../../../../../src/useCases/permissions/GetAllPermissionsUseCase';

describe('createGetAllPermissionsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllPermissionsUseCase).toBe('function');
  });

  it('should return an instance of GetAllPermissionsUseCase', () => {
    const useCase = createGetAllPermissionsUseCase();
    expect(useCase).toBeInstanceOf(GetAllPermissionsUseCase);
  });
});
