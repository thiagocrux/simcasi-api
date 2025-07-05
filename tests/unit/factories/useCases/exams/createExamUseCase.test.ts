import { describe, expect, it } from 'vitest';

import { createExamUseCase } from '../../../../../src/factories/useCases/exams/createExamUseCase';
import { CreateExamUseCase } from '../../../../../src/useCases/exams/CreateExamUseCase';

describe('createExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createExamUseCase).toBe('function');
  });

  it('should return an instance of CreateExamUseCase', () => {
    const useCase = createExamUseCase();
    expect(useCase).toBeInstanceOf(CreateExamUseCase);
  });
});
