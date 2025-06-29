import { describe, expect, it } from 'vitest';

import { GetAllTreatmentsUseCase } from '../../../../src/useCases';
import { mockTreatmentsRepository } from '../../../mocks';

describe('GetAllTreatmentsUseCase', async () => {
  const useCase = new GetAllTreatmentsUseCase(mockTreatmentsRepository);
  mockTreatmentsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockTreatmentsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockTreatmentsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all treatments after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockTreatmentsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
