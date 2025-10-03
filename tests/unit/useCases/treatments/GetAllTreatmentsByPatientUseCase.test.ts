import { describe, expect, it } from 'vitest';

import { GetAllTreatmentsByPatientUseCase } from '../../../../src/useCases';
import { mockTreatmentsRepository } from '../../../mocks';

describe('GetAllTreatmentsByPatientUseCase', async () => {
  const useCase = new GetAllTreatmentsByPatientUseCase(
    mockTreatmentsRepository
  );
  mockTreatmentsRepository.findAllByPatient.mockResolvedValue([]);

  it('should call findAllByPatient with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('patient123', 'desc');
    expect(mockTreatmentsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'desc'
    );
  });

  it('should call findAllByPatient with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('patient123', 'asc');
    expect(mockTreatmentsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'asc'
    );
  });

  it('should get all treatments by patient after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('patient123', 'asc');
    expect(mockTreatmentsRepository.findAllByPatient).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
