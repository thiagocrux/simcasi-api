import { describe, expect, it } from 'vitest';

import { GetAllPatientsUseCase } from '../../../../src/useCases';
import { mockPatientsRepository } from '../../../mocks';

describe('GetAllPatientsUseCase.ts', async () => {
  const useCase = new GetAllPatientsUseCase(mockPatientsRepository);
  mockPatientsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockPatientsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockPatientsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all patients after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockPatientsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
