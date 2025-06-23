import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CreateRoleSchema } from '../../../../src/schemas';
import { CreateRoleUseCase } from '../../../../src/useCases';
import { UniqueConstraintViolationError } from '../../../../src/utils';

import {
  mockCreateRoleDTO,
  mockRoleDocument,
  mockRolesRepository,
} from '../../../mocks';

describe('CreateSessionUseCase.ts', async () => {
  const useCase = new CreateRoleUseCase(mockRolesRepository);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  mockRolesRepository.find.mockResolvedValue(mockRoleDocument);
  mockRolesRepository.create.mockResolvedValue(mockRoleDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateRoleSchema, 'parse');

    await expect(
      useCase.execute({ ...mockCreateRoleDTO, name: 'invalid_role' })
    ).rejects.toThrow();

    expect(validationSpy).toBeCalled();
  });

  it("should throw UniqueConstraintViolationError when account can't be found", async () => {
    await expect(useCase.execute(mockCreateRoleDTO)).rejects.toThrow(
      UniqueConstraintViolationError
    );

    expect(mockRolesRepository.find).toBeCalled();
  });

  it('should create a new role after passing the validations', async () => {
    mockRolesRepository.find.mockResolvedValueOnce(null);
    const useCaseReturn = await useCase.execute(mockCreateRoleDTO);
    expect(mockRolesRepository.find).toBeCalled();
    expect(useCaseReturn).toBe(mockRoleDocument);
  });
});
