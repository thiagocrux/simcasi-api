import { describe, expect, it } from 'vitest';

import { GetAllObservationsUseCase } from '../../../../src/useCases';
import { mockObservationsRepository } from '../../../mocks';

describe('GetAllObservationsUseCase', async () => {
  const useCase = new GetAllObservationsUseCase(mockObservationsRepository);
  mockObservationsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockObservationsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockObservationsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all observations after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockObservationsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
