import { describe, expect, it } from 'vitest';

import { GetRoleByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockRoleDocument,
  mockRolesRepository,
} from '../../../mocks';

describe('GetRoleByIdUseCase.ts', async () => {
  const useCase = new GetRoleByIdUseCase(mockRolesRepository);
  mockRolesRepository.find.mockResolvedValue(mockRoleDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when role does not exist', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should get the role after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockRolesRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockRoleDocument);
  });
});
