import { describe, expect, it } from 'vitest';

import { GetAllNotificationsUseCase } from '../../../../src/useCases';
import { mockNotificationsRepository } from '../../../mocks';

describe('GetAllNotificationsUseCase', async () => {
  const useCase = new GetAllNotificationsUseCase(mockNotificationsRepository);
  mockNotificationsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockNotificationsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockNotificationsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all notifications after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockNotificationsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
