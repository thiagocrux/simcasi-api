import { describe, expect, it } from 'vitest';

import { deleteAccountUseCase } from '../../../../../src/factories/useCases/accounts/deleteAccountUseCase';
import { DeleteAccountUseCase } from '../../../../../src/useCases/accounts/DeleteAccountUseCase';

describe('deleteAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteAccountUseCase).toBe('function');
  });

  it('should return an instance of DeleteAccountUseCase', () => {
    const useCase = deleteAccountUseCase();
    expect(useCase).toBeInstanceOf(DeleteAccountUseCase);
  });
});
