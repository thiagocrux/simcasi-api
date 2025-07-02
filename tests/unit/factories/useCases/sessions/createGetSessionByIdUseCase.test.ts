import { describe, expect, it } from 'vitest';

import { createGetSessionByIdUseCase } from '../../../../../src/factories/useCases/sessions/createGetSessionByIdUseCase';
import { GetSessionByIdUseCase } from '../../../../../src/useCases/sessions/GetSessionByIdUseCase';

describe('createGetSessionByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetSessionByIdUseCase).toBe('function');
  });

  it('should return an instance of GetSessionByIdUseCase', () => {
    const useCase = createGetSessionByIdUseCase();
    expect(useCase).toBeInstanceOf(GetSessionByIdUseCase);
  });
});
