import { describe, expect, it } from 'vitest';

import { createGetAllObservationsUseCase } from '../../../../../src/factories/useCases/observations/createGetAllObservationsUseCase';
import { GetAllObservationsUseCase } from '../../../../../src/useCases/observations/GetAllObservationsUseCase';

describe('createGetAllObservationsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllObservationsUseCase).toBe('function');
  });

  it('should return an instance of GetAllObservationsUseCase', () => {
    const useCase = createGetAllObservationsUseCase();
    expect(useCase).toBeInstanceOf(GetAllObservationsUseCase);
  });
});
