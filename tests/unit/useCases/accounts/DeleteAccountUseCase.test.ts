import { describe, expect, it } from 'vitest';

import { DeleteAccountUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';
import { mockInvalidObjectId, mockObjectId } from '../../../mocks';

import {
  mockAccountDocument,
  mockAccountsRepository,
} from '../../../mocks/accounts.mock';

describe('DeleteAccountUseCase.ts', async () => {
  const useCase = new DeleteAccountUseCase(mockAccountsRepository);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing account before deleting', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(mockAccountDocument);
    await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when account does not exist', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);

    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should create a new account after passing the validations', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(mockAccountDocument);
    await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(mockAccountsRepository.delete).toHaveBeenCalled();
  });
});
