import { describe, expect, it } from 'vitest';

import { GetPatientByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('GetPatientByIdUseCase', async () => {
  const useCase = new GetPatientByIdUseCase(mockPatientsRepository);
  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should get the patient after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockPatientDocument);
  });
});
