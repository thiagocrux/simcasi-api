import { describe, expect, it } from 'vitest';

import { updateExamUseCase } from '../../../../../src/factories/useCases/exams/updateExamUseCase';
import { UpdateExamUseCase } from '../../../../../src/useCases/exams/UpdateExamUseCase';

describe('updateExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateExamUseCase).toBe('function');
  });

  it('should return an instance of UpdateExamUseCase', () => {
    const useCase = updateExamUseCase();
    expect(useCase).toBeInstanceOf(UpdateExamUseCase);
  });
});
