import { describe, expect, it } from 'vitest';

import { createGetAllAccountsUseCase } from '../../../../../src/factories/useCases/accounts/createGetAllAccountsUseCase';
import { GetAllAccountsUseCase } from '../../../../../src/useCases/accounts/GetAllAccountsUseCase';

describe('createGetAllAccountsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllAccountsUseCase).toBe('function');
  });

  it('should return an instance of GetAllAccountsUseCase', () => {
    const useCase = createGetAllAccountsUseCase();
    expect(useCase).toBeInstanceOf(GetAllAccountsUseCase);
  });
});
