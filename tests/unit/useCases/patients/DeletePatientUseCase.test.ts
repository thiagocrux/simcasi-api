import { describe, expect, it } from 'vitest';

import { DeletePatientUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('DeletePatientUseCase', async () => {
  const useCase = new DeletePatientUseCase(mockPatientsRepository);
  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing patient before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should delete patient after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockPatientsRepository.delete).toHaveBeenCalled();
  });
});
