import { describe, expect, it } from 'vitest';

import { GetAllPermissionsUseCase } from '../../../../src/useCases';
import { mockPermissionsRepository } from '../../../mocks';

describe('GetAllPermissionsUseCase', async () => {
  const useCase = new GetAllPermissionsUseCase(mockPermissionsRepository);
  mockPermissionsRepository.findAll.mockResolvedValue([]);

  it('should call findAll with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('desc');
    expect(mockPermissionsRepository.findAll).toHaveBeenCalledWith('desc');
  });

  it('should call findAll with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('asc');
    expect(mockPermissionsRepository.findAll).toHaveBeenCalledWith('asc');
  });

  it('should get all permissions after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('asc');
    expect(mockPermissionsRepository.findAll).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
