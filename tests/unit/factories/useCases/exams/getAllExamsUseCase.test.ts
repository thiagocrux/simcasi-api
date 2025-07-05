import { describe, expect, it } from 'vitest';

import { getAllExamsUseCase } from '../../../../../src/factories/useCases/exams/getAllExamsUseCase';
import { GetAllExamsUseCase } from '../../../../../src/useCases/exams/GetAllExamsUseCase';

describe('getAllExamsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllExamsUseCase).toBe('function');
  });

  it('should return an instance of GetAllExamsUseCase', () => {
    const useCase = getAllExamsUseCase();
    expect(useCase).toBeInstanceOf(GetAllExamsUseCase);
  });
});
