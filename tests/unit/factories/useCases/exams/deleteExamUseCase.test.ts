import { describe, expect, it } from 'vitest';

import { deleteExamUseCase } from '../../../../../src/factories/useCases/exams/deleteExamUseCase';
import { DeleteExamUseCase } from '../../../../../src/useCases/exams/DeleteExamUseCase';

describe('deleteExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteExamUseCase).toBe('function');
  });

  it('should return an instance of DeleteExamUseCase', () => {
    const useCase = deleteExamUseCase();
    expect(useCase).toBeInstanceOf(DeleteExamUseCase);
  });
});
