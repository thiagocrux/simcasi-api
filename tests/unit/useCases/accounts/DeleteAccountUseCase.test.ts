import { describe, expect, it } from 'vitest';

import { DeleteAccountUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockAccountDocument,
  mockAccountsRepository,
  mockInvalidObjectId,
  mockObjectId,
} from '../../../mocks';

describe('DeleteAccountUseCase', async () => {
  const useCase = new DeleteAccountUseCase(mockAccountsRepository);
  mockAccountsRepository.find.mockResolvedValue(mockAccountDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing account before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when account does not exist', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should delete account after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(mockAccountsRepository.delete).toHaveBeenCalled();
  });
});
