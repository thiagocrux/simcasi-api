import { describe, expect, it } from 'vitest';

import { createGetExamByIdUseCase } from '../../../../../src/factories/useCases/exams/createGetExamByIdUseCase';
import { GetExamByIdUseCase } from '../../../../../src/useCases/exams/GetExamByIdUseCase';

describe('createGetExamByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetExamByIdUseCase).toBe('function');
  });

  it('should return an instance of GetExamByIdUseCase', () => {
    const useCase = createGetExamByIdUseCase();
    expect(useCase).toBeInstanceOf(GetExamByIdUseCase);
  });
});
