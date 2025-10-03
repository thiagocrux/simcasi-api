import { describe, expect, it } from 'vitest';

import { GetAllExamsByPatientUseCase } from '../../../../src/useCases';
import { mockExamsRepository } from '../../../mocks';

describe('GetAllExamsByPatientUseCase', async () => {
  const useCase = new GetAllExamsByPatientUseCase(mockExamsRepository);
  mockExamsRepository.findAllByPatient.mockResolvedValue([]);

  it('should call findAllByPatient with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('patient123', 'desc');
    expect(mockExamsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'desc'
    );
  });

  it('should call findAllByPatient with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('patient123', 'asc');
    expect(mockExamsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'asc'
    );
  });

  it('should get all exams by patient after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('patient123', 'asc');
    expect(mockExamsRepository.findAllByPatient).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
