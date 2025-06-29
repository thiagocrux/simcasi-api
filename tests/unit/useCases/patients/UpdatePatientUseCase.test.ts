import { describe, expect, it, vi } from 'vitest';

import { UpdatePatientSchema } from '../../../../src/schemas';
import { UpdatePatientUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockPatientDocument,
  mockPatientsRepository,
  mockUpdatePatientDTO,
} from '../../../mocks';

describe('UpdatePatientUseCase', async () => {
  const useCase = new UpdatePatientUseCase(mockPatientsRepository);
  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);
  mockPatientsRepository.update.mockResolvedValue(mockPatientDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdatePatientSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdatePatientDTO,
        // @ts-expect-error: deliberate error for testing purposes
        gender: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdatePatientDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing patient before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdatePatientDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdatePatientDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should update the patient after passing the validations', async () => {
    const updatedPatient = await useCase.execute(
      mockObjectId,
      mockUpdatePatientDTO
    );

    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockPatientsRepository.update).toHaveBeenCalled();
    expect(updatedPatient?._id).toBe(mockPatientDocument._id);
  });
});
