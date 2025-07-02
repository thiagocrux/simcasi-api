import { describe, expect, it } from 'vitest';

import { createDeleteAccountUseCase } from '../../../../../src/factories/useCases/accounts/createDeleteAccountUseCase';
import { DeleteAccountUseCase } from '../../../../../src/useCases/accounts/DeleteAccountUseCase';

describe('createDeleteAccountUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteAccountUseCase).toBe('function');
  });

  it('should return an instance of DeleteAccountUseCase', () => {
    const useCase = createDeleteAccountUseCase();
    expect(useCase).toBeInstanceOf(DeleteAccountUseCase);
  });
});
