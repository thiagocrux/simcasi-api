import { describe, expect, it } from 'vitest';

import { updateAccountUseCase } from '../../../../../src/factories/useCases/accounts/updateAccountUseCase';
import { UpdateAccountUseCase } from '../../../../../src/useCases/accounts/UpdateAccountUseCase';

describe('updateAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateAccountUseCase).toBe('function');
  });

  it('should return an instance of UpdateAccountUseCase', () => {
    const useCase = updateAccountUseCase();
    expect(useCase).toBeInstanceOf(UpdateAccountUseCase);
  });
});
