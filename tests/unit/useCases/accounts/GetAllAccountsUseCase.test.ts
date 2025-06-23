import { describe, expect, it } from 'vitest';

import { GetAllAccountsUseCase } from '../../../../src/useCases';
import { mockAccountsRepository } from '../../../mocks';

describe('GetAllAccountsUseCase.ts', async () => {
  const useCase = new GetAllAccountsUseCase(mockAccountsRepository);
  mockAccountsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockAccountsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockAccountsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all accounts after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockAccountsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
