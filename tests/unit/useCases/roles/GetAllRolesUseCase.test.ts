import { describe, expect, it } from 'vitest';

import { GetAllRolesUseCase } from '../../../../src/useCases';
import { mockRolesRepository } from '../../../mocks';

describe('GetAllRolesUseCase.ts', async () => {
  const useCase = new GetAllRolesUseCase(mockRolesRepository);
  mockRolesRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockRolesRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockRolesRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all roles after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockRolesRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
