import { describe, expect, it } from 'vitest';

import { DeletePermissionUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPermissionDocument,
  mockPermissionsRepository,
  mockRoleDocument,
  mockRolesRepository,
} from '../../../mocks';

describe('DeletePermissionUseCase.ts', async () => {
  const useCase = new DeletePermissionUseCase(
    mockPermissionsRepository,
    mockRolesRepository
  );

  mockPermissionsRepository.find.mockResolvedValue(mockPermissionDocument);
  mockRolesRepository.find.mockResolvedValue(mockRoleDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing permission before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when permission does not exist', async () => {
    mockPermissionsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when role does not exist', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should delete permission after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
    expect(mockPermissionsRepository.delete).toHaveBeenCalled();
  });
});
