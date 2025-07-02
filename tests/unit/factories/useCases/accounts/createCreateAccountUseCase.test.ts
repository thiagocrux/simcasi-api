import { describe, expect, it } from 'vitest';

import { createCreateAccountUseCase } from '../../../../../src/factories/useCases/accounts/createCreateAccountUseCase';
import { CreateAccountUseCase } from '../../../../../src/useCases/accounts/CreateAccountUseCase';

describe('createCreateAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateAccountUseCase).toBe('function');
  });

  it('should return an instance of CreateAccountUseCase', () => {
    const useCase = createCreateAccountUseCase();
    expect(useCase).toBeInstanceOf(CreateAccountUseCase);
  });
});
