import { describe, expect, it } from 'vitest';

import { createUpdateExamUseCase } from '../../../../../src/factories/useCases/exams/createUpdateExamUseCase';
import { UpdateExamUseCase } from '../../../../../src/useCases/exams/UpdateExamUseCase';

describe('createUpdateExamUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateExamUseCase).toBe('function');
  });

  it('should return an instance of UpdateExamUseCase', () => {
    const useCase = createUpdateExamUseCase();
    expect(useCase).toBeInstanceOf(UpdateExamUseCase);
  });
});
