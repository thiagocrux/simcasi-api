import { describe, expect, it } from 'vitest';

import { getExamByIdUseCase } from '../../../../../src/factories/useCases/exams/getExamByIdUseCase';
import { GetExamByIdUseCase } from '../../../../../src/useCases/exams/GetExamByIdUseCase';

describe('getExamByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getExamByIdUseCase).toBe('function');
  });

  it('should return an instance of GetExamByIdUseCase', () => {
    const useCase = getExamByIdUseCase();
    expect(useCase).toBeInstanceOf(GetExamByIdUseCase);
  });
});
