import { describe, expect, it, vi } from 'vitest';

import { CreatePatientSchema } from '../../../../src/schemas';
import { CreatePatientUseCase } from '../../../../src/useCases';
import { UniqueConstraintViolationError } from '../../../../src/utils';

import {
  mockCreatePatientDTO,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('CreatePatientUseCase', async () => {
  const useCase = new CreatePatientUseCase(mockPatientsRepository);
  mockPatientsRepository.create.mockResolvedValue(mockPatientDocument);
  mockPatientsRepository.find.mockResolvedValue(null);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreatePatientSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreatePatientDTO, cpf: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should allow creating a new patient when no patient with the same CPF exi', async () => {
    await useCase.execute(mockCreatePatientDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw UniqueConstraintViolationError if patient already exi', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);

    await expect(useCase.execute(mockCreatePatientDTO)).rejects.toThrow(
      UniqueConstraintViolationError
    );

    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should create a new patient after passing the validations', async () => {
    await useCase.execute(mockCreatePatientDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockPatientsRepository.create).toHaveBeenCalled();
  });
});
