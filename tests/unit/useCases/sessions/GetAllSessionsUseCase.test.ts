import { describe, expect, it } from 'vitest';

import { GetAllSessionsUseCase } from '../../../../src/useCases';
import { mockSessionsRepository } from '../../../mocks';

describe('GetAllSessionsUseCase', async () => {
  const useCase = new GetAllSessionsUseCase(mockSessionsRepository);
  mockSessionsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockSessionsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockSessionsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all sessions after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockSessionsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
