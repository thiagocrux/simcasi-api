import { describe, expect, it } from 'vitest';

import { GetAccountByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockAccountDocument,
  mockAccountsRepository,
  mockInvalidObjectId,
  mockObjectId,
} from '../../../mocks';

describe('GetAccountByIdUseCase', async () => {
  const useCase = new GetAccountByIdUseCase(mockAccountsRepository);
  mockAccountsRepository.find.mockResolvedValue(mockAccountDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when account does not exist', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should get the account after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockAccountDocument);
  });
});
