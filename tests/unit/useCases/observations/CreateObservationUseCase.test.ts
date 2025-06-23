import { describe, expect, it, vi } from 'vitest';

import { CreateObservationSchema } from '../../../../src/schemas';
import { CreateObservationUseCase } from '../../../../src/useCases';
import { NotFoundError } from '../../../../src/utils';

import {
  mockCreateObservationDTO,
  mockObservationDocument,
  mockObservationsRepository,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('CreateObservationUseCase.ts', async () => {
  const useCase = new CreateObservationUseCase(
    mockObservationsRepository,
    mockPatientsRepository
  );

  mockObservationsRepository.create.mockResolvedValue(mockObservationDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateObservationSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateObservationDTO, partnerBeingTreated: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toBeCalled();
  });

  it('should find the patient associated to the observation', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);
    await useCase.execute(mockCreateObservationDTO);
    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should throw NotFoundError when associated patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreateObservationDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should create a new observation after passing the validations', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);

    mockObservationsRepository.create.mockResolvedValueOnce(
      mockObservationDocument
    );

    await useCase.execute(mockCreateObservationDTO);
    expect(mockPatientsRepository.find).toBeCalled();
    expect(mockObservationsRepository.create).toBeCalled();
  });
});
