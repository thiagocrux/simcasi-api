import { describe, expect, it } from 'vitest';

import { GetAllExamsUseCase } from '../../../../src/useCases';
import { mockExamsRepository } from '../../../mocks';

describe('GetAllExamsUseCase.ts', async () => {
  const useCase = new GetAllExamsUseCase(mockExamsRepository);
  mockExamsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockExamsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockExamsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all exams after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockExamsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
