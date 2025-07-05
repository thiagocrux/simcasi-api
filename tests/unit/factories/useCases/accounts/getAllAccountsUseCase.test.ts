import { describe, expect, it } from 'vitest';

import { getAllAccountsUseCase } from '../../../../../src/factories/useCases/accounts/getAllAccountsUseCase';
import { GetAllAccountsUseCase } from '../../../../../src/useCases/accounts/GetAllAccountsUseCase';

describe('getAllAccountsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllAccountsUseCase).toBe('function');
  });

  it('should return an instance of GetAllAccountsUseCase', () => {
    const useCase = getAllAccountsUseCase();
    expect(useCase).toBeInstanceOf(GetAllAccountsUseCase);
  });
});
