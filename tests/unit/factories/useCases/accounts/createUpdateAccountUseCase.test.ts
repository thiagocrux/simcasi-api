import { describe, expect, it } from 'vitest';

import { createUpdateAccountUseCase } from '../../../../../src/factories/useCases/accounts/createUpdateAccountUseCase';
import { UpdateAccountUseCase } from '../../../../../src/useCases/accounts/UpdateAccountUseCase';

describe('createUpdateAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateAccountUseCase).toBe('function');
  });

  it('should return an instance of UpdateAccountUseCase', () => {
    const useCase = createUpdateAccountUseCase();
    expect(useCase).toBeInstanceOf(UpdateAccountUseCase);
  });
});
