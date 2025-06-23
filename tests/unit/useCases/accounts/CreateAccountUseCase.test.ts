import bcrypt from 'bcryptjs';
import { describe, expect, it, vi } from 'vitest';

import { CreateAccountSchema } from '../../../../src/schemas';
import { CreateAccountUseCase } from '../../../../src/useCases';
import { UniqueConstraintViolationError } from '../../../../src/utils';

import {
  mockAccountDocument,
  mockAccountsRepository,
  mockCreateAccountDTO,
} from '../../../mocks';

describe('CreateAccountUseCase.ts', async () => {
  const useCase = new CreateAccountUseCase(mockAccountsRepository);
  mockAccountsRepository.find.mockResolvedValue(null);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateAccountSchema, 'parse');

    await expect(
      useCase.execute({ ...mockCreateAccountDTO, email: 'Invalid e-mail' })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should verify if account does not exist before creation (returns null)', async () => {
    await useCase.execute(mockCreateAccountDTO);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should throw UniqueConstraintViolationError if account already exists', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(mockAccountDocument);

    await expect(useCase.execute(mockCreateAccountDTO)).rejects.toThrow(
      UniqueConstraintViolationError
    );

    expect(mockAccountsRepository.find).toHaveBeenCalled();
  });

  it('should securely hash the password using bcrypt', async () => {
    vi.spyOn(bcrypt, 'genSaltSync').mockImplementation(() => 'mocked-salt');

    vi.spyOn(bcrypt, 'hashSync').mockImplementation(
      (password: string) => `hashed-${password}`
    );

    await useCase.execute(mockCreateAccountDTO);
    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
    expect(bcrypt.hashSync).toHaveBeenCalledWith('Teste@12', 'mocked-salt');
  });

  it('should create a new account after passing the validations', async () => {
    mockAccountsRepository.create.mockResolvedValueOnce(mockAccountDocument);
    const createdAccount = await useCase.execute(mockCreateAccountDTO);
    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(mockAccountsRepository.create).toHaveBeenCalled();
    expect(createdAccount?._id).toBe('68543a7700151eba4c6270b8');
  });
});
