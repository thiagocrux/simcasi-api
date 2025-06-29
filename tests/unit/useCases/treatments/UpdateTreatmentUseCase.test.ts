import { describe, expect, it, vi } from 'vitest';

import { UpdateTreatmentSchema } from '../../../../src/schemas';
import { UpdateTreatmentUseCase } from '../../../../src/useCases';

import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockTreatmentDocument,
  mockTreatmentsRepository,
  mockUpdateTreatmentDTO,
} from '../../../mocks';

describe('UpdateTreatmentUseCase', async () => {
  const useCase = new UpdateTreatmentUseCase(mockTreatmentsRepository);
  mockTreatmentsRepository.find.mockResolvedValue(mockTreatmentDocument);
  mockTreatmentsRepository.update.mockResolvedValue(mockTreatmentDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateTreatmentSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateTreatmentDTO,
        // @ts-expect-error: deliberate error for testing purposes
        medication: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateTreatmentDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing treatment before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateTreatmentDTO);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when treatment does not exist', async () => {
    mockTreatmentsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateTreatmentDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
  });

  it('should update the treatment after passing the validations', async () => {
    const updatedTreatment = await useCase.execute(
      mockObjectId,
      mockUpdateTreatmentDTO
    );

    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
    expect(mockTreatmentsRepository.update).toHaveBeenCalled();
    expect(updatedTreatment?._id).toBe(mockTreatmentDocument._id);
  });
});
