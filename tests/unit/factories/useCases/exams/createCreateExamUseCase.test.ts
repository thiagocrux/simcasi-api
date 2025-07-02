import { describe, expect, it } from 'vitest';

import { createCreateExamUseCase } from '../../../../../src/factories/useCases/exams/createCreateExamUseCase';
import { CreateExamUseCase } from '../../../../../src/useCases/exams/CreateExamUseCase';

describe('createCreateExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateExamUseCase).toBe('function');
  });

  it('should return an instance of CreateExamUseCase', () => {
    const useCase = createCreateExamUseCase();
    expect(useCase).toBeInstanceOf(CreateExamUseCase);
  });
});
