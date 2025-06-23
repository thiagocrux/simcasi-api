import { describe, expect, it, vi } from 'vitest';

import { CreatePatientSchema } from '../../../../src/schemas';
import { CreatePatientUseCase } from '../../../../src/useCases';
import { UniqueConstraintViolationError } from '../../../../src/utils';

import {
  mockCreatePatientDTO,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('CreatePatientUseCase.ts', async () => {
  const useCase = new CreatePatientUseCase(mockPatientsRepository);

  mockPatientsRepository.create.mockResolvedValue(mockPatientDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreatePatientSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreatePatientDTO, cpf: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toBeCalled();
  });

  it('should find the patient associated to the patient', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);
    await useCase.execute(mockCreatePatientDTO);
    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should throw UniqueConstraintViolationError if patient already exists', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);

    await expect(useCase.execute(mockCreatePatientDTO)).rejects.toThrow(
      UniqueConstraintViolationError
    );

    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should create a new patient after passing the validations', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);
    mockPatientsRepository.create.mockResolvedValueOnce(mockPatientDocument);
    await useCase.execute(mockCreatePatientDTO);
    expect(mockPatientsRepository.find).toBeCalled();
    expect(mockPatientsRepository.create).toBeCalled();
  });
});
