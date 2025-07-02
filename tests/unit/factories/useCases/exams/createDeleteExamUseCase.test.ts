import { describe, expect, it } from 'vitest';

import { createDeleteExamUseCase } from '../../../../../src/factories/useCases/exams/createDeleteExamUseCase';
import { DeleteExamUseCase } from '../../../../../src/useCases/exams/DeleteExamUseCase';

describe('createDeleteExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteExamUseCase).toBe('function');
  });

  it('should return an instance of DeleteExamUseCase', () => {
    const useCase = createDeleteExamUseCase();
    expect(useCase).toBeInstanceOf(DeleteExamUseCase);
  });
});
