import { describe, expect, it } from 'vitest';

import { createGetAllExamsUseCase } from '../../../../../src/factories/useCases/exams/createGetAllExamsUseCase';
import { GetAllExamsUseCase } from '../../../../../src/useCases/exams/GetAllExamsUseCase';

describe('createGetAllExamsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllExamsUseCase).toBe('function');
  });

  it('should return an instance of GetAllExamsUseCase', () => {
    const useCase = createGetAllExamsUseCase();
    expect(useCase).toBeInstanceOf(GetAllExamsUseCase);
  });
});
