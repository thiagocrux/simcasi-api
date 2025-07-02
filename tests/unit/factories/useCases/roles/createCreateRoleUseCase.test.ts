import { describe, expect, it } from 'vitest';

import { createCreateRoleUseCase } from '../../../../../src/factories/useCases/roles/createCreateRoleUseCase';
import { CreateRoleUseCase } from '../../../../../src/useCases/roles/CreateRoleUseCase';

describe('createCreateRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateRoleUseCase).toBe('function');
  });

  it('should return an instance of CreateRoleUseCase', () => {
    const useCase = createCreateRoleUseCase();
    expect(useCase).toBeInstanceOf(CreateRoleUseCase);
  });
});
