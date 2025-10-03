import { describe, expect, it } from 'vitest';

import { getAllExamsByPatientUseCase } from '../../../../../src/factories/useCases/exams/getAllExamsByPatientUseCase';
import { GetAllExamsByPatientUseCase } from '../../../../../src/useCases/exams/GetAllExamsByPatientUseCase';

describe('getAllExamsByPatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllExamsByPatientUseCase).toBe('function');
  });

  it('should return an instance of GetAllExamsByPatientUseCase', () => {
    const useCase = getAllExamsByPatientUseCase();
    expect(useCase).toBeInstanceOf(GetAllExamsByPatientUseCase);
  });
});
