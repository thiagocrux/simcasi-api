import { describe, expect, it } from 'vitest';

import { getAllPermissionsUseCase } from '../../../../../src/factories/useCases/permissions/getAllPermissionsUseCase';
import { GetAllPermissionsUseCase } from '../../../../../src/useCases/permissions/GetAllPermissionsUseCase';

describe('getAllPermissionsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllPermissionsUseCase).toBe('function');
  });

  it('should return an instance of GetAllPermissionsUseCase', () => {
    const useCase = getAllPermissionsUseCase();
    expect(useCase).toBeInstanceOf(GetAllPermissionsUseCase);
  });
});
