import { describe, expect, it, vi } from 'vitest';

import { UpdateAccountSchema } from '../../../../src/schemas';
import { UpdateAccountUseCase } from '../../../../src/useCases';

import {
  InvalidIdentifierError,
  NotFoundError,
  UniqueEmailViolationError,
} from '../../../../src/utils';

import {
  mockAccountDocument,
  mockAccountsRepository,
  mockInvalidObjectId,
  mockObjectId,
  mockUpdateAccountDTO,
} from '../../../mocks';

describe('UpdateAccountUseCase', async () => {
  const useCase = new UpdateAccountUseCase(mockAccountsRepository);
  mockAccountsRepository.find.mockResolvedValue(mockAccountDocument);
  mockAccountsRepository.update.mockResolvedValue(mockAccountDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateAccountSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateAccountDTO,
        name: '',
        email: 'invalid e-mail',
        password: '',
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateAccountDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing account before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateAccountDTO);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when account does not exist', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateAccountDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should throw UniqueEmailViolationError when updating taken e-mail', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(mockAccountDocument);

    mockAccountsRepository.find.mockResolvedValueOnce({
      ...mockAccountDocument,
      email: 'already-taken@gmail.com',
    });

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateAccountDTO,
        email: 'already-taken@gmail.com',
      })
    ).rejects.toThrow(UniqueEmailViolationError);
  });

  it('should update the account after passing the validations', async () => {
    const updatedAccount = await useCase.execute(
      mockObjectId,
      mockUpdateAccountDTO
    );

    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(mockAccountsRepository.update).toHaveBeenCalled();
    expect(updatedAccount?._id).toBe(mockAccountDocument._id);
  });
});
