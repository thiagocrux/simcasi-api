import { describe, expect, it } from 'vitest';

import { createGetAccountByIdUseCase } from '../../../../../src/factories/useCases/accounts/createGetAccountByIdUseCase';
import { GetAccountByIdUseCase } from '../../../../../src/useCases/accounts/GetAccountByIdUseCase';

describe('createGetAccountByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAccountByIdUseCase).toBe('function');
  });

  it('should return an instance of GetAccountByIdUseCase', () => {
    const useCase = createGetAccountByIdUseCase();
    expect(useCase).toBeInstanceOf(GetAccountByIdUseCase);
  });
});
