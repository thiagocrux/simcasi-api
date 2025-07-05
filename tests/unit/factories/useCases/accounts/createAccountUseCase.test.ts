import { describe, expect, it } from 'vitest';

import { createAccountUseCase } from '../../../../../src/factories/useCases/accounts/createAccountUseCase';
import { CreateAccountUseCase } from '../../../../../src/useCases/accounts/CreateAccountUseCase';

describe('createAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createAccountUseCase).toBe('function');
  });

  it('should return an instance of CreateAccountUseCase', () => {
    const useCase = createAccountUseCase();
    expect(useCase).toBeInstanceOf(CreateAccountUseCase);
  });
});
