import { describe, expect, it } from 'vitest';

import { GetAccountByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';
import { mockInvalidObjectId, mockObjectId } from '../../../mocks';

import {
  mockAccountDocument,
  mockAccountsRepository,
} from '../../../mocks/accounts.mock';

describe('CreateAccountUseCase.ts', async () => {
  const useCase = new GetAccountByIdUseCase(mockAccountsRepository);

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
    mockAccountsRepository.find.mockResolvedValueOnce(mockAccountDocument);
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockAccountDocument);
  });
});
