import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CreatePermissionUseCase } from '../../../../src/useCases';

import {
  ACCOUNT_ROLES,
  CreatePermissionSchema,
  PERMISSIONS,
} from '../../../../src/schemas';

import {
  NotFoundError,
  UniqueConstraintViolationError,
} from '../../../../src/utils';

import {
  mockCreatePermissionDTO,
  mockPermissionDocument,
  mockPermissionsRepository,
  mockRoleDocument,
  mockRolesRepository,
} from '../../../mocks';

describe('CreateSessionUseCase.ts', async () => {
  const useCase = new CreatePermissionUseCase(
    mockPermissionsRepository,
    mockRolesRepository
  );

  beforeEach(() => {
    vi.clearAllMocks();
    mockPermissionsRepository.find.mockResolvedValue(null);
    mockPermissionsRepository.create.mockResolvedValue(mockPermissionDocument);
  });

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreatePermissionSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate error for testing purposes
      useCase.execute({ code: 'invalid_role' })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw UniqueConstraintViolationError if permission already exists', async () => {
    mockPermissionsRepository.find.mockResolvedValueOnce(
      mockPermissionDocument
    );

    await expect(useCase.execute(mockCreatePermissionDTO)).rejects.toThrow(
      UniqueConstraintViolationError
    );
  });

  it('should populate role with allowed permissions', async () => {});

  it('should throw NotFoundError when role is not found during permission populating', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreatePermissionDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockRolesRepository.find).toHaveBeenCalled();
  });

  it('should create a new permission after passing the validations', async () => {
    mockRolesRepository.find.mockImplementation(async ({ name }) => {
      return {
        ...mockRoleDocument,
        name,
        permissions: [...PERMISSIONS],
      };
    });

    const useCaseReturn = await useCase.execute(mockCreatePermissionDTO);

    expect(mockPermissionsRepository.find).toHaveBeenCalled();
    expect(mockRolesRepository.find).toHaveBeenCalledTimes(
      ACCOUNT_ROLES.length
    );
    expect(useCaseReturn).toBe(mockPermissionDocument);
  });
});
