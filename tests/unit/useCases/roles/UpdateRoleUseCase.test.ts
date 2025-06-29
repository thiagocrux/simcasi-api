import { describe, expect, it, vi } from 'vitest';

import { UpdateRoleSchema } from '../../../../src/schemas';
import { UpdateRoleUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockRoleDocument,
  mockRolesRepository,
  mockUpdateRoleDTO,
} from '../../../mocks';

describe('UpdateRoleUseCase', async () => {
  const useCase = new UpdateRoleUseCase(mockRolesRepository);
  mockRolesRepository.find.mockResolvedValue(mockRoleDocument);
  mockRolesRepository.update.mockResolvedValue(mockRoleDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateRoleSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        name: 'invalid_role',
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateRoleDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing role before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateRoleDTO);
    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when role does not exist', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateRoleDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should update the role after passing the validations', async () => {
    const updatedRole = await useCase.execute(mockObjectId, mockUpdateRoleDTO);
    expect(mockRolesRepository.find).toHaveBeenCalled();
    expect(mockRolesRepository.update).toHaveBeenCalled();
    expect(updatedRole?._id).toBe(mockRoleDocument._id);
  });
});
