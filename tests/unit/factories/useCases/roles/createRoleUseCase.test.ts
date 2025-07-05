import { describe, expect, it } from 'vitest';

import { createRoleUseCase } from '../../../../../src/factories/useCases/roles/createRoleUseCase';
import { CreateRoleUseCase } from '../../../../../src/useCases/roles/CreateRoleUseCase';

describe('createRoleUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createRoleUseCase).toBe('function');
  });

  it('should return an instance of CreateRoleUseCase', () => {
    const useCase = createRoleUseCase();
    expect(useCase).toBeInstanceOf(CreateRoleUseCase);
  });
});
