import { describe, expect, it, vi } from 'vitest';

import { UpdateObservationSchema } from '../../../../src/schemas';
import { UpdateObservationUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockObservationDocument,
  mockObservationsRepository,
  mockUpdateObservationDTO,
} from '../../../mocks';

describe('UpdateObservationUseCase.ts', async () => {
  const useCase = new UpdateObservationUseCase(mockObservationsRepository);
  mockObservationsRepository.find.mockResolvedValue(mockObservationDocument);
  mockObservationsRepository.update.mockResolvedValue(mockObservationDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateObservationSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateObservationDTO,
        // @ts-expect-error: deliberate error for testing purposes
        observations: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateObservationDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing observation before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateObservationDTO);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when observation does not exist', async () => {
    mockObservationsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateObservationDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockObservationsRepository.find).toHaveBeenCalled();
  });

  it('should update the observation after passing the validations', async () => {
    const updatedObservation = await useCase.execute(
      mockObjectId,
      mockUpdateObservationDTO
    );

    expect(mockObservationsRepository.find).toHaveBeenCalled();
    expect(mockObservationsRepository.update).toHaveBeenCalled();
    expect(updatedObservation?._id).toBe(mockObservationDocument._id);
  });
});
