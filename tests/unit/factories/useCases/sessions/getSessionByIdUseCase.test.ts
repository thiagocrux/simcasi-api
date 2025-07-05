import { describe, expect, it } from 'vitest';

import { getSessionByIdUseCase } from '../../../../../src/factories/useCases/sessions/getSessionByIdUseCase';
import { GetSessionByIdUseCase } from '../../../../../src/useCases/sessions/GetSessionByIdUseCase';

describe('getSessionByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getSessionByIdUseCase).toBe('function');
  });

  it('should return an instance of GetSessionByIdUseCase', () => {
    const useCase = getSessionByIdUseCase();
    expect(useCase).toBeInstanceOf(GetSessionByIdUseCase);
  });
});
