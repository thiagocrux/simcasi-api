import { describe, expect, it } from 'vitest';

import { getAllSessionsUseCase } from '../../../../../src/factories/useCases/sessions/getAllSessionsUseCase';
import { GetAllSessionsUseCase } from '../../../../../src/useCases/sessions/GetAllSessionsUseCase';

describe('getAllSessionsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllSessionsUseCase).toBe('function');
  });

  it('should return an instance of GetAllSessionsUseCase', () => {
    const useCase = getAllSessionsUseCase();
    expect(useCase).toBeInstanceOf(GetAllSessionsUseCase);
  });
});
