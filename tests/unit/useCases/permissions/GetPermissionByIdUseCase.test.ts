import { describe, expect, it } from 'vitest';

import { GetPermissionByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPermissionDocument,
  mockPermissionsRepository,
} from '../../../mocks';

describe('GetPermissionByIdUseCase', async () => {
  const useCase = new GetPermissionByIdUseCase(mockPermissionsRepository);
  mockPermissionsRepository.find.mockResolvedValue(mockPermissionDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when permission does not exist', async () => {
    mockPermissionsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
  });

  it('should get the permission after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockPermissionsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockPermissionDocument);
  });
});
