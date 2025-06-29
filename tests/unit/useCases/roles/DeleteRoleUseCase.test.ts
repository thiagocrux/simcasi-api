import { describe, expect, it } from 'vitest';

import { DeleteRoleUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockRoleDocument,
  mockRolesRepository,
} from '../../../mocks';

describe('DeleteRoleUseCase', async () => {
  const useCase = new DeleteRoleUseCase(mockRolesRepository);
  mockRolesRepository.find.mockResolvedValue(mockRoleDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing role before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when role does not exist', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should delete role after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockRolesRepository.find).toHaveBeenCalled();
    expect(mockRolesRepository.delete).toHaveBeenCalled();
  });
});
