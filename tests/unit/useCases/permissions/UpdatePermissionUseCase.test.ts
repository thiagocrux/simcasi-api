import { describe, expect, it, vi } from 'vitest';

import { UpdatePermissionSchema } from '../../../../src/schemas';
import { UpdatePermissionUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPermissionDocument,
  mockPermissionsRepository,
  mockUpdatePermissionDTO,
} from '../../../mocks';

describe('UpdatePermissionUseCase', async () => {
  const useCase = new UpdatePermissionUseCase(mockPermissionsRepository);
  mockPermissionsRepository.find.mockResolvedValue(mockPermissionDocument);
  mockPermissionsRepository.update.mockResolvedValue(mockPermissionDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdatePermissionSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdatePermissionDTO,
        // @ts-expect-error: deliberate error for testing purposes
        code: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdatePermissionDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing permission before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdatePermissionDTO);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when permission does not exist', async () => {
    mockPermissionsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdatePermissionDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockPermissionsRepository.find).toHaveBeenCalled();
  });

  it('should update the permission after passing the validations', async () => {
    const updatedPermission = await useCase.execute(
      mockObjectId,
      mockUpdatePermissionDTO
    );

    expect(mockPermissionsRepository.find).toHaveBeenCalled();
    expect(mockPermissionsRepository.update).toHaveBeenCalled();
    expect(updatedPermission?._id).toBe(mockPermissionDocument._id);
  });
});
