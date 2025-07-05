import { describe, expect, it } from 'vitest';

import { getAccountByIdUseCase } from '../../../../../src/factories/useCases/accounts/getAccountByIdUseCase';
import { GetAccountByIdUseCase } from '../../../../../src/useCases/accounts/GetAccountByIdUseCase';

describe('getAccountByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAccountByIdUseCase).toBe('function');
  });

  it('should return an instance of GetAccountByIdUseCase', () => {
    const useCase = getAccountByIdUseCase();
    expect(useCase).toBeInstanceOf(GetAccountByIdUseCase);
  });
});
