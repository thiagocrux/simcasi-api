import { describe, expect, it } from 'vitest';

import { getAllObservationsUseCase } from '../../../../../src/factories/useCases/observations/getAllObservationsUseCase';
import { GetAllObservationsUseCase } from '../../../../../src/useCases/observations/GetAllObservationsUseCase';

describe('getAllObservationsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllObservationsUseCase).toBe('function');
  });

  it('should return an instance of GetAllObservationsUseCase', () => {
    const useCase = getAllObservationsUseCase();
    expect(useCase).toBeInstanceOf(GetAllObservationsUseCase);
  });
});
