import { describe, expect, it } from 'vitest';

import { GetAllObservationsByPatientUseCase } from '../../../../src/useCases';
import { mockObservationsRepository } from '../../../mocks';

describe('GetAllObservationsByPatientUseCase', async () => {
  const useCase = new GetAllObservationsByPatientUseCase(
    mockObservationsRepository
  );
  mockObservationsRepository.findAllByPatient.mockResolvedValue([]);

  it('should call findAllByPatient with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('patient123', 'desc');
    expect(mockObservationsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'desc'
    );
  });

  it('should call findAllByPatient with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('patient123', 'asc');
    expect(mockObservationsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'asc'
    );
  });

  it('should get all observations by patient after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('patient123', 'asc');
    expect(mockObservationsRepository.findAllByPatient).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
