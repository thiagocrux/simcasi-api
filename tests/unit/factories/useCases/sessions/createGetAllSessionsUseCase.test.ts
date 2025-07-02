import { describe, expect, it } from 'vitest';

import { createGetAllSessionsUseCase } from '../../../../../src/factories/useCases/sessions/createGetAllSessionsUseCase';
import { GetAllSessionsUseCase } from '../../../../../src/useCases/sessions/GetAllSessionsUseCase';

describe('createGetAllSessionsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllSessionsUseCase).toBe('function');
  });

  it('should return an instance of GetAllSessionsUseCase', () => {
    const useCase = createGetAllSessionsUseCase();
    expect(useCase).toBeInstanceOf(GetAllSessionsUseCase);
  });
});
